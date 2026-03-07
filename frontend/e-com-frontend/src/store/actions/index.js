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

export const increaseCartQuantity = (data, toast, currentQuantity, setCurrentQuantity) =>
    (dispatch, getState) =>{
       let{ products } = getState().products;
        if(products === null || products === undefined || products.length === 0){
            dispatch(fetchProducts());
            console.log("calling fetch product if it is null")
            const productStore =  getState().products;
            products = productStore.products;
        }
        
        console.log(products);
        const getProduct = products.find((item)=> item.productId === data.productId);
        console.log(getProduct);
        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;
        if(isQuantityExist){
            const newQuantity = currentQuantity+1;
            setCurrentQuantity(newQuantity);
            dispatch({
                type:"ADD_CART",
                payload : {...data,quantity : newQuantity}
            }); 
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
            toast.success("Quantity Added");
        }
        else{
            toast.error("Quantity Reached to Limit");
        }
}

export const decreaseCartQuantity = (data, toast,currentQuantity, setCurrentQuantity) => 
    (dispatch,getSate)=>{
        const newQuantity = currentQuantity - 1;
        if(newQuantity === 0){
            toast.error("Quantity cannot be less than! Click on remove from cart");
        }
        else{
            setCurrentQuantity(newQuantity);
            dispatch({type:"ADD_CART",
                payload : {...data,quantity : newQuantity}
            });
            localStorage.setItem("cartItems", JSON.stringify(getSate().carts.cart));
            toast.success("Quantity Reduced");
        }




}

export const removeFromCart = (data, toast) => (dispatch,getState) => {

    dispatch({type : "REMOVE_CART",payload : data});
    toast.success(`${data.productName} removed from cart`);
    localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export default {fetchProducts , addToCart, increaseCartQuantity,decreaseCartQuantity};


