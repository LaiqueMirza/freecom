import React, { useRef, useEffect } from 'react';
import './searchBarDropdown.css';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { searchValue } from '../../redux/action/index';

const SearchBarDropdown = (props) => {
    const { options, onInputChange, handleSearchClick, onSearchIconClick,showInputRef,searchValues,emptySearchValue } = props;
    const dispatch = useDispatch();

  const ulRef = useRef();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.addEventListener('click', (event) => {
      event.stopPropagation();
      ulRef.current.style.display = 'flex';
      onInputChange(event);
    });
   
  }, []);
  useEffect(() =>{
    if(!showInputRef){
      ulRef.current.style.display = 'none';
    } else {
      ulRef.current.style.display = 'flex';

    }
  }, [showInputRef])
  return (
    <div className="search-bar-dropdown">
      <input
        type="text"
        className="searchBarInput"
        placeholder="Search"
        onChange={onInputChange}
        value={searchValues}
        ref={inputRef}
        onKeyPress={handleSearchClick}
      />
         <i className="fa fa-search searchIcon-searchBar"
         onClick={onSearchIconClick}
         ></i>
      <ul className="list-group result-of-searchBarDropdown" ref={ulRef}>
        {options.map((option, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                inputRef.current.value = option;
                ulRef.current.style.display = 'none';
                dispatch(searchValue(option));
                emptySearchValue()
              }}
              className="button-searchBarDropdown"
            >

          <Link
            to="/searchResult"
            style={{ textDecoration: "none", color: "black" }}
          > 
              <li>
              {option}
                </li>
           </Link>
            </button>
          );
        })}
      </ul>
    </div>
  );
}
 
export default SearchBarDropdown;