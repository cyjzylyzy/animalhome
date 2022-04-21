from rest_framework.views import APIView
from rest_framework.response import Response
from api import models
from api.serializer.account import adoptUsrModelSerializer


class adoptUserView(APIView):

    def get(self, request, *args, **kwargs):

        queryset = models.adoptUserInfo.objects.all()
        ser = adoptUsrModelSerializer(instance=queryset,many=True)
        return Response(ser.data,status=200)


class adoptView(APIView):

    def post(self, request, *args, **kwargs):
        userid = request.data.get('userid')
        queryset = models.adoptUserInfo.objects.filter(user_id=userid)
        ser = adoptUsrModelSerializer(instance=queryset,many=True)
        if queryset.exists():
            return Response(ser.data,status=200)
        else:
            if ser.is_valid():
                ser.save()
                return Response(ser.data,status=200)
            return Response(ser.errors)



class adoptdetailsView(APIView):

    def get(self, request, pk):
        user_obj = models.adoptUserInfo.objects.filter(id=pk).first()
        ser = adoptUsrModelSerializer(instance=user_obj, many=False)
        return Response(ser.data)

    def put(self, request, pk):
        models.adoptUserInfo.objects.filter(id=pk).update(status=2)
        return Response("")

    def delete(self, request, pk):
        models.adoptUserInfo.objects.filter(id=pk).delete()
        return Response("")


