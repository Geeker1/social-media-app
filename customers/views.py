from django.shortcuts import render,get_object_or_404, redirect

# Create your views here.
from .serializers import UserSerializer,\
UserSerializerWithToken
from django.apps import apps

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, detail_route
from django.http import HttpResponseRedirect
from django.views.generic.base import TemplateResponseMixin,View

from .models import Status,StatusCategory

from rest_framework import generics,permissions,status
from rest_framework import viewsets
from knox.models import AuthToken
from django.forms.models import modelform_factory
from django.contrib.contenttypes.forms import generic_inlineformset_factory




@api_view(['GET'])
def current_user(request):
	"""
	Determine the current user by their token and return their data
	"""

	serializer = UserSerializer(request.user)
	return Response(serializer.data)

class UserCreate(APIView):
	""" Create a new user """
	permission_classes = (permissions.AllowAny,)

	def post(self, request, format=None):
		serializer = UserSerializerWithToken(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)