from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from api.serializer.validators import phone_validator
from django_redis import get_redis_connection
from api import models
from django.db.models import Max
from django.forms import model_to_dict

# ###################用户ser############################
class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserInfo
        fields = "__all__"

# ###################题库ser############################
class QuestionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.question_details
        fields = "__all__"

# ###################签到ser############################
class SignSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.usersign
        fields = "__all__"

class SignLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.usersign_log
        fields = "__all__"

# ###################评论ser############################

class commentModelSer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    class Meta:
        model = models.CommentRecord
        fields = "__all__"

    def get_user(self,obj):
        return model_to_dict(obj.user,fields=['id','username','avatarUrl'])

class CommentModelSerializer(serializers.ModelSerializer):

    create_data = serializers.DateTimeField(format='%Y-%m-%d')
    user_username = serializers.CharField(source='user.username')
    user_avatarUrl = serializers.CharField(source='user.avatarUrl')
    replyid = serializers.CharField(source='reply.id')
    replyuser_username = serializers.CharField(source='reply.user.username')

    class Meta:
        model = models.CommentRecord
        fields = "__all__"

class CreateCommentModelSerializer(serializers.ModelSerializer):
    create_data = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    user_avatarUrl = serializers.CharField(source='user.avatarUrl', read_only=True)
    reply_id = serializers.CharField(source='reply.id', read_only=True)
    reply_user_username = serializers.CharField(source='reply.user.username', read_only=True)

    class Meta:
        model = models.CommentRecord
        # fields ="__all__"
        exclude = ['user', 'create_data', 'favor_count']

# ###################动物ser#############################

class AnimalModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.animalInfo
        fields = "__all__"

class AnimalDetailModelSerializer(serializers.ModelSerializer):

    comment = serializers.SerializerMethodField()

    class Meta:
        model = models.animalInfo
        fields = "__all__"

    def get_comment(self, obj):
        # 获取一级评论
        first_queryset = models.CommentRecord.objects.filter(animal=obj, depth=1).order_by('id')[0:10].values(
            'id',
            'content',
            'user__avatarUrl',
            'user__username',
            'create_data'
        )
        first_id_list = [item['id'] for item in first_queryset]

        result = models.CommentRecord.objects.filter(animal=obj, depth=2, reply_id__in=first_id_list).values(
            'reply_id').annotate(max_id=Max('id'))
        second_id_list = [item['max_id'] for item in result]
        second_queryset = models.CommentRecord.objects.filter(id__in=second_id_list).values(
            'id',
            'content',
            'user__avatarUrl',
            'user__username',
            'create_data',
            'reply_id',
            'replys__user__username',
        )
        import collections
        first_dict = collections.OrderedDict()
        for item in first_queryset:
            item['create_data'] = item['create_data'].strftime('%Y-%m-%d')
            first_dict[item['id']] = item
        for node in second_queryset:
            first_dict[node['reply_id']]['child'] = [node, ]
        return first_dict.values()

class seekanimalModelSerializer(serializers.ModelSerializer):
    users=serializers.SerializerMethodField()

    class Meta:
        model = models.seekanimal
        fields = "__all__"

    def get_users(self,obj):
        return model_to_dict(obj.users,fields=['id','username','userphone'])

class sendModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = models.sendanimal
        fields = "__all__"

    def get_user(self,obj):
        return model_to_dict(obj.user, fields=['id', 'username'])



class adoptUsrModelSerializer(serializers.ModelSerializer):
    animal = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    class Meta:
        model = models.adoptUserInfo
        fields = "__all__"

    def get_user(self,obj):
        return model_to_dict(obj.user, fields=['id', 'username'])

    def get_animal(self,obj):
        return model_to_dict(obj.animal, fields=['id', 'name','imgurl', 'category', 'vaccine', 'repellent','sterilization'])


class SupportModelSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    animal = serializers.SerializerMethodField()
    class Meta:
        model = models.supportinfo
        fields = "__all__"

    def get_user(self,obj):
        return model_to_dict(obj.user, fields=['id', 'username'])

    def get_animal(self,obj):
        return model_to_dict(obj.animal, fields=['id', 'name','imgurl'])


