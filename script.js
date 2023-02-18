const cors = require("cors");
const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json())
const port = 3000;
let db = "";
let x = 20;

app.get("/api/1", async (req, res) => {
  console.log("entrando a api 1")
  try {
    const result = await db
      .collection("listingsAndReviews")
      .find({
        bathrooms: {$gte: 1},
      })
      .limit(x)
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

app.post("/api/8", async (req, res) => {
  console.log("api aqui")
  console.log(req.body)
  try {
    const result = await db
      .collection("listingsAndReviews")
      .find(req.body)
      .limit(x)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});
app.post("/api/9", async (req, res) => {
  console.log("api aqui")
  x = (parseInt(req.body.limite))
  console.log(x)
  try {
    const result = await db
      .collection("listingsAndReviews")
      .find(req.body)
      .limit(x)
      .toArray();
    res.status(200).json({
      ok: true,
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(
    "mongodb+srv://bit:root@cluster0.upnwart.mongodb.net/sample_airbnb?retryWrites=true&w=majority"
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
