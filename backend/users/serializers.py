from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email", "password"]

    def create(self, validated_data):
        added_by = self.context.get("added_by", None)
        if added_by:
            validated_data['added_by_id'] = added_by
        else:
            validated_data['role'] = 'Admin'
        user = User.objects.create_user(**validated_data)
        return user
