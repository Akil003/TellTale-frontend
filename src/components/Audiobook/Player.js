import React, { useState, useEffect, useRef } from 'react'
import axios from '../../utils/axios'
import { useLocation } from 'react-router-dom'
import '../../styles/Audiobook/Player.css'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Volume from './Volume'

export default function Player({ ebook }) {
    const [index, setIndex] = useState(0)
    const [volume, setVolume] = useState(0)
    const [volumeAnimation, setVolumeAnimation] = useState(false)

    const audioRef = useRef()

    useEffect(()=>{
        
    })

    useEffect(() => {
        console.log(ebook)
        if (index) {
            let audio = audioRef.current;
            if (audio) {
                audio.load();
                audio.play()
            }
        }
    }, [index]);

    const [previousKey, setPreviousKey] = useState(null);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault(); // Prevent scrolling when ArrowRight is pressed
                handleArrowKeyPress('ArrowRight');
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault(); // Prevent scrolling when ArrowLeft is pressed
                handleArrowKeyPress('ArrowLeft');
            }
        };

        const handleArrowKeyPress = (key) => {
            if (previousKey === key) {
                clearTimeout(timer);
                setPreviousKey(null);
                setTimer(null);
                switchToNextIndex();
            } else {
                setPreviousKey(key);
                setTimer(setTimeout(() => {
                    setPreviousKey(null);
                    setTimer(null);
                    if (key === 'ArrowRight') {
                        fastForward();
                    } else if (key === 'ArrowLeft') {
                        fastBackward();
                    }
                }, 400)); // Adjust the delay duration as needed (in milliseconds)
            }
        };

        const switchToNextIndex = () => {
            // Implement your logic to switch to the next index here
            setIndex((prevIndex) => prevIndex + 1);
        };

        const fastForward = () => {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration;
            const skipTime = 10; // Number of seconds to fast-forward
            const newTime = currentTime + skipTime;

            if (newTime < duration) {
                audioRef.current.currentTime = newTime;
            } else {
                audioRef.current.currentTime = duration;
            }
        };

        const fastBackward = () => {
            const currentTime = audioRef.current.currentTime;
            const skipTime = 10; // Number of seconds to fast-backward
            const newTime = currentTime - skipTime;

            if (newTime > 0) {
                audioRef.current.currentTime = newTime;
            } else {
                audioRef.current.currentTime = 0;
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [index, previousKey, timer]);


    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === ' ') {
                event.preventDefault(); // Prevent scrolling when spacebar is pressed
                toggleAudioPlayback();
            }
            let volumeKeyPressed = false;
            let volume;
            if (event.key === 'ArrowUp') {
                event.preventDefault(); // Prevent scrolling when ArrowUp is pressed
                volume = increaseVolume();
                volumeKeyPressed = true;
            } else if (event.key === 'ArrowDown') {
                event.preventDefault(); // Prevent scrolling when ArrowDown is pressed
                volume = decreaseVolume();
                volumeKeyPressed = true;
            }

            if (volumeKeyPressed) {
                volumeKeyPressed = false;
                setVolume(volume)
                setVolumeAnimation(true);
                setTimeout(() => {
                    setVolumeAnimation(false)
                }, 2000)
            }
        };


        const toggleAudioPlayback = () => {
            if (audioRef.current.paused) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        };

        const increaseVolume = () => {
            if (audioRef.current.volume < 1) {
                audioRef.current.volume += 0.1;
                return audioRef.current.volume
            }
            return 1;
        };

        const decreaseVolume = () => {
            if (audioRef.current.volume > 0) {
                audioRef.current.volume -= 0.1;
                return audioRef.current.volume
            }
            return 0;
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);



    function handlePageChange(event) {
        setIndex(event.selected)
    }

    return (
        <div className='right__wrapper'>
            {volumeAnimation && <Volume volume={Math.floor(Number(volume) * 100)} />}
            <div className='section__header'>{Number(index) + 1}. {ebook.sections && ebook.sections[index]?.title}</div>

            {ebook.sections && ebook.sections[index]?.readers &&
                <div className='audio__reader'> {<FontAwesomeIcon icon={faMicrophone} />} &nbsp;
                    {ebook.sections[index].readers[0].display_name}
                </div>
            }

            <div className='audio__wrapper'>
                <audio autoPlay ref={audioRef} className='audio__player' controls >
                    {
                        <source src={ebook.sections && ebook.sections[index]?.listen_url} type="audio/mp3" className='section__source' />
                    }
                </audio>
            </div>




            <ReactPaginate
                onPageChange={handlePageChange}
                breakLabel="..."
                pageCount={ebook?.sections?.length}
                previousLabel={<FontAwesomeIcon icon={faAngleDoubleLeft} />}
                nextLabel={<FontAwesomeIcon icon={faAngleDoubleRight} />}
                pageRangeDisplayed={2}
                renderOnZeroPageCount={null}
                containerClassName="pagination__container"
                activeClassName="pagination__active"
                pageClassName="pagination__page"
                previousClassName="pagination__previous"
                nextClassName="pagination__next"
                breakClassName="pagination__break"
                pageLinkClassName="pagination__page-link"
            />

        </div>
    )
}
