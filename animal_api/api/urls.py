from django.urls import path, re_path
from api.view import LoginView
from api.view import order
from api import views
from api.view import animal
from api.view import adopt
from api.view import temp_view

urlpatterns = [

    # #########用户登录URL######################
    path('login/', LoginView.LoginView.as_view()),
    path('adminlogin/', LoginView.LoginDetailView.as_view()),

    # ##########公告管理URL###################
    path('notice/', views.NoticeinfoView.as_view()),
    re_path('notice/(?P<pk>)\d+/', views.NoticeDetailView.as_view()),

    # ##########评论信息管理地址####################
    path('allcomment/', temp_view.CommentView.as_view()),
    re_path('allcomment/(?P<pk>\d+)/', temp_view.CommentDetailView.as_view()),

    # ###########宠物信息URL####################
    path('animal/', animal.AnimalinfoView.as_view()),
    path('animalinfo/', animal.AnimalView.as_view()),
    path('comment/', animal.CommentView.as_view()),
    re_path('animal/(?P<pk>\d+)/', animal.AnimalDetailView.as_view()),
    path('support/', animal.SupportanimalView.as_view()),

    # ###########寻宠URL####################
    path('seekanimal/', animal.seekanimalView.as_view()),
    re_path('seekanimal/(?P<pk>\d+)/', animal.seekDetailView.as_view()),

    # ###########送养URL####################
    path('sendanimal/', animal.sendanimalView.as_view()),
    re_path('sendanimal/(?P<pk>\d+)/', animal.sendDetailView.as_view()),

    # ###########用户信息URL####################
    path('userinfo/', temp_view.UserView.as_view()),
    re_path('userinfo/(?P<pk>\d+)/', temp_view.UserDetailView.as_view()),

    # ###########题库URL####################
    path('question/', temp_view.QuestionView.as_view()),
    re_path('question/(?P<pk>\d+)/', temp_view.QuestionDetailView.as_view()),

    # ###########领养信息URL####################
    path('adoptinfo/', adopt.adoptView.as_view()),
    re_path('adoptinfo/(?P<pk>\d+)/', adopt.adoptdetailsView.as_view()),

    path('transaction/', order.TransactionView.as_view()),
    re_path('transaction/(?P<pk>\d+)/',order.TransactionDetailView.as_view()),
    path('payment/',order.PaymentView.as_view()),
    path('notify/',order.NotifyView.as_view()),

    path('sign/', temp_view.SignView.as_view()),
    path('signlog/', temp_view.SignLogView.as_view()),





]
