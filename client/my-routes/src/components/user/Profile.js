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
                <ul>
                    <li>Where to go {nickname}</li>
                    <li>Home: {home}</li>
                    <li>Office: {office}</li>
                </ul>
            </div>
            <Map></Map>
        </section>
    )
}

export default Profile;