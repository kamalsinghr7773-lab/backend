import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend Working Successfully!");
});

app.get("/api/rhymes", (req, res) => {
  res.json([
    { id: 1, title: "Wheels on the Bus" },
    { id: 2, title: "Twinkle Twinkle Little Star" }
  ]);
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log("Server running on port " + port);
});
