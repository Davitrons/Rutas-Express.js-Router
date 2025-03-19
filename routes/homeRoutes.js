const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { idioma = "es", tema = "oscuro" } = req.query;
  res.json({ mensaje: "Bienvenido a la raíz", idioma, tema });
});

router.get("/about", (req, res) => {
  const { admin = "David", descripcion = "soy el creador de esta api" } =
    req.query;
  res.json({ mensaje: `Buenas me llamo ${admin} y ${descripcion}` });
});

router.post("/contact", (req, res) => {
  const { nombre, email} = req.body;
  res.json({
    mensaje: "Se han recivido los datos de contacto",
    datos: { nombre, email },
  });
});

module.exports = router;
