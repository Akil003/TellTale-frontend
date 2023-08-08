import '../../styles/Home/Row.css'
import axios from '../../utils/axios'
import recommendation from '../../utils/axiosRecommendation'
import Row from './Row'
import { useQuery } from '@tanstack/react-query'
import Alternate from '../Poster/Alternate'
import Cookies from 'js-cookie'

const NUM_OF_ROWS = 200


export default function Rows() {
    const { data: recommendations, isError, isLoading } = useQuery({
        queryKey: ["titles"],
        queryFn: fetchRecommendations
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

    async function fetchRecommendations() {
        const email = Cookies.get('email')
        if (email == '') {
            return []
        }

        const response = await axios.get(`/query/prevWatched/?email=${email}`)
        const watched = response.data
        const watched_books = watched.map(book => ({id : book.id, title: book.title}))
        shuffle(watched_books)

        async function getRecommendations(id){
            const response = await recommendation(`/?id=${id}`)
            return response.data
        }

        const recommendations = watched_books.map(
            book => {
                return {title : book.title, recommendations: getRecommendations(book.id)}
            }
        )

        return recommendations
    }


    return (
        <div className='rows'>
            {
                recommendations.length == 0 && <Alternate parentClass="rows" message={"Please Sign in to get recommendations..."} />
            }
            {recommendations.map((book, index) => {
                return <Row key={index} title={`Because you watched ${book.title}`} url={`/query/ids/?ids=${book.recommendations}`} />
            }
            )
            }
        </div>
    )
}
