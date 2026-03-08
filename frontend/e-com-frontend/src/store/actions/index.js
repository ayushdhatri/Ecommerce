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

export const authenticateSignInUser = (sendData,toast,reset,navigate,setLoader) => async (dispatch)=>{
    try{
        setLoader(true);
        const {data} = await api.post('/auth/signin',sendData);
        dispatch({type : "LOGIN_USER", payload : data});
        localStorage.setItem("auth", JSON.stringify(data));
        reset();
        toast.success("Login Success");
        navigate('/');
    }
    catch(err){
        console.log(err);
        toast.error(err.response.data.message || "Internal Server Error");
    }
    finally{
        setLoader(false);
    }

}
export const registerNewUser = (sendData,toast,reset,navigate,setLoader) => async (dispatch)=>{
    try{
        setLoader(true);
        const {data} = await api.post('/auth/signup',sendData);
        reset();
        toast.success(data?.message || "User Registered Successfully");
        navigate('/login');
    }
    catch(err){
        console.log(err);
        toast.error(err.response.data.message || "Internal Server Error");
    }
    finally{
        setLoader(false);
    }

};
export const logOutUser = (navigate,toast) => async (dispatch) =>{
    dispatch({type : "LOG_OUT"});
    localStorage.removeItem('auth');
    toast.success("Logout Successfully");
    navigate('/login');
}

export const addUpdateUserAddress = (sendData,toast,addressId,setOpenAddressModal) => async(dispatch,getState)=>{
    console.log("Sending address post request");
    const {user} = getState().auth;
    dispatch({type : "BUTTON_LOADER"});
    try{
        const {data} = await api.post("/addresses", sendData);
        console.log(data);
        toast.success("Address saved Successfully");
        dispatch({type : "IS_SUCCESS"})
    }
    catch(error){
        toast.error(error?.response?.data?.message || "Internal Server Error");
        dispatch({type:"IS_ERROR", payload : null})
    }
    finally{
        setOpenAddressModal(false);
    }
}

export const getUserAddresses = () => async(dispatch, getState)=>{
    try{
    dispatch({type : "IS_FETCHING"});
    console.log("fetching the user");
    const { data }  = await api.get('/addresses');
    console.log("Got the address from the backend" + data);
    dispatch({
        type : "USER_ADDRESS",
        payload : data
    });
    dispatch({type : "IS_SUCCESS"});
    }
    catch(error){
        dispatch({
            type : "IS_ERROR",
            PAYLOAD : error?.response?.data?.message || "Failed to fetch user's address"
        });
    }

}

export const selectUserCheckoutAddress = (address)=> (dispatch)=>{
    dispatch({
        type : "SELECT_CHECKOUT_ADDRESS",
        payload : address 
    });

}
export default {fetchProducts , addToCart, increaseCartQuantity,decreaseCartQuantity,registerNewUser,addUpdateUserAddress};


