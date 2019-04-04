const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const jsonParser = express.json();

const Publication = require('./models/publication');

app.use(cors());

mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
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

    const userId = req.body.userid;
    const pubTitle = req.body.title;
    const pubText = req.body.text;
    const img = req.body.substrate.img;
    const alt = req.body.substrate.alt;

    const publication = new Publication({
        userid: userId,
        title: pubTitle,
        text: pubText,
        substrate: {
            img: img,
            alt: alt
        }
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