# Generated by Django 4.1.5 on 2023-01-21 19:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_userdata_create_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='create_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
