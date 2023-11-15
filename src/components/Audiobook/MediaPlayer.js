import React, { useRef, useState, useEffect, useContext } from 'react';
import './../../styles/Audiobook/Player.css'; // Import your CSS file
import { IoPlaySkipForwardOutline, IoPlaySkipBackOutline, IoPlayForwardOutline, IoPlayBackOutline } from "react-icons/io5";
import { IconContext } from 'react-icons';
import { useMediaControlContext } from '../../context/Context';

const AudioPlayer = () => {
    const mediaContext = useMediaControlContext();
    const [audioElement, setAudioElement] = useState()

    // change source when the book updates
    useEffect(() => {
        if (audioElement == null) return;
        audioElement.pause()
        audioElement.load()
        audioElement.play()
    }, [mediaContext.mediaControl.book])

    useEffect(() => {
        console.log('section changed', mediaContext)
        if (audioElement == null) return;
        audioElement.pause()
        audioElement.load()
        audioElement.play()
    }, [mediaContext.mediaControl.index])


    useEffect(() => {
        const audioElement = mediaContext.mediaControl.audioRef.current
        setAudioElement(audioElement)

    }, [mediaContext.mediaControl.audioRef])

    useEffect(() => {
        console.log('is playing', mediaContext.mediaControl.isPlaying)
        if (audioElement == null) return;
        if (mediaContext.mediaControl.isPlaying) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    }, [mediaContext.mediaControl.isPlaying])

    const handleFastForward = () => {
        audioElement.currentTime += 10;
    };

    const handleRewind = () => {
        audioElement.currentTime -= 10;
    };

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        if (audioElement == null) return;
        const intervalId = setInterval(() => {
            setCurrentTime(audioElement.currentTime);
        }, 1000);

        audioElement.onloadedmetadata = () => {
            setDuration(audioElement.duration)
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [audioElement]);


    return (

        <div className="audio-player-container">
            <div className="progress-bar-container">
                <div
                    className="progress-filled"
                    style={{ width: `${(currentTime / duration) * 100}%`}}
                />
            </div>

            <div className="audio-controls-wrapper">
                <span className="current-time">{formatTime(currentTime)}</span>

                <div className="audio-controls">
                    <IconContext.Provider value={{ size: "2em" }}>

                        <span className='span-icon' onClick={handleRewind}>
                            <IoPlayBackOutline className='control-button'/>
                        </span>

                        <span className='span-icon'>
                            <IoPlaySkipBackOutline className='control-button'/>
                        </span>

                        <PlayPauseButton />

                        <span className='span-icon'>
                            <IoPlaySkipForwardOutline className='control-button'/>
                        </span>
                        <span className='span-icon' onClick={handleFastForward}>
                            <IoPlayForwardOutline className='control-button'/>
                        </span>

                    </IconContext.Provider>


                    <audio autoPlay ref={mediaContext.mediaControl.audioRef} >
                        <source src={mediaContext.mediaControl.book.sections && mediaContext.mediaControl.book.sections[mediaContext.mediaControl.index]?.listen_url} type="audio/mp3" className='section__source' />
                    </audio>

                </div >
                <span className="total-time">{formatTime(duration)}</span>

            </div>
        </div>
    );
};

const PlayPauseButton = () => {
    const mediaContext = useMediaControlContext();

    return (
        <div className="play-pause-wrapper">
            <label htmlFor="checkbox" className="button-label">
                <div className={`playPauseIcon ${mediaContext.mediaControl.isPlaying ? 'pause' : 'play'}`}></div>
            </label>
            <input
                type="checkbox"
                id="checkbox"
                onChange={() => {
                    mediaContext.updateIsPlaying(!mediaContext.mediaControl.isPlaying)
                }}
                className="hidden-checkbox"
            />
        </div>
    );
};


const formatTime = (time) => {
    if (!time) return '00:00:00'
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export default AudioPlayer;
