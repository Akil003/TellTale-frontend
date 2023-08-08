import '../../styles/Home/Row.css'
import axios from '../../utils/axios'
import recommendation from '../../utils/axiosRecommendation'
import Row from './Row'
import { useQuery } from '@tanstack/react-query'
import Alternate from '../Poster/Alternate'
import Cookies from 'js-cookie'

const NUM_OF_ROWS = 20

export default function Rows() {
    const { data: recommendations, isError, isLoading } = useQuery({
        queryKey: [Cookies.get('email')],
        queryFn: fetchRecommendations
    })

    if (isError) {
        return <Alternate parentClass="rows" message={"Error..."} />
    }
    if (isLoading) {
        console.log('recommendations loading...')
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

    async function fetchRecommendations() {
        const email = Cookies.get('email')
        if (email == '') {
            return []
        }


        const response = await axios.get(`/query/prevWatched/?email=${email}`)
        const watched = response.data
        let watched_books = watched.map(book => ({id : book.id, title: book.title}))

        shuffle(watched_books)

        if (watched_books.length > NUM_OF_ROWS){
            watched_books = watched_books.slice(0, NUM_OF_ROWS)
        }

        async function getRecommendations(id){
            const response = await recommendation(`/?id=${id}`)
            return response.data
        }
        console.log('watched books', watched_books)

        const recommendations = await Promise.all(watched_books.map(
            async (book) => {
                return {title : book.title, recommendations: await getRecommendations(book.id)}
            }
        ))
        console.log("recommendations", recommendations)
        return recommendations
    }

    console.log('recommendations loaded', recommendations.length)
    return (
        <div className='rows'>
            {
                Cookies.get('email') === '' && <Alternate parentClass="recommendations" message={"Please sign in to get recommendations..."}/>
            }
            {
                Cookies.get('email') !== '' && recommendations.length === 0 && <Alternate parentClass="recommendations" message={"Please listen to some audiobooks to get recommendations..."} />
            }
            {recommendations.map((book, index) => {
                return <Row key={index} title={`Because you listened to ${book.title}`} url={`/query/ids/?ids=[${book.recommendations}]`} />
            }
            )
            }
        </div>
    )
}
