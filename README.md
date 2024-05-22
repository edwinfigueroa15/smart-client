## Ejecutar en local

Demo: https://prueba-smart.netlify.app

# IMPORTANTE

Al entrar a la aplicación existen dos opciones que son:
* Cargar datos
* Eliminar datos

Estas son para cargar unos datos de prueba y eliminar todos los datos de prueba una vez termine ya que todo se almacena en el `LocalStorage`.

Para iniciar sesion como administrador debe ir a la url `https://prueba-smart.netlify.app/auth` y si esta en local es `http://localhost:4200/auth` y ya existen dos usuarios administradores con algunos datos cargados.

Los usuarios ya existentes son:
* uno@gmail.com y contraseña 12345678
* dos@gmail.com y contraseña 12345678

Y tambien esta la posibilidad que usted se registre en la pagina y haga todo como si fuera un nuevo usuario.


## Ejecutar en local

Si quiere descargar el codigo y ejecutarlo en su computadora debe cumplir con estos requisitos:

* Tener la version de Angular 17
* Tener la version de NodeJs mayor o igual a la 18.13.0


Si cumple con los requisitos solo es ejecutar  `npm i` en la raiz del proyecto y cuando termine ejecutar en la raiz del proyecto `ng serve` una vez que la consola termine puede ver el proyecto en la url `http://localhost:4200`.

## Patrones de diseño

En este proyecto use los siguientes patrones de diseño
* Singleton: Este lo trabaje en mis servicios.
* Observador : Este lo use para estar escuchando cambiar en toda la aplicación y en un caso puntual que lo use fue para actualizar algunas propiedades del usuario cuando era necesario.
* Inyección de Dependencias: Este la use para inyectar algunas clases en mis componentes y servicios.

Tambien trabaje siguiendo los estandares SOLID