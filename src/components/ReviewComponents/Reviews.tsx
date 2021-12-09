import {useEffect, useState} from 'react'
import Review from './Review'
import '../../details.css'
interface Props {
    book_id: number;
}
interface ReviewData {
    id: number;
    user: string;
    book: number;
    date: string;
    text: string;
    title: string;
}
export default function Reviews(props: Props) {
    const { book_id } = props
    const baseUrl = String(process.env.REACT_APP_BASE_URL)
    let [reviews, setReviews] = useState<ReviewData[] | null>(null)
    const getReviews = async () => {
        try {
            let response = await fetch(`${baseUrl}review/${book_id}`)
            if(response.status === 200) {
                let data = await response.json()
                const print = console.log
                print("Reviews I got them: ", data)
                setReviews(data)
            }
        } catch(e) { console.log("Error fetching reviews", e) }
    }
    useEffect(() => {
        getReviews()
    },[])

    return (
        <div id='reviewsContainer'>
            {
                reviews ?
                reviews.map((rev) => {
                    return(
                        <Review {...rev}/>
                    )
                })      :
                <h5>No reviews yet...</h5>
            }
        </div>
    )
}
