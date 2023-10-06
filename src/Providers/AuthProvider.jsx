import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.config';


export const AuthContext=createContext();
const auth=getAuth(app)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true)

    const creatUser=(email,password)=>
    {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signinUser=(email,password)=>
    {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }
    
    const signOutUser=()=>
    {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,(currentUser=>{
            console.log('currentUser=',currentUser)
            setUser(currentUser);
            setLoading(false)
        }))
        return()=>{
            return unsubscribe()
        }
    },[])

    const authinfo={
        creatUser,
        signinUser,
        user,
        signOutUser,
        loading,
        setUser
    }

    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;