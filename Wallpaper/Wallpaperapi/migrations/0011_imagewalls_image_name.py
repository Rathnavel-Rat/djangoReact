# Generated by Django 3.0.6 on 2020-06-27 12:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Wallpaperapi', '0010_auto_20200627_1443'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagewalls',
            name='image_name',
            field=models.TextField(null=True),
        ),
    ]