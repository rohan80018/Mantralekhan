# Generated by Django 4.1.5 on 2023-01-21 19:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_userdata_count'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='create_date',
            field=models.DateField(auto_now_add=True),
        ),
    ]