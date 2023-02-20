const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config.env' });

const app = express();
const port = process.env.PORT;

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const connectionPool = mysql.createPool(dbConfig);

connectionPool.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur de connexion à la base de données : ' + err.stack);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
    connection.release();
});

app.use(express.json());

app.use(bodyParser.json());

// Middleware pour définir les en-têtes CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE');
    next();
});

// Middleware pour logger les requêtes entrantes
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route pour récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
    try {
        console.log("users GET");
        const connection = await connectionPool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users');
        connection.release();
        console.log(rows);
        res.json(rows);
    } catch (error) 
    {
        console.error(error);
      //  res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
    }
});

// Route pour récupérer un utilisateur par ID
app.get('/users/:id', async (req, res) => {
    try {
        const connection = await connectionPool.getConnection();
        const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
        connection.release();
        if (rows.length === 0) {
            res.status(404).send({ error: `L'utilisateur avec l'ID ${req.params.id} n'a pas été trouvé.` });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
    }
});

// Route pour ajouter un utilisateur
app.post('/users', async (req, res) => {
    const user = req.body;
    try {
        const connection = await connectionPool.getConnection();
        const [result] = await connection.query('INSERT INTO users SET ?', user);
        connection.release();
        res.send(`L'utilisateur avec l'ID ${result.insertId} a été ajouté.`);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
    }
});

// Route pour mettre à jour un utilisateur
app.put('/users/:id', async (req, res) => {
    const user = req.body;
    try {
        const connection = await connectionPool.getConnection();
        const [result] = await connection.query('UPDATE users SET ? WHERE id = ?', [user, req.params.id]);
        connection.release();
        if (result.affectedRows === 0) {
            res.status(404).send({ error: `L'utilisateur avec l'ID ${req.params.id} n'a pas été trouvé.` });
        } else {
            res.send(`L'utilisateur avec l'ID ${req.params.id} a été mis à jour.`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
    }
});

// Route pour supprimer un utilisateur
app.delete('/users/:id', async (req, res) => {
    try {
        const connection = await connectionPool.getConnection();
        const [result] = await connection.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        connection.release();
        if (result.affectedRows === 0) {
            res.status(404).send({ error: `L'utilisateur avec l'ID ${req.params.id} n'a pas été trouvé.` });
        } else {
            res.send(`L'utilisateur avec l'ID ${req.params.id} a été supprimé.`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Impossible de se connecter à la base de données' });
    }
});

/*
// Middleware pour gérer les erreurs 404 à mettre à la fin sinon
// il te déragera dès le début petit cornichon
 app.use((req, res, next) => {
        res.status(404).send({ error: `L'URL '${req.url}' n'a pas été trouvée.` });
        next();
 });
*/
app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});