# Generated by Django 4.1.5 on 2023-01-24 16:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_userdata_create_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='create_date',
            field=models.DateTimeField(),
        ),
    ]