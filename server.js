import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const HF_API_KEY = process.env.HF_API_KEY;
const MODEL_URL = "https://api-inference.huggingface.co/models/facebook/musicgen-small";

app.get("/", (req, res) => {
  res.send("Backend Running Successfully!");
});

app.post("/generate-video", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await fetch(MODEL_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const result = await response.json();
    return res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Generation failed" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
