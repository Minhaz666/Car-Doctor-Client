import { data } from 'autoprefixer';
import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';

const BookingRow = ({ booking,bookings,setBookings}) => {
    const { _id, date, service, price, img, status, } = booking;
    console.log(status)

    const handleDelete=(id)=>
    {
        console.log(id)
        fetch(`https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/bookings/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.deletedCount>0)
            {
                alert('delete succesfully')
                const remaining=bookings.filter(bookings=>bookings._id !== id)
                setBookings(remaining)
            }
        })

    }


    const handleBookingConfirm=(id)=>{
        fetch(`https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/bookings/${id}`,{
            method: 'PATCH',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({status:'confirm'})
        })
        .then(res => res.json())
        .then(data=>{
            // console.log(data)
            const remaining = bookings.filter(booking => booking._id !== id);
            const updated = bookings.find(booking => booking._id === id);
            updated.status='confirm'
            const newBookings=[updated,...remaining];
            setBookings(newBookings)
        })
    }


    return (
        <tr>
            <th>
                <button onClick={()=>{handleDelete(_id)}} className="btn btn-sm btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>
                    <div className="avatar">
                        <div className="rounded w-24 h-24">
                            {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
                        </div>
                </div>
            </td>
            <td>
                {service}
            </td>
            <td>{date}</td>
            <td>{price}</td>
            <th>
            {
                    status === 'confirm' ? <span className="font-bold text-primary">Confirmed</span> :
                        <button onClick={() => handleBookingConfirm(_id)} className="btn btn-ghost btn-xs">Please Confirm</button>}
            </th>
        </tr>
    );
};

export default BookingRow;