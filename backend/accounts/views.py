from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import RegisterSerializer


# -------------------------
# REGISTER API
# -------------------------
class RegisterView(APIView):
    """
    Public API for user registration
    """
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# -------------------------
# PROFILE API
# -------------------------
class ProfileView(APIView):
    """
    Returns logged-in user's profile
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        })


# -------------------------
# CUSTOM LOGIN (JWT)
# -------------------------
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Extend JWT login response with role & username
    """

    def validate(self, attrs):
        data = super().validate(attrs)

        data["username"] = self.user.username
        data["role"] = self.user.role

        return data


class LoginView(TokenObtainPairView):
    """
    Public login API
    """
    permission_classes = [permissions.AllowAny]
    serializer_class = CustomTokenObtainPairSerializer
