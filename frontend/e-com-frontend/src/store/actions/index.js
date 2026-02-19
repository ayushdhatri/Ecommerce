import api from '../../api/api';

export const fetchProducts = () => async(dispatch) =>{

    try {
        const { data } = await api.get(`/public/products`);
        dispatch({
            type : "FETCH_PRODUCTS",
            paylod : data.content,
            pageNumber : data.pageNumber,
            pagesize : data.pageSize,
            totalElemnts : data.totalElements,
            totalPages : data.totalPages,
            lastPage : data.lastPage
        })
    }
    catch (error){
        console.log(error);
    }
}

export default fetchProducts;