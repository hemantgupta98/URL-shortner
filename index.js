const express = require("express");
const port = 3000;
const urlRoute = require("./routes/url");
const app = express();
const { conectToMongoDB } = require("./connect");
const URL = require("./models/url");

conectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb is connected")
);

app.use(express.json());
app.use("/url", urlRoute);

app.get("./:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(port, () => console.log(`server is running ${port}`));
