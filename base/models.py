from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


# Create your models here.

class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    # the name other users will see
    full_name = models.CharField(max_length=50)
    pronouns = models.CharField(max_length=50, null=True, blank=True)
    phonetics = models.CharField(max_length=50, null=True, blank=True)
    fav_color = models.CharField(max_length=50, null=True, blank=True)
    fav_color_to_wear = models.CharField(max_length=50, null=True, blank=True)
    fav_food_snack = models.TextField(null=True, blank=True)
    shoe_size = models.FloatField(null=True, blank=True)
    clothes_top_size = models.CharField(max_length=50, null=True, blank=True)
    clothes_bottom_size = models.CharField(max_length=50, null=True, blank=True)
    dont_want_list = models.TextField(null=True, blank=True)
    pinterest_link = models.URLField(null=True, blank=True)
    amazon_link = models.URLField(null=True, blank=True)
    #wishlists 

    def __str__(self):
        return self.full_name


class WishList(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=50)
    created = models.DateTimeField(default=datetime.now)
    # items = models.ForeignKey(Item, on_delete=models.PROTECT, related_name='wishlist_items')
    
    def __str__(self):
        return self.title

class Item(models.Model):
    wishlist = models.ManyToManyField(WishList, related_name='items_list', blank=True)
    item_name = models.CharField(max_length=50)
    claimed = models.BooleanField(default=False)
    item_link = models.URLField(null=True, blank=True)
    item_description = models.TextField(null=True, blank=True)
    item_image = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.item_name




