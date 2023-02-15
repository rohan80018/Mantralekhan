from django.shortcuts import render
from .models import UserData , User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
# from .serializers import UserSerializer, DataSerializer
from datetime import datetime, timedelta, date
import calendar

from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Sum

from rest_framework_simplejwt.views import TokenObtainPairView    
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# from pathlib import Path
from django.http import HttpResponse

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
def trial(request):
    
    return HttpResponse("ok")


@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def getLoginUserData(request, pk):
    today = date.today()
    week = today - timedelta(days=7)
    
    month = date.today().month
    year = date.today().year
    
    if request.method == "POST":
        mantra_count = request.data
        print(mantra_count)
        
        try:
            data = UserData.objects.select_related('user').get(user=pk, create_date__date=datetime(today.year,today.month,today.day,00,00,00,00))
            data.count+= mantra_count["count"]
            data.save()
        except ObjectDoesNotExist:
            new = UserData(
                user=User.objects.get(id=pk),
                create_date = datetime(today.year,today.month,today.day,00,00,00,00),
                count=mantra_count["count"]
            )
            new.save()
        
    now_count=0
    seven_count = 0
    mon_count = 0
    yr_count = 0
    st_month = datetime(year,month,1,00,00,00,00)
    st_year = datetime(year,1,1,00,00,00,00)
    
    new_data = UserData.objects.filter(user=pk).select_related('user')

    if not new_data:
        dt = User.objects.get(id = pk)
        name = dt.first_name+" "+dt.last_name
    else:
        for i in new_data:
            # print(i.user.first_name)
            name = i.user.first_name +" " +i.user.last_name
            if i.create_date == datetime(today.year,today.month,today.day,00,00,00,00):
                now_count+=i.count
            if i.create_date <= datetime(today.year,today.month,today.day,00,00,00,00) and i.create_date >= datetime(week.year,week.month,week.day,00,00,00,00):
                seven_count += i.count
            if i.create_date <= datetime(today.year,today.month,today.day,00,00,00,00) and i.create_date >= st_month:
                mon_count += i.count
            if i.create_date <= datetime(today.year,today.month,today.day,00,00,00,00) and i.create_date >= st_year:
                yr_count += i.count

    context={
        "userName": name,
        "today": now_count, 
        "week" : seven_count, 
        "month" : mon_count,
        "year" : yr_count,
    }
    return Response(context)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getTopUsers(request):
    day = date.today()
    week_day = day - timedelta(days=7)
    month = date.today().month
    year = date.today().year

    responseData ={
        "today": [],"week": [],"month":[],"year":[]
    }

    # today Data
    data = UserData.objects.order_by('-count').filter(create_date__date=day).select_related('user')[:10]
    for j in data:
        responseData["today"].append({"username":j.user.username,"fname":j.user.first_name ,"lname":j.user.last_name, "count":j.count})

    # week Data
    dataWeek = User.objects.filter(userdata__create_date__range=(week_day, day)).annotate(point = Sum('userdata__count')).order_by('-point')[:10]
    for i in dataWeek:
        responseData["week"].append({"username":i.username,"fname":i.first_name ,"lname":i.last_name, "count":i.point})

    # month Data
    start_month = date(year,month,1)
    dataMonth = User.objects.filter(userdata__create_date__range=(start_month,day)).annotate(point = Sum("userdata__count")).order_by('-point')[:10]
    for i in dataMonth:
        responseData["month"].append({"username":i.username,"fname":i.first_name ,"lname":i.last_name, "count":i.point})

    #year Data
    start_year = date(year,1,1)
    dataYear = User.objects.filter(userdata__create_date__range=(start_year, day)).annotate(point = Sum("userdata__count")).order_by("-point")[:10]
    for i in dataYear:
        responseData["year"].append({"username":i.username,"fname":i.first_name ,"lname":i.last_name, "count":i.point})

    return Response(responseData)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getPerformance(request,pk):
    start_mon =date.today().month  +1
    year = date.today().year
    l = []
    for i in range(11):
        if start_mon == 1:
            year -=1
            start_mon =13
            start_mon -= 1
            input_date = date(year,start_mon,1)
            res = calendar.monthrange(input_date.year, input_date.month)
            day =res[1]
            l.append((year,start_mon,day))
        start_mon -= 1
        input_date = date(year,start_mon,1)
        res = calendar.monthrange(input_date.year, input_date.month)
        day =res[1]
        l.append((year,start_mon,day))
    data_year={"month": []}

    today = date.today()
    week_day = today - timedelta(days=7)

    all_data = User.objects.filter(id=pk).annotate(point = Sum('userdata__count'))
    for i in all_data:
        total = i.point
        username=i.username
        fname=i.first_name
        lname=i.last_name
    weekData = UserData.objects.filter(user=pk,create_date__range=(week_day, today)).aggregate(Sum("count"))
    
    data_year["user"]={"username":username,"fname":fname,"lname":lname, "weekCount":weekData["count__sum"], "totalCount":total}        

    data = UserData.objects.filter(user=pk,create_date__range=(date(l[-1][0],l[-1][1],l[-1][2]),date(l[0][0],l[0][1],l[0][2]))).select_related("user")
    data2 = {}
    for k in data:
        data2[k.create_date.strftime("%Y-%m-%d")] = k.count

    for i in l:
        data_year["month"].append({"mon":f"{date(1900, i[1], 1).strftime('%B')} {i[0]}","count" :[data2[f"{datetime(i[0],i[1],z+1).date()}"] if f"{datetime(i[0],i[1],z+1).date()}" in data2 else 0 for z in range(i[2])]})

    return Response(data_year)

@api_view(["GET","PUT"])
def edit_profile(request,pk):
    if request.method=="PUT":
        post_data = request.data
        user_profile = User.objects.get(id=pk)
        user_profile.first_name = post_data["first_name"]
        user_profile.last_name = post_data["last_name"]
        user_profile.save()
    
    profile_data = User.objects.get(id = pk)
    data = {
        "username":profile_data.username,
        "firstName":profile_data.first_name,
        "lastName":profile_data.last_name
    }
    return Response(data)
