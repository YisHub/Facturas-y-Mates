from django.forms import *
from datetime import datetime
from core.erp.models import Category, Product, Client, Sale

from django.contrib.auth.forms import AuthenticationForm


class CategoryForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs["class"] = "form-control"
            form.field.widget.attrs["autocomplete"] = "off"
        self.fields["name"].widget.attrs["autofocus"] = True

    class Meta:
        model = Category
        fields = "__all__"
        widgets = {
            "name": TextInput(
                attrs={
                    "placeholder": "Ingrese un nombre",
                }
            ),
            "desc": Textarea(
                attrs={"placeholder": "Ingrese una descripción", "rows": 3, "cols": 3}
            ),
        }
        exclude = ['user_updated', 'user_creation']

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data["error"] = form.errors
        except Exception as e:
            data["error"] = str(e)
        return data

class AuthenticationFormWithFormControl(AuthenticationForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs["class"] = "form-control"
            form.field.widget.attrs["autocomplete"] = "off"

class ProductForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            if form.name != "cat":
                form.field.widget.attrs["class"] = "form-control"
                form.field.widget.attrs["autocomplete"] = "off"
        self.fields['name'].widget.attrs['autofocus'] = True

    class Meta:
        model = Product
        fields = '__all__'
        widgets = {
            'name': TextInput(
                attrs={
                    'placeholder': 'Ingrese un nombre',
                }
            ),
            'cat': Select(
                attrs={
                    'class': 'select2',
                    'style': 'width: 100%'
                }
            ),
        }

    def save(self, commit=True):
         data = {}
         form = super()
         try:
             if form.is_valid():
                 form.save()
             else:
                 data['error'] = form.errors
         except Exception as e:
             data['error'] = str(e)
         return data

class ClientForm(ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for form in self.visible_fields():
            form.field.widget.attrs["class"] = "form-control"
            form.field.widget.attrs["autocomplete"] = "off"
        self.fields['names'].widget.attrs['autofocus'] = True

    class Meta:
        model = Client
        fields = '__all__'
        widgets = {
            'names': TextInput(
                attrs={
                    'placeholder': 'Ingrese sus nombres',
                }
            ),
            'surnames': TextInput(
                attrs={
                    'placeholder': 'Ingrese sus apellidos',
                }
            ),
            'dni': TextInput(
                attrs={
                    'placeholder': 'Ingrese su dni',
                    
                }
            ),
            'date_birthday': DateInput(format='%d/%m/%Y',
                attrs={
                    'value': datetime.now().strftime('%d-%m-%Y'),
                    'type': 'date',
                }
            ),
            'address': TextInput(
                attrs={
                    'placeholder': 'Ingrese su dirección',
                }
            ),
            'gender': Select()
        }
        exclude = ['user_updated', 'user_creation']

    def save(self, commit=True):
        data = {}
        form = super()
        try:
            if form.is_valid():
                form.save()
            else:
                data['error'] = form.errors
        except Exception as e:
            data['error'] = str(e)
        return data

class SaleForm(ModelForm):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    class Meta:
        model = Sale
        fields = '__all__'
        widgets = {
            'cli': Select(
                attrs={
                    'class': 'select2',
                    'style': 'width: 100%'
                }
            ),
            'iva': TextInput(attrs={
                    'class': 'form-control',
            }),
            'date_joined': TextInput(attrs={
                    'autocomplete': 'off',
                    'class': 'form-control datetimepicker-input',
                    'id': 'date_joined',
                    'data-target': '#date_joined',
                    'data-toggle': 'datetimepicker'
            }),
            'subtotal': TextInput(attrs={
                    'readonly': True,
                    'class': 'form-control',
            }),
            'total': TextInput(attrs={
                    'readonly': True,
                    'class': 'form-control',
            }),
                
        }

class TestForm(Form):
    categories = ModelChoiceField(queryset=Category.objects.all(), widget=Select(attrs={
        'class': 'form-control select2',
        'style': 'width: 100%'
    }))

    products = ModelChoiceField(queryset=Product.objects.none(), widget=Select(attrs={
        'class': 'form-control select2',
        'style': 'width: 100%'
    }))
    search = ModelChoiceField(queryset=Product.objects.none(), widget=Select(attrs={
        'class': 'form-control select2',
        'style': 'width: 100%'
    }))
