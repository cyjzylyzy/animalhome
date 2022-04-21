import time
import uuid

from django.utils import timezone
from rest_framework import serializers
from api import models
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView

from api.models import UserInfo
from api.serializer.account import UserModelSerializer, QuestionModelSerializer, commentModelSer,SignSerializer,SignLogSerializer



class UserView(APIView):

    def get(self, request, *args, **kwargs):
        user_list = models.UserInfo.objects.all()
        ser = UserModelSerializer(instance=user_list, many=True)
        return Response(ser.data)

    def post(self, request, *args, **kwargs):

        ser = UserModelSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)

        return Response(ser.errors)


class UserDetailView(APIView):
    def get(self,request,pk):
        user_obj=models.UserInfo.objects.filter(id=pk).first()
        ser = UserModelSerializer(instance=user_obj,many=False)
        return Response(ser.data)

    def put(self, request,pk):
        user_obj = models.UserInfo.objects.filter(id=pk).first()
        ser = UserModelSerializer(instance=user_obj,data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        else:
            return Response(ser.data)

    def delete(self,request,pk):
        models.UserInfo.objects.filter(id=pk).delete()
        return Response("")


class QuestionView(APIView):

    def get(self, request, *args, **kwargs):
        quest_list = models.question_details.objects.all()
        ser = QuestionModelSerializer(instance=quest_list, many=True)
        return Response(ser.data)

    def post(self, request, *args, **kwargs):
        ser = QuestionModelSerializer(data=request.data)
        title = ser.data.get('title')
        answer_A = ser.data.get('answer_A')
        answer_B = ser.data.get('answer_B')
        answer_C = ser.data.get('answer_C')
        answer_D = ser.data.get('answer_D')
        current_ans = ser.data.get('current_ans')

        question_object = models.question_details.objects.create(
            title=title,
            answer_A=answer_A,
            answer_B=answer_B,
            answer_C=answer_C,
            answer_D=answer_D,
            current_ans=current_ans
        )


class QuestionDetailView(APIView):
    def get(self,request,pk):
        question_obj=models.question_details.objects.filter(id=pk).first()
        ser = QuestionModelSerializer(instance=question_obj,many=False)
        return Response(ser.data)

    def put(self, request,pk):
        question_obj = models.question_details.objects.filter(id=pk).first()
        ser = QuestionModelSerializer(instance=question_obj,data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        else:
            return Response(ser.data)

    def delete(self,request,pk):
        models.question_details.objects.filter(id=pk).delete()
        return Response("")


class CommentView(APIView):

    def get(self, request, *args, **kwargs):
        comm_list = models.CommentRecord.objects
        ser = commentModelSer(instance=comm_list, many=True)
        return Response(ser.data)


class CommentDetailView(APIView):

    def get(self,request, pk):
        comm_list = models.CommentRecord.objects.filter(id=pk).first()
        ser = commentModelSer(instance=comm_list,many=False)
        return Response(ser.data)

    def put(self, request, pk):
        comm_list = models.CommentRecord.objects.filter(id=pk).first()
        ser = commentModelSer(instance=comm_list,data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        else:
            return Response(ser.data)

    def delete(self, request, pk):
        models.CommentRecord.objects.filter(id=pk).delete()
        return Response("")


class SignView(APIView):

    def get(self, request, *args, **kwargs):
        userid = request.query_params.get('userid')
        print(userid)
        sign = models.usersign.objects.filter(user_id=userid)
        ser = SignSerializer(instance=sign, many=True)
        return Response(ser.data,status=200)


class SignLogView(RetrieveAPIView):

    def get(self, request, *args, **kwargs):
        userid = request.query_params.get('userid')
        print(userid)
        sign = models.usersign_log.objects.filter(user_id=userid)
        ser = SignLogSerializer(instance=sign, many=True)
        return Response(ser.data,status=200)

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('userid')
        year = request.data.get('year')
        month = request.data.get('month')
        day = request.data.get('day')
        series_days = request.data.get('series_days')
        user_obj = models.usersign.objects.filter(user_id=user_id)
        date = timezone.now()
        if not user_obj.exists():
            models.usersign.objects.create(
                user_id=user_id,
                series_days=1,
                last_sign=date
            )
            models.usersign_log.objects.create(
                user_id=user_id,
                sign_year=year,
                sign_month=month,
                sign_day=day,
                create_time=date
            )
        else:
            models.usersign.objects.filter(user_id=user_id).update(last_sign=date,series_days=series_days)
            models.usersign_log.objects.create(
                user_id=user_id,
                sign_year=year,
                sign_month=month,
                sign_day=day,
                create_time=date
            )
        log_obj = models.usersign_log.objects.filter(user_id=user_id)
        ser = SignLogSerializer(instance=log_obj,many=True)
        print(ser.data)
        return Response(ser.data)
