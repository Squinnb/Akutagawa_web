import {useState, useContext, useEffect} from 'react'
import { AuthContext } from './contexts/AuthContext'

export default function UserHome() {
    let {user, logoutUser} = useContext(AuthContext)
    let [reviews, setReviews] = useState([])
    const baseUrl = process.env.REACT_APP_BASE_URL
    // user.user_id

    
    useEffect(() => {
            console.log(baseUrl)
            fetch(`${baseUrl}/`)
    }, [])

    return (
        <div>
            hello {user.name} <br />

            { reviews ?
                    reviews[0]
                      :
                <p>...</p>                
                }
        </div>
    )
}
