import argparse
from pydub import AudioSegment

def combine_mp3(files, output):
    combined = AudioSegment.empty()
    
    for file in files:
        audio = AudioSegment.from_mp3(file)
        combined += audio
    
    combined.export(output, format="mp3")
    print(f"Combined file saved as {output}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Combine multiple MP3 files into one.")
    
    parser.add_argument(
        'files',
        metavar='F',
        type=str,
        nargs='+',
        help='list of MP3 files to combine'
    )
    parser.add_argument(
        '-o', '--output',
        type=str,
        required=True,
        help='output file name'
    )

    args = parser.parse_args()
    
    combine_mp3(args.files, args.output)
