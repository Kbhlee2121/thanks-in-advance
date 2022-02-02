from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name="api-overview"),
    path('user-profile/<str:pk>/', views.viewUserProfile, name="view-userprofile"),
    path('create-userprofile/', views.createUserProfile, name="create-profile"),
    path('update-userprofile/<str:pk>/', views.updateUserProfile, name="update-profile"),

    # WISHLIST PATHS
    path('create-wishlist/', views.createWishlist, name="create-wishlist"),
    path('update-wishlist/<str:pk>/', views.updateWishlist, name="update-wishlist"),
    path('delete-wishlist/<str:pk>/', views.deleteWishlist, name="delete-wishlist"),

    # add another <str:pk> for user specific
    path('wishlists/', views.viewAllWishlists, name="view-all-wishlists"),

    # ITEM PATHS
    path('items/<str:list>/', views.viewWishlistItems, name="view-wishlist-items"),
    # create item
    # update item
    # delete item
    # path('view-item/<str:list>/<str:item_id>/', views.viewItem, name="detail-view-item"),

    # path('', views.UserProf/ileView.as_view({'get': 'get_userprofile'})),
]
