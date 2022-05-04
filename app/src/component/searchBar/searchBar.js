import React, { useState, useEffect } from 'react';
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import './searchBar.css';
import SearchBarDropdown from './searchBarDropdown/searchBarDropdown';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { searchValue } from '../redux/action/index';


const SearchBar = ({defaultOptions}) => {

  const dispatch = useDispatch();
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [showInputRef, setshowInputRef] = useState(true);
  const [targetvalue, setTargetValue] = useState("");
    const [searchValues, setsearchValues] = useState('');
  
  
const emptySearchValue =()=> {
  setsearchValues('')
}
  const handleSearchClick =(e)=> {
  if(e.key === "Enter"){
  dispatch(searchValue(e.target.value.toLowerCase()));
  setsearchValues("")
  setshowInputRef(false)
  return history.push("/searchResult");
}
}
const onSearchIconClick =(e) =>{
dispatch(searchValue(targetvalue));
  setsearchValues("")
  setshowInputRef(false)
  return history.push("/searchResult")
} 

 const onInputChange = (event) => {
    setOptions(
      defaultOptions?.filter((option) => option.includes(event.target.value.toLowerCase()))
    );
    setsearchValues(event.target.value)
    setshowInputRef(true)
    setTargetValue(event.target.value.toLowerCase())
  };
  return (
    <div className="searchBarDiv">
      <SearchBarDropdown 
      options={options}
       onInputChange={onInputChange}
       handleSearchClick={handleSearchClick}
       onSearchIconClick={onSearchIconClick}
       showInputRef={showInputRef}
       searchValues={searchValues}
       emptySearchValue={emptySearchValue}
       className="searchBarInput"
       />
      
     </div>
  );
}


export default SearchBar;
