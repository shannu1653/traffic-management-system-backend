import json
from urllib.parse import parse_qs

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model
from django.db.models import Sum
from rest_framework_simplejwt.tokens import AccessToken

from .models import Traffic

User = get_user_model()


class TrafficConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # 🔐 Read JWT token from query params
        query_params = parse_qs(self.scope["query_string"].decode())
        token = query_params.get("token")

        if not token:
            await self.close(code=4001)
            return

        try:
            access_token = AccessToken(token[0])
            self.user = await sync_to_async(User.objects.get)(
                id=access_token["user_id"]
            )
        except Exception:
            await self.close(code=4003)
            return

        # 👥 Join traffic group
        await self.channel_layer.group_add(
            "traffic_updates",
            self.channel_name
        )

        await self.accept()

        print("✅ Traffic WebSocket connected:", self.user)

        # 📊 Send full dashboard data immediately
        await self.send_full_dashboard_state()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            "traffic_updates",
            self.channel_name
        )
        print("❌ Traffic WebSocket disconnected")

    # ==============================
    # SEND FULL DASHBOARD DATA
    # ==============================
    async def send_full_dashboard_state(self):
        total_vehicles = await sync_to_async(
            Traffic.objects.aggregate
        )(total=Sum("vehicle_count"))

        data = {
            "total_vehicles": total_vehicles["total"] or 0,
            "active_signals": 8,
            "incidents": 2,
            "violations": 5,
            "traffic_flow": [
                {"time": "09:00", "count": 30},
                {"time": "10:00", "count": 55},
                {"time": "11:00", "count": 80},
            ],
        }

        await self.send(text_data=json.dumps(data))

    # ==============================
    # GROUP MESSAGE HANDLER
    # ==============================
    async def send_traffic_update(self, event):
        await self.send(text_data=json.dumps(event["data"]))
