from fastapi import FastAPI, HTTPException, Depends, status, UploadFile, File, Form
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import motor.motor_asyncio
from typing import List, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
import os
import uuid
from jose import JWTError
from jwt import verify_password, get_password_hash, create_access_token, TokenData, ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM

from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from typing import Optional
from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017')
db = client["IGT-Community"]


class Song(BaseModel):
    title: str
    nickname: str
    plays: int
    likes: int

class Playlist(BaseModel):
    title: Optional[str]
    songs: List[Song]
    total_song_likes: int
    total_plays: int
    likes: int

class User(BaseModel):
    username: str
    email: str
    nickname: str
    password: str
    birthdate: str
    playlists: List[Playlist]




async def authenticate_user(username: str, password: str):
    user = await db.users.find_one({"username": username})
    if not user:
        return False
    if not verify_password(password, user["hashed_password"]):
        return False
    return user


@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Не верный логин или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/register")
async def register_user(user: User):
    hashed_password = get_password_hash(user.password)
    new_user = {
        "username": user.username,
        "email": user.email,
        "nickname": user.nickname,
        "birthdate": user.birthdate,
        "hashed_password": hashed_password,
        "registration_date": datetime.now()
    }

@app.post("/uploadfiles/")
async def create_upload_files(
        playlist_title: str = Form(""),
        song_titles: List[str] = Form(...),
        files: List[UploadFile] = File(...),
        token: str = Depends(oauth2_scheme)
):

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
    except JWTError:
        raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid token",
    headers={"WWW-Authenticate": "Bearer"},
    )

    if not playlist_title:
        playlist_title = song_titles[0] + " single"

    user = await db.users.find_one({"username": username})

    if user:
        nickname = user["nickname"]
    else:
        raise HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="User not found",
    headers={"WWW-Authenticate": "Bearer"},
    )

    song_ids = []
    for i in range(len(files)):
        file = files[i]
        song_title = song_titles[i]
        file_location = f"files/{file.filename}"
        with open(file_location, "wb+") as file_object:
            file_object.write(file.file.read())
        song_id = str(uuid.uuid4())
        os.rename(file_location, f"files/{song_id}.mp3")
        song_ids.append({"id": song_id, "title": song_title, "nickname": nickname, "plays": 0, "likes": 0})


    playlist = {
        "title": playlist_title,
        "songs": song_ids
    }

    song = {
        "title": playlist_title,
        "nickname": song_ids,
        "plays": 0,
        "likes": 0
    }

    db.playlists.insert_one(playlist)

    return {"info": "Files successfully uploaded", "songs": song_ids, "playlist_title": playlist_title}
