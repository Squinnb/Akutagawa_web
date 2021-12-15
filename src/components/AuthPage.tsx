import React, { useState, useContext, memo } from 'react'
import {AuthContext} from "./contexts/AuthContext"

import '../App.css'
interface AuthInfo {
    username: string;
    password: string;
}

function AuthPage() {
    let [hasAccount, setHasAccount] = useState(false)
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [passwordConfirmation, setPasswordConfirmation] = useState("")
    
    const { loginUser, registerUser } = useContext(AuthContext)

    const signIn = (e: any) => {
        e.preventDefault()
        loginUser(username, password)
        setUsername('')
        setPassword('')
    }

    const createAccount = async (e: any) => {
        e.preventDefault()
        if(password !== passwordConfirmation) { return }
        setUsername('')
        setPassword('')
        setPasswordConfirmation('')
        let regRes = await registerUser(username, password)
        if(regRes.error) {console.log('wtf is this', regRes); return;}
        if(regRes.success) {
            console.log(regRes)
            setHasAccount(true)
            console.log("Please sign in")
        } else {
            console.log(regRes.status, regRes.message)
        }
    }

    const handleChange = (e: any) => {
        if(e.target.name === "username"){
            setUsername(e.target.value)
        }
        else if(e.target.name === "password") {
            setPassword(e.target.value)
        }
        else if(e.target.name === "passwordConfirmation") {
            setPasswordConfirmation(e.target.value)
        }
    }
    const toggleBtn = () => {
        setHasAccount((p) => {return !p})
    }

    return (
        <div className="authContainer ">
            <form className="authForm" onSubmit={hasAccount ? (e) => {signIn(e)} : (e) => {createAccount(e)}}>
                <input className="authItem" type="text" name="username" value={username} onChange={(e) => {handleChange(e)}} placeholder="ユーザーネーム" />
                <input className="authItem" type="password" name="password" value={password} onChange={(e) => {handleChange(e)}} placeholder="パスワード" />
                { !hasAccount &&
                    <input className="authItem" type="password" name="passwordConfirmation" value={passwordConfirmation} onChange={(e) => {handleChange(e)}} placeholder="パスワード確認" />
                }
                    
                
                <input className='authItem authBtn'
                       type="submit"  
                       value={hasAccount ? "サインイン" : "アカウント作成"}
                />
                <button 
                        className="toggleSignInUp"
                        type="button" 
                        onClick={toggleBtn}>{hasAccount ? "アカウント無しの方へ" : "アカウントお持ちの方"}
                </button>
            </form>
        </div>
    )
}

export default AuthPage

















    // let [exaggerate, setExaggerate] = useState(true)
    // onMouseDown={() => {toggleBtn(); setExaggerate(true)}}
    // onMouseUp={() => {setExaggerate(false)}
    // className={(exaggerate ? 'authBtnExaggerate authItem authBtn' : 'authItem authBtn')}