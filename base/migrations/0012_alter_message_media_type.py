# Generated by Django 4.0.3 on 2022-04-29 10:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0011_alter_message_media_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='media_type',
            field=models.CharField(default=None, max_length=20, null=True),
        ),
    ]