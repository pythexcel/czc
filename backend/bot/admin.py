from django.contrib import admin

# Register your models here.
from bot.models import BotModel, TagType, CustomFieldType, TriggerWebhook, Header

admin.site.register(BotModel)
admin.site.register(TagType)
admin.site.register(CustomFieldType)
admin.site.register(Header)
admin.site.register(TriggerWebhook)
