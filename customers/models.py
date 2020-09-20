from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from django.contrib.contenttypes.fields import GenericRelation,GenericForeignKey
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.shortcuts import reverse
from django.template.loader import render_to_string




class Person(models.Model):

	STATE_CHOICES = (
		('AB','Abuja'),
		('RS','Rivers State'),
		('LA','Lagos'),
	)

	
	owner = models.ForeignKey(User, on_delete=models.CASCADE)
	first_name = models.CharField(max_length=10)
	last_name = models.CharField(max_length=10)
	email = models.EmailField()
	phone = models.CharField(max_length=11)
	address = models.TextField()
	created = models.DateTimeField(auto_now_add=True)
	city = models.CharField(max_length=20)
	state = models.CharField(choices=STATE_CHOICES,max_length=20)
	p_zip = models.CharField(max_length=20)


class StatusCategory(models.Model):
	title = models.CharField(max_length=20)
	slug = models.SlugField(max_length=100, db_index=True)
	urlimage = models.URLField(max_length=300, blank=True, null=True)
	created = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.title

	class Meta:
		ordering = ('-title',)
		verbose_name = 'postcategory'
		verbose_name_plural = 'postcategories'

class Status(models.Model):
	name = models.CharField(max_length=20)
	owner = models.ForeignKey(User, related_name='post_user',
		on_delete=models.CASCADE, null=True)
	heading = models.CharField(max_length=10)
	description = models.TextField()
	category = models.ForeignKey(StatusCategory, 
		blank=True, 
		null=True,
		on_delete=models.CASCADE
		)
	users_like = models.ManyToManyField(settings.AUTH_USER_MODEL,
		related_name='images_liked',
		blank=True)
	image = models.ImageField(upload_to='posts',blank=True)

	def __str__(self):
		return self.name

	class Meta:
		ordering = ('-name',)
		verbose_name = 'post'
		verbose_name_plural = 'posts'