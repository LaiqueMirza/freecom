
const loginUser = (state = false, action) => {
    switch(action.type){
        case 'LOGIN_USER': {
            return !state
        };
        default:
            return state;
    }
}
 export default loginUser;