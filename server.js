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

// Serve index.html
app.use(express.static(path.resolve('./')));

app.use(express.json());

app.post('/generate-speech', async (req, res) => {
  try {
    const userText = req.body.text;
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "nova",
      input: userText,
    });
    
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const timestamp = Date.now();
    const uniqueSpeechFile = path.resolve(`./speech_${timestamp}.mp3`);

    await fs.promises.writeFile(uniqueSpeechFile, buffer);
    res.json({ filePath: uniqueSpeechFile });
  } catch (error) {
    console.error("Error generating speech:", error);
    res.status(500).send("Error generating speech");
  }
});

app.listen(6446, () => {
  console.log('Server is running on http://localhost:6446');
});
