from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets, status
from .serializers import UserProfileSerializer, WishListSerializer, ItemSerializer
from .models import UserProfile, WishList, Item

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserProfileSerializer, WishListSerializer, ItemSerializer
from base import serializers

# Create your views here. Processes requests and returning responses

#decorator for function view
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'User Profile': '/user-profile/<str:pk>/',
        'Create Profile': '/create-profile/<str:pk>/',
        'Update Profile': '/update-profile/<str:pk>/',
        # Unsure if delete profile is necessary
        'Delete Profile':'/delete-profile/<str:pk>/',
        # list of all wishlists
        'View All Wishlists':'/wishlists/<str:pk>/',
        # detail view of one wishlist, shows list of items. 
        # /items/<user-id>/<wishlist-id>/
        'View Wishlist Items': '/items/<str:list>/<int:id>/',
        'Create Wishlist':'create-wishlist/<str:pk>/',
        # Updating the name, not sure about updating items
        'Update Wishlist':'/<str:pk>/<int:id>/update-wishlist/',
        'Delete Wishlist':'/<str:pk>/<int:id>/delete-wishlist/',
        # detailed view of item when clicked, with edit, delete options. 
        # item-view/<user-id>/<wishlist-id>/<item-id>/
        'Detail View Item': '/view-item/<str:pk>/<int:id>/<str:item>/',
        # unsure if correct url path:/<user-id>/<wishlist-id>/create-item
        'Create Item': '/<str:pk>/<int:id>/create-item/',
        'Update Item':'/<str:pk>/<int:id>/<str:pk>/update-item',
        'Delete Item':'/<str:pk>/<int:id>/<str:tk>/delete-view',
    }

    return Response(api_urls)

# USERPROFILE

#view profile
# pk = user id when user system added
# users currently allowed to have multiple profiles
@api_view(['GET'])
def viewUserProfile(request, pk):
    userprofile = UserProfile.objects.get(id=pk)
    serializer = UserProfileSerializer(userprofile)
    return Response(serializer.data)

# create user profile (need to ensure users only make 1)
@api_view(['POST'])
def createUserProfile(request):
    serializer = UserProfileSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PUT'])
def updateUserProfile(request, pk):
    try:
        userprofile = UserProfile.objects.get(id=pk)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = UserProfileSerializer(userprofile, data=request.data)
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
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# update item
# def updateItem(request, pk):
#     try:
#         item = WishList.objects.get(id=pk)
#     except WishList.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     serializer = WishListSerializer(wishlist, data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#delete item

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
