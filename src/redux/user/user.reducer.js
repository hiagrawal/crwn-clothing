
import UserActionTypes from './user.types';

const INITITAL_STATE={
    currentUser:null,
    error:null
};


const userReducer = (state=INITITAL_STATE, action) =>{
 switch (action.type){
    case UserActionTypes.SET_CURRENT_USER:
    case UserActionTypes.SIGN_IN_SUCCESS:
    return{
        ...state, 
        currentUser:action.payload,
        error:null
    };
    case UserActionTypes.SIGN_IN_FAILURE:
        return{
            ...state,
            error: action.payload
        }
    default:
        return state;
}
};

export default userReducer;