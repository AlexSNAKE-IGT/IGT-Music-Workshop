import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const UploadItem = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [playlistTitle, setPlaylistTitle] = useState('');
  const [songTitles, setSongTitles] = useState(['']);

  const handleFileChange = (event) => {
      setSelectedFiles(event.target.files);
      setSongTitles(Array.from({ length: event.target.files.length }, () => ''));
  };

  const handleTitleChange = (event, index) => {
      const newSongTitles = [...songTitles];
      newSongTitles[index] = event.target.value;
      setSongTitles(newSongTitles);
  };

  const handlePlaylistTitleChange = (event) => {
      setPlaylistTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
    
    const token = Cookies.get('token');

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
        formData.append('song_titles', songTitles[i]);
    }
    formData.append('playlist_title', playlistTitle);

    try {
        const response = await axios.post('http://localhost:8000/uploadfiles/', formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
  };

  return (
      <form style={{background:"green",padding:"5px"}} onSubmit={handleSubmit}>
          <input type="file" multiple onChange={handleFileChange} />
          {songTitles.map((title, index) => (
              <input
                  key={index}
                  type="text"
                  value={title}
                  onChange={(event) => handleTitleChange(event, index)}
                  placeholder="Название песни"
              />
              ))}
          <input type="text" value={playlistTitle} onChange={handlePlaylistTitleChange} placeholder="Название плейлиста" />
          <button type="submit">Загрузить</button>
      </form>
      );
}

export default UploadItem;
