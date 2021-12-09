import {useState} from 'react'

export default function ReviewForm() {

    let [reviewTitle, setReviewTitle] = useState("")
    let [reviewText, setReviewText] = useState("")
    
    const handleChange = (e: any) => {
        if(e.target.name === "reviewTitle") { setReviewTitle(e.target.value) }
        else if(e.target.name === "reviewText") { setReviewText(e.target.value) }
    }

    const sendReview = (e: any) => {
        e.preventDefault()
        console.log("implement poasting here heh ha")
        // hoho
        setReviewTitle("")
        setReviewText("")
    }

    return (
        <form action="submit" onSubmit={(e) => sendReview(e)} id='reviewForm'>
            <input type="text" name='reviewTitle' onChange={(e) => handleChange(e)} placeholder='Review Title' />
            <textarea name="reviewText"  onChange={(e) => handleChange(e)}></textarea>
            <button>I think I want to be a backend dev</button>
        </form>
    )
}
