# from django.db import models
# from django.contrib.auth.models import User
# from .item_model import Item
# from datetime import datetime

# class WishList(models.Model):
#     # user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
#     title = models.CharField(max_length=50)
#     created = models.DateTimeField(default=datetime.now)
#     items = models.ForeignKey(Item, on_delete=models.PROTECT, related_name='wishlist_items')
    
#     def __str__(self):
#         return self.title