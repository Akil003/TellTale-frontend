import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import Alternate from './Alternate'
import Cookies from 'js-cookie'
import axios from './../../utils/axios'
import { useMediaControlContext } from '../../context/Context'

export default function BigPoster() {
    const location = useLocation()
    const mediaContext = useMediaControlContext();
    const [index, setIndex] = useState(0);

    useEffect(()=>{
        setIndex(0)
    },[])

    const handleBigPlay = () => {
        if (!mediaContext.mediaControl.isActive) {
            mediaContext.updateIsActive(true)
        }

        if (ebook == mediaContext.mediaControl.book) {
            mediaContext.updateIsPlaying(!mediaContext.mediaControl.isPlaying)
            mediaContext.updateIndex(mediaContext.mediaControl.index)
        }
        else {
            mediaContext.updateBook(ebook)
            mediaContext.updateIsPlaying(true)
            mediaContext.updateIndex(0)
        }

        console.log('media control updated from BigPoster', ebook)
    }

    useEffect(() => {
        setIndex(mediaContext.mediaControl.index)
    }, [mediaContext.mediaControl.index])

    const { data: { ebook }, isError, isLoading } = useQuery({
        queryKey: ["ebook", location.state],
        queryFn: () => {
            return location.state
        }
    })

    useEffect(() => {
        async function record() {
            console.log('email', Cookies.get('email'))
            if (Cookies.get('email') != '') {
                await axios.post(`/watched`, {
                    email: Cookies.get('email'),
                    ebook: { id: ebook._id, title: ebook.title }
                })
            }
        }

        record()
    }, [ebook])

    if (isError) {
        return <Alternate parentClass={'left_wrapper'} />
    }
    if (isLoading) {
        return <Alternate parentClass={'left__wrapper'} />
    }

    return (
        <>
            <div className={`left__wrapper`}>
                <img
                    className={`audiobook__image`}
                    src={ebook.coverImageURL}
                    alt={ebook.title}
                />
            </div>
            <div className='right__wrapper'>
                <div className='section__title'>
                    <h2>{ebook.sections[index]?.title}</h2>
                </div>
                <div className='big__play__wrapper'>
                    <a className={`big__play__button ${mediaContext.mediaControl.isPlaying && mediaContext.mediaControl.book == ebook && 'playing'}`} onClick={handleBigPlay}>
                        {(mediaContext.mediaControl.isPlaying && mediaContext.mediaControl.book == ebook) ? 'Pause' : 'Play'}
                    </a>
                </div>
                <div className="audiobook__details">

                    <table className="audiobook__labels">
                        <tbody>

                            <tr>
                                <td>Authors:</td>
                                <td>
                                    {ebook.authors?.map((author, index) => (
                                        <div key={index}>{author.first_name} {author.last_name}</div>
                                    ))}
                                </td>
                            </tr>
                            {ebook.language && (
                                <tr>
                                    <td>Language:</td>
                                    <td>{ebook.language}</td>
                                </tr>
                            )}
                            {ebook.totaltimesecs && (
                                <tr>
                                    <td>Duration:</td>
                                    <td>
                                        {(() => {
                                            const secs = ebook.totaltimesecs;
                                            const hours = Math.floor(secs / 3600);
                                            const minutes = Math.floor((secs - hours * 3600) / 60);
                                            return `${hours} hr ${minutes} mins`;
                                        })()}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td>Genres:</td>
                                <td>
                                    {ebook.genres?.map((genre, index) => (
                                        <div key={index}>{genre.name}</div>
                                    ))}
                                </td>
                            </tr>
                            {ebook.copyright_year && ebook.copyright_year !== "0" && (
                                <tr>
                                    <td>Copyright year:</td>
                                    <td>{ebook.copyright_year}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    )
}
