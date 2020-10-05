# Generated by Django 3.0.6 on 2020-06-27 09:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Wallpaperapi', '0009_register_backgroundtheme'),
    ]

    operations = [
        migrations.AddField(
            model_name='imagewalls',
            name='user_name',
            field=models.TextField(default=0),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='LikedWalls',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_id', models.TextField()),
                ('user_foreign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]