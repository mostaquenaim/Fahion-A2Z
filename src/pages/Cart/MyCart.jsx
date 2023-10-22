import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../Components/Theme/ThemeProvider";
import { AuthContext } from "../../Components/Auth/AuthProvider";
import { ImBin } from "react-icons/im";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyCart = () => {
    const { theme } = useContext(ThemeContext)
    const { loading, user } = useContext(AuthContext)

    const [cartLoad, setCartLoad] = useState(true)

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        fetch(`https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/cartById/${user?.email}`)
            .then(res => res.json())
            .then(data => 
                {
                    setCartItems(data);
                    setCartLoad(false);
                })
    }, [user?.email])

    const onDelete = (_id) => {
        fetch(`https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/delete-cart/${_id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    console.log('deleted successfully');
                    Swal.fire({
                        title: 'Success',
                        text: 'Product deleted successfully!',
                        icon: 'success',
                    });
                    // remove the user from the UI
                    const remainingCarts = cartItems.filter(cart => cart._id !== _id);
                    setCartItems(remainingCarts);
                }
                else {
                    // Show an error SweetAlert
                    Swal.fire({
                        title: 'Error',
                        text: 'Failed to delete the product.',
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
        <div data-theme={theme} >

            <section className="bg-luxury py-16 text-center">
                <h1 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4">Your Shopping Cart</h1>
                <p className="text-sm md:text-base lg:text-lg">Review and manage your items.</p>
            </section>{
                loading || cartLoad ?
                    <span className="loading loading-spinner loading-lg"></span>
                    :
                    cartItems.length == 0 ?
                        <p className="text-center text-gray-500 p-4">Your cart is empty.</p>
                        :
                        <div className="overflow-x-auto pb-10 min-h-screen">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                            </label>
                                        </th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((cart, index) => (
                                            <tr key={index}>
                                                <th>
                                                    <label>
                                                        <span>{index + 1}</span>
                                                    </label>
                                                </th>
                                                <td>
                                                    <Link to={`/show-product/${cart.product._id}`} className="transition hover:scale-105 duration-750 flex items-center space-x-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={cart.product.image} alt={cart.product.name} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{cart.product.name}</div>
                                                            {/* <div className="text-sm opacity-50">United States</div> */}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td>
                                                    {cart.product.price} BDT
                                                    {/* <br />
                                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                                                </td>
                                                {/* <td>Purple</td> */}
                                                <th>
                                                    <button className="btn btn-ghost hover:bg-red-600 btn-xs" onClick={() => onDelete(cart._id)}>
                                                        <ImBin></ImBin>
                                                    </button>
                                                </th>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
            }
            {/* <div className="flex flex-col justify-center items-center w-full mx-auto space-y-5 pb-20">
                            {
                                cartItems.map((cart, index) => (
                                    <div key={index} className="flex gap-2">
                                        {index+1}.
                                        <ShowCart cart={cart} onDelete={onDelete}></ShowCart>
                                    </div>
                                ))
                            }
                        </div> */}

        </div>
    );
};

export default MyCart;