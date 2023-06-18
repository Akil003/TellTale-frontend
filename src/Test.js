import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function Test() {
    const imageQuery = useQuery({
        queryKey: ['poster'],
        queryFn: async () => {
            const response = await fetch('https://raw.githubusercontent.com/Akil003/TaleTell-static-files/main/0/76.webp');
            const data = await response.blob(); // Assuming you want to work with the image data as a blob
            return data;
        }
    })

    if (imageQuery.isLoading) return <div>Loading...</div>
    if (imageQuery.isError) return <div>Error...</div>



    return (
        <img src={URL.createObjectURL(imageQuery.data)} alt="Fetched Image" />
    )
}
