from rest_framework.views import APIView
from rest_framework.response import Response
from api import models
from rest_framework import serializers


class adoptUserSerivalizaer(serializers.ModelSerializer):
    class Meta:
        model = models.adoptUsersInfo
        fields = "__all__"


class adoptuserView(APIView):

    def post(self, request, *args, **kwargs):
        ser = adoptUserSerivalizaer(data=request.data)
        name = ser.validated_data.get('name')
        work = ser.validated_data.get('work')
        experience = ser.validated_data.get('experience')
        married = ser.validated_data.get('married')
        salary = ser.validated_data.get('salary')
        address = ser.validated_data.get('address')
        phone = ser.validated_data.get('phone')
        adoptdetail = ser.validated_data.get('adoptdetail')

        adopt_object = models.adoptUsersInfo.objects.create(
            name=name,
            work=work,
            experience=experience,
            married=married,
            salary=salary,
            address=address,
            phone=phone,
            adoptdetail=adoptdetail,
        )
        return adopt_object
