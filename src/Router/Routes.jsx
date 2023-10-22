import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../404/ErrorElement";
import Root from "../Root/Root";
import Base from "../Base/Base";
import Home from "../pages/Home/Home";
import AddProduct from "../pages/Product/AddProduct";
import MyCart from "../pages/Cart/MyCart";
import Login from "../pages/LoginAndRegister/Login";
import PrivateRouteComp from "../Components/Pirvate/PrivateRouteComp";
import BrandInfo from "../pages/Brand/BrandInfo";
import UpdateProduct from "../pages/Product/UpdateProduct";
import ProductDetails from "../pages/Product/ProductDetails";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <ErrorElement></ErrorElement>,
        children: [
            {
                path: '/',
                element: <Base></Base>,
                children: [
                    {
                        path: '/',
                        element: <Home></Home>,
                    },
                    {
                        path: '/add-product',
                        element: <PrivateRouteComp> <AddProduct></AddProduct> </PrivateRouteComp>,
                        loader : () => fetch('/brands.json')
                    },
                    {
                        path: '/brand-info/:id',
                        element: <BrandInfo></BrandInfo> ,
                        loader: ({ params })=> fetch(`https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/productsByBrand/${params.id}`),

                    },
                    {
                        path: '/show-product/:id',
                        element: <PrivateRouteComp> <ProductDetails></ProductDetails> </PrivateRouteComp>,
                        loader: ({ params })=> fetch(`https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/productById/${params.id}`),

                    },
                    {
                        path: '/update-product/:id',
                        element: <PrivateRouteComp> <UpdateProduct></UpdateProduct> </PrivateRouteComp>,
                        loader: ({ params }) => fetch(`https://fashion-a2z-backend-gu4jkmz1j-mostaquenaim42140-gmailcom.vercel.app/productById/${params.id}`)
                    },
                    {
                        path: '/cart',
                        element: <PrivateRouteComp> <MyCart></MyCart></PrivateRouteComp>,
                    },
                ],
            },
            {
                path: '/login',
                element: <Login></Login>,
            }

        ]
    }
]);

export default router;