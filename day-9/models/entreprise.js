const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrepriseSchema = new Schema({
nomEntreprise: String,
tailleEntreprise: String,
secteurActivite: String,
pitch: String,
ville: String,
codePostale: Number,
poste: String,
niveauExperience: String,
nom: String,
prenom: String,
email: String,
password: {
  min: 4,
  required: true,
  type: String,
},
role: {
  type: String,
  enum: ["admin", "editor", "user"],
  default: "user",
},
});

const entrepriseModel = mongoose.model("entreprise", entrepriseSchema);
module.exports = entrepriseModel;