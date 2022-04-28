# Generated by Django 4.0.3 on 2022-04-28 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_message_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('first_username', models.CharField(max_length=150)),
                ('second_username', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'unique_together': {('first_username', 'second_username')},
            },
        ),
    ]