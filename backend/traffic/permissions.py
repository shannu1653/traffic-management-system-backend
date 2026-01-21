from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAdminOrOfficer(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True   # GET, HEAD, OPTIONS allowed for all logged-in users

        return (
            request.user.is_authenticated and
            request.user.role in ["admin", "officer"]
        )
