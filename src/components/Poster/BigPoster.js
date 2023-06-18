import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Alternate from './Alternate'

export default function BigPoster() {
    const location = useLocation()

    const {data : {ebook}, isError, isLoading} = useQuery({
        queryKey: ["ebook", location.state],
        queryFn: () => {
            return location.state
        }
    })

    if (isError){
        return <Alternate parentClass={'left_wrapper'} />
    }
    if (isLoading){
        return <Alternate parentClass={'left__wrapper'} />
    }

    return (
        <div className={`left__wrapper`}>
            <img
                className={`audiobook__image`}
                src={ebook.coverImageURL}
                alt={ebook.title}
            />
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
    )
}
