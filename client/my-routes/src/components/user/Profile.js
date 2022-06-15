import React, { useEffect, useState } from "react";
import apiServiceJWT from "../../service"; 
import Map from "../maps/Map";

const initialState = {
    nickname: '',
    home: '',
    office: '',
}

const Profile = () => {
    const [state, setState] = useState(initialState);

    const nickname = state.nickname || 'Missing'; 
    const home = state.home || 'My Home'; 
    const office = state.home || 'My Office';

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const getProfile = async (accessToken) => {
            const userInfo = await apiServiceJWT.profile(accessToken);
            if (userInfo) {
                const nickname = userInfo.nickname;
                setState((prevState) => {
                    return {...prevState, nickname};
                });
            } else {
                console.log('No user info found');
            }
        };
        getProfile(accessToken);
    }, []);

    return (
        <section>  
            <div className="user-info-container">
                <h2>Welcome back {nickname}!</h2>
                <ul>
                    <li>Home: <p>My Home</p></li>
                    <li>Office: <p>My Office</p></li>
                </ul>
            </div>
            <Map></Map>
        </section>
    )
}

export default Profile;