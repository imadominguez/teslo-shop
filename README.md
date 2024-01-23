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

4. Levanta la base de datos: `docker compose up -d`

5. Ejecuta las migraciones de Prisma: `npx prisma migrate dev`

6. Ejecuta el seed `npm run seed`

7. Inicia el proyecto en modo desarrollo: `npm run dev`

## Cómo correr en producción

- Se proporcionarán instrucciones detalladas una vez que el entorno de producción esté configurado y listo para desplegar.

¡Disfruta explorando Teslo-Shop y desarrollando con las últimas tecnologías de Next.js! Si tienes alguna pregunta o problema, no dudes en crear un issue en este repositorio. ¡Buena codificación!
