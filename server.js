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

app.use(express.static(path.resolve('./')));
app.use(express.json());

app.post('/generate-speech', async (req, res) => {
  try {
    const userText = req.body.text;

    if (userText.length > 4096) {
      return res.status(400).send("Input text exceeds the maximum length of 4096 characters.");
    }

    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "onyx",
      input: userText,
    });

    const arrayBuffer = await mp3.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileSize = buffer.length;
    const timestamp = Date.now();
    const uniqueSpeechFile = path.resolve(`./speech_${timestamp}.mp3`);

    const writeStream = fs.createWriteStream(uniqueSpeechFile);

    let written = 0;

    writeStream.on('drain', () => {
      written += writeStream.bytesWritten;
      // Update progress here if needed (will require client-side handling)
    });

    writeStream.write(buffer, (err) => {
      if (err) {
        console.error("Error writing file:", err);
        res.status(500).send("Error generating speech");
      } else {
        res.json({ filePath: uniqueSpeechFile });
      }
    });

    writeStream.end();
  } catch (error) {
    console.error("Error generating speech:", error);
    res.status(500).send("Error generating speech");
  }
});

const PORT = 6446;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
