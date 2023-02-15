from rest_framework import serializers
# from django.shortcuts import get_object_or_404
from .models import User, UserData
from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer

class DataSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserData
        # fields = ["id", "user", "create_date"]
        fields= "__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username','password',  "first_name", "last_name")
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        fields= [ "id", "username",  "email","password", "first_name", "last_name"]

class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        fields= [ "id", "username",  "email", "first_name", "last_name"]

