from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('users/', views.viewAllUsers, name="view-users"),
    path('user-profile/<str:pk>/', views.viewUser, name="view-userprofile"),
    path('user-create/', views.createUserProfile, name="create-user"),
    path('user-update/<str:pk>/', views.updateUserProfile, name="update-user"),

    # WISHLIST PATHS
    path('wishlist-create/', views.createWishlist, name="create-wishlist"),
    path('wishlist-update/<str:pk>/', views.updateWishlist, name="update-wishlist"),
    path('wishlist-delete/<str:pk>/', views.deleteWishlist, name="delete-wishlist"),

    # view all wishlists
    path('wishlists/', views.viewAllWishlists, name="view-all-wishlists"),

    # view wishlists of user
    path('user/wishlists/<str:pk>/', views.userWishlists, name="view-user-wishlists"),

    # ITEM PATHS
    #view all items of all wishlists
    path('items/', views.viewAllItems, name="view-all-items"),
    # detail view of one item
    path('items/<str:pk>/', views.itemDetail, name="detail-view-item"),

    #view items of a wishlist
    path('items-wishlist/<str:list>/', views.viewWishlistItems, name="view-wishlist-items"),
    # create item
    path('item-create/', views.createItem, name="create-item"),
    # update item
    path('item-update/<str:pk>/', views.updateItem, name="update-item"),
    # delete item
    path('item-delete/<str:pk>/', views.deleteItem, name="delete-item"),
    # path('view-item/<str:list>/<str:item_id>/', views.viewItem, name="detail-view-item"),

    # path('', views.UserProf/ileView.as_view({'get': 'get_userprofile'})),
]
