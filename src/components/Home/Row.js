
import Poster from '../Poster/Poster';
import axios from '../../utils/axios'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import Alternate from '../Poster/Alternate';
import { LazyLoadComponent } from 'react-lazy-load-image-component';
import "../../styles/Home/Row.css"

function Row({ title, url }) {
  const { data: ebooks, isError, isLoading } = useQuery({
    queryKey: ["title", url],
    queryFn: fetchData
  })

  if (isError) {
    return <Alternate parentClass={"row__posters"} message={"Error..."} />
  }

  if (isLoading) {
    return <Alternate parentClass={"row__posters"} message={undefined} />
  }

  async function fetchData() {
    const request = await axios.get(url);
    let items = request.data
    items = items.filter(item => item.coverImageURL)
    // console.log(items)
    return items
  }
  return (
    <div className='row'>
      <LazyLoadComponent>

        <h2 className='row__title'>{title}</h2>
        <div className="row__posters">
          {
            ebooks.map((ebook) => (
              <Poster key={ebook._id} ebook={ebook} />
            ))
          }
        </div>
      </LazyLoadComponent>

    </div>

  )
}

export default Row