import subprocess
import argparse

def audio_to_video_ffmpeg(audio_file, output_file):
    command = [
        'ffmpeg',
        '-i', audio_file,                    # Input audio file
        '-filter_complex', '[0:a]showwaves=s=1280x720:mode=line:rate=25[v]',  # Visual representation of audio
        '-map', '[v]',                       # Map the video stream from the visualization
        '-map', '0:a',                       # Map the audio stream
        '-c:v', 'libx264',                   # Video codec
        '-c:a', 'aac',                       # Audio codec
        '-b:a', '192k',                      # Audio bitrate
        '-shortest',                         # Stop when the shortest input ends
        '-pix_fmt', 'yuv420p',               # Pixel format for compatibility
        output_file                          # Output file
    ]

    subprocess.run(command, check=True)
    print(f"Video file saved as {output_file}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert an MP3 audio file to an MP4 video file with waveform visualization.")
    
    parser.add_argument(
        'audio_file',
        type=str,
        help='The input audio file (MP3)'
    )
    parser.add_argument(
        'output_file',
        type=str,
        help='The output video file (MP4)'
    )
    
    args = parser.parse_args()
    
    audio_to_video_ffmpeg(args.audio_file, args.output_file)
