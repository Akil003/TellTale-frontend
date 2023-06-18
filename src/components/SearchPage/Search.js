import React, { useEffect, useState } from 'react'
import '../../styles/SearchPage/Search.css'
import axios from '../../utils/axios'
import Poster from '../Poster/Poster';
import { useLocation } from 'react-router-dom';

export default function Search() {
    const [books, setBooks] = useState([]);
    const location = useLocation()

    useEffect(() => {
        async function fetchEBooks() {
            if (!location.state){
                console.log(location.state)
                return
            }
            const keywords = location.state
            const request = await axios.get(`query/search/?keywords=${keywords}`)
            const ebooks = request.data.filter(ebook => ebook.coverImageURL)
            setBooks(ebooks)
        }
        fetchEBooks()
    }, [location.state])

    return (
        <>

            <div className='search__page'>
                <div className='transition'></div>
                <h2 className='search__header'>Search Results...</h2>
                <div className='search__results'>
                    {
                        books.map((ebook) => (
                            <Poster key={ebook._id} ebook={ebook} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}
