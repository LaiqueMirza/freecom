import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { message, Button } from 'antd';
import './home.css';
import axios from "axios";

const Home = () => {
    const [loginCheck, setLoginCheck] = useState(false);
    const [authentication, setAuthentication] = useState(false);
    const loginState = useSelector((state) => state.loginUser);
    const check =() => {
        axios.get("/getUsers")
            .then((res) => {
                setAuthentication(true);
            })
            .catch((err) => message.error("Not authenticated"));
    }
    
    useEffect(() => {
        if (loginState) {
            setLoginCheck(true);
        }
    }, [loginState]);
    return ( 
        <div className="homeDiv">
             {
                 loginCheck ? (
                     <div>

                     <h2>
                         Welcome to I connect.
                     </h2>
                     <br/>
                     { 
                            !authentication ?

                                <Button onClick={check}>
                                    Check for authentication
                                </Button>
                                :
                                <h2>
                                    You are authenticated.
                                </h2>
                     }

                     </div>
                 ) : (
                     <h2>
                         Login or sign up first.
                     </h2>
                 )
             }
        </div>
     );
}
 
export default Home;