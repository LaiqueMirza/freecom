import React, {useEffect, useState} from 'react';
import "./renderSearchResult.css";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import Products from '../product/products/products';
import { Link } from "react-router-dom";

const RenderSearchResult = ({products}) => {
  const userSearchedValue = useSelector(state => state.searchValue);
  const [data, setdata] = useState({})
  const [loading, setLoading] = useState(true);
  const [apiPass, setApiPass] = useState(false);


    useEffect(() => {
      setApiPass(true)
          axios
          .get(`/products/${userSearchedValue}`)
          .then((res) => {
            setdata(res.data)
            setApiPass(false)
          })
          .catch((err) => setApiPass(false)
          );
          setLoading(false);

      }, [userSearchedValue]);
    return (   <div className="shopDiv">
      {loading && <img className="med-8x6 lazyautosizes lazyloaded monkeyLoader" alt="Monkey Swinging Loader. Hello Dribbble!! monkey motion design duik after effects loader swinging gif" width="auto" height="auto" data-id="2946353" data-optimize-for-bots="true" data-srcset="https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 300w, https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 400w, https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 600w, https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 800w" data-src="https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif" data-sizes="auto" skip_resize="true" srcSet="https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 300w, https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 400w, https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 600w, https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif 800w" src="https://cdn.dribbble.com/users/1319489/screenshots/2946353/monkey-1.gif"  />    }
      
<section className="clothing-section">

<h3 className="header-clothing">Result for : {userSearchedValue ? userSearchedValue : ""}</h3>

<div className="clothing" id="clothing">
  {apiPass ? 
      (<><div className="lds-facebook"><div></div><div></div><div></div></div></>) 
  : data.length ?
    data.map((product) => (
        <Products
         data={product} 
        key={product._id}
        />
    ))
      :
      ( <> <h3 className="header-clothing">Can't find related data, go to <Link
                to="/shop"
                style={{ color: "black" }}
             > shop    </Link>
            </h3> </>
      )
     }
</div>
    

</section>
      
    </div>);
}
 
export default RenderSearchResult;