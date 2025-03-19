// Importar Express
const express = require("express");
const homeRouter = require('./routes/homeRoutes')
const userRouter = require('./routes/userRoutes')
const productRouter = require('./routes/productRoutes')
const PORT = 3000;
const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use('/', homeRouter);

app.use('/users', userRouter);

app.use('/products', productRouter);


// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express levantado en el puerto ${PORT}`);
});
