import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ShowPhoto from "./ShowPhoto";

const Gallery = () => {
    const [photos1, setPhotos1] = useState([])
    const [photos2, setPhotos2] = useState([])

    useEffect(() => {
        fetch('/gallery.json')
            .then(res => res.json())
            .then(data => setPhotos1(data))

        fetch('/gallery2.json')
            .then(res => res.json())
            .then(data => setPhotos2(data))
    }, [])
    return (
        <>
        <h1 className="p-5 text-3xl font-bold text-center mt-20">Gallery</h1>
            <Marquee pauseOnHover className="py-5">
                <div className="flex gap-3">
                    {
                        photos1.map((photo, index) => (
                            <ShowPhoto key={index} image={photo}></ShowPhoto>
                        ))
                    }
                </div>
            </Marquee>
            <Marquee pauseOnHover speed={100}>
                <div className="flex gap-3">
                    {
                        photos2.map((photo, index) => (
                            <ShowPhoto key={index} image={photo}></ShowPhoto>
                        ))
                    }
                </div>
            </Marquee>

        </>
    );
};

export default Gallery;