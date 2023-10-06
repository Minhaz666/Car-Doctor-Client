import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import { useNavigate } from "react-router-dom";

const Bookings = () => {

    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState();
    const navigate=useNavigate()

    useEffect(() => {
        fetch(`https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/bookings/${user?.email}`,{
            method:'GET',
            headers:{
                authorization:`Bearer ${localStorage.getItem('car-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if(!data.error){

                    setBookings(data)
                }
                else{
                    navigate('/')
                }
            
            })
    }, [user])

    // const handleDelete=(id)=>
    // {
    //     console.log(id)
    //     fetch(`https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/bookings/${id}`,{
    //         method:'DELETE'
    //     })
    //     .then(res=>res.json())
    //     .then(data=>{
    //         if(data.deletedCount>0)
    //         {
    //             alert('delete succesfully')
    //             const remaining=bookings.filter(bookings=>bookings._id !== id)
    //             setBookings(remaining)
    //         }
    //     })

    // }

    return (
        <div className="mt-8">
            <h1 className='text-center text-4xl text-red-200'>Booking Details</h1>
            <h2 className="text-center text-3xl text-red-200">total booked : {bookings?.length}</h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bookings?.map(booking=><BookingRow key={booking._id} booking={booking} bookings={bookings} setBookings={setBookings}></BookingRow>)
                        }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default Bookings;