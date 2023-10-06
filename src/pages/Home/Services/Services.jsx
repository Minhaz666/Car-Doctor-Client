import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {

    const [services, setServices] = useState([])
    useEffect(() => {
        fetch('https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div className='text-center'>
            <h3 className="text-3xl text-orange-600 font-bold">Services</h3>
            <h2 className='text-5xl'>Our Services Area</h2>
            <p>the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which don't look even slightly believable.</p>
            <div className='grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services; 