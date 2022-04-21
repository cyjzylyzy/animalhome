from itertools import chain

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveAPIView
from api import models
from api.serializer.account import seekanimalModelSerializer, AnimalModelSerializer,\
    AnimalDetailModelSerializer, sendModelSerializer,\
    CommentModelSerializer, CreateCommentModelSerializer, SupportModelSerializer


class AnimalinfoView(APIView):

    def get(self, request, *args, **kwargs):

        min_id = request.query_params.get('min_id')
        max_id = request.query_params.get('max_id')
        if min_id:
            result = models.animalInfo.objects.filter(id__lt=min_id).order_by('-id')[0:10]
        elif max_id:
            result = models.animalInfo.objects.filter(id__lt=max_id).order_by('id')[0:10]
        else:
            result = models.animalInfo.objects.all().order_by('-id')[0:10]
        ser = AnimalModelSerializer(instance=result, many=True)
        return Response(ser.data, status=200)


class AnimalView(APIView):

    def get(self, request, *args, **kwargs):
        result = models.animalInfo.objects
        ser = AnimalModelSerializer(instance=result, many=True)
        return Response(ser.data)

    def post(self, request, *args, **kwargs):
        name=request.data.get('name')
        age=request.data.get('age')
        work=request.data.get('work')
        experience=request.data.get('experience')
        married=request.data.get('married')
        salary=request.data.get('salary')
        address=request.data.get('address')
        phone=request.data.get('phone')
        adoptdetail=request.data.get('adoptdetail')
        status= '1'
        date=request.data.get('date')
        animal_id=request.data.get('animal_id')
        user_id=request.data.get('user_id')
        models.adoptUserInfo.objects.create(
            name=name, age=age, work=work, experience=experience,
            married=married, salary=salary, address=address, phone=phone,
            adoptdetail=adoptdetail, status=status, date=date, animal_id=animal_id,
            user_id=user_id
        )
        return Response("")


class AnimalDetailView(RetrieveAPIView):
    queryset = models.animalInfo.objects
    serializer_class = AnimalDetailModelSerializer

    def get(self,request,pk):
        user_obj=models.animalInfo.objects.filter(id=pk).first()
        ser = AnimalDetailModelSerializer(instance=user_obj,many=False)
        return Response(ser.data)

    def put(self, request, pk):
        user_obj = models.animalInfo.objects.filter(id=pk).first()
        ser = AnimalDetailModelSerializer(instance=user_obj, data=request.data)
        print(ser.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        else:
            return Response(ser.data)

    def delete(self,request,pk):
        print(pk)
        models.animalInfo.objects.filter(id=pk).delete()
        return Response("")


class allAnimalView(APIView):

    def get(self, request, *args, **kwargs):
        animal = models.animalInfo.objects.all()
        send = models.sendanimal.objects.filter(status='2')

        ser1 = AnimalModelSerializer(instance=animal, many=True)
        ser2 = sendModelSerializer(instance=send, many=True)
        ser = chain(ser1.data, ser2.data)

        return Response(ser, status=200)


class CommentView(APIView):

    def get(self, request, *args, **kwargs):
        root_id = request.query_params.get('root')
        node_queryset = models.CommentRecord.objects.filter(root_id=root_id).order_by('id')

        ser = CommentModelSerializer(instance=node_queryset, many=True)
        return Response(ser.data, status=200)

    def post(self, request, *args, **kwargs):
        # 数据校验
        ser = CreateCommentModelSerializer(data=request.data)
        print(ser.is_valid())
        if ser.is_valid():
            # 保存到数据库
            ser.save()
            # 对新增数据进行序列化
            animal_id = ser.data.get('animal')
            return Response(ser.data, status=201)
        return Response(ser.errors, status=400)


class seekanimalView(APIView):

    def get(self, request, *args, **kwargs):
        queryset = models.seekanimal.objects.all()
        ser = seekanimalModelSerializer(instance=queryset, many=True)
        return Response(ser.data, status=200)

    def post(self, request, *args, **kwargs):
        ser = seekanimalModelSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.data)


class seekDetailView(APIView):

    def get(self,request,pk):
        user_obj=models.seekanimal.objects.filter(id=pk).first()
        ser = seekanimalModelSerializer(instance=user_obj,many=False)
        return Response(ser.data)

    def put(self, request,pk):
        user_obj = models.seekanimal.objects.filter(id=pk).first()
        ser = seekanimalModelSerializer(instance=user_obj,data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        else:
            return Response(ser.data)

    def delete(self,request,pk):
        models.seekanimal.objects.filter(id=pk).delete()
        return Response("")


class sendanimalView(APIView):

    def get(self, request, *args, **kwargs):
        queryset = models.sendanimal.objects.all()
        ser = sendModelSerializer(instance=queryset, many=True)
        return Response(ser.data, status=200)

    def post(self, request, *args, **kwargs):
        ser = sendModelSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data)
        return Response(ser.data)


class sendDetailView(APIView):

    def get(self, request, pk):
        user_obj = models.sendanimal.objects.filter(id=pk).first()
        ser = sendModelSerializer(instance=user_obj, many=False)
        return Response(ser.data)

    def put(self, request, pk):
        models.sendanimal.objects.filter(id=pk).update(status=2)
        return Response("")

    def delete(self, request, pk):
        models.sendanimal.objects.filter(id=pk).delete()
        return Response("")


class SupportanimalView(APIView):

    def get(self, request, *args, **kwargs):
        queryset = models.supportinfo.objects
        ser = SupportModelSerializer(instance=queryset, many=True)
        return Response(ser.data, status=200)

    def post(self, request, *args, **kwargs):
        user = request.data.get('userid')
        queryset = models.supportinfo.objects.filter(user_id=user,status=2)
        ser = SupportModelSerializer(instance=queryset, many=True)
        return Response(ser.data, status=200)






