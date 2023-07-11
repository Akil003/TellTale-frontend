import React from 'react'
import { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import '../../styles/Navbar/SignIn.css'
import { useNavigate } from 'react-router-dom'
import SignInGoogle from '../Auth/SignInGoogle'
import supabase from "../../utils/supabase"


export default function SignIn() {
    const [user, setUser] = useState({})
    const [signoutVisible, setSignoutVisible] = useState(false)

    async function promptSignIn() {
        await SignInGoogle(supabase)
        
        console.log("user", user)
    }

    async function promptSignOut() {
        await supabase.auth.signOut()
        setUser({})
        console.log('done...')
    }

    useEffect(() => {
        async function getSession() {
            const { data } = await supabase.auth.getSession();
            let user = {}
            console.log(data)
            if (data.session)
                user = data.session.user.user_metadata
            setUser(user)
        }

        getSession()
    }, [])

    return (
        <>

            <div className='signin__wrapper'  onMouseMove={() => { setSignoutVisible(true) }} onMouseLeave={() => {setSignoutVisible(false)}}>
                {
                    user && Object.keys(user).length === 0 &&
                    <button id='siginin__button' className="signin__button"
                        onClick={promptSignIn}>
                        Sign In
                    </button>

                }
                {
                    user && Object.keys(user).length > 0 &&
                    <div className='signout__wrapper'>
                    <button className="signin__profile"
                        style={{
                            backgroundImage: `url(${user.picture})`,
                        }}
                        onClick={promptSignIn}>

                    </button> 
                    
                    <button className={`signout__button ${signoutVisible ? 'signout__visible' : ''}` }
                        onClick={promptSignOut}
                        onMouseEnter={() => {setSignoutVisible(true)}}
                        onMouseLeave={() => {setSignoutVisible(false)}}
                        >
                            Sign Out
                    </button>
                    </div>

                }
            </div>


        </>
    )
}
