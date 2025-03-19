const express = require("express");
const router = express.Router();

router.get("/products", (req, res) => {});

router.get("/products/featured", (req, res) => {});

router.get("/products/categories/:mainCategory?", (req, res) => {});

router.post("/products", (req, res) => {});

router.get("/products/:id/reviews", (req, res) => {});

router.post("/products/:id/reviews", (req, res) => {});

router.put("products/:id", (req, res) => {});

router.get("/products/search", (req, res) => {});

module.exports = router;
