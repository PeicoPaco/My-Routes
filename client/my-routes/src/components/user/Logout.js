import React from "react";
import auth  from "../../utils/auth";
import apiServiceJWT from "../../service";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
    let navigate = useNavigate();
    const handleClick = () => {
        removeToken();
        handleAuth();
    };

    const removeToken = () => {
        apiServiceJWT.logout('accesToken');
    }

    const handleAuth = () => {
        props.setIsAuthenticated(false);
        auth.logout(() => navigate('/'));
    }

    return (
        <div>
            <Link onClick={() => handleClick()} to="/">
                Log Out
            </Link>
        </div>
    )
}

export default Logout;