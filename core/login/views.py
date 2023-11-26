from typing import Any
from django import http
from django.shortcuts import render
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.views.generic import FormView, RedirectView
from django.urls import reverse_lazy
from django.shortcuts import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth import login, logout
from core.erp.forms import *


class LoginFormView(LoginView):
    template_name = "login.html"
    form_class = AuthenticationFormWithFormControl

    def dispatch(self, request, *args: Any, **kwargs):
        if request.user.is_authenticated:
            return redirect("erp:dashboard")
        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Iniciar Sesión"
        return context


class LoginFormView2(FormView):
    template_name = "login.html"
    form_class = AuthenticationFormWithFormControl
    success_url = reverse_lazy("erp:dashboard")

    def dispatch(self, request, *args: Any, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.success_url)
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        login(self.request, form.get_user())
        return HttpResponseRedirect(self.success_url)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["title"] = "Iniciar Sesión"
        return context


class LogoutRedirectView(RedirectView):
    pattern_name = "login"

    def dispatch(self, request, *args, **kwargs):
        logout(request)

        return super().dispatch(request, *args, **kwargs)
