import React, { useContext, useEffect, useState } from "react";
import { Link ,useLocation } from "react-router-dom";
import axios from 'axios';
import FriendsPresentational from "./FriendsPresentational.jsx";
import './Friends.css'
import { AppContext } from "../../../Index.jsx";
import { LocationContext } from "../../../context/locationContext/LocationContext.jsx";


const Friends = () =>{
    const [friends,setFriends] = useState([]);
    const [followers,setFollowers] = useState([]);
    const [following,setFollowing] = useState([]);
    const {baseUrl,id} = React.useContext(AppContext);
    const {lastLocation,setLastLocation} = useContext(LocationContext);
    const location = useLocation();

    const getData = async() =>{
        const response = await axios.get(`${baseUrl}user/friends/${id}`);
        setFriends(response.data.friends);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
    }

    useEffect(()=>{
        setLastLocation(location.pathname);
        getData();
    },[]);

    return <div id="friendsPage">
        <FriendsPresentational title={'Friends'} users={friends}/>
        <FriendsPresentational title={'Followers'} users={followers}/>
        <FriendsPresentational title={'Following'} users={following}/>
    </div>
}

export default Friends;