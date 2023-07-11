import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Alternate from './Alternate';
import '../../styles/Home/Poster.css'
import axiosInteraction from '../../utils/axiosInteraction'
import supabase from '../../utils/supabase';

export default function Poster({ ebook }) {
    const navigate = useNavigate();

    const fetchImage = async () => {
        const id = ebook._id;
        const folder = Math.floor(id / 1000);
        const response = await fetch(
            `https://raw.githubusercontent.com/Akil003/TaleTell-static-files/main/${folder}/${id}.webp`
        );
        const data = await response.blob();
        return URL.createObjectURL(data);
    };

    const { data: url, isLoading, isError } = useQuery(['image', ebook], fetchImage);

    async function handleClick(ebook) {

        const session = await supabase.auth.getSession()
        console.log('session', session.data)
        const progress = {}
        if (session.data.session !== null) {
            await axiosInteraction.post('/progress/start', { ebookID: ebook._id }, {
                headers: {
                    'x-access-token': session.data.session.access_token
                }
            }).then((progress) => {
                navigate('/audiobook', { state: { ebook, progress: progress.data } });
            })
                .catch((e) => {
                    console.log('no progress records')
                    navigate('/audiobook', { state: { ebook, progress: progress.data } });

                })
        }
        else
            navigate('/audiobook', { state: { ebook, progress: progress.data } });

    }

    if (isLoading) {
        return <Alternate parentClass='row__poster' />
    }

    if (isError) {
        return <Alternate parentClass='row__poster' />
    }

    return (

        <div className={`row__poster`} onClick={() => handleClick(ebook)}>
            <LazyLoadImage className={`poster__image`} src={url} alt={ebook.title} effect='blur' />
            <div className="poster__details">
                <div className="poster__title">{ebook.title}</div>
                <table className="poster__labels">
                    <tbody>
                        <tr>
                            <td>Authors:</td>
                            <td>
                                {ebook.authors && ebook.authors.map((author, index) => (
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
                                {ebook.genres && ebook.genres.map((genre, index) => (
                                    <div key={index}>{genre.name}</div>
                                ))}
                            </td>
                        </tr>
                        {ebook.copyright_year && (
                            <tr>
                                <td>Copyright year:</td>
                                <td>{ebook.copyright_year}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
