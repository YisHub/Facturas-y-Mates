# Facturas y Mates
Facturas y Mates es una aplicación web desarrollada con Django para gestionar inventario, ventas y facturación.

## Funcionalidades
Las principales funcionalidades que incluye Facturas y Mates son:

## Gestión de inventario
- Registro de productos con categorización
- Seguimiento de stock disponible
- Reportes de inventario <em>(próximamente)</em>

## Facturación
- Generación y envío de facturas
- Seguimiento a facturas emitidas

## Gestión de Clientes
- Registro de datos de clientes
- Listado y búsqueda de clientes
- Vinculación de facturas a clientes

## Tecnologías
- Python
- Django
- PostgreSQL
- Bootstrap
- jQuery
- DataTables
- Select2
- Pillow

## Instalación

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/YisHub/Facturas-y-Mates
    ```

2. Instalar virtualenvwrapper

   ```bash
    pip install virtualenvwrapper
    ```

3. Crear entorno virtual

   ```bash
    mkvirtualenv facturas_y_mates
    ```
4. Inicia el entorno virtual

   ```bash
    workon facturas_y_mates
    ```

5. Instalar requirements.txt
   ```bash
    pip install -r requirements.txt
    ```
6. Crear superusuario

    ```bash
    python manage.py createsuperuser
    ```
   
7. Ejecuta las migraciones:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

8. Inicia el servidor de desarrollo:

    ```bash
    python manage.py runserver
    ```
## Contribución

¡Tu contribución es bienvenida! Si encuentras errores, tienes ideas para mejoras o quieres añadir nuevas características, no dudes en abrir un issue o enviar un pull request.

## Contacto

Si tienes preguntas o sugerencias, contáctame en jesus14sf@gmail.com.
