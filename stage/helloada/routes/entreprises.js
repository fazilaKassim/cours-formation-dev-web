const express = require("express");
const router = new express.Router();
// const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");
const protectPrivateRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const entrepriseModel = require("./../models/Entreprise");
const multer = require('multer');
const upload = multer({
  dest: './public/data/uploads/'
});
const passport = require('passport');

// router.get("/profile", protectPrivateRoute, (req, res) => {
//   res.render("profile");
// });

router.get("/accueilEntreprise", protectPrivateRoute, (req, res) => {
  res.render("accueilEntreprise", {
    title: "Entreprise"
  });
});

router.get("/signupEntreprise", (req, res) => {
  res.render("signupEntreprise", {
    title: "Inscription",
    js: ["toggle-password-icon"]
  });
});

router.get("/signinEntreprise", (req, res) => {
  res.render("signinEntreprise", {
    title: "Connexion",
    js: ["toggle-password-icon"]
  });
});

router.post("/signupEntreprise", upload.single('uploaded_file'), (req, res, next) => {
  const user = req.body;
  console.log("ce que ça nous renvoie >>>>>>", req.body);
  console.log("coucou !!!!!!!!!!!!!!!!!!");
  if (req.body.not_checked) {
    console.log('not checked : ' + req.body.not_checked);
  }


  if (req.body.checked) {
    console.log('checked : ' + req.body.checked);
  }

  if (user.password != user.passwordConfirme || user.password === null || user.passwordConfirme === null) {
    req.flash("warning", "veuillez saisir un mot de passe correct");
    res.redirect("/signupEntreprise");
  }



  if (!user.nom || !user.password || !user.email) {
    // todo retourner un message d'erreur : remplir tous les champs requis + redirect
    req.flash("warning", "Merci de remplir tous les champs requis.");
    res.redirect("/signupEntreprise");
  } else {
    entrepriseModel
      .findOne({
        email: user.email
      })
      .then((dbRes) => {
        if (dbRes) {
          // todo retourner message d'erreur : email déjà pris + redirect
          req.flash("warning", "Désolé, cet email n'est pas disponible.");
          res.redirect("/signupEntreprise");
        }
      })


      .catch(next);

    // si le programme est lu jusqu'ici, on converti le mot de passe en chaîne cryptée
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(user.password, salt);
    // console.log("password crypté >>>", hashed);
    user.password = hashed; // on remplace le mot de passe "en clair" par sa version cryptée
    user.passwordConfirme = hashed;
    // finalement on insère le nouvel utilisateur en base de données
    entrepriseModel
      .create(user)
      .then((dbRes) => {
        req.flash("success", "Inscription validée !");
        res.redirect("/signinEntreprise");
      })
      .catch(next);
  }

  // }
  // res.redirect("/signinEntreprise");


});



router.post("/signinEntreprise",  upload.single('uploaded_file'), (req, res, next) => {
  const userInfos = req.body; //
  // check que mail et mdp sont renseignés
  if (!userInfos.email || !userInfos.password) {
    // never trust user input !!!
    // si non : retourner message warning au client
    req.flash("warning", "Attention, email et password sont requis !");
    res.redirect("/signinEntreprise");
  }
  // si oui : vérifier que mail et mdp correspondent en bdd
  // 1 - récupérer l'utilisateur avec le mail fourni
  entrepriseModel
    .findOne({
      email: userInfos.email
    })
    .then((user) => {
      if (!user) {
        // vaut null si pas d'user trouvé pour ce mail
        // si non .. retiourner une erreur au client
        req.flash("error", "Identifiants incorrects");
        res.redirect("/signinEntreprise");
      }
      // si oui comparer le mdp crypté stocké en bdd avec la chaîne en clair envoyée depuis le formulaire
      const checkPassword = bcrypt.compareSync(
        userInfos.password, // password provenant du form "texte plein"
        user.password // password stocké en bdd (encrypté)
      ); // checkPassword vaut true || false

      // si le mdp est incorrect: retourner message error sur signin
      if (checkPassword === false) {
        req.flash("error", "Identifiants incorrects");
        res.redirect("/signinEntreprise");
      }
      // si oui : stocker les infos de l'user en session pour lui permettre de naviguer jusqu'au signout
      const {
        _doc: clone
      } = {
        ...user
      }; // je clone l'user
      delete clone.password; // je supprime le mdp du clone (pas besoin de le stocker ailleurs qu'en bdd)
      req.session.currentUser = clone; // j'inscris le clone dans la session (pour maintenir un état de connexion)
      // - redirection profile
      res.redirect("/accueilEntreprise");
    })
    .catch(next);
});


module.exports = router;