const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/router"); // Assurez-vous que ce chemin est correct

const app = express();

// Middleware pour parser le JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utilisation des routes définies dans votre fichier route.js
app.use("/api", route); // Assurez-vous que 'route' est une fonction de middleware

// Définir le port
const PORT = process.env.PORT || 9876;

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
