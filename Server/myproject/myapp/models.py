from django.db import models

class User(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)



class Post(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    likes = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    is_draft = models.BooleanField(default=True)
    is_published = models.BooleanField(default=False)
    author_name = models.CharField(max_length=100, default= 'unknown')  # Add this field




class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    usr = models.ForeignKey(User, on_delete=models.CASCADE)
    author_name = models.CharField(max_length=100,default='unknown')
    



class UserPostInteraction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    liked = models.BooleanField(default=False)
    interacted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'post']
    
