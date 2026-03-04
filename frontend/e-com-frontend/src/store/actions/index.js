import api from '../../api/api';



export const fetchProducts = (queryString) => async(dispatch) =>{

    try {
        dispatch({type : "IS_FETCHING"});
        const url = queryString ? `/public/products?${queryString}` : `/public/products`;
        const { data } = await api.get(url);
        dispatch({
            type : "FETCH_PRODUCTS",
            payload : data.content,
            pageNumber : data.pageNumber,
            pagesize : data.pageSize,
            totalElemnts : data.totalElements,
            totalPages : data.totalPages,
            lastPage : data.lastPage
        });
        dispatch({type : "IS_SUCCESS"});
    }
    catch (error){
        console.log(error);
        dispatch({
            type : "IS_ERROR",
            payload : error ?.response?.data?.message || "Failed To Fetch Products"
        })
    }
}
export const addToCart = (data, qty = 1, toast) =>
     (dispatch,getState) =>{
        // find the product
        const  {products} = getState().products;
        const getProducts = products.find((item)=> item.productId === data.productId);
        // check for stocks
        const isQuantityExist = getProducts.quantity >= qty;
        // If in stock -> add
        if(isQuantityExist){
            dispatch({type : "ADD_CART", payload : {...data,quantity : qty}});
            toast.success(`${data?.productName} addded to the cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
           
        }
        else{
            // If not -> error
            toast.error("Out Of Stock");

        }
       
    

};



export default {fetchProducts , addToCart};


