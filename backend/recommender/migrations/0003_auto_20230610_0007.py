# Generated by Django 3.0 on 2023-06-09 18:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommender', '0002_roadmap_course_prior'),
    ]

    operations = [
        migrations.AddField(
            model_name='roadmap',
            name='created_on',
            field=models.DateTimeField(auto_now=True, verbose_name=''),
        ),
        migrations.AlterField(
            model_name='roadmap',
            name='course_prior',
            field=models.CharField(max_length=100, null=True, verbose_name=''),
        ),
    ]