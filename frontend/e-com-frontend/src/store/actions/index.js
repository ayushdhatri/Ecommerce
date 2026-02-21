import api from '../../api/api';

export const fetchProducts = () => async(dispatch) =>{

    try {
        dispatch({type : "IS_FETCHING"});
        const { data } = await api.get(`/public/products`);
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

export default fetchProducts;