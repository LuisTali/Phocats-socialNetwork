import React from "react";
import { Link } from "react-router-dom";

const FriendsPresentational = ({title,users}) =>{ //Users get Friends, Followers or Following
    return <div className="containerFriendsPage" id="followers">
    <h3 className="title">{title}</h3>
    <ul>
        {users.map((users)=> <li><Link to={`/user/${users.id}`}>{users.username}</Link></li>)}
    </ul>
</div>
}

export default FriendsPresentational;