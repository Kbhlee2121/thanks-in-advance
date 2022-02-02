from rest_framework import serializers
from .models import Item, UserProfile, WishList

#Serializers convert model instances to JSON so frontend can work with received data

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class WishListSerializer(serializers.ModelSerializer):
    items_list = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = WishList
        fields = ('user','title','created','items_list')

class ItemSerializer(serializers.ModelSerializer):
    # queryset=WishList.objects.all()
    wishlists = WishListSerializer(many=True, read_only=True)
    class Meta:
        model = Item
        fields = ('wishlists','item_name','claimed','item_link','item_description','item_image')