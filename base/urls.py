from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('user-profile/<str:pk>/', views.viewUserProfile, name="view-userprofile"),
    path('profile-create/', views.createUserProfile, name="create-profile"),
    path('profile-update/<str:pk>/', views.updateUserProfile, name="update-profile"),

    # WISHLIST PATHS
    path('wishlist-create/', views.createWishlist, name="create-wishlist"),
    path('wishlist-update/<str:pk>/', views.updateWishlist, name="update-wishlist"),
    path('wishlist-delete/<str:pk>/', views.deleteWishlist, name="delete-wishlist"),

    # add another <str:pk> for user specific
    path('wishlists/', views.viewAllWishlists, name="view-all-wishlists"),

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
