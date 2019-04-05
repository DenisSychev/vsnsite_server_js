const mongoose = require("mongoose");
const connection_uri = process.env.MONGO_URI || 'mongodb://localhost:27017/vsnsitedb';
const port = process.env.PORT || 3000;
const express = require("express");
const cors = require("cors");
const jsonParser = express.json();

const app = express();
app.use(cors());

const Publication = require('./models/publication');

mongoose.connect(connection_uri, { useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(port, function () {
        console.log(`Сервер ожидает подключения. Порт ${port}`);
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