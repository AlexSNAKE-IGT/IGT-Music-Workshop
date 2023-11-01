import React, { useState, useRef } from 'react';
import './AudioPlayer.css';
import favoriteIcon from '../../assets/icons/favorite.svg';
import forwardIcon from '../../assets/icons/forward.svg';
import pauseIcon from '../../assets/icons/pause.svg';
import queueIcon from '../../assets/icons/queue.svg';
import playIcon from '../../assets/icons/play.svg'
import revindIcon from '../../assets/icons/revind.svg';
import volumeIcon from '../../assets/icons/volume.svg';

const AudioPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioSrc, setAudioSrc] = useState(null);

    const loadAudio = () => {
        fetch('http://95.84.198.107:8000/songs/1.ogg')
            .then(response => response.blob())
            .then(blob => {
                const audioURL = URL.createObjectURL(blob);
                setAudioSrc(audioURL);
                audioRef.current.load();
            })
            .catch(error => console.error(error));
    };

    const playPauseAudio = () => {
        if (!audioSrc) {
            loadAudio();
        }

    if (audioRef.current.readyState >= 1) {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }
    };
    

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * duration;
        audioRef.current.currentTime = seekTime;
    };

    return (
        <>
        <div className="bottomBlur" />
        <div className="playerBlur" />
        <div className="audioPlayerContainer">
            <button className="audioPlayerButton">
                <img src={revindIcon} alt="" />
            </button>
            <button className="audioPlayerButton" onClick={playPauseAudio}>
                <img src={isPlaying ? pauseIcon : playIcon} alt="" />
            </button>
            <button className="audioPlayerButton">
                <img src={forwardIcon} alt="" />
            </button>
            <img
                className="audioPlayerCover"
                src="https://sun9-7.userapi.com/impg/bKfLHjAcLgdVqHtmtIPCGQJdtq-6ftVV2a0uSw/8Xm9PVOUKpc.jpg?size=500x468&quality=96&sign=40950620c2f544662128e050525fcb1e&c_uniq_tag=AjLN2Dxu7J0Np7p3SFy4p6_55wf7flua9IJMex_mwR8&type=album"
                alt=""
            />
            <div style={{ flexGrow: 1 }}>
                <div className="audioPlayerTextBox">
                    <div>
                        <span className="audioPlayerText700">Mother Mother</span>
                        <span className="audioPlayerText400"> — Haylloft</span>
                    </div>
                    <span className="audioPlayerText700">{`-${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`}</span>
                </div>
                <div>
                    <input
                        className="audioPlayerDuraion"
                        type="range"
                        id="seek-slider"
                        max="100"
                        value={duration > 0 ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeek}
                    />
                </div>
            </div>
            <button className="audioPlayerButton">
                <img src={favoriteIcon} alt="" />
            </button>
            <button className="audioPlayerButton">
                <img src={queueIcon} alt="" />
            </button>
            <button className="audioPlayerButton">
                <img src={volumeIcon} alt="" />
            </button>
        </div>
        <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
        >
            <source src={audioSrc} type="audio/ogg" />
        </audio>
        </>
    );
};

export default AudioPlayer;
