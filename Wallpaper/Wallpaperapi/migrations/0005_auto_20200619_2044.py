# Generated by Django 3.0.6 on 2020-06-19 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Wallpaperapi', '0004_auto_20200619_2044'),
    ]

    operations = [
        migrations.AlterField(
            model_name='imagewalls',
            name='image_id',
            field=models.TextField(default='6a9b8a3f0d264f5680caab276807f7a9', unique=True),
        ),
    ]
