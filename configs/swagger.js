import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "Blog API",
        version: "1.0.0",
        description: "API para un blog de estudiantes",
        contact: {
          name: "Mario Rodriguez",
          email: "mrodriguez-2023292@kinal.org.gt",
        },
      },
      servers: [
        {
          url: "http://127.0.0.1:3000",
        },
      ],
      components: {
        schemas: {
          Post: {
            type: "object",
            properties: {
              _id: {
                type: "string",
                description: "ID de la publicación",
              },
              title: {
                type: "string",
                description: "Título de la publicación",
              },
              description: {
                type: "string",
                description: "Descripción de la publicación",
              },
              course: {
                type: "string",
                enum: ["TALLER III", "TECNOLOGÍA III", "PRÁCTICA SUPERVISADA"],
                description: "Curso relacionado con la publicación",
              },
              imageUrl: {
                type: "string",
                description: "URL de la imagen de la publicación",
              },
              comments: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Comment",
                },
                description: "Comentarios de la publicación",
              },
            },
          },
          Comment: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Nombre del autor del comentario",
              },
              content: {
                type: "string",
                description: "Contenido del comentario",
              },
              createdAt: {
                type: "string",
                format: "date-time",
                description: "Fecha y hora en la que se creó el comentario",
              },
            },
          },
          PostInput: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "Título de la publicación",
              },
              description: {
                type: "string",
                description: "Descripción de la publicación",
              },
              course: {
                type: "string",
                enum: ["TALLER III", "TECNOLOGÍA III", "PRÁCTICA SUPERVISADA"],
                description: "Curso relacionado con la publicación",
              },
              image: {
                type: "string",
                format: "binary",
                description: "Imagen para la publicación",
              },
            },
          },
          CommentInput: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Nombre del autor del comentario",
              },
              content: {
                type: "string",
                description: "Contenido del comentario",
              },
            },
          },
        },
      },
    },
    apis: ["./src/post/*.js"],
};

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }