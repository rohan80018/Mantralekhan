# Generated by Django 4.1.5 on 2023-01-21 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_userdata_create_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='userdata',
            name='count',
            field=models.IntegerField(default=0),
        ),
    ]
