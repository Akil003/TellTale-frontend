import React, { useState, useEffect } from "react";
import axios from '../../utils/axios'
import '../../styles/Home/Banner.css'
import '../../styles/alternate.css'
import { useQuery } from '@tanstack/react-query'
import Alternate from "../Poster/Alternate";

const MAX_QUOTE_LENGTH = 250

function Banner() {
    function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    const bannerQuery = useQuery({
        queryKey: ["banner"],
        queryFn: fetchBanner,
        // refetch interval to be 10 minutes
    })

    const quoteQuery = useQuery({
        queryKey: ["quote"],
        queryFn: fetchQuote

    })

    if (bannerQuery.isError || quoteQuery.isError) {
        return <Alternate parentClass={'banner'} message={'Error...'} />
    }
    if (bannerQuery.isLoading || quoteQuery.isLoading) {
        return <Alternate parentClass={'banner'} message={'Loading...'} />
    }


    async function fetchQuote() {
        const request = await axios.get(`/query/quote`)
        return request.data
    }

    async function fetchBanner() {
        // this returns the image file names
        let images = await axios.get('/banner', {
            // baseURL: `http://localhost:3000`
            baseURL: `https://telltale-frontend.onrender.com/`
        })
        images = [...images.data]
        const path = getRandom(images)
        return path
    }

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("/banner/${bannerQuery.data}")`,
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
                    - {bannerQuery.data.author}
                </h1>
            </div>
            {/* Empty fade div with bottom fade effect  */}
            <div className="banner--fadeBottom"></div>
        </header>
    );
}

export default Banner;
