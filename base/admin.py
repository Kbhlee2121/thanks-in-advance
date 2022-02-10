from django.contrib import admin
from .models import User, WishList, Item

class WishListAdmin(admin.ModelAdmin):
    list_display = ("title","id","user","created",)
   
class ItemAdmin(admin.ModelAdmin):
    list_display = ("item_name","id","claimed")
# Register your models here.

admin.site.register(User)
admin.site.register(WishList, WishListAdmin)
admin.site.register(Item, ItemAdmin)