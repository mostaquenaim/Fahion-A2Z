import { useContext, useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Components/Auth/AuthProvider';
import { ThemeContext } from '../../Components/Theme/ThemeProvider';
import Swal from 'sweetalert2';

const ProductDetails = () => {
    const { user } = useContext(AuthContext);
    const { theme } = useContext(ThemeContext)

    const product = useLoaderData();

    const { _id, image, name, brand, type, price, description, rating } = product;
    const [brandName, setBrandName] = useState('')
    useEffect(() => {
        fetch('/brands.json')
            .then(res => res.json())
            .then(data => {
                const res = data.find(item => item.id == brand)
                setBrandName(res)
            })
    }, [brand])

    const handleAddToCart = () => {
        // Create an object that contains both user and product data
        const cartItem = {
            user: user.email, // Add user data
            product: product
        };

        fetch('https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/add-to-cart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(cartItem), // Send the combined object
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data && data.insertedId) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Product added in cart successfully!',
                        icon: 'success',
                    });
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to add the product.',
                        icon: 'error',
                    });
                }
            })
            .catch((error) => {
                // Show an error SweetAlert
                Swal.fire({
                    title: 'Error',
                    text: error,
                    icon: 'error',
                });
            });

        // Log the data to the console
        console.log('Added to Cart:', cartItem);
    };

    return (
        <div
            data-theme={theme}
            className="px-5 py-10 rounded-lg shadow-md ">
            <img src={image} alt={name} className="h-96 object-cover rounded-t-lg mx-auto" />
            <div className="p-4">
                <h1 className="text-2xl font-semibold text-primary">{name}</h1>
                <p className="text-sm text-primary opacity-60">Brand: {brandName.name}</p>
                <p className="text-sm text-primary opacity-60">Type: {type}</p>
                <p className="text-lg text-primary font-semibold">Price: ৳{price}</p>
                <p className="text-sm text-primary opacity-60">Description: {description}</p>
                <p className="text-sm text-primary opacity-60">Rating: {rating}</p>
                <button
                    className="mt-3 px-4 py-2 btn btn-primary rounded-md transition duration-300"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>

        </div>

    );
};

export default ProductDetails;
