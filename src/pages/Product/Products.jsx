import { useContext } from "react";
import ShowProduct from "../../Components/Product/ShowProduct";
import { ThemeContext } from "../../Components/Theme/ThemeProvider";

const Products = ({ products }) => {

    const { theme } = useContext(ThemeContext)

    return (
        <div data-theme={theme}>
            <h1 className="font-bold text-3xl text-center mt-20">Products</h1>
            {
                products.length == 0 ?
                    <p className="text-primary text-center py-10">
                        No products found. Check back later for more products.
                    </p>
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-5 py-10">
                        {
                            products.map((selectedProduct, index) => (
                                <ShowProduct key={index} product={selectedProduct}></ShowProduct>
                            ))
                        }
                
                    </div>
}

        </div>
    );
};

export default Products;