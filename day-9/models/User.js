const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  cv: {
    type: String,
    default: "https://cdn.onlinewebfonts.com/img_258083.png",
  },
  nom: String,
  prenom: String,
  metier: String,
  typeContrat: String,
  ville: String,
  codePostale: String,
  SecteurActiviteFav: String,
  linkedin: String,
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

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
