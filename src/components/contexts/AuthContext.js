import { createContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom';

//  export interface User {
//      name: string;
//      isSignedIn: boolean;
//  }
export const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    
    const baseUrl = process.env.REACT_APP_BASE_URL
    let [loading, setLoading] = useState(true)
    let [authTokens, setAuthTokens] = useState(() => { return localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null})
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const history = useHistory()

    let loginUser = async (u, p) => {
        try {
            let resp = await fetch(`${baseUrl}token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': u, 'password': p}) })
                
            let data = await resp.json()
            
            if(resp.status === 200) {
                console.log("Response: ", resp)
                console.log("Data: ", data)
                console.log("Types (r,d respectively): ", typeof(resp), typeof(data))
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                history.push('/')
            } else {
                console.log("Big trouble")
            }
        } catch(error) {
            console.log(error)
        }
        
    }
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        history.push('/')
    }
    let updateToken = async () => {
        console.log("updateToken called...")
        try {
            let resp = await fetch(`${baseUrl}token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': authTokens.refresh})
            })
            let data = await resp.json()
            if(resp.status === 200) {
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
                console.log("JSON Response: ", data)
                console.log("User (decoded data.access): ", user)}
        } catch(e) {
                console.log(e)
                logoutUser()
        }
        if(loading) {
            setLoading(false)
        }
    }
    let registerUser = async (u, p) => {
        try {
            let resp = await fetch(`${baseUrl}register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'username': u, 'password': p}) })
                
            let data = await resp.json()

            if(resp.status === 200) {
                return {data: data, success: true}
            } else {
                console.log("Big trouble")
                return {status: resp.status, success: false, message: resp.message ? resp.message : resp.statusText}
            }
        } catch(error) {
            console.log("Registration Error: ", error)
            return {success: false, error: error}
        }
    }
    let contextData = {
        user: user,
        authTokens: authTokens,
        registerUser: registerUser,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    useEffect(() => {
        if(loading) {
            updateToken()
        }
        //
        const fourMinutes = 1000 * 60 * 4
        let intervalId = setInterval(() => {
            if(authTokens) {
                updateToken()
            }
        }, fourMinutes)
        return () => {
            //cleanup
            clearInterval(intervalId)
        }
    }, [authTokens, loading])

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
