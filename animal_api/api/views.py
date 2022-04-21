from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from api import models
from django.db.models import Max

# Create your views here.
class NoticeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.NoticeInfo
        fields = "__all__"


class NoticeinfoView(APIView):

    def get(self, request, *args, **kwargs):
        notice_list = models.NoticeInfo.objects
        ser = NoticeModelSerializer(instance=notice_list, many=True)
        return Response(ser.data)

class NoticeDetailView(APIView):

    def get(self,request,pk):
        comm_list = models.NoticeInfo.objects.filter(pk=pk).first()
        ser = NoticeModelSerializer(instance=comm_list,many=False)
        return Response(ser.data)

    def put(self, request,pk):
        comm_list = models.NoticeInfo.objects.filter(pk=pk).first()
        ser = NoticeModelSerializer(instance=comm_list,data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        else:
            return Response(ser.data)

    def delete(self,request,pk):
        models.NoticeInfo.objects.filter(pk=pk).delete()
        return Response("")
