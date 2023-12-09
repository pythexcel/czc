from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password


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
            validated_data['is_staff'] = True
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)
