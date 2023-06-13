from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class RoadMap(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,unique=False)
    course = models.CharField((""), max_length=50)
    level = models.CharField(max_length=50)
    result = models.CharField((""), max_length=100)
    course_prior = models.CharField((""), max_length=100, null=True)
    created_on = models.DateTimeField((""), auto_now=True)

    def __str__(self):
        return f"{self.course} (Level {self.level})"
