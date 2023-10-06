import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const CheckOut = () => {

    const services = useLoaderData();
    // console.log(services)
    const { title,price,service_id,_id,img,status } = services;
    const {user}=useContext(AuthContext);
    // console.log(user)

    const handleBookServices=(event)=>
    {
        event.preventDefault()
        const form=event.target;
        const name=form.name.value;
        const date=form.date.value;
        //email rewrite korte dibo na tai form theke email nicchi na
        const email= user?.email;
        const dueammount=form.ammount.value;

        const order={
            cutomerName: name,
            email,
            date,
            _id,
            price,
            img,
            service:title
        }
        console.log(order)

        fetch('https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/bookings',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(order),
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.insertedId)
            {
                alert('booking done')
            }
        })

    }

    return (
        <div>
            <h2 className='text text-center text-3xl text-orange-300'>Book Service: "{title}"</h2>
                        <div className="card-body">
                          <form onSubmit={handleBookServices}>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="name" name='name' defaultValue={user?.displayName} className="input input-bordered" />
                            </div>
                            
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Date</span>
                                </label>
                                <input type="date" placeholder="date" name='date' className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" placeholder="email" name='email' defaultValue={user?.email} className="input input-bordered" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Due ammount </span>
                                </label>
                                <input type="text" placeholder="ammount" name='ammount' defaultValue={'$'+price} className="input input-bordered" />
                            </div>

                            </div>
                            <div className="form-control mt-6">
                                <input type="submit" className='btn btn-primary' value='Order Confirm'  />
                            </div>
                          </form>
                        </div>
                    </div>
    );
};

export default CheckOut;