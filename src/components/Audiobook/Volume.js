import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faVolumeUp} from'@fortawesome/free-solid-svg-icons'
import '../../styles/Audiobook/Volume.css'
export default function Volume({volume}) {
  return (
    <div className='volume'>
        <FontAwesomeIcon icon={faVolumeUp} size="3x"/>&nbsp;&nbsp; <div>{volume} %</div>
    </div>
  )
}
