// Importar Express
const express = require("express");
const homeRouter = require('./routes/homeRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')

const notFoundMiddleware = require("./middlewares/notFoundMiddleware");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

const PORT = 3000;
const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use('/', homeRouter);

app.use('/users', userRouter);

app.use('/products', productRouter);

// Middleware de rutas no encontradas (404)
app.use(notFoundMiddleware);

// Middleware de manejo de errores
app.use(errorHandlerMiddleware);


// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express levantado en el puerto ${PORT}`);
});

// /project
// │── server.js  # Archivo principal
// │── package.json  # Dependencias
// │── routes
// │   ├── users.js  # Rutas de usuarios
// │   ├── products.js  # Rutas de productos (ejemplo adicional)
// │── controllers
// │   ├── userController.js  # Lógica de usuarios
// │── models
// │   ├── user.js  # Modelo de usuario (si se usa una base de datos)