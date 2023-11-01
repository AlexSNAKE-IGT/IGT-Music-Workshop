from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from datetime import datetime
from operator import attrgetter
from typing import List

import os

# import ssl

app = FastAPI()


class Song(BaseModel):
    rank: int
    artist: str
    song: str
    explicit: bool
    releaseDate: datetime
    playedCount: int
    favoriteCount: int


class Artist(BaseModel):
    rank: int
    artist: str
    songsCount: int
    playedCount: int
    favoriteCount: int


class Album(BaseModel):
    rank: int
    artist: str
    name: str
    songCount: int
    playedCount: int
    favoriteCount: int


class Playlist(BaseModel):
    rank: int
    owner: str
    name: str
    songCount: int
    playedCount: int
    favoriteCount: int


class Clip(BaseModel):
    rank: int
    artist: str
    song: str
    explicit: bool
    viewsCount: int
    favoriteCount: int


track_chart_data = [
    Song(rank=7777, artist="Mother Mother", song="Haylloft", explicit=True, releaseDate=datetime(2023, 10, 24),
         playedCount=78444, favoriteCount=14568),
    Song(rank=1, artist="B", song="A", explicit=False, releaseDate=datetime(1990, 1, 1), playedCount=1,
         favoriteCount=1),
    Song(rank=1001, artist="Stellar Sounds", song="Infinite Dreams", explicit=False, releaseDate=datetime(2023, 2, 15),
         playedCount=12349, favoriteCount=5723),
    Song(rank=1002, artist="EchoWave", song="Neon Skies", explicit=False, releaseDate=datetime(2023, 3, 20),
         playedCount=79012,
         favoriteCount=4821),
    Song(rank=1003, artist="Velvet Dreams", song="Midnight Serenade", explicit=False, releaseDate=datetime(2023, 4, 10),
         playedCount=34578, favoriteCount=6734),
    Song(rank=1004, artist="Sonic Fury", song="Electric Pulse", explicit=True, releaseDate=datetime(2023, 5, 5),
         playedCount=90124, favoriteCount=3521),
    Song(rank=1005, artist="Celestial Beats", song="Lunar Whispers", explicit=False, releaseDate=datetime(2023, 6, 15),
         playedCount=56790, favoriteCount=8123),
    Song(rank=1006, artist="Aurora Harmony", song="Eternal Sunshine", explicit=False, releaseDate=datetime(2023, 7, 22),
         playedCount=23123, favoriteCount=6325),
    Song(rank=1007, artist="Inferno Squad", song="Firestorm", explicit=True, releaseDate=datetime(2023, 8, 18),
         playedCount=45646, favoriteCount=4210),
    Song(rank=1008, artist="Enigma Groove", song="Mystic Rhythms", explicit=False, releaseDate=datetime(2023, 9, 9),
         playedCount=78789, favoriteCount=5846),
    Song(rank=1009, artist="Crystal Waters", song="Silver Lining", explicit=False,
         releaseDate=datetime(2023, 10, 12), playedCount=21321,
         favoriteCount=7212),
    Song(rank=1010,
         artist="Starship Grooves",
         song="Galactic Odyssey",
         explicit=False,
         releaseDate=datetime(2023,
                              11,
                              25),
         playedCount=54654,
         favoriteCount=9337)
]

artist_chart_data = [
    Artist(rank=1, artist="HighLust", songsCount=3, playedCount=78444, favoriteCount=14568),
    Artist(rank=2, artist="GdePerry", songsCount=3, playedCount=78444, favoriteCount=14568),
    Artist(rank=3, artist="Reych1", songsCount=3, playedCount=78444, favoriteCount=14568),
]

album_chart_data = [
    Album(rank=1, artist="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Album(rank=2, artist="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Album(rank=3, artist="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Album(rank=4, artist="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Album(rank=5, artist="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
]

playlist_chart_data = [
    Playlist(rank=1, owner="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Playlist(rank=2, owner="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Playlist(rank=3, owner="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Playlist(rank=4, owner="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
    Playlist(rank=5, owner="Reych1", name="FEEL", songCount=4, playedCount=12388, favoriteCount=213),
]

clip_chart_data = [
    Clip(rank=1, artist="Offwhite", song="LaLaLa", explicit=True, viewsCount=73256, favoriteCount=213),
    Clip(rank=1, artist="Offwhite", song="LaLaLa", explicit=True, viewsCount=73256, favoriteCount=213),
    Clip(rank=1, artist="Offwhite", song="LaLaLa", explicit=True, viewsCount=73256, favoriteCount=213),
    Clip(rank=1, artist="Offwhite", song="LaLaLa", explicit=True, viewsCount=73256, favoriteCount=213),
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
def get_songs_chart_data(
        date: str = Query("default", description="Date filter"),
        listeners: str = Query("default", description="Listeners filter"),
        likes: str = Query("default", description="Likes filter")
):
    filtered_data = track_chart_data

    if date == "increased":
        filtered_data.sort(key=attrgetter('releaseDate'))
    elif date == "decreased":
        filtered_data.sort(key=attrgetter('releaseDate'), reverse=True)

    if listeners == "increased":
        filtered_data.sort(key=attrgetter('playedCount'))
    elif listeners == "decreased":
        filtered_data.sort(key=attrgetter('playedCount'), reverse=True)

    if likes == "increased":
        filtered_data.sort(key=attrgetter('favoriteCount'))
    elif likes == "decreased":
        filtered_data.sort(key=attrgetter('favoriteCount'), reverse=True)

    if date == listeners == likes == "default":
        filtered_data.sort(key=attrgetter('rank'))

    return filtered_data


@app.get("/api/artists-chart", response_model=List[Artist])
def get_chart_data():
    return artist_chart_data


@app.get("/api/albums-chart", response_model=List[Album])
def get_chart_data():
    return album_chart_data


@app.get("/api/playlists-chart", response_model=List[Playlist])
def get_chart_data():
    return playlist_chart_data


@app.get("/api/clips-chart", response_model=List[Clip])
def get_chart_data():
    return clip_chart_data


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
