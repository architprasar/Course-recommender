# Generated by Django 3.0 on 2023-06-09 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recommender', '0003_auto_20230610_0007'),
    ]

    operations = [
        migrations.AlterField(
            model_name='roadmap',
            name='level',
            field=models.CharField(max_length=50),
        ),
    ]
