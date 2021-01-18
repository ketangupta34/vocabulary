const router = require("express").Router();
let words = require("../models/userDictionary.model");

//CRUD = create, read, update, delete

router.route("/").get((req, res) => {
  //READ WHOLE FILE
  words
    .find()
    .then((words) => res.status(200).json(words))
    .catch((e) => {
      res.status(400).json("ERROR = " + e);
    });
});

router.route("/search/:word").get((req, res) => {
  //READ SINGLE DATA
  words
    .find({ word: req.params.word })
    .then((words) => res.status(200).json(words))
    .catch((e) => {
      res.status(400).json("ERROR = " + e);
    });
});

router.route("/add").post((req, res) => {
  //ADD DATA (CREATE)
  console.log("REQUEST input");
  const word = req.body.word;
  const definitions = req.body.definitions;
  const newWord = new words({ word, definitions });

  newWord
    .save()
    .then(() => res.status(200).json("Word ADDED"))
    .catch((e) => res.status(400).json("ERROR = " + e));
});

router.route("/delete/:word").delete((req, res) => {
  words
    .findOneAndDelete({ word: req.params.word })
    .then(() => res.status(200).json("WORD deleted!"))
    .catch((e) => {
      res.status(400).json("DELETE ERROR = " + e);
    });
});

module.exports = router;
