import { useState } from "react";

const ShowCard = ({ card }) => {
    const { id, price, name, image, description } = card
    const [show, setShow] = useState(false)

    const handleShow = () => {
        setShow(!show)
    }

    return (
        <>
            <div className="card w-5/6 bg-base-100 shadow-md shadow-accent">
                <figure className="h-48"><img className="h-48" src={image} alt={name} /></figure>
                <div className="card-body">
                    {/* <p className="absolute -mt-16 left-1/2">{price} BDT</p> */}
                    <h2 className="card-title">{name}</h2>
                    <p className="opacity-80">{description}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleShow}>View</button>
                    </div>
                </div>
            </div>
            {
                show ?
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50 ">
                        <div className="max-w-3xl w-full p-5 bg-white rounded-lg relative">
                            <img
                                src={image}
                                alt=""
                                className="max-w-full h-auto"
                            />
                            <button
                                onClick={handleShow}
                                className="absolute top-2 right-2 text-xl cursor-pointer text-black"
                            >
                                &times;
                            </button>
                            {/* <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form> */}
                        </div>
                    </div>
                    : ''
            }
        </>
    );
};

export default ShowCard;