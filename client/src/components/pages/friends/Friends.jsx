import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import FriendsPresentational from "./FriendsPresentational.jsx";
import './Friends.css'


const Friends = ({id}) =>{
    const [friends,setFriends] = useState([]);
    const [followers,setFollowers] = useState([]);
    const [following,setFollowing] = useState([]);
    
    const baseUrl = 'http://localhost:5000/';

    const getData = async() =>{
        const response = await axios.get(`${baseUrl}user/friends/${id}`);
        setFriends(response.data.friends);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
    }

    useEffect(()=>{
        getData();
    },[]);

    return <div id="friendsPage">
        <FriendsPresentational title={'Friends'} users={friends}/>
        <FriendsPresentational title={'Followers'} users={followers}/>
        <FriendsPresentational title={'Following'} users={following}/>
    </div>
}

export default Friends;