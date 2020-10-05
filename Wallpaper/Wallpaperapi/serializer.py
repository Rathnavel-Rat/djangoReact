from rest_framework  import serializers
from .models import Register,ImageWalls
class RegSer(serializers.ModelSerializer):
    class Meta:
        model=Register
        fields=['username','email','password']

class Image_Upload(serializers.ModelSerializer):
    class Meta:
        model=ImageWalls
        fields=["user_foreign","user_name","image_cateogry","image",]
   
class Image_Retrive_uploaded(serializers.ModelSerializer):
    class Meta:
        model=ImageWalls
        fields=["image_preview","image_id","like","view","uploaded_date","image"]


class Image_Retrive(serializers.ModelSerializer):
    class Meta:
        model=ImageWalls
        fields=["user_name","image_preview","image_id","like","view","uploaded_date","image"]
        # if apiView not used
        def get_image_url(self,obj):
            return self.context['request'].build_absolute_uri(obj.image_preview)
        

