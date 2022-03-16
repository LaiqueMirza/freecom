import { combineReducers } from 'redux';
import cartCount from './cartCount';
import selectedSize from './selectedSize';
import searchValue from './searchValue';
import loginUser from './loginUser';
import loginAdmin from './loginAdmin';

const allReducers = combineReducers({
    cartCount,
    selectedSize,
    searchValue,
    loginAdmin,
    loginUser
})

export default allReducers;