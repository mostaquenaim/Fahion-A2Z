import React, { useContext } from 'react';

import { ImBin } from "react-icons/im";
import { ThemeContext } from '../Theme/ThemeProvider';

const ShowCart = ({ cart, onDelete }) => {
    const { theme } = useContext(ThemeContext)
    
    const { _id, product, user } = cart;
    const { image, name, price } = product;

    const handleDeleteClick = () => {
        onDelete(_id); // Pass the cart item ID to the onDelete function
    };

    return (
        <div
            data-theme={theme}
            className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt={name} /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{price} BDT</p>
                <div className="card-actions justify-end">
                    <button className="btn hover:bg-red-700" onClick={handleDeleteClick}>
                        <ImBin></ImBin>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowCart;
