import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .models import Message


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['target_user']
        self.room_group_name = "chat_%s_%s" % (
            self.scope['user'], self.room_name)
        # Join Room Group:
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Leave Room Group:
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Recieve Message from Websocket:
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message_text = text_data_json['message']
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message_text': message_text,
            }
        )
        await self.create_message(text=message_text)

    # Receive Message from Room Group:
    async def chat_message(self, event):
        # Send Message to Websocket:
        await self.send(text_data=json.dumps({
            'message': event.get('message_text'),
        }))

    # Create a Message model:
    @database_sync_to_async
    def create_message(self, text, media=None):
        return Message.objects.create(user=self.scope['user'], text=text, media=media)
