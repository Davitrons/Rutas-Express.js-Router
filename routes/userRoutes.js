const express = require("express");
const router = express.Router();

const controlMiddleware = require("../middlewares/controlFlowMiddleware")

const usuarios = [
  { id: 0, nombre: "David Pérez", edad: 25, ciudad: "Linares", role: "admin"  },
  { id: 1, nombre: "Ana Gómez", edad: 30, ciudad: "Barcelona", role: "user"  },
  { id: 2, nombre: "Carlos López", edad: 35, ciudad: "Sevilla", role: "editor"  },
  { id: 3, nombre: "Lucía Fernández", edad: 40, ciudad: "Madrid", role: "admin"  },
  { id: 4, name: "Luis Fernández", age: 28, city: "Bogotá", role: "moderator" },
  { id: 5, name: "Elena Rojas", age: 22, city: "Santiago", role: "user" },
];

const posts = [
  { postId: 0, userId: 0, title: "Mi primer post", content: "Este es el contenido de mi primer post." },
  { postId: 1, userId: 0, title: "Post sobre tecnología", content: "Hablando de las últimas tendencias tech." },
  { postId: 2, userId: 1, title: "Viajes y aventuras", content: "Explorando el mundo." },
  { postId: 3, userId: 2, title: "Recetas de cocina", content: "Cocinando con amor." },
  { postId: 4, userId: 3, title: "Fotografía creativa", content: "Consejos para capturar momentos increíbles." },
  { postId: 5, userId: 4, title: "Música y cultura", content: "Explorando nuevos géneros musicales." },
  { postId: 6, userId: 5, title: "Desarrollo web", content: "Guía básica para empezar en el mundo del desarrollo web." }
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

router.get("/:id/posts/:postId", (req, res) => {
  const userId = parseInt(req.params.id);
  const postId = parseInt(req.params.postId);

  const usuario = usuarios.find(u => u.id === userId);
  if (!usuario) {
      return res.json({ error: "Usuario no encontrado" });
  }

  // Buscar el post del usuario
  const post = posts.find(p => p.postId === postId && p.userId === userId);
  if (!post) {
      return res.json({ error: "Post no encontrado para este usuario" });
  }

  res.json({ mensaje: "Post encontrado", post });
 });

router.get("/search", (req, res) => { });

module.exports = router;
