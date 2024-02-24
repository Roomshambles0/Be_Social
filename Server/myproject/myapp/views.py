from django.shortcuts import render
import json 
# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User,Post,Comment,Likenumber
from django.core.serializers import serialize

import jwt

secret ="lj3i-r!2^&*)o--4tsj@#$fp"


@api_view(['GET'])
def hi(request):
    if (not request.headers):
            return Response({'message':"send something"},status=404)
    data = request.headers
    token = data["Authorization"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
        
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    if exists:
        return Response({"message":name},status=200)
    return Response({'message':"Username is not present"},status=400)


@api_view(['POST'])
def register(request):
   
    if (not request.body):
        return Response({'message':"send something"},status=404)
    
    data = json.loads(request.body)
    usr = data["username"]
    exists = User.objects.filter(username=usr).exists()
    
    if exists:
        return Response({'message':"Username is present"},status=400)
    
    
    print(usr)
    user = data["username"]
    passw = data["password"]
    isinstance = User(username=user,password=passw)
    isinstance.save()
    
   

    return Response({'message': 'd!'})


@api_view(['POST'])
def signin(request):
   
    if (not request.body):
        return Response({'message':"send something"},status=404)
    
    data = json.loads(request.body)
    usr = data["username"]
    exists = User.objects.filter(username=usr).exists()
    
    if exists:
        print(usr)
        user = data["username"]
        passw = data["password"]
        encoded_jwt = jwt.encode({"username": user}, secret, algorithm="HS256")
        return Response({'message': 'Logged in successfully',"token":encoded_jwt},status=200)
   
    return Response({'message':"Username is not present"},status=400)
    
    
@api_view(['GET'])
def Allposts(request):
    if (not request.headers):
        return Response({'message':"send something"},status=404)
    data = request.headers
    token = data["Authorization"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    print(name)
    exists = User.objects.filter(username=name).exists()
    user = User.objects.get(username=name)
    if exists:
         posts = Post.objects.filter(is_draft=False,is_published=True)
         print(posts)
         post_json_data = serialize('json', posts)
         post_data = json.loads(post_json_data)
         print(post_data)
         
         likes = Likenumber.objects.filter(usr=user.id)
         serialized=serialize('json', likes) 
         postlikes = json.loads(serialized)
         likedposts = map(maplikes,postlikes,post_json_data)
         likedlist = list(likedposts)
         print(likedlist)
         
         return Response({"posts":post_data,"name":name,"liked":likedlist},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)



@api_view(['POST'])
def Comments(request):
    if (not request.body):
        return Response({'message':"send something"},status=404)
    data = json.loads(request.body)
    print(data)
    token = data["Authorization"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    if exists:
         id = data["id"]
         comments = Comment.objects.filter(post=id)
         post_json_data = serialize('json', comments)
         post_data = json.loads(post_json_data)
         print(post_data)
         post = Post.objects.get(id=id)
         
         send = {
             "title":post.title,
             "description":post.description,
             "likes":post.likes,
             "comments":post.comments,
             "auther":post.author_name
         }
        
         return Response({"comments":post_data,"post":send},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)


@api_view(['GET'])
def Drafts(request):
    if (not request.headers):
        return Response({'message':"send something"},status=404)
    data = (request.headers)
    token = data["Authorization"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    user= User.objects.get(username=name)
    if exists:
         id = user.id
         drafs = Post.objects.filter(author=id ,is_draft=True,is_published=False)
         post_json_data = serialize('json', drafs)
         post_data = json.loads(post_json_data)
         print(post_data)
         return Response({"drafts":post_data},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)







@api_view(['POST'])
def CreatePost(request):
    if (not request.body):
        return Response({'message':"send something"},status=404)
    data = json.loads(request.body)
    token = data["token"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    if exists:
         body = data["data"]
         auther = User.objects.get(username=name)
         print(auther)
         posts = Post.objects.create(title=body["title"],description=body["description"],is_draft=body["draft"],is_published=body["publish"],author=auther,author_name=name)
         return Response({"message":"post created sucessfully"},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)


@api_view(['POST'])
def Createcomment(request):
    if (not request.body):
        return Response({'message':"send something"},status=404)
    data = json.loads(request.body)
    token = data["token"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    if exists:
         body = data["body"]
         auther = User.objects.get(username=name)
         post = Post.objects.get(id=body["id"])
         print(auther)
         comments = Comment.objects.create(title=body["title"],description=body["description"],post=post,usr=auther ,author_name=name)
         com =post.comments + 1
         post.comments = com
         post.save()
         
         return Response({"message":"comment created sucessfully"},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)

@api_view(['POST'])
def likes(request):
    if (not request.body):
        return Response({'message':"send something"},status=404)
    data = json.loads(request.body)
    token = data["token"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    if exists:
        body = data["data"]
        present = Post.objects.filter(id=body["id"]).exists()
        if not present:
             return Response({'message':"post not present"})
         
        post = Post.objects.get(pk=body["id"])
        usr = User.objects.get(username=name)
        print(post,usr)
        if(body["like"]):
            liken = post.likes + 1
            post.likes = liken
            
            likenumber_instance = Likenumber(
            liked=True, 
            not_intr=False, 
            post=post, 
            usr=usr  
            )
           
            likenumber_instance.save()
            post.save()
        else:
            liken = post.likes - 1
            post.likes = liken
            like = Likenumber.objects.get(post=post,usr=usr)  
            like.delete()
            post.save()
        
    
        
        return Response({"message":"Like saved to database"},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)


@api_view(['POST'])
def PostDraft(request):
    if (not request.body):
        return Response({'message':"send something"},status=404)
    data = json.loads(request.body)
    token = data["token"]
    decode =  jwt.decode(token, secret, algorithms=["HS256"])
    
    name = decode["username"]
    exists = User.objects.filter(username=name).exists()
    if exists:
        print(data)
        id = data["id"]
        
        present = Post.objects.filter(id= id).exists()
        if not present:
             return Response({'message':"post not present"})
        post = Post.objects.get(id=id)
        post.is_draft = False
        post.is_published = True
        post.save()
                  
        return Response({"message":"Posted Draft"},status=200)
    
    print(data)
    return Response({'message':"Username is not present"},status=400)




def maplikes(like,post):
       if(like.field.post == post.pk):
           return True
     
