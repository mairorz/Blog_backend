# Backend API for Blog Application

Este repositorio contiene el backend de la aplicación de blog, encargado de gestionar publicaciones y comentarios mediante una API REST.

## 🛠️ Tecnologías

* Node.js
* Express
* MongoDB (con Mongoose)
* dotenv (para configuración de variables de entorno)

## 🚀 Características

* **Publicaciones**: Crear, listar y obtener detalles de publicaciones.
* **Comentarios**: Añadir y listar comentarios asociados a cada publicación.
* **Filtros y ordenación**: Listado de publicaciones ordenado por fecha.
* **API RESTful**: Acceso a los recursos mediante rutas estándar.

## 📦 Instalación

1. Clona el repositorio:

   ```bash
   git clone (repositorio copiado)
   cd tu-backend-blog
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## 🔧 Ejecutar el servidor

```bash
npm start       # para producción
npm run dev     # con nodemon para desarrollo
```

El servidor quedará escuchando en `http://localhost:<PORT>`.

## 📚 Rutas de la API

### Publicaciones

| Método | Ruta         | Descripción                                                                 |
| ------ | ------------ | --------------------------------------------------------------------------- |
| GET    | `/getPosts`     | Listar todas las publicaciones (ordenadas por fecha descendente).           |
| GET    | `/getPost/:id` | Obtener detalles de una publicación por su ID.                              |
| POST   | `/createPost`     | Crear una nueva publicación. <br>**Body**: `{ title, description, course }` |
| PUT    | `/updatePost/:id` | Actualizar una publicación existente.                                       |
| DELETE | `/deletePost/:id` | Eliminar una publicación.                                                   |

### Comentarios

| Método | Ruta                  | Descripción                                                              |
| ------ | --------------------- | ------------------------------------------------------------------------ |
| GET    | `/:id/addComment` | Listar comentarios de la publicación.                                    |
| POST   | `/:id/getComments` | Añadir un comentario a la publicación. <br>**Body**: `{ name, content }` |

> **Nota**: Los endpoints REST siguen formato JSON tanto en peticiones como en respuestas.

## ✅ Pruebas de API

Puedes utilizar herramientas como Postman o cURL:

* **Listar publicaciones**:

  ```bash
  curl http://localhost:3000/blog/v1/postgetPosts
  ```

* **Crear publicación**:

  ```bash
  curl -X POST http://localhost:3000/blog/v1/createPost \
    -H "Content-Type: application/json" \
    -d '{"title":"Mi Nuevo Post","description":"Contenido...","course":"Curso1"}'
  ```

* **Añadir comentario**:

  ```bash
  curl -X POST http://localhost:3000/blog/v1/<POST_ID>/addComment \
    -H "Content-Type: application/json" \
    -d '{"name":"Juan","content":"¡Excelente artículo!"}'
  ```

## 📈 Postman Collection

Importa la colección `postman_collection.json` provista en el repositorio para acceder a las peticiones preconfiguradas.

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

**¡Listo!** Ahora tienes toda la información necesaria para levantar y probar tu backend.
