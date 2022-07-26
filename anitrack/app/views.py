from django.shortcuts import render, redirect
from django.db import connection
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

# Create your views here.
def home(request):

    return render(request, 'app/watchList.html')
