
const searchValue = (state="", action) => {
    switch(action.type){
        case 'SEARCHED_VALUE': {
            return action.payload
        };
        default:
            return state;
    }
}
 export default searchValue;