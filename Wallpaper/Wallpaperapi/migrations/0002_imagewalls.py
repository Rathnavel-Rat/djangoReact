# Generated by Django 3.0.6 on 2020-06-17 13:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('Wallpaperapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ImageWalls',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('image_id', models.TextField(default='c3e4bb68625d464fb2b3a402dc3bd23c', unique=True)),
                ('image_preview', models.ImageField(upload_to='Wallpapers_preview')),
                ('image', models.ImageField(upload_to='Wallpapers')),
                ('like', models.IntegerField(default=0)),
                ('view', models.IntegerField(default=0)),
                ('uploaded_date', models.DateField(auto_now=True)),
                ('user_foreign', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
