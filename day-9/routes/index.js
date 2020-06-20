const express = require("express");
const router = express.Router();
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

// dans ce routeur, on mettre les routes génériques
// de notre shop, ex: about, contact, CGV, etc...
// n'ayant pas besoin de modele

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index", { title: "Accueil" });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "A propos du shop SP4" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Nous contacter" });
});

router.get("/dashboard", protectAdminRoute, (req, res) => {
  res.render("dashboard/dashboard", {title: "Inerface d'administration"});
});

module.exports = router;
