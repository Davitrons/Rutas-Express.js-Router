const express = require("express");
const router = express.Router();

const productos = [
    { id: 0, nombre: "Laptop Gamer", categoria: "Electrónica", destacado: true, precio: 1200 },
    { id: 1, nombre: "Smartphone Pro", categoria: "Electrónica", destacado: true, precio: 800 },
    { id: 2, nombre: "Zapatillas Running", categoria: "Deportes", destacado: true, precio: 100 },
    { id: 3, nombre: "Auriculares Bluetooth", categoria: "Accesorios", destacado: false, precio: 50 }
];

const reseñas = [
    { reviewId: 0, productId: 0, rating: 5, comment: "Excelente laptop para gaming." },
    { reviewId: 1, productId: 1, rating: 4, comment: "Buen teléfono, aunque algo caro." },
    { reviewId: 2, productId: 2, rating: 5, comment: "Muy cómodas y duraderas." },
    { reviewId: 3, productId: 3, rating: 3, comment: "Buen sonido, aunque la batería dura poco." },
];

router.get("/", (req, res) => {
    let { categoria, precioMin, precioMax } = req.query;
    let resultado = productos;

    if (categoria) {
        resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    }

    if (precioMin) {
        resultado = resultado.filter(p => p.precio >= parseFloat(precioMin));
    }

    if (precioMax) {
        resultado = resultado.filter(p => p.precio <= parseFloat(precioMax));
    }

    res.json({ mensaje: "Lista de productos", productos: resultado });
});

router.get("/featured", (req, res) => {
    let { limit, categoria } = req.query
    let resultado = productos.filter(p => p.destacado)
    resultado = resultado.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
    resultado = resultado.slice(0, parseInt(limit));
    res.json({ mensaje: "Productos destacados", productos: resultado });
});

router.get("/categories/:categoria?", (req, res) => {
    let { categoria } = req.params
    if (!categoria) {
        return res.json({ mensaje: "Categorías disponibles", categorias: [...new Set(productos.map(p => p.categoria))] });
    }
    let resultado = productos.filter(p => p.categoria === categoria)
    res.json({ mensaje: `Productos en la categoría ${categoria}`, productos: resultado });
});

router.post("/", (req, res) => {
    const { nombre, categoria, precio, destacado } = req.body;

    const nuevoProducto = {
        id: productos.length + 1,
        nombre,
        categoria,
        precio: parseFloat(precio),
        destacado: destacado || false
    };

    productos.push(nuevoProducto);
    res.json({ mensaje: "Producto creado", producto: nuevoProducto });
});

router.get("/:id/reviews", (req, res) => {
    let productoId = parseInt(req.params.id)

    let resultado = reseñas.filter(r => r.productoId === productoId)
    res.json({ mensaje: "Reseña encontrada", reseña: resultado })
});

router.post("/:id/reviews", (req, res) => {
    const productoId = parseInt(req.params.id);
    const { rating, comment } = req.body;

    const productoExiste = productos.some(p => p.id === productId);
    if (!productoExiste) {
        return res.json({ error: "Producto no encontrado" });
    }

    const nuevaReseña = {
        reviewId: reseñas.length, 
        productoId,
        rating: parseInt(rating),
        comment
    };

    reseñas.push(nuevaReseña);

    res.json({ mensaje: "Reseña añadida", reseña: nuevaReseña });
});

router.put("/:id", (req, res, next) => {
    try {
        const productId = parseInt(req.params.id);
        let resultado = productos
        resultado = resultado.find((p) => p.id === productId)
        if (!resultado) {
            throw { status: 404, message: "Producto no encontrado" };
        }
        resultado.destacado = false
        res.json({ mensaje: `Se ha modificado al producto`, usuario: resultado })
    } catch (error) {
        next(error);
    }
});

router.get("/search", (req, res) => { });

module.exports = router;
