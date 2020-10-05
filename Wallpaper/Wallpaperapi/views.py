from django.shortcuts import render
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib import auth
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from rest_framework.response import Response 
from rest_framework import status,generics
from .backends import UserBackend
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_jwt.settings import api_settings
from datetime import date, timedelta
from .serializer import RegSer,Image_Upload,Image_Retrive_uploaded,Image_Retrive
import json
from .models import ImageWalls,Register
import os
from django.conf import settings
from django.http import HttpResponse, Http404,FileResponse
from django.core.paginator import Paginator
import datetime
# Create your views here.


JWT_PAYLOAD_HANDLER = api_settings.JWT_PAYLOAD_HANDLER
JWT_ENCODE_HANDLER = api_settings.JWT_ENCODE_HANDLER

@api_view(('POST',))
@permission_classes((AllowAny,))
def Register(request):
    Reg_save=RegSer(data=request.data)
    if Reg_save.is_valid() is True:
        Reg_save.save()  
        return Response({"success":True},status=status.HTTP_201_CREATED)  
    else:
        return Response({"success":False,"error":Reg_save.errors},status=status.HTTP_200_OK)





@api_view(('POST',))
@permission_classes((AllowAny,))
def Login(request):
    email=request.data['email']
    password=request.data['password']
    user=UserBackend.authenticate(request,email=email,password=password)
    if user is not None:
        payload = JWT_PAYLOAD_HANDLER(user)
        jwt_token = JWT_ENCODE_HANDLER(payload)
        response=Response({"success":True,"UserInfo":str(user)},status=status.HTTP_201_CREATED) 
        response.set_cookie(key="authJWT",value=jwt_token,path='/',max_age=2592000)
        return response 
    else :
         return Response({"success":False,"error":"Not a User"},status=status.HTTP_200_OK)   


@api_view(('GET',))
@permission_classes([IsAuthenticated])
def logout(request):
    response=Response({"success":True},status=status.HTTP_200_OK) 
    response.delete_cookie("authJWT")
    return response
@api_view(("POST",))
@permission_classes([IsAuthenticated])    
def Upload_Walls(request):
    data=dict(request.data)
    data["user_foreign"]=request.user.pk # assigining the empty field with foreignKey
    data["user_name"]=request.user.username
    data["image"]=request.FILES["image"]
    data["image_cateogry"]=str(request.POST["image_cateogry"])
    Ser_Image=Image_Upload(data=data) # using serializing To Save
    if Ser_Image.is_valid():
        Ser_Image.save()
        return Response({"success":True},status=status.HTTP_200_OK)
    else:
        return Response({"success":False},status=status.HTTP_406_NOT_ACCEPTABLE) 


@permission_classes([IsAuthenticated])
class Retrive_uploaded(generics.ListAPIView):
    serializer_class=Image_Retrive_uploaded
    def get_queryset(self):
        user=self.request.user.pk
        return ImageWalls.objects.filter(user_foreign=user)
    
@api_view(('GET',))
@permission_classes([IsAuthenticated])
def download(request):
    path=request.GET.get("rat")
    file_path = os.path.join(settings.MEDIA_ROOT,path)
    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(fh.read(), content_type="image/jpeg")
            response['Content-Disposition']  = 'attachement;filename=' + os.path.basename(file_path)
            return response
    raise Http404

@api_view(("POST",))
@permission_classes([IsAuthenticated])
def delete_user_uploaded(request):
    data=request.data
    ImageWalls.objects.filter(image_id=data["image_id"]).delete()
    return Response({"success":True})

@api_view(("GET",))
@permission_classes([AllowAny,])
def Home_Walls(request):
    queryset =ImageWalls.objects.all().order_by("-uploaded_date")
    queryset_1=ImageWalls.objects.all().order_by("-view")[:3]#top 3 views images
    paginated_queryset=Paginator(queryset,10)
    page=request.GET.get("page")
    serial=Image_Retrive(paginated_queryset.page(int(page)).object_list,many=True,context={'request':request})
    serial_1=Image_Retrive(queryset_1,many=True,context={'request':request})
    data={"Total_Pages":paginated_queryset.num_pages,"current_page":page,"list":serial.data,"gallery":serial_1.data}
    return Response(data)





@api_view(("POST",))
@permission_classes([IsAuthenticated,])
def liko(request):
    data=request.data
    image=ImageWalls.objects.get(image_id=data['image_id'])
    if data["type"]:
            request.user.liked_images.add(image)
            image.like+=1
            image.save()
            return Response({"success":True,"message":"already_liked"})
    else:
        request.user.liked_images.remove(image)
        image.like=-1
        image.save()
        return Response({"success":False},status=status.HTTP_200_OK)



@api_view(("GET",))
@permission_classes([IsAuthenticated,])
def retrive_liked_Image(request):
    query_set=request.user.liked_images.all()
    serial=Image_Retrive(query_set,many=True,context={'request':request})
    data={"list":serial.data}
    return Response(data)

@api_view(("GET",))
@permission_classes([IsAuthenticated,])
def remove_Liked(request):
    image_id=request.GET.get("image_id")
    image=ImageWalls.objects.get(image_id=image_id)
    image.like-=1
    image.save()
    request.user.liked_images.remove(image)
    return Response(status=status.HTTP_200_OK)


@api_view(("POST",))
@permission_classes([IsAuthenticated,])
def ImageViews(request):
    image_id=request.POST.get("image_id")
    images=ImageWalls.objects.get(image_id=image_id)
    images.view+=1
    images.save()
    return Response(status=status.HTTP_200_OK)
