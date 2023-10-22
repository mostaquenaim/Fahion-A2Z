import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { ThemeContext } from "../../Components/Theme/ThemeProvider";
import Swal from "sweetalert2";

const UpdateProduct = () => {
    const { theme } = useContext(ThemeContext)

    // const param = useParams()
    // const id = param.id

    const product = useLoaderData()
    console.log(product);
    const { _id, image, name, brand, type, price, description, rating } = product

    const [formData, setFormData] = useState({
        image: image, // Change to an empty string
        name: name,
        brand: brand,
        type: type,
        price: price,
        description: description,
        rating: rating,// Default value
    });

    const handleChange = (e) => {
        const { name, value } = e.target; // Remove type and files

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetch('/brands.json')
            .then(res => res.json())
            .then(data => setBrands(data))
    }, [])

    const handleUpdate = event => {
        event.preventDefault();

        // send data to the server
        fetch(`https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/update-product/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data && data.modifiedCount) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Product updated successfully!',
                        icon: 'success',
                    });
                }
                else {
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to update the product.',
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
    }
    return (
        <>
            <div
                data-theme={theme}
                className=' mx-auto h-screen flex flex-col justify-center'>
                <h1 className='text-3xl text-center font-bold p-5 pt-20'>Update Product</h1>
                <form onSubmit={handleUpdate} className='flex flex-col justify-start items-center gap-2'>
                    <table>
                        <tbody>
                            <tr>
                                <td><label>Image (URL):</label></td>
                                <td>
                                    <input
                                        type="text" // Change input type to text
                                        name="image"
                                        defaultValue={image} // Update value and onChange for the image field
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Name:</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Brand Name:</label></td>
                                <td>
                                    <select
                                        name="brand"
                                        defaultValue={brand}
                                        onChange={handleChange}
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
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label>Price:</label></td>
                                <td>
                                    <input
                                        type="text"
                                        name="price"
                                        defaultValue={price}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label>Short Description:</label></td>
                                <td>
                                    <textarea
                                        name="description"
                                        defaultValue={description}
                                        onChange={handleChange}
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
                    <button type="submit" className='btn my-5 mb-20'>Submit</button>
                </form>
            </div>
        </>
    );
};

export default UpdateProduct;