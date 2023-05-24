import React from "react";
import './Friends.css'
const Friends = () =>{
    //friends, you follow them and they follow you
    //followers they follow you
    //following you follow them

    return <div id="friendsPage">
        <div class="containerFriendsPage" id="friends">
            <ul>
                <li>1</li>
            </ul>
        </div>
        <div class="containerFriendsPage" id="followers">
            <ul>
                <li>1</li>
            </ul>
        </div>
        <div class="containerFriendsPage" id="following">
            <ul>
                <li>1</li>
            </ul>
        </div>
    </div>
}

export default Friends;