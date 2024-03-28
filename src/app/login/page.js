"use client"

import React from 'react'
import {signIn,useSession ,signOut} from 'next-auth/react'
const Login = () => {
    const session=useSession();

    console.log(session)
    if(session.status==="loading"){
        return <p>Loading...</p>
    }
    if(session.status==="authenticated"){
        return <p> <button onClick={() =>
            signOut("google")   }>Logout</button></p>
    }
    if(session.status==="unauthenticated"){
        return <p>User unauthenticated</p>
    }
  return (
    <>
    <button onClick={() => signIn("google")   }>Login With Google</button>
    </>
  )
}

export default Login