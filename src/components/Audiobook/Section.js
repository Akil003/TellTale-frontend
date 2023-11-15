import React from 'react'
import { useMediaControlContext } from '../../context/Context';

export default function ({section, index, book}) {
    const mediaContext = useMediaControlContext();

    const changeSection = (index) => {
        mediaContext.updateIndex(index)
        mediaContext.updateIsPlaying(true)
        mediaContext.updateBook(book)
        mediaContext.updateIsActive(true)
    }

    return (
        <div className={`audiobook__section ${index==mediaContext.mediaControl.index && 'selected'}`} key={index} onClick={() => changeSection(index)}>
            <div className="audiobook__section__title">{section.title}</div>
            <div className="audiobook__section__duration">{section.duration}</div>
        </div>
    )
}