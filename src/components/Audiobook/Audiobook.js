import React from 'react'
import '../../styles/Audiobook/Audiobook.css'
import BigPoster from '../Poster/BigPoster'
import { useLocation } from 'react-router-dom'
import parse from 'html-react-parser'
// import Player from './Player'
// import Player from './Player2.0'
import MediaPlayer from './MediaPlayer';
import { useQuery } from '@tanstack/react-query'
import axios from '../../utils/axios'
import Alternate from '../Poster/Alternate'
import Section from './Section'

export default function Audiobook() {
    const location = useLocation()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['ebook', location.state],
        queryFn: fetchEBook
    })

    if (isLoading) {
        return <Alternate parentClass={'audiobook__page'} message={'loading...'} />
    }

    if (isError) {
        return <Alternate parentClass={'audiobook__page'} message={'Error...'} />
    }



    async function fetchEBook() {
        console.log('location', location.state)
        let { ebook, progress } = location.state
        console.log(ebook, progress)
        console.log('working...')
        if (!ebook) {
            window.history.back()
        }
        const response = await axios.get(`query/id?_id=${ebook._id}`)
        ebook = response.data
        return { ebook, progress }
    }

    return (
        <>
            <div className="audiobook__page">
                <div className="transition"></div>
                <div className="audiobook">
                    <h2 className="audiobook__header">{data.ebook.title}</h2>
                    <div className='audiobook__wrapper'>
                        <BigPoster />
                    </div>
                    <h2 className="description__header">Chapters</h2>
                    <div className='section__wrapper'>
                        {

                            data.ebook.sections.map((section, index) => {
                                return <Section section={section} index={index} book={data.ebook} key={index}/>
                            })
                        }
                    </div>


                    <h2 className="description__header">Description</h2>
                    {data.ebook.description &&
                        <div className="audiobook__description">{parse(data.ebook.description)}</div>}
                </div>
            </div>
        </>
    )
}
