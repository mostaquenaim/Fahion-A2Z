import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Brands = () => {
    const [brands, setBrands] = useState([])

    useEffect(() => {
        fetch('/brands.json')
            .then(res => res.json())
            .then(data => setBrands(data))
    }, [])

    return (
        <>
            <h1 className="p-4 text-3xl font-bold text-center mt-20 mb-10">Brands</h1>
            <div className="
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 
            p-4">
                {brands.map((brand) => (
                    <div
                        key={brand.id}
                        className="flex flex-col items-center text-center"
                    >
                        <Link to={`/brand-info/${brand.id}`}>
                            <figure className="bg-primary w-40 h-40 rounded-full shadow-md flex items-center p-6">
                                <img
                                    src={brand.image}
                                    alt={brand.name}
                                    className="object-cover rounded-lg mb-2"
                                />
                            </figure>
                        </Link>
                        <p className="text-lg font-semibold">{brand.name}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Brands;