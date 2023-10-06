import React, { useContext, useState } from 'react';
import login from '../../assets/images/login/login.svg'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Home from '../Home/Home/Home';


const Login = () => {

const {signinUser}=useContext(AuthContext)
const [errorMessage,seterrorMessage]=useState('')
const navigate = useNavigate()

const location=useLocation();
const navigateTo=location.state?.from?.pathname || '/';
console.log(location)

const handleLogin = (event) => {

    event.preventDefault();
    const form = event.target;
    const email = form.email.value
    const password = form.password.value
    console.log(email, password)
    signinUser(email,password)
    .then(result=>{
        const user=result.user;
        const loggeruser={email:user.email}
        console.log(loggeruser)
        
        fetch(`https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/jwt`,{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(loggeruser)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log('jwt token',data)
            localStorage.setItem('car-access-token',data.token)
        })

        navigate(navigateTo)
    })
    .catch(error=>{
        const errorMessage = error.message;
        console.log(errorMessage);
        seterrorMessage(errorMessage)
    })
}

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left w-1/2 mr-12">
                    <img src={login} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <h1 className='text-3xl font-bold text-center'>Login!</h1>

                        <form onSubmit={handleLogin} action="">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name='email' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name='password' className="input input-bordered" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-success " type="submit" value='Login' />
                            </div>
                        </form>

                        <p className='my-4 text-center'>if yor are new to car doctors please <Link className='font-bold text-orange-600 ' to ={'/signup'}>signUp!!!</Link></p> <br />
                        <p>{errorMessage}</p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;