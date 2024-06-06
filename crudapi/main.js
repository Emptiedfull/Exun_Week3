const express = require('express');
const app = express();

const db = require('./db');

const port = process.env.PORT || 3000;

(async () => {
    const client = await db.initialize();
    const database = client.db('Exun_elite');
    const collection = database.collection('Articles');


    app.use(express.json());

    app.post('/articles/create', async (req, res) => {
        const result = await db.createArticle(req.body, collection);

        res.send(result);
    })

    app.get('/articles', async (req, res) => {
        const articles = await db.getArticles(collection);
        res.send(articles);
    })

    app.get('/articles/:id', async (req, res) => {
        const article = await db.findArticleById(req.params.id, collection);
        res.send(article);
    })

    app.put('/articles/:id', async (req, res) => {

        const result = await db.updateArticle(req.params.id, req.body.article, collection);
        res.send(result);
    })

    app.delete('/articles/:id', async (req, res) => {
        const result = await db.deleteArticle(req.params.id, collection);
        res.send(result);
    })

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});