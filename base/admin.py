from django.contrib import admin
from .models import UserProfile, WishList, Item

# Register your models here.

admin.site.register(UserProfile)
admin.site.register(WishList)
admin.site.register(Item)