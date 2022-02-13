from rest_framework import serializers
from .models import Item, User, WishList

#Serializers convert model instances to JSON so frontend can work with received data

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class WishListSerializer(serializers.ModelSerializer):
    # items_list = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    items_list = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = WishList
        fields = ('id','user','title','created','items_list')

class ItemSerializer(serializers.ModelSerializer):
    # queryset=WishList.objects.all()
    # wishlist = WishListSerializer(read_only=True)
    class Meta:
        model = Item
        fields = ('id','item_name','claimed','item_link','item_description','item_image','wishlist')