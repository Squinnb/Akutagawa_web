import {useState, useContext} from 'react'
import '../../details.css'
import glasses from '../../icons/glasses.png'
import ReviewForm from './ReviewForm'
import {AuthContext} from '../contexts/AuthContext'
import {ReviewData} from '../interfaces/baseInterface'

interface Props {
    reviewData: ReviewData;
    setReviews: Function;
    setHasReviewed: Function;
    index: number;
}

export default function ReviewItem(props: Props) {
    const { reviewData, setReviews, setHasReviewed, index } = props
    const book_id = reviewData.book

    // User Info
    let {user, authTokens} = useContext(AuthContext)
     // The user's review
     let [editTitle, setEditTitle] = useState(reviewData.title)
     let [editText, setEditText] = useState(reviewData.text)
    
    const isUserReview: boolean = user ? (reviewData.user === user.name) : false
    let [editMode, setEditMode] = useState<boolean>(false)

    const baseUrl = String(process.env.REACT_APP_BASE_URL)
    const sendDelete = async () => {
        let response = await fetch(`${baseUrl}review/${book_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            }
        })
        if(response.status === 204) {
            console.log("made it into response.status === 204")
            setReviews((prevReviews: ReviewData[]) => {
                prevReviews.splice(index, 1)
                return prevReviews
            })
            setHasReviewed(false)
        }
    }
    const sendPut = async () => {
        const context = {
            title: editTitle,
            text: editText,
            user: user.user_id,
            book: book_id
        }
        if(editText.trim().length === 0 || editTitle.trim().length === 0) { return }
        let response = await fetch(`${baseUrl}review/${book_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens.access}`
            },
            body: JSON.stringify(context) }
        )
        let data = await response.json()
        if(response.status === 200) {
            setEditMode(false)
            let newReview: ReviewData = data
            setReviews((prevReviews: ReviewData[]) => {
                prevReviews.splice(index, 1, newReview)
                return prevReviews
            })
        }
    }


    if(editMode) {
        return (
            <ReviewForm sendRequest={sendPut} setReviewText={setEditText} reviewText={editText} setReviewTitle={setEditTitle} reviewTitle={editTitle}/>
        )
    } else {
        return (
            <div className='review_item'>
                <div className='reviewImageNameContainer'> <img src={glasses} alt="..." /> <div className='reviewItemName'> { reviewData.user }</div> </div> 
                <div className="row"> <b>{reviewData.title}</b> { isUserReview ? <><button onClick={() => setEditMode(true)} >編集</button> <button onClick={sendDelete} >削除</button></> : ""} </div> 
                <p className='reviewItemText'>{reviewData.text}</p>
            </div>
        )
    }
   
}
