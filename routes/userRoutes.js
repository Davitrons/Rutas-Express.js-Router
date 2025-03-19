const express = require("express");
const router = express.Router();

const usuarios = [
  { id: 1, nombre: "David Pérez", edad: 25, ciudad: "Linares" },
  { id: 2, nombre: "Ana Gómez", edad: 30, ciudad: "Barcelona" },
  { id: 3, nombre: "Carlos López", edad: 35, ciudad: "Sevilla" },
  { id: 4, nombre: "Lucía Fernández", edad: 40, ciudad: "Madrid" },
];

router.get("/", (req, res) => {
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

router.get("/new", (req, res) => {});

router.get("/:id/profile", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.get("/:id/posts/:postId", (req, res) => {});

router.get("/search", (req, res) => {});

module.exports = router;
