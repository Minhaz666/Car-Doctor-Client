import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'
import { AuthContext } from '../../Providers/AuthProvider';

const SignUp = () => {

    const {creatUser}=useContext(AuthContext)
    const [errorMessage,seterrorMessage]=useState('')

    const handleSignup=(event)=>{
        event.preventDefault();
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        const name = form.name.value
        console.log(email, password,name)
        creatUser(email,password)
        .then(result=>{
            const user=result.user;
            console.log(user)
        })
        .catch(error=>{
            const errorMessage = error.message;
            console.log(errorMessage)
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
                    <h1 className='text-3xl font-bold text-center'>SignUp Please!</h1>

                    <form onSubmit={handleSignup} action="">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="your name" name='name' className="input input-bordered" />
                        </div>
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
                        </div>
                       
                        <div className="form-control mt-6">
                            <input className="btn btn-warning" type="submit" value='SignUp' />
                        </div>
                    </form>

                    <p className='my-4 text-center'>if you have account already..?? <Link className='font-bold text-orange-600 ' to ={'/login'}>Login!!!</Link></p>
                    <p>{errorMessage}</p>

                </div>
            </div>
        </div>
    </div>
    );
};

export default SignUp;