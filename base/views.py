from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, status
from .serializers import UserSerializer, WishListSerializer, ItemSerializer
from .models import User, WishList, Item

from rest_framework.decorators import api_view
from rest_framework.response import Response
from base import serializers

# Create your views here. Processes requests and returning responses

#decorator for function view
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'User Profile': '/user-profile/<str:pk>/',
        'Create Profile': '/profile-create/<str:pk>/',
        'Update Profile': '/profile-update/<str:pk>/',
        # Unsure if delete profile is necessary
        'Delete Profile':'/profile-delete/<str:pk>/',
        # list of all wishlists
        'View All Wishlists':'/wishlists/<str:pk>/',
        # detail view of one wishlist, shows list of items. 
        # /items/<user-id>/<wishlist-id>/
        'View Wishlist Items': '/items/<str:list>/<int:id>/',
        'Create Wishlist':'wishlist-create/<str:pk>/',
        # Updating the name, not sure about updating items
        'Update Wishlist':'wishlist-update/<str:pk>/<int:id>/',
        'Delete Wishlist':'wishlist-delete/<str:pk>/<int:id>/',
        # detailed view of item when clicked, with edit, delete options. 
        # item-view/<user-id>/<wishlist-id>/<item-id>/
        'Detail View Item': '/view-item/<str:pk>/<int:id>/<str:item>/',
        # unsure if correct url path:/<user-id>/<wishlist-id>/create-item
        'Create Item': '/create-item/<str:pk>/<int:id>/',
        'Update Item':'/update-item/<str:pk>/<int:id>/<str:pk>/',
        'Delete Item':'/delete-view/<str:pk>/<int:id>/<str:tk>/',
    }

    return Response(api_urls)

# USER

#view profile
# pk = user id when user system added
# users currently allowed to have multiple profiles
@api_view(['GET'])
def viewUser(request, pk):
    userprofile = User.objects.get(id=pk)
    serializer = UserSerializer(userprofile)
    return Response(serializer.data)

#Get all users
# @api_view(['GET'])

# create user profile (need to ensure users only make 1)
@api_view(['POST'])
def createUserProfile(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateUserProfile(request, pk):
    try:
        userprofile = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserSerializer(userprofile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# WISHLISTS

#creates new wishlist
@api_view(['POST'])
def createWishlist(request):
    serializer = WishListSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#update wishlist - name
@api_view(['PUT'])
def updateWishlist(request, pk):
    try:
        wishlist = WishList.objects.get(id=pk)
    except WishList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = WishListSerializer(wishlist, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# delete wishlist
@api_view(['DELETE'])
def deleteWishlist(request, pk):
    try:
        wishlist = WishList.objects.get(id=pk)
    except WishList.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    wishlist.delete()
    return Response(status=status.HTTP_200_OK)

# view all wishlists (by user not yet added)
@api_view(['GET'])
def viewAllWishlists(request):
    wishlists = WishList.objects.all().order_by('id')
    serializer = WishListSerializer(wishlists, many=True)
    return Response(serializer.data)

# ITEMS

#view all items of all wishlists - unsure if necessary
@api_view(['GET'])
def viewAllItems(request):
    items = Item.objects.all().order_by('id')
    serializer = ItemSerializer(items, many=True)
    return Response(serializer.data)

# detail view of one item
@api_view(['GET'])
def itemDetail(request, pk):
    item = Item.objects.get(id=pk)
    serializer = ItemSerializer(item)
    return Response(serializer.data)

# view list of items of a wishlist
@api_view(['GET'])
def viewWishlistItems(request, list):
    # queries database
    items = Item.objects.filter(wishlist=list)
    # serializes data
    # many = True for list of items, querying all
    serializer = ItemSerializer(items, many=True)
    # returns serialized data 
    return Response(serializer.data)

# create item - attach to wishlist?
@api_view(['POST'])
def createItem(request):
    serializer = ItemSerializer(data=request.data)
    print(request)
    print(serializer)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# update item
# doesn't update wishlist attribute
@api_view(['PUT'])
def updateItem(request, pk):
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ItemSerializer(item, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#delete item
@api_view(['DELETE'])
def deleteItem(request, pk):
    try:
        item = Item.objects.get(id=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    item.delete()
    return Response(status=status.HTTP_200_OK)



# @api_view(['GET'])
# def viewItem(request, list, item_id):
#     wishlist = WishList.objects.get(id=list)
#     item = Item.objects.values_list('wishlist', 'id')
#     serializer = ItemSerializer(item)
#     return Response(serializer.data)
    

#viewsets class provides implementation for CRUD be default
# class UserProfileView(viewsets.ModelViewSet):

#     serializer_class = UserProfileSerializer
#     queryset = UserProfile.objects.all()

#     # def get_userprofile(self, *args):
#     #     return self.request.UserProfile.objects.all()

# class WishListView(viewsets.ModelViewSet):
#     serializer_class = WishListSerializer
#     queryset = WishList.objects.all()

# class ItemView(viewsets.ModelViewSet):
#     serializer_class = ItemSerializer
#     queryset = Item.objects.all()
