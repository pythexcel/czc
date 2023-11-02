from django.contrib import admin
from .models import User, Bot, OpenAI, Highlevel

admin.site.register(User)
admin.site.register(Bot)
# admin.site.register(AddGoals)
admin.site.register(OpenAI)
admin.site.register(Highlevel)

# Register your models here.
