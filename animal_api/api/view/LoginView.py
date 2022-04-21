import random
import uuid
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from api import models
from api.serializer.account import UserModelSerializer

class LoginView(APIView):
    def get(self, request, *args, **kwargs):
        userphone = request.data.get('userphone')
        user_object = models.UserInfo.objects.filter(userphone=userphone)
        ser = UserModelSerializer(instance=user_object, many=True)

        return Response(ser.data)

    def post(self, request, *args, **kwargs):
        userphone = request.data.get('userphone')
        password = request.data.get('password')
        wx_code = request.data.get('code')
        info = {
            'appid': "wx70988ffbb24e4268",
            'secret': "37712095232dad5a90b8827b94747fc1",
            'js_code': wx_code,
            'grant_type': "authorization_code",
        }

        result=requests.get(url="https://api.weixin.qq.com/sns/jscode2session",params=info)
        openid = result.json()['openid']
        exists = models.UserInfo.objects.filter(userphone=userphone).exists()
        token = str(uuid.uuid4())
        print(exists)
        if not exists:
            models.UserInfo.objects.create(
                userphone=userphone,
                password=password,
                token=token,
                openid=openid
            )
        else:
            models.UserInfo.objects.filter(userphone=userphone).update(token=token, openid=openid)
        user = models.UserInfo.objects.filter(userphone=userphone)
        ser = UserModelSerializer(instance=user,many=True)
        print(ser.data)
        return Response(ser.data)


class LoginDetailView(APIView):

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user_object = models.UserInfo.objects.filter(username=username, password=password, role=1)
        ser = UserModelSerializer(instance=user_object, many=True)
        return Response(ser.data)

