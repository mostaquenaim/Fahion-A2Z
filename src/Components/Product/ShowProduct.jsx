import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../Theme/ThemeProvider';

const ShowProduct = ({ product }) => {

    const { theme } = useContext(ThemeContext)

    const { _id, image, name, brand, type, price, rating } = product;

    const [brandName, setBrandName] = useState([])

    useEffect(() => {
        fetch('/brands.json')
            .then(res => res.json())
            .then(data => {
                const res = data.find(item => item.id == brand)
                setBrandName(res)
            })
    }, [brand])

    return (
        <div
            data-theme={theme}>

            <div className="rounded-lg overflow-hidden bg-base-100 shadow-neutral shadow-md  ">
                <Link to={`/show-product/${_id}`}>
                    <img src={image} alt={name} className=" h-48 object-cover mx-auto" />
                </Link>
                <div className="p-4">
                    <h2 className="text-xl text-primary font-extrabold mb-2">{name}</h2>
                    <p className="text-sm text-primary opacity-80 mb-2">Brand: {brandName.name}</p>
                    <p className="text-sm text-primary opacity-80 mb-2">Type: {type}</p>
                    <p className="text-sm text-primary opacity-80 mb-2">Price: ৳{price}</p>
                    <p className="text-lg text-primary font-semibold mb-2">Rating: {rating}</p>
                    <div className="flex justify-center py-3">
                        <div className="mr-2">
                            <Link to={`/show-product/${_id}`} className=" bg-primary btn py-1 px-3 rounded-full text-sm font-semibold">
                                Details
                            </Link>
                        </div>
                        <div>
                            <Link to={`/update-product/${_id}`} className=" bg-secondary btn py-1 px-3 rounded-full text-sm font-semibold">
                                Update
                            </Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default ShowProduct;
