"""Wallpaper URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_jwt.views import refresh_jwt_token
from .import views
urlpatterns = [
   path("register",views.Register,name="Reg"),
   path("reg/login",views.Login,name="login"),
   path("logout",views.logout,name="logout"),
   path("upload",views.Upload_Walls,name="upload"),
   path("retrive/uploaded",views.Retrive_uploaded.as_view(),name="Retrive_uploaded"),
   path("download",views.download,name="download"),
   path("delete/Uploaded",views.delete_user_uploaded,name="deleteUploaded"),
   path("homepage",views.Home_Walls,name="home"),
   path("imageLikes",views.liko,name="likes"),
   path("image/liked",views.retrive_liked_Image,name="likedImages"),
   path("image/removed_liked",views.remove_Liked,name="removeLiked"),
   path("image/view",views.ImageViews,name="iamgeviews"),
   path('api-auth/',include('rest_framework.urls')),
   path("api/refresh/token",refresh_jwt_token),#this is to refresh existing token Pass current token to this via poSt method
]
