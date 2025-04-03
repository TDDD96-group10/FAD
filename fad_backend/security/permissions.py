from rest_framework import permissions


class IsAdminFromToken(permissions.BasePermission):
    """
    Checks if 'role' from the JWT token is 'admin'
    """
    def has_permission(self, request, view):
        role = request.auth.get("role", None)  # Extract role from JWT token
        return role == "admin"
