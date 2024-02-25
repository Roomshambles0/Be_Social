# Generated by Django 5.0.2 on 2024-02-25 03:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_rename_like_likenumber'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserPostInteraction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('liked', models.BooleanField(default=False)),
                ('interacted_at', models.DateTimeField(auto_now_add=True)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.user')),
            ],
            options={
                'unique_together': {('user', 'post')},
            },
        ),
        migrations.DeleteModel(
            name='Likenumber',
        ),
    ]