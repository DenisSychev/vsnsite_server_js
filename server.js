const mongoose = require("mongoose");
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vsnsitedb';
const PORT = process.env.PORT || 3000;
const express = require("express");
const jsonParser = express.json();
const cors = require("cors");
const app = express();
app.use(cors());

const Publication = require('./models/publication');


mongoose.connect(CONNECTION_URI, { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(PORT, function () {
        console.log(`Сервер ожидает подключения по порту ${PORT}...`);
    });
});

app.get("/api/publications", function (req, res) {

    Publication.find({}, function (err, publications) {

        if (err) return console.log(err);
        res.send(publications)
    });
});

app.get("/api/publications/:id", function (req, res) {

    const id = req.params.id;
    Publication.findOne({ _id: id }, function (err, publication) {

        if (err) return console.log(err);
        res.send(publication);
    });
});

app.post("/api/publications", jsonParser, function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const pubTitle = req.body.title;
    const pubText = req.body.text;

    const publication = new Publication({
        title: pubTitle,
        text: pubText
    });

    publication.save(function (err) {
        if (err) return console.log(err);
        res.send(publication);
    });
});

app.delete("/api/publications/:id", function (req, res) {

    const id = req.params.id;
    Publication.findByIdAndDelete(id, function (err, publication) {

        if (err) return console.log(err);
        res.send(publication);
    });
});