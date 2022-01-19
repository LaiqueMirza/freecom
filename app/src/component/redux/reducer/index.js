import { combineReducers } from 'redux';
import cartCount from './cartCount';
import selectedSize from './selectedSize';
import searchValue from './searchValue';
import loginUser from './loginUser';

const allReducers = combineReducers({
    cartCount,
    selectedSize,
    searchValue,
    loginUser
})

export default allReducers;