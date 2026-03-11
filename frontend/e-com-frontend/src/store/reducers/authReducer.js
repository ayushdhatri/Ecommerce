const initialState = {
    user : null,
    address:[],
    clientSecret : null,
    selectedUserCheckoutAddress : null
}

export const authReducer = (state = initialState, action)=>{
    switch(action.type){
        case "LOGIN_USER" :
            return{
                ...state,
                user : action.payload
            }
        case "LOG_OUT" :
            return {
                ...state,
                user : null,
                address: []
            }
        case "USER_ADDRESS" :
            return {
                ...state,
                address : action.payload
            }
        case "REMOVE_CHECKOUT_ADDRESS" :
            return {
                ...state,
                selectedUserCheckoutAddress : null
            };
        case "SELECT_CHECKOUT_ADDRESS" :
            return {
                ...state,
                selectedUserCheckoutAddress : action.payload
            }

        default : 
            return state;        
    }
}
export default authReducer;