# Generated by Django 4.0.1 on 2022-02-11 01:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_alter_user_email_alter_user_pinterest_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='wishlist',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]