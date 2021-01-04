from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets

from .serializers import TaskSerializer, Task


@api_view(['GET'])
def apiOverview(req):
    api_urls = {
        'list': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/'
    }

    return Response(api_urls)


@api_view(['GET'])
def taskList(req):
    task = Task.objects.all()
    serializer = TaskSerializer(task, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def taskDetail(req, pk):
    tasks = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def taskCreate(req):
    serializer = TaskSerializer(data=req.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["POST"])
def taskUpdate(req, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=req.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def taskDelete(req, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response('Item deleted successfully')


class TaskViewset(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
