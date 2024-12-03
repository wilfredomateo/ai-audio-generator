# Ai-Audio-Generator

Using OpenAI to generate an audio file from text. Can be used to generate narration of text. 

Must have npm installed 

```cmd
npm start
```
Open a browser and navigate to http://localhost:6446

Supply the text box with the text of your choice, limited to 4096 characters. Use audioMasher.py to combine several audio files into one. 

## Using audioMasher.py

Used to combine multiple audio files into one.

Install dependencies
```cmd
pip install pydub
```
You will also need to install **ffmpeg**

Run command with files as agruments and an output file name
```cmd
python audioMasher.py file1.mp3 file2.mp3 file3.mp3 -o combined_output.mp3
```

## Using videoCreator.py
Take an audio file and create a video file with visualizations
```cmd
python videoCreator.py input_audio.mp3 output_video.mp4
```

