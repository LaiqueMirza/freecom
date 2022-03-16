
const loginAdmin = (state = false, action) => {
    switch(action.type){
        case 'LOGIN_ADMIN': {
            return !state
        };
        default:
            return state;
    }
}
 export default loginAdmin;