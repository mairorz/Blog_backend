import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Blog API",
            version: "1.0.0",
            description: "API para un blog de estudiantes",
            contact:{
                name: "Mario Rodriguez",
                email: "mrodriguez-2023292@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000"
            }
        ]
    },
    apis:[
        "./src/post/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi }