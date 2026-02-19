import { FaExclamationTriangle } from "react-icons/fa";
import ProductCard from "./ProductCard";
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts} from '../store/actions/index';
import {useEffect} from 'react';
const Products = ()=>{
    const isLoading = false;
    const errorMessage = "";
    const {products} = useSelector(
        (state) => state.products
    )
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchProducts());

    },[]);

//     const products = [
//         {
//         "productId": 1,
//         "productName": "Apple iPhone 15 Pro",
//         "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
//         "description": "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system. 256GB storage.",
//         "quantity": 0,
//         "price": 999.99,
//         "discount": 10,
//         //"specialPrice": 899.99
//     },
//     {
//         "productId": 2,
//         "productName": "Sony WH-1000XM5 Headphones",
//         "image": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
//         "description": "Premium noise-cancelling wireless headphones with industry-leading sound quality and 30-hour battery life.",
//         "quantity": 120,
//         "price": 399.99,
//         "discount": 15,
//         "specialPrice": 339.99
//     }
// ]
    return (
        <>
            <div className="lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto">
                {
                    isLoading ? (<p>It is Loading...</p>) : errorMessage ? (<div className="flex justify-center items-center h-[200px]">
                        <FaExclamationTriangle className="text-slate-800 text-3xl mr-2"/>
                        <span className="text-slate-800 text-lg font-medium">{errorMessage}</span>
                        </div>)
                    : (<div className="min-h-175">
                        <div className="pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6">
                            {products && 
                            products.map((item, i) => <ProductCard key ={i} {...item}/>)}
                        </div>
                    </div>)
                }
            </div>
        </>
    )


}
export default Products;

