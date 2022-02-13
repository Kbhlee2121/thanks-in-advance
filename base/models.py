from django.db import models
# from django.contrib.auth.models import User
from datetime import datetime


# Create your models here.

class User(models.Model):
    # can remove user attr
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    # the name other users will see
    full_name = models.CharField(max_length=50)
    pronouns = models.CharField(max_length=50, null=True, blank=True)
    phonetics = models.CharField(max_length=50, null=True, blank=True)
    username = models.CharField(max_length=20)
    password = models.CharField(max_length=127)
    email = models.EmailField(max_length=254)
    fav_color = models.CharField(max_length=50, null=True, blank=True)
    fav_color_to_wear = models.CharField(max_length=50, null=True, blank=True)
    fav_food_snack = models.TextField(null=True, blank=True)
    shoe_size = models.FloatField(null=True, blank=True)
    clothes_top_size = models.CharField(max_length=50, null=True, blank=True)
    clothes_bottom_size = models.CharField(max_length=50, null=True, blank=True)
    dont_want_list = models.TextField(null=True, blank=True)
    pinterest_link = models.CharField(max_length= 20, null=True, blank=True)
    amazon_link = models.URLField(null=True, blank=True)
    #wishlists 

    def __str__(self):
        return self.full_name


class WishList(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=50)
    created = models.DateTimeField(default=datetime.now)
    description = models.TextField(null=True, blank=True)
    # items = models.ForeignKey(Item, on_delete=models.PROTECT, related_name='wishlist_items')
    
    # class Meta:
    #     ordering = ('-created',)

    def __str__(self):
        return self.title

class Item(models.Model):
    wishlist = models.ForeignKey(WishList, on_delete=models.CASCADE, related_name='items_list', blank=True)
    item_name = models.CharField(max_length=50)
    claimed = models.BooleanField(default=False)
    item_link = models.URLField(null=True, blank=True)
    item_description = models.TextField(null=True, blank=True)
    item_image = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.item_name




