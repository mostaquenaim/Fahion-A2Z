import { useEffect, useState } from 'react';
import ShowCard from './ShowCard';

const Trending = () => {

    const [trending, setTrending] = useState([])

    useEffect(()=>{
        fetch('/trending.json')
        .then(res => res.json())
        .then(data => setTrending(data))
    },[])

    return (
        <>
            <h1 className='p-4 text-3xl font-bold text-center mt-20 pb-10'>Trending</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-10 mx-auto'>
                {
                    trending.map((trend, index) => (
                        <ShowCard key={index} card={trend}></ShowCard>
                    ))
                }
            </div>
        </>
    );
};

export default Trending;