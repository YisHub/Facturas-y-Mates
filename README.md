# Facturas y Mates
Facturas y Mates es una aplicación web desarrollada con Django para gestionar inventario, ventas y facturación.

![image](https://github.com/user-attachments/assets/57ee50d0-40d8-4c21-8e21-b9a0542d98d5)
![image](https://github.com/user-attachments/assets/f177673c-5a45-4c08-99d2-9cf5feefd369)
![image](https://github.com/user-attachments/assets/90a18682-4c92-49dd-85d1-cf5103fb4c24)

## Funcionalidades
Las principales funcionalidades que incluye Facturas y Mates son:

### Gestión de inventario
- Registro de productos con categorización
- Seguimiento de stock disponible
- Reportes de inventario <em>(próximamente)</em>

### Facturación
- Registros de ventas
- Generación y envío de facturas <em>(próximamente)</em>
- Seguimiento a facturas emitidas <em>(próximamente)</em>

### Gestión de Clientes
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

5. Asegúrate de tener instalado libffi-dev:

   ```bash
   sudo apt-get install libffi-dev
   ```

6. Instalar requirements.txt
   ```bash
    pip install -r requirements.txt 
    ```
7. Ejecuta las migraciones:

    ```bash
    python manage.py makemigrations erp homepage login user
    python manage.py migrate
    ```
   
8. Crear superusuario

    ```bash
    python manage.py createsuperuser
    ```

9. Inicia el servidor de desarrollo:

    ```bash
    python manage.py runserver
    ```

## Pruebas y Desarrollo
Para realizar pruebas y desarrollo, puedes utilizar la base de datos incluida en el archivo db.sqlite3.demo, que contiene datos de ejemplo para facilitar las pruebas.

 ```bash
    cp db.sqlite3.demo db.sqlite3
 ```
    
## Contribución

¡Tu contribución es bienvenida! Si encuentras errores, tienes ideas para mejoras o quieres añadir nuevas características, no dudes en abrir un issue o enviar un pull request.

## Contacto

Si tienes preguntas o sugerencias, contáctame en jesus14sf@gmail.com.
