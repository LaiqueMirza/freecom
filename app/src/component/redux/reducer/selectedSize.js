const initialState = "No Size Selected"

const selectedSize = (state = initialState, action) => {
    switch(action.type){
        case 'SELECTEDSIZE': {
            return action.payload
        };
        default:
            return state;
    }
}
 export default selectedSize;