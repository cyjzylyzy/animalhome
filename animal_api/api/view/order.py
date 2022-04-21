import random
import time
import uuid

import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView
from xml.etree import ElementTree as ET
from api import models
from django.forms import model_to_dict
from api.serializer.account import UserModelSerializer


class SupportModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    animal = serializers.SerializerMethodField()
    class Meta:
        model = models.supportinfo
        fields = '__all__'

    def get_User(self,obj):
        return model_to_dict(obj.User, fields=['id', 'username', 'address'])

    def get_animal(self,obj):
        return model_to_dict(obj.animal,fields=['id', 'name', 'category'])


class SupportView(APIView):

    queryset = models.supportinfo.objects
    ser = SupportModelSerializer

    def retrieve(self, request, *args, **kwargs):

        user_id = request.query_params.get('id')
        if not user_id:
            if not user_id:
                return Response({'error': 'userID不能为空'})
            if not user_id.isdigit():
                return Response({'error': 'userID必须为数字'})
            try:
                shopcars_obj = models.supportinfo.objects.filter(user_id=user_id)
                if not shopcars_obj:
                    return Response({'error': '无此对象'})
                # 返回序列化结果
                ser_obj = SupportModelSerializer(shopcars_obj, many=True)
                return Response(ser_obj.data)
            except Exception as e:
                return Response({'error': '服务器内部错误'})


def md5(string):
    import hashlib
    m = hashlib.md5()
    m.update(string.encode('utf-8'))
    return m.hexdigest()


class PaymentView(APIView):

    def post(self, request, *args, **kwargs):

        animal_id = request.data.get('animalid')
        user_id = request.data.get('user_id')
        money = request.data.get('money')
        order_random_string = str(uuid.uuid4())
        user_object = models.UserInfo.objects.filter(id=user_id)
        order_object = models.supportinfo.objects.create(animal_id=animal_id, user_id=user_id,money=money, uid=order_random_string,status=1)
        ser = UserModelSerializer(instance=user_object,many=True)
        print(ser.data)

        info = {
            'appid': 'wx70988ffbb24e4268',
            'mch_id': '1526049051',
            'device_info': 'animalwx',
            'nonce_str':"".join([chr(random.randint(65,90))for _ in range(12)]),
            'sign_type':'MDS',
            'body':'商品支付',
            'detail':'这是商品详细信息',
            'attach':'微信小程序',
            'out_trade_no':order_random_string,
            'total_fee': money,
            'spbill_create_ip':request.META.get('REMOTE_ADDR'),
            'notify_url':'http://127.0.0.1:8000/api/notify/',
            'trade_type':'JSAPI',
            'openid':request.data.get('openid')
        }
        pay_key = "2SzCvaKgYExuItWBfYAqJFs72uUleD14"
        temp = "&".join(["{0}={1}".format(k,info[k]) for k in sorted(info)]+["{0}={1}".format("key",pay_key,),])
        sign = md5(temp).upper()
        info['sign'] = sign

        xml_string = "<xml>{0}</xml>".format("".join(["<{0}>{1}</{0}>".format(k, v) for k,v in info.items()]))
        prepay = requests.post('https://api.mch.weixin.qq.com/pay/unifiedorder', data=xml_string.encode('utf-8'))

        root = ET.XML(prepay.content.decode('utf-8'))
        prepay_dict = {child.tag:child.text for child in root}
        prepay_id = prepay_dict['prepay_id']
#         # 生成订单
#
#
        random_string = "".join([chr(random.randint(65,90)) for _ in range(12)])
        info_dict = {
            'appId': "wx70988ffbb24e4268",
            'timeStamp': str(int(time.time())),
            'nonceStr': random_string,
            'package': 'prepay_id={0}'.format(prepay_id),
            'signType': 'MDS',

        }
        temp = "&".join(["{0}={1}".format(k, info[k]) for k in sorted(info)] + ["{0}={1}".format("key", pay_key, ), ])
        sign2 = md5(temp).upper()
        info_dict['paySign'] = sign2

        return Response(info_dict)


class NotifyView(APIView):

    def post(self, request, *args, **kwargs):
        root = ET.XML(request.body.decode('utf-8'))
        result = {child.tag:child.text for child in root}

        sign =result.pop('sign')
        key = "2SzCvaKgYExuItWBfYAqJFs72uUleD14"
        temp = "&".join(
            ["{0}={1}".format(k, result[k]) for k in sorted(result)] + ["{0}={1}".format("key", key, ), ])
        local_sign = md5(temp).upper()
        if local_sign == sign:
            out_trade_no = result.get('out_trade_no')
            models.supportinfo.objects.filter(uid=out_trade_no).update(status=2)
            response = """<xml><return_code><![CDATA[SUCCESS]]></return_msg><![CDATA[OK]]></return_msg></xml>"""
            return Response(response)


class TransactionModelSer(serializers.ModelSerializer):
    class Meta:
        model = models.transaction
        fields = "__all__"


class TransactionView(APIView):

    def get(self, request, *args, **kwargs):
        queryset = models.sendanimal.objects.all()
        ser = TransactionModelSer(instance=queryset, many=True)
        return Response(ser.data, status=200)

    def post(self, request, *args, **kwargs):
        ser = TransactionModelSer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.data)


class TransactionDetailView(APIView):

    def get(self, request, pk):
        user_obj = models.sendanimal.objects.filter(id=pk).first()
        ser = TransactionModelSer(instance=user_obj, many=False)
        return Response(ser.data)

    def put(self, request, pk):
        models.sendanimal.objects.filter(id=pk).update(status=2)
        return Response("")

    def delete(self, request, pk):
        models.sendanimal.objects.filter(id=pk).delete()
        return Response("")
