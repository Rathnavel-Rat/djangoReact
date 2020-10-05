from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser
import uuid
from PIL import Image
from django.core.files.uploadedfile import InMemoryUploadedFile
import sys
from io import BytesIO
# Create your models here.
class Register(AbstractUser):
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=150)
    BackGroundTheme=models.ImageField(upload_to="Themes")
    liked_images=models.ManyToManyField("ImageWalls",blank=True)
    def save(self, *args, **kwargs):
        self.password=make_password(self.password)
        super(Register, self).save(*args, **kwargs) # Call the real save() method


Category=[("None","None"),("Anime","Anime"),("Nature","Nature"),("GOD","GOD"),("Gaming","Gaming")]


class ImageWalls(models.Model):
    id=models.AutoField(primary_key=True)
    user_name=models.TextField()
    user_foreign=models.ForeignKey(Register,related_name="uploads",on_delete=models.CASCADE)
    image_id=models.TextField(editable=False,unique=True)
    image_name=models.TextField(null=True)
    image_cateogry=models.CharField(max_length=15,choices=Category,default="None")
    image_preview=models.ImageField(upload_to="Wallpapers_preview")
    image=models.ImageField(upload_to="Wallpapers")
    like=models.IntegerField(default=0)
    view=models.IntegerField(default=0)
    uploaded_date=models.DateField(auto_now=True)
    def save(self,*args,**kwargs):
        self.image_preview=self.compressImage(self.image)
        self.image_id= str(uuid.uuid4().hex)
        super(ImageWalls,self).save(*args,**kwargs)
    
    def compressImage(self,image):
        imageTemp=Image.open(image)
        outputstream=BytesIO()
        imageTempResize=imageTemp.resize((1020,573))
        print(image.name)
        imageTemp.save(outputstream,format='JPEG',quality=30)
        outputstream.seek(0)
        image=InMemoryUploadedFile(outputstream,"ImageField","%s.jpg" %image.name.split('.')[0], 'image/jpeg', sys.getsizeof(outputstream), None)
        return image

class LikedWalls(models.Model):
     user_foreign=models.ForeignKey(Register,related_name="likes",on_delete=models.CASCADE)
     image_id=models.TextField()
     
