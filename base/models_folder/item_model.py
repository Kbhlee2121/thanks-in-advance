# from django.db import models
# from django.contrib.auth.models import User
# from django.db.models import ManyToManyField, Model
# from .wishlist_model import WishList

# class Item(models.Model):
#     wishlist = models.ManyToManyField('wishlists.WishList', related_name='items')
#     item_name = models.CharField(max_length=50)
#     claimed = models.BooleanField(default=False)
#     item_link = models.URLField(null=True, blank=True)
#     item_description = models.TextField(null=True, blank=True)
#     item_image = models.ImageField(null=True, blank=True)
    
#     def __str__(self):
#         return self.item_name