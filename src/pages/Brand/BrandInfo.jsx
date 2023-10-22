import { useContext, useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import DynamicMySwiper from "../../Components/Swiper/DynamicMySwiper";
import Products from "../Product/Products";
import { ThemeContext } from "../../Components/Theme/ThemeProvider";

const BrandInfo = () => {
    const products = useLoaderData(); //products
    const { theme } = useContext(ThemeContext)
    const param = useParams(); //param

    const [brandInfo, setBrandInfo] = useState(null); // State variable for storing the found brand

    useEffect(() => {
        fetch('/brands.json')
            .then(res => res.json())
            .then(data => {
                const res = data.find((brand) => brand.id == param.id);
                setBrandInfo(res); // Set the brand info using setBrandInfo
            });
    }, [param.id]);


    return (
        <div
            data-theme={theme}
        >
            <DynamicMySwiper images={brandInfo?.banners}></DynamicMySwiper>
            <Products products={products}></Products>

        </div>
    );
};

export default BrandInfo;