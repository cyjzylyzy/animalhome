# Generated by Django 4.0.3 on 2022-04-18 04:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_delete_adoptuserinfo'),
    ]

    operations = [
        migrations.CreateModel(
            name='adoptUserInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=11, verbose_name='用户名')),
                ('age', models.CharField(max_length=11, verbose_name='年龄')),
                ('work', models.CharField(max_length=11, verbose_name='工作状态')),
                ('experience', models.CharField(max_length=11, verbose_name='养宠经验')),
                ('married', models.CharField(max_length=11, verbose_name='婚姻状况')),
                ('salary', models.CharField(max_length=11, verbose_name='工资')),
                ('address', models.CharField(max_length=11, verbose_name='所在地')),
                ('phone', models.CharField(max_length=11, verbose_name='手机')),
                ('adoptdetail', models.CharField(max_length=255, verbose_name='领养说明')),
                ('status', models.SmallIntegerField(choices=[(1, '未领养'), (2, '同意领养')], verbose_name='收养状态')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='时间')),
                ('animal', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to='api.animalinfo', verbose_name='动物ID')),
                ('user', models.ForeignKey(default='1', on_delete=django.db.models.deletion.DO_NOTHING, to='api.userinfo', verbose_name='用户ID')),
            ],
        ),
    ]