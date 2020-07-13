const express = require("express");
const router = express();

const db = require("../data/dbConfig.js");

router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
});

router.get("/:id", (req, res) => {
  db.select("*")
    .from("accounts")
    .where({ id: req.params.id })
    .then((account) => {
      res.status(200).json({ data: account[0] });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
});

router.post("/", (req, res) => {
  const values = req.body;

  db("accounts")
    .insert(values, "id")
    .then((id) => {
      db("accounts")
        .where({ id })
        .then((account) => {
          res.status(201).json({ data: account[0] });
        });
    })
    .catch((err) => {
      handleErrors(err, res);
    });
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update(req.body)
    .then((count) => {
      if (count > 0) {
        db.select("*")
          .from("accounts")
          .where({ id: req.params.id })
          .then((account) => {
            res.status(200).json({ data: account[0] });
          })
          .catch((err) => {
            handleError(err, res);
          });
      } else {
        res.status(404).json({ message: "there were no records to update" });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "there were no records to delete" });
      }
    })
    .catch((err) => {
      handleError(err, res);
    });
});

function handleErrors(err, res) {
  res.status(500).json({ error: err });
}

module.exports = router;
