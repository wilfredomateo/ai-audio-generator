import express from 'express';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const speechFile = path.resolve("./speech.mp3");

app.use(express.json());

app.post('/generate-speech', async (req, res) => {
  try {
    const userText = req.body.text;
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: userText,
    });
    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    
    res.json({ filePath: speechFile });
  } catch (error) {
    console.error("Error generating speech:", error);
    res.status(500).send("Error generating speech");
  }
});

app.listen(6446, () => {
  console.log('Server is running on http://localhost:6446');
});
