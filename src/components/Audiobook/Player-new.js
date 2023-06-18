import React, { useState, useEffect, useRef } from 'react'
import '../../styles/Audiobook/Player.css'
import ReactPaginate from 'react-paginate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleDoubleRight, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import Volume from './Volume'
import axiosInteraction from '../../utils/axiosInteraction';
import supabase from "../../utils/supabase"

export default function Player({ ebook }) {
    const [index, setIndex] = useState(0)
    const [volume, setVolume] = useState(0)
    const [volumeAnimation, setVolumeAnimation] = useState(false)

    const audioRef = useRef()

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

    const saveProgress = async (index, time) => {
        const session = await supabase.auth.getSession()
        if (session.data.session != null) {
            await axiosInteraction.patch('/progress/sectionChange', {
                ebookID: ebook._id, section: index, progress: time
            }, {
                headers: {
                    'x-access-token': session.data.session.access_token
                }
            })
        }
    }

    const saveLastListened = async (index, time) => {
        const session = await supabase.auth.getSession()
        if (session.data.session != null) {
            await axiosInteraction.patch('/progress/saveProgress', {
                ebookID: ebook._id, duration: totalDuration, lastSection: index, sectionProgress: time
            }, {
                headers: {
                    'x-access-token': session.data.session.access_token
                }
            })
        }
    }

    const handleSectionChange = async (index, newIndex, time) => {
        if (startTime){
            const duration = Math.round(Date.now() - startTime)/1000
            setTotalDuration(prevDuration => prevDuration + duration)
        }
        saveProgress(index, time)
        setPrevIndex(index)
        setIndex(newIndex)
    }


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                event.preventDefault(); // Prevent scrolling when ArrowRight is pressed
                fastForward();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault(); // Prevent scrolling when ArrowLeft is pressed
                fastBackward();

            }
            else if (event.key === 'n') {
                if (index < ebook.sections.length - 1) {
                    handleSectionChange(index, index + 1, audioRef.current.currentTime)
                }
            }
            else if (event.key === 'p') {
                if (index > 0) {
                    handleSectionChange(index, index - 1, audioRef.current.currentTime)
                }
            }
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
    }, [index]);


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

    async function getUserProgress(ebookID, token){
        const resp = await axiosInteraction.get(`/progress?ebookID=${ebookID}`, {
            headers: {
                'x-access-token' : token
            }
        })
        console.log('progress', resp.data)
    }

    // useEffect(async ()=>{
    //     const session = await supabase.auth.getSession()
    //     if (session.data.session != null){
    //         const {index, progress} = getUserProgress(ebook._id, session.data.session.access_token)

    //     }
    // }, [])



    function handlePageChange(event) {
        handleSectionChange(index, event.selected, audioRef.current.currentTime)
    }


    /*
        This section is used to record the progress and duration of the audiobook played
    */

    const [prevIndex, setPrevIndex] = useState(null)

    useEffect(() => {
        // for autoplay
        setStartTime(new Date())

      
    }, [index])

    

    const [startTime, setStartTime] = useState(null);
    const [totalDuration, setTotalDuration] = useState(0);

    useEffect(() => {
        console.log(audioRef.current.currentTime)
        saveProgress(index, audioRef.current.currentTime)
        saveLastListened(index, audioRef.current.currentTime)
    }, [totalDuration])

    const handlePlay = () => {
        // Store the start time when audio playback starts
        setStartTime(new Date());
        console.log(startTime)

    };

    const handlePause = () => {
        if (startTime) {
            // Calculate the duration by subtracting the start time from the current time
            const endTime = new Date();
            console.log(startTime, endTime, totalDuration, endTime - startTime)
            const duration = Math.round((endTime - startTime) / 1000); // Duration in seconds

            // Update the total duration
            setTotalDuration(totalDuration => totalDuration + duration);
            console.log(totalDuration)


            // Reset the start time
            setStartTime(null);
        }
    };

    const handleTimeUpdate = () => {
        // Update the total duration continuously during playback
        // if (startTime) {
        //     const currentTime = audioRef.current.currentTime;
        //     const duration = Math.floor((currentTime - startTime.getTime() / 1000)); // Duration in seconds

        //     setTotalDuration(totalDuration + duration);
        // }
    };

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
                <audio autoPlay className='audio__player'
                    ref={audioRef}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onTimeUpdate={handleTimeUpdate}
                    controls>
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
