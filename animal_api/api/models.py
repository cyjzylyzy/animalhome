from django.db import models


# Create your models here.
class UserInfo(models.Model):
    username = models.CharField(verbose_name='用户名', max_length=11, null=True)
    userphone = models.CharField(verbose_name='手机号', max_length=11, unique=True)
    gender = models.CharField(verbose_name='性别', max_length=11, null=True)
    password = models.CharField(verbose_name='密码', max_length=11,null=True)
    email = models.CharField(verbose_name='邮箱', max_length=22,null=True)
    userscore = models.SmallIntegerField(verbose_name='积分', default='10')
    role = models.CharField(verbose_name='用户权限', max_length=11,default='1')
    avatarUrl = models.CharField(verbose_name='用户头像', max_length=255, default='chengdu.myqcloud.com/animalimage/dogs/dog38.jpg')
    registTime = models.CharField(verbose_name='注册时间', max_length=255)
    token = models.CharField(verbose_name='用户TOKEN', max_length=64, null=True, blank=True)
    openid = models.CharField(verbose_name='微信用户id', max_length=255, default='')
    address = models.CharField(verbose_name='收货地址', max_length=255, null=True,default='')



class animalInfo(models.Model):
    name = models.CharField(verbose_name='宠物名', max_length=11)
    age = models.CharField(verbose_name='年龄', max_length=11)
    gender = models.CharField(verbose_name='性别', max_length=11)
    details = models.CharField(verbose_name='故事', max_length=255)
    category = models.CharField(verbose_name='种类', max_length=22)
    vaccine = models.CharField(verbose_name='免疫', max_length=11)
    repellent = models.CharField(verbose_name='驱虫', max_length=11)
    sterilization = models.CharField(verbose_name='绝育', max_length=22)
    imgurl = models.CharField(verbose_name='图片', max_length=255)


class sendanimal(models.Model):
    name = models.CharField(verbose_name='宠物名', max_length=11)
    age = models.CharField(verbose_name='年龄', max_length=11)
    gender = models.CharField(verbose_name='性别', max_length=11)
    details = models.CharField(verbose_name='故事', max_length=255)
    category = models.CharField(verbose_name='种类', max_length=11)
    vaccine = models.CharField(verbose_name='免疫', max_length=11)
    repellent = models.CharField(verbose_name='驱虫', max_length=11)
    sterilization = models.CharField(verbose_name='绝育', max_length=22)
    imgurl = models.CharField(verbose_name='图片', max_length=255)
    date = models.DateTimeField(verbose_name='时间', auto_now_add=True)
    user = models.ForeignKey(verbose_name='用户ID', to='UserInfo', on_delete=models.DO_NOTHING, default='1')
    status_choice = (
        (1, '待审核'),
        (2, '审核成功')
    )
    status = models.SmallIntegerField(verbose_name='状态', choices=status_choice,default='1')


class NoticeInfo(models.Model):
    title = models.CharField(verbose_name='标题', max_length=22)
    details = models.CharField(verbose_name='公告详细', max_length=255)
    n_time = models.CharField(verbose_name='发布时间', max_length=22)


class CommentRecord(models.Model):
    animal = models.ForeignKey(verbose_name='狗', null=True, to='animalInfo', on_delete=models.DO_NOTHING)
    send = models.ForeignKey(verbose_name='送养', null=True, to='sendanimal', on_delete=models.DO_NOTHING)
    user = models.ForeignKey(verbose_name='评论者', to='UserInfo', on_delete=models.DO_NOTHING)
    content = models.CharField(verbose_name='评论内容', max_length=255)
    create_data = models.DateTimeField(verbose_name='评论时间', auto_now_add=True)
    reply= models.ForeignKey(verbose_name='回复', to='self', null=True, blank=True, related_name='replys',
                              on_delete=models.DO_NOTHING)
    depth = models.PositiveIntegerField(verbose_name='评论级数', default=1)
    root = models.ForeignKey(verbose_name='根评论', to='self', null=True, blank=True, related_name='roots',
                             on_delete=models.DO_NOTHING)
    favor_count = models.PositiveIntegerField(verbose_name='赞数', default=0)


class seekanimal(models.Model):
    animalname = models.CharField(verbose_name='宠物名', max_length=11)
    age = models.CharField(verbose_name='年龄', max_length=11)
    gender = models.CharField(verbose_name='性别', max_length=11)
    dogdetails = models.CharField(verbose_name='故事', max_length=255)
    category = models.CharField(verbose_name='种类', max_length=22)
    time = models.CharField(verbose_name='丢失时间', max_length=22)
    adress = models.CharField(verbose_name='丢失地点', max_length=255)
    imgurl = models.CharField(verbose_name='宠物图片', max_length=255)
    users = models.ForeignKey(verbose_name='用户ID', to='UserInfo', on_delete=models.DO_NOTHING)


class question_details(models.Model):
    title = models.CharField(verbose_name='题干', max_length=255)
    answer_A = models.CharField(verbose_name='选项A', max_length=255)
    answer_B = models.CharField(verbose_name='选项B', max_length=255)
    answer_C = models.CharField(verbose_name='选项C', max_length=255)
    answer_D = models.CharField(verbose_name='选项D', max_length=255)
    current_ans = models.CharField(verbose_name='正确答案', max_length=255)


class supportinfo(models.Model):
    animal = models.ForeignKey(verbose_name='动物', null=True, to='animalInfo', on_delete=models.DO_NOTHING)
    money = models.CharField(verbose_name='捐赠多少', max_length=22)
    user = models.ForeignKey(verbose_name='用户ID', to='UserInfo', on_delete=models.DO_NOTHING)
    uid = models.CharField(verbose_name='云养号',max_length=255)
    status = models.CharField(verbose_name='状态', max_length=11,default='1')
    status_choice = (
        (1, '待支付'),
        (2, '已支付')
    )


class transaction(models.Model):
    content = models.CharField(verbose_name='收支明细', null=True,max_length=255)
    money = models.SmallIntegerField(verbose_name='金额')
    status = models.CharField(verbose_name='状态',max_length=11)
    status_choice = (
        (1, '支出'),
        (2, '收入')
    )
    source = models.CharField(verbose_name='来源',max_length=255)
    time = models.CharField(verbose_name='时间',max_length=255)


class usersign(models.Model):
    user = models.ForeignKey(verbose_name='用户ID', to='UserInfo', on_delete=models.DO_NOTHING)
    series_days = models.SmallIntegerField(verbose_name='累计签到天数')
    last_sign = models.DateTimeField(verbose_name='最后一次签到时间', auto_now_add=True)


class usersign_log(models.Model):
    user = models.ForeignKey(verbose_name='用户ID', to='UserInfo', on_delete=models.DO_NOTHING)
    sign_year = models.SmallIntegerField(verbose_name='签到时间')
    sign_month = models.SmallIntegerField(verbose_name='签到时间')
    sign_day = models.SmallIntegerField(verbose_name='签到时间')
    create_time = models.DateTimeField(verbose_name='数据创建时间',auto_now_add=True)


class adoptUserInfo(models.Model):
    user = models.ForeignKey(verbose_name='用户ID', to='UserInfo', on_delete=models.DO_NOTHING, default='1')
    name = models.CharField(max_length=11, verbose_name='用户名')
    age = models.CharField(max_length=11, verbose_name='年龄')
    work = models.CharField(max_length=11, verbose_name='工作状态')
    experience = models.CharField(max_length=11, verbose_name='养宠经验')
    married = models.CharField(max_length=11, verbose_name='婚姻状况')
    salary = models.CharField(max_length=11, verbose_name='工资')
    address = models.CharField(max_length=11, verbose_name='所在地')
    phone = models.CharField(max_length=11, verbose_name='手机')
    adoptdetail = models.CharField(max_length=255, verbose_name='领养说明')
    status_choice = (
        (1, '未领养'),
        (2, '同意领养')
    )
    status = models.SmallIntegerField(verbose_name='收养状态', choices=status_choice)
    date = models.DateTimeField(verbose_name='时间', auto_now_add=True)
    animal = models.ForeignKey(verbose_name='动物ID', to='animalInfo', on_delete=models.DO_NOTHING)

