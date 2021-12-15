import {useState, useContext} from 'react'
import {AuthContext} from '../contexts/AuthContext'
import '../../details.css'

interface Props {
    book_id: number;
    setHasReviewed: Function;
}

export default function ReviewForm(props: Props) {
    const baseUrl = process.env.REACT_APP_BASE_URL
    const {book_id, setHasReviewed} = props
    let {authTokens, user} = useContext(AuthContext)
    
    
    let [reviewTitle, setReviewTitle] = useState("")
    let [reviewText, setReviewText] = useState("")
    
    const handleChange = (e: any) => {
        if(e.target.name === "reviewTitle") { setReviewTitle(e.target.value) }
        else if(e.target.name === "reviewText") { setReviewText(e.target.value) }
    }

    const sendReview = async (e: any) => {
        e.preventDefault()
        const context = {
            title: reviewTitle,
            text: reviewText,
            user: user.user_id,
            book: book_id
        }
        if(reviewText.trim().length === 0 || reviewTitle.trim().length === 0) { return }
        let response = await fetch(`${baseUrl}review/${book_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify(context) }
        )
        let data = await response.json()
        console.log("Data: ", data)
        console.log("Response: ", response)
        if(response.status == 201) {
            setHasReviewed(true)
        }
    }

    return (
        <form action="submit" onSubmit={(e) => sendReview(e)} className='review_form'>
            <input className='review_form_title' type="text" name='reviewTitle' onChange={(e) => handleChange(e)} placeholder='Review Title' />
            <textarea className='review_form_text' name="reviewText"  onChange={(e) => handleChange(e)}></textarea>
            <button className='review_form_btn'>Send Review</button>
        </form>
    )
}
