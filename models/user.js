const mongoose = require("mongoose")
const PropertiesReader = require('properties-reader');
const uniqueValidator = require("mongoose-unique-validator")

const properties = PropertiesReader('.env');

// Pour tester ma valeur de db_utilisateur
//console.log("username>" +properties.get("db_utilisateur"));

const db_mdp = properties.get("db_mdp");
const db_utilisateur = properties.get("db_utilisateur");

const uri = `mongodb+srv://${db_utilisateur}:${db_mdp}@projet6.iygzfqo.mongodb.net/?retryWrites=true&w=majority`

// A utiliser uniquement en développement 
//console.log("uri: " + uri);


mongoose.set('strictQuery', false)

//connexion à la base de données
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log("Connecté à Mongo!"))
  .catch((err) => console.error("Erreur connection à Mongo: ", err))


//schéma de donnée pour un utilisateur(User) 
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

//plugin de validation Mongoose pour garantir l'unicité de l'email
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);

