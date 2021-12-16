import {useEffect, useState, useContext} from 'react'
import Review from './Review'
import {AuthContext} from '../contexts/AuthContext'
import '../../details.css'
import ReviewForm from './ReviewForm';
interface Props {
    book_id: number;
}
interface ReviewData {
    id?: number;
    user: string;
    book: number;
    date: string;
    text: string;
    title: string;
}
export default function Reviews(props: Props) {
    let {user, authTokens} = useContext(AuthContext)
    const { book_id } = props
    const baseUrl = String(process.env.REACT_APP_BASE_URL)

    let [hasReviewed, setHasReviewed] = useState<Boolean>(true)
    let [reviews, setReviews] = useState<ReviewData[]>([])

    // The user's review
    let [reviewTitle, setReviewTitle] = useState("")
    let [reviewText, setReviewText] = useState("")

    const getReviews = async () => {
        try {
            let response = await fetch(`${baseUrl}review_list/${book_id}`)
            if(response.status === 200) {
                let data = await response.json()
                console.log("Reviews I got them: ", data)
                if(user) {
                    // must change this later, poor time complexity if many reviews 
                    for(let i = 0; i < data.length; i++) {
                        if(data[i].user === user.name) {
                            console.log(data[i].user) 
                            setHasReviewed(true)
                            if(i !== 0) {
                                let temp = data[0]
                                data[0] = data[i]
                                data[i] = temp
                            }
                            setReviews(data)
                            return
                        }
                    }
                }
                setHasReviewed(false)
                setReviews(data)
            }
        } catch(e) { console.log("Error fetching reviews", e) }
    }

    const sendPost = async (e: any) => {
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
            let newReview: ReviewData = data
            setReviews((prevReviews) => {
                return [newReview , ...prevReviews]
            })
        }
    }

    useEffect(() => {
        getReviews()
    },[])

    return (
        <div className='review'>
            {
                user && !hasReviewed ?
                <ReviewForm sendRequest={sendPost} setReviewText={setReviewText} reviewText={reviewText} setReviewTitle={setReviewTitle} reviewTitle={reviewTitle} /> :
                ""

            }
            
            {
                reviews ?
                reviews.map((rev) => {
                    return(
                        <Review key={rev.user} {...rev}/>
                    )
                })      :
                <h5>No reviews yet...</h5>
            }
        </div>
    )
}
