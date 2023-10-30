from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List

import os

# import ssl

app = FastAPI()


class Song(BaseModel):
    rank: int
    artist: str
    song: str
    explicit: bool
    releaseDate: str
    artistId: str
    favoriteCount: int


chart_data = [
    Song(rank=7777, artist="Mother Mother", song="Haylloft", explicit=True, releaseDate="2023-10-24", artistId="78444",favoriteCount=14568),
    Song(rank=1, artist="B", song="A", explicit=False, releaseDate="1990-01-01", artistId="1",favoriteCount=1),
    Song(rank=1001, artist="Stellar Sounds", song="Infinite Dreams", explicit=False, releaseDate="2023-02-15", artistId="12349", favoriteCount=5723),
    Song(rank=1002, artist="EchoWave", song="Neon Skies", explicit=False, releaseDate="2023-03-20", artistId="79012", favoriteCount=4821),
    Song(rank=1003, artist="Velvet Dreams", song="Midnight Serenade", explicit=False, releaseDate="2023-04-10", artistId="34578", favoriteCount=6734),
    Song(rank=1004, artist="Sonic Fury", song="Electric Pulse", explicit=True, releaseDate="2023-05-05", artistId="90124", favoriteCount=3521),
    Song(rank=1005, artist="Celestial Beats", song="Lunar Whispers", explicit=False, releaseDate="2023-06-15", artistId="56790", favoriteCount=8123),
    Song(rank=1006, artist="Aurora Harmony", song="Eternal Sunshine", explicit=False, releaseDate="2023-07-22", artistId="23123", favoriteCount=6325),
    Song(rank=1007, artist="Inferno Squad", song="Firestorm", explicit=True, releaseDate="2023-08-18", artistId="45646", favoriteCount=4210),
    Song(rank=1008, artist="Enigma Groove", song="Mystic Rhythms", explicit=False, releaseDate="2023-09-09", artistId="78789", favoriteCount=5846),
    Song(rank=1009, artist="Crystal Waters", song="Silver Lining", explicit=False, releaseDate="2023-10-12", artistId="21321", favoriteCount=7212),
    Song(rank=1010, artist="Starship Grooves", song="Galactic Odyssey", explicit=False, releaseDate="2023-11-25", artistId="54654", favoriteCount=9337)
]

songs_dir = "songs"
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/songs-chart", response_model=List[Song])
def get_chart_data():
    return chart_data


@app.get("/api/artists-chart", response_model=List[Song])
def get_chart_data():
    return chart_data


@app.get("/api/albums-chart", response_model=List[Song])
def get_chart_data():
    return chart_data


@app.get("/api/playlists-chart", response_model=List[Song])
def get_chart_data():
    return chart_data


@app.get("/api/clips-chart", response_model=List[Song])
def get_chart_data():
    return chart_data


@app.get("/songs/")
async def get_songs():
    song_files = os.listdir(songs_dir)
    return {"songs": song_files}


@app.get("/songs/{song_name}")
async def download_song(song_name: str):
    song_path = os.path.join(songs_dir, song_name)
    if os.path.exists(song_path):
        return FileResponse(song_path)
    else:
        return {"error": "Song not found"}


if __name__ == "__main__":
    import uvicorn

    # ssl_context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
    # ssl_context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")
    # , ssl_version=ssl.PROTOCOL_TLS, ssl_keyfile="key.pem", ssl_certfile="cert.pem"
    uvicorn.run(app, host="0.0.0.0", port=8000)
