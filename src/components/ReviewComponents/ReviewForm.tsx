import {useState, useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import '../../details.css'

interface Props {
    reviewTitle: string;
    setReviewTitle: Function;
    reviewText: string;
    setReviewText: Function;
    // This will be the POST, PUT, or DELETE review function
    sendRequest: Function;
}

export default function ReviewForm(props: Props) {
    const {sendRequest, setReviewText, setReviewTitle, reviewText, reviewTitle} = props

    const handleChange = (e: any) => {
        if(e.target.name === "reviewTitle") { setReviewTitle(e.target.value) }
        else if(e.target.name === "reviewText") { setReviewText(e.target.value) }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        sendRequest()
    }

    return (
        <form action="submit" onSubmit={(e) => handleSubmit(e)} className='review_form'>
            <input className='review_form_title' value={reviewTitle} type="text" name='reviewTitle' onChange={(e) => handleChange(e)} placeholder='Review Title' />
            <textarea className='review_form_text' value={reviewText} name="reviewText"  onChange={(e) => handleChange(e)}></textarea>
            <button className='review_form_btn'>レビュー送信</button>
        </form>
    )
}
