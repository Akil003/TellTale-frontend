import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
import '../../styles/Home/Banner.css'
import '../../styles/alternate.css'
import { useQuery } from '@tanstack/react-query'
import Alternate from "../Poster/Alternate";

const MAX_QUOTE_LENGTH = 250
const BACKEND_URL = `https://telltale-backend-0tqm.onrender.com/`

function Banner() {
    const quoteQuery = useQuery({
        queryKey: ["quote"],
        queryFn: fetchQuote

    })

    if (quoteQuery.isError) {
        return <Alternate parentClass={'banner'} message={'Error...'} />
    }
    if (quoteQuery.isLoading) {
        return <Alternate parentClass={'banner'} message={'Loading...'} />
    }

    async function fetchQuote() {
        const request = await axios.get(`/query/quote`)
        console.log(request.data)
        return request.data
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${BACKEND_URL}query/banner)`,
                backgroundPosition: "center center",
                backgroundBlendMode: "difference"
            }}
        >
            <div className="banner__contents">

                <div className="banner__buttons">
                    <button className="banner__button">My List</button>
                </div>

                <h1 className="banner__description">
                    {truncate(quoteQuery.data.quote, MAX_QUOTE_LENGTH)}
                </h1>
                <h1 className="banner__title">
                    - {quoteQuery.data.author}
                </h1>
            </div>
            {/* Empty fade div with bottom fade effect  */}
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;
