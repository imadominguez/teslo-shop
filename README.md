### Teslo-Shop E-commerce

Este repositorio contiene el código fuente del proyecto Teslo-Shop, un comercio electrónico desarrollado utilizando las últimas tecnologías de Next.js 14. Este proyecto es el resultado final del curso de Next.js impartido por Fernando Herrera en [DevTalles](https://cursos.devtalles.com/).

## Descripcion

Teslo-Shop es una plataforma de comercio electrónico completa que aprovecha las capacidades avanzadas de Next.js 14. Además, integra herramientas modernas como Tailwind CSS para la estilización, Prisma para la gestión de la base de datos y Zustand para el manejo del estado de la aplicación.

## Cómo comenzar en desarrollo

Sigue estos pasos para configurar el proyecto en tu entorno de desarrollo:

1. Clonar el repositorio `git clone https://github.com/tuusuario/teslo-shop.git` y luego `cd teslo-shop`

2. Configura las variables de entorno:

   - Crea una copia del archivo `.env.template` y renómbralo a `.env`.
   - Modifica las variables de entorno según tus necesidades.

3. Instala las dependencias `npm install`

4. Abre Docker Desktop y levanta la base de datos con: `docker compose up -d`

5. Ejecuta las migraciones de Prisma: `npx prisma migrate dev`

6. Ejecuta el seed `npm run seed`

7. Inicia el proyecto en modo desarrollo: `npm run dev`

8. Limpiar localStorage, sessionStorage y Cookies del navegador

## Cuentas registradas en el seed

### Cuenta de administrador

- **Usuario:** user-admin@gmail.com
- **Contraseña:** 123456

### Cuenta de cliente

- **Usuario:** user-user@gmail.com
- **Contraseña:** 123456

## Acceso a la Pasarela de Pagos de PayPal en Modo de Prueba

Para probar el pago a través de la pasarela de pagos en modo de prueba, puedes utilizar la siguiente cuenta de PayPal:

- **Usuario:** sb-opbsh29468904@personal.example.com
- **Contraseña:** Abc123456

Utiliza esta cuenta para realizar pruebas de pago y verificar la funcionalidad de la pasarela de pagos en el entorno de desarrollo de Teslo-Shop. Recuerda que esta cuenta es exclusivamente para pruebas y no debe utilizarse en un entorno de producción.

## Acceso al Dashboard

Una vez hayas iniciado sesión como administrador, podrás acceder al Dashboard directamente desde el menú de navegación principal. Simplemente sigue estos pasos:

1. Inicia sesión con la cuenta de administrador utilizando las credenciales proporcionadas en la sección anterior.

2. Una vez dentro de la aplicación, observa el menú de navegación. Encontrarás una sección etiquetada como "Dashboard".

3. Haz clic en la opción correspondiente al Dashboard. Esto te llevará a la sección donde podrás administrar los productos, órdenes y usuarios de Teslo-Shop de manera centralizada y eficiente.

¡Explora las capacidades del Dashboard y aprovecha al máximo la administración de Teslo-Shop como un verdadero administrador! 🚀🔧
