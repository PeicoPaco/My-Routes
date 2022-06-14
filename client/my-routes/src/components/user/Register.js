import React, {useState} from "react";
import auth from "../../utils/auth";
import apiServiceJWT from "../../service";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'

const initialState = {
    email: '',
    password: '', 
    nickname: '',
};

const Register = (props) => {
    let navigate = useNavigate();
    const [state, setState] = useState(initialState);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password, nickname} = state;
        const user = { email, password, nickname};
        const res = await apiServiceJWT.register(user);

        if (res.error) {
            alert(`${res.message}`);
            setState(initialState);
        } else {
            const {accessToken} = res;
            localStorage.setItem('accessToken', accessToken);
            props.setIsAuthenticated(true);
            auth.login(() => navigate('/profile'));
        }
    };

    const validateForm = () => {
        return (
            !state.email || !state.password || !state.nickname
        );
    };

    return ( 
        <div>
        <h2>Register</h2>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name@mail.com"
            name="email"
            value={state.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="secret password"
            name="password"
            value={state.password}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="How we call you?"
            name="nickname"
            value={state.nickname}
            onChange={handleChange}
          />
          <button className="form-submit" type="submit" disabled={validateForm()}>
            Register
          </button>
        </form>
      </div>
    )
}

Register.propTypes = {
  setIsAuthenticated: PropTypes.any
} 

export default Register