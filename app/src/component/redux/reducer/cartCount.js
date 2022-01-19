const initialState = 0

const cartCount = (state = initialState, action) => {
    switch(action.type){
        case 'INCREMENT': {
            return action.payload
        };
        default:
            return state;
    }
}
 export default cartCount;