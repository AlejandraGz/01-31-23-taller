const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(express.json())
const port = 3000;
let db = "";

app.get("/api/a/twitter", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        email_address: { $regex: "@twitter.com" },
      })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/b/founded_year", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: {
          $gte: 2005,
          $lte: 2008,
        },
      })
      .limit(10)
      .toArray();
    res.status(200).json({
      ok: true,
      message: error.message,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/c/technorati-campain", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        name: { $regex: "Technorati" },
      })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/d/category_code/year", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $and: [
          { category_code: { $regex: "advertising" } },
          { founded_year: 2002 },
        ],
      })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/e/sort/founded_year", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: {
          $gte: 0,
        },
        $or: [
          { category_code: { $regex: "messaging" } },
          { category_code: { $regex: "games_video" } },
        ],
      })
      .sort({ founded_year: 1 })
      .limit(100)
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: +req.query.founded_year,
      })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

app.post("/api/data/post", async (req, res) => {
  console.log(req.body)
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: +req.body.founded_year,
      })
      .limit(10)
      .toArray();
    res.send(result);
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://bit:root@cluster0.upnwart.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectadome a la BD");
    db = mongoose.connection.db;
  })
  .catch(() => {
    console.log("Conecction Failed!");
  })
  .finally(() => {
    console.log("Request Finished");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
