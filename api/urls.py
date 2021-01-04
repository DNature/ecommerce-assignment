from django.urls import include, path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("products", views.TaskViewset)
router.register("test", views.TaskViewset)

urlpatterns = [
    path("", include(router.urls))
]
