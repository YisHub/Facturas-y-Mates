from django.contrib import admin

# Register your models here.
from core.user.models import User

admin.site.register(User)