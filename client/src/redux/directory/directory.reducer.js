
import SECTIONS_DATA from './sections.data';

const INITITAL_STATE={
    SECTIONS_DATA: SECTIONS_DATA
};


const directoryReducer = (state=INITITAL_STATE, action) =>{
 switch (action.type){
    default:
        return state;
}
};

export default directoryReducer;