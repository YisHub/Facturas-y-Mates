from config.wsgi import *
from core.erp.models import *
import random

num_records = 6000
existing_names = set(Category.objects.values_list('name', flat=True))

categories_to_create = []

for i in range(1, num_records + 1):
    name = f'producto_{i:04d}'
    while name in existing_names:
        name = f'producto_{random.randint(1, num_records):04d}'
    existing_names.add(name)
    categories_to_create.append(Category(name=name))

Category.objects.bulk_create(categories_to_create)

print(f'Guardados {len(categories_to_create)} registros')