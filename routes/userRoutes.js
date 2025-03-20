const express = require("express");
const router = express.Router();

const controlMiddleware = require("../middlewares/controlFlowMiddleware")

const usuarios = [
  { id: 0, nombre: "David Pérez", edad: 25, ciudad: "Linares" },
  { id: 1, nombre: "Ana Gómez", edad: 30, ciudad: "Barcelona" },
  { id: 2, nombre: "Carlos López", edad: 35, ciudad: "Sevilla" },
  { id: 3, nombre: "Lucía Fernández", edad: 40, ciudad: "Madrid" },
];

router.get("/", controlMiddleware, (req, res) => {
  let { edad, ciudad } = req.query;
  let resultado = usuarios;

  if (edad) {
    edad = parseInt(edad);
    resultado = resultado.filter((user) => user.edad === edad);
  }

  if (ciudad) {
    resultado = resultado.filter(
      (user) => user.ciudad.toLowerCase() === ciudad.toLowerCase()
    );
  }

  res.json({ mensaje: "Lista de usuarios", usuarios: resultado });
});

router.get("/new", (req, res) => {
  let { id, nombre, edad, ciudad } = req.query;
  usuarios.push({ id, nombre, edad, ciudad })
  res.json({ mensaje: `Se ha añadido a ${nombre} GET a la lista de usuarios` })
});

router.get("/:id/profile", (req, res) => {
  const userId = parseInt(req.params.id);
  let resultado = usuarios;
  resultado = resultado.find((user) => user.id === userId)
  res.json({ mensaje: "Usuario", usuarios: resultado });
});

router.post("/", (req, res) => {
  let { id, nombre, edad, ciudad } = req.body;
  usuarios.push({ id, nombre, edad, ciudad })
  res.json({ mensaje: `Se ha añadido a ${nombre} POST a la lista de usuarios` })
});

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  let resultado = usuarios
  resultado = resultado.find((user) => user.id === userId)
  resultado.edad = 99
  res.json({ mensaje: `Se ha modificado al usuario`, usuario: resultado })
});

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  let resultado = usuarios.findIndex((user) => user.id === userId)

  if (resultado !== -1) {
    usuarios.splice(resultado, 1);
  }

  res.json({mensaje:`Se ha eliminado al usuario de id ${resultado}`})
});

router.get("/:id/posts/:postId", (req, res) => { });

router.get("/search", (req, res) => { });

module.exports = router;
