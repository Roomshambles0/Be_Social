from django.urls import path
from . import views

urlpatterns = [
    path('hi/', views.hi, name='hi'),
    path('register/', views.register, name='register'),
    path('signin/', views.signin, name='signin'),
    path('allposts/', views.Allposts, name='Allposts'),
    path('getcomments/', views.Comments, name='Comments'),
    path('getDrafts/', views.Drafts, name='drafts'),
    path('CreatePost/', views.CreatePost, name='createpost'),
    path('CreateComments/', views.Createcomment, name='createcomment'),
    path('like/', views.likes, name='like'),
    path('postdraft/', views.PostDraft, name='draftpost')

]