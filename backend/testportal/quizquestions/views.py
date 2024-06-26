from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from .models import Questions
from django.http import JsonResponse
from rest_framework.response import Response
import pandas as pd
from quizquestions.models import Questions
import datetime
import json
# Create your views here.
@api_view(['GET', 'POST'])
@csrf_exempt 
def ques(request):
   if(request.method == 'GET'):
      res=list(Questions.objects.filter(stream=request.GET.get("stream"),branch=request.GET.get("branch")).values())
      result=list()
      for i in res:
         d=dict()
         d['question']=i['question']
         l=list()
         l.append(i['option1'])
         l.append(i['option2'])
         l.append(i['option3'])
         l.append(i['option4'])
         d['options']=l
         d['answer']=i['answer']
         result.append(d)
      print(result)
         
      return JsonResponse({'data':result})
   else:
      return JsonResponse({'error': 'Need GET request.'},status=400)
   

@api_view(['GET', 'POST'])
@csrf_exempt 
def home(request):
   if(request.method == 'POST'):
      df = pd.read_excel(request.FILES['question'])
      print(request.FILES['question'].name)
      date=datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
      for i in range(len(df)):
         query=Questions(date=date,filename=request.FILES['question'].name,question=df.iloc[i, 0],option1=df.iloc[i, 1],option2=df.iloc[i, 2],option3=df.iloc[i, 3],option4=df.iloc[i, 4],answer=df.iloc[i, 5],stream=request.POST.get('stream'),branch=request.POST.get('branch'))
         query.save()
      return JsonResponse({'message':"questions saved successfully!!!"})
   else:
      return JsonResponse({'error': 'Need POST request.'},status=400)


@api_view(['GET', 'POST'])
@csrf_exempt 
def questionset(request):
   if(request.method=='GET'):
      q=df = pd.DataFrame(list(Questions.objects.all().values('date','filename','stream','branch','take')))
      print(q)
      df = q.drop_duplicates()
      print(df)
      res=list()
      for i in df.index:
         d=dict()
         d['date']=df['date'][i]
         d['filename']=df['filename'][i]
         d['stream']=df['stream'][i]
         d['branch']=df['branch'][i]
         if(df['take'][i]):
            d['take']=True
         else:
            d['take']=False
         res.append(d)
      print(res)
      return JsonResponse({'message': res})
   if(request.method=='POST'):
      data=json.loads(request.body)
      print(data)
      for i in data:
         q=Questions.objects.filter(date=i['date'],filename=i['filename'],stream=i['stream'],branch=i['branch']).values()
         q.update(take=i['take'])
         print(q)
      return JsonResponse({'message': 'Modification in question set is done!!!'})