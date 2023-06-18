import '../../styles/Home/Row.css'
import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios'
import Row from './Row'
import { useQuery } from '@tanstack/react-query'
import Alternate from '../Poster/Alternate'

const NUM_OF_ROWS = 200


export default function Rows() {
    const { data: titles, isError, isLoading } = useQuery({
        queryKey: ["titles"],
        queryFn: fetchData
    })


   

    if (isError) {
        return <Alternate parentClass="rows" message={"Error..."} />
    }
    if (isLoading) {
        return <Alternate parentClass="rows" message={"Loading..."} />
    }

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            let tmp = arr[j];
            arr[j] = arr[i]
            arr[i] = tmp
        }
    }

    async function fetchData() {
        const response = await axios.get('/query/titles')
        let { authors, genres, languages, periods } = response.data
        authors = authors.map((author) => ({ ...author, type: 'author' }))
        genres = genres.map((genre) => ({ ...genre, type: 'genre' }))
        languages = languages.map((language) => ({ ...language, type: 'language' }))
        periods = periods.map((period) => ({ ...period, type: 'period' }))

        const rows = [...authors, ...genres, ...languages, ...periods]
        shuffle(rows)
        return rows.slice(0, Math.min(NUM_OF_ROWS, rows.length))
    }


    return (
        <div className='rows'>
            {titles.map((title, index) => {
                if (title.type === 'author') {
                    const key = `By ${title._id.firstName} ${title._id.lastName}`
                    return <Row key={index} title={key} url={`/query/author/?firstName=${title._id.firstName}&lastName=${title._id.lastName}`} />
                } else if (title.type === 'language') {
                    const key = `${title._id} Audiobooks`
                    return <Row key={index} title={key} url={`/query/language/?language=${title._id}`} />
                } else if (title.type === 'genre') {
                    const key = `${title._id}`
                    return <Row key={index} title={key} url={`/query/genre/?genre=${encodeURIComponent(title._id)}`} />
                } else if (title.type === 'period') {
                    let key
                    if (title.from !== "2000") {
                        key = `From ${title.from} to ${title.to}`
                    }
                    else {
                        key = `${title.from} onwards...`
                    }
                    return <Row key={index} title={key}
                        url={`/query/period/?from=${title.from}&to=${title.to}`} />
                }
                return <></>
            }
            )
            }
        </div>
    )
}
