import { useContext, useState } from 'react';
import { ThemeContext } from '../../Components/Theme/ThemeProvider';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const { theme } = useContext(ThemeContext);
    const brands = useLoaderData()

    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        image: '', // Change to an empty string
        name: '',
        brand: '',
        type: '',
        price: '',
        description: '',
        rating: '1',// Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target; // Remove type and files

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (isNaN(formData.price)) {
            setError('Price must be a number');
            return;
        }
    
        setError('');
    
        fetch('https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data && data.insertedId) {
                    // Show a success SweetAlert
                    Swal.fire({
                        title: 'Success',
                        text: 'Product added successfully!',
                        icon: 'success',
                    });

                    setFormData({
                        image: '', // Change to an empty string
                        name: '',
                        brand: '',
                        type: '',
                        price: '',
                        description: '',
                        rating: '1',// Default value
                    });
                    
                } else {
                    // Show an error SweetAlert
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
    };

    return (
        <div data-theme={theme}>
            <div
                className='mx-auto h-screen flex flex-col justify-center'>
                <h1 className='text-3xl font-bold p-5 pt-20 text-center'>Add Product</h1>
                <div className='text-center py-3 text-rose-600'>{error && error }</div>
                <form onSubmit={handleSubmit} className='flex flex-col justify-start items-center gap-2'>
                    <table>
                        <tbody className=''>
                            <tr>
                                <td><label>Image (URL):</label></td>
                                <td>
                                    <input
                                        type="text" // Change input type to text
                                        name="image"
                                        value={formData.image} // Update value and onChange for the image field
                                        onChange={handleChange}
                                        className=''
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Name:</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Brand Name:</label></td>
                                <td>
                                    <select
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Brand</option>
                                        {brands.map((brand) => (
                                            <option key={brand.id} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Type:</label></td>
                                <td>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select Type</option>
                                        <option value="jeans">Jeans</option>
                                        <option value="shirt">Shirt</option>
                                        <option value="t-shirt">T-shirt</option>
                                        <option value="jacket">Jacket</option>
                                        <option value="shoes">Shoes</option>
                                        <option value="handbag">Handbag</option>
                                        <option value="wallet">Wallet</option>
                                        {/* <option value="handbag">Handbag</option> */}
                                        {/* Add more options for other types */}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Price:</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Short Description:</label></td>
                                <td>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        // required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Rating:</label></td>
                                <td>
                                    <select
                                        name="rating"
                                        value={formData.rating}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* button  */}
                    <button type="submit" className='btn my-5 mb-20 hover:bg-secondary'>Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
