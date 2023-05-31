import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Friends.css'
const Friends = ({id}) =>{
    const [friends,setFriends] = useState([]);
    const [followers,setFollowers] = useState([]);
    const [following,setFollowing] = useState([]);
    
    const baseUrl = 'http://localhost:5000/';

    const getData = async() =>{
        const response = await axios.get(`${baseUrl}user/friends/${id}`);
        console.log(response.data);
        setFriends(response.data.friends);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
    }

    useEffect(()=>{
        getData();
    },[]);

    return <div id="friendsPage">
        <div className="containerFriendsPage" id="friends">
            <ul>
                {friends.map((friend)=> <li><Link to={`/user/${friend.id}`}>{friend.username}</Link></li>)}
            </ul>
        </div>
        <div className="containerFriendsPage" id="followers">
            <ul>
                {followers.map((follower)=> <li><Link to={`/user/${follower.id}`}>{follower.username}</Link></li>)}
            </ul>
        </div>
        <div className="containerFriendsPage" id="following">
            <ul>
                {following.map((follow)=> <li><Link to={`/user/${follow.id}`}>{follow.username}</Link></li>)}
            </ul>
        </div>
    </div>
}

export default Friends;