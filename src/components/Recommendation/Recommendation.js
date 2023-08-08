import React from 'react'
import Rows from './Rows'

export default function Home() {
  return (
    <div className='recommendations' style={{"height":"100vh"}}>
        <div className='transition' style={{"height":"90px"}}></div>
        <Rows />
    </div>
  )
}
