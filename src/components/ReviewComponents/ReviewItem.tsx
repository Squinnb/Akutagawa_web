import React from 'react'
import '../../details.css'
import glasses from '../../icons/glasses.png'


interface ReviewData {
    id?: number;
    user: string;
    book: number;
    date: string;
    text: string;
    title: string;
}

export default function ReviewItem(props: ReviewData) {
    return (
        <div className='review_item'>
            <div className='reviewImageNameContainer'> <img src={glasses} alt="..." /> <div className='reviewItemName'> { props.user}</div> </div> 
            <b>{props.title}</b> 
            <p className='reviewItemText'>{props.text}</p>
        </div>
    )
}
