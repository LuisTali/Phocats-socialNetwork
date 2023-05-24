import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './Notifications.css'

const Notifications = ({isNotificacionsOpen,notifications,idAccount,checkNotNotified}) =>{
    const baseUrl = 'http://localhost:5000/';

    if(notifications.length == 0){
        notifications = false;
    }

    const handleClick = async(idFollower) =>{
        checkNotNotified();
        const response = await axios.post(`${baseUrl}user/updateNotificated`,{idAccount,idFollower});
    }

    useEffect(()=>{
        checkNotNotified();
    },[])

    if(isNotificacionsOpen === true){
        return <div id="notifications">
            <ul>
                {!notifications ? 'You do not have notifications' : notifications.map((noti) => {
                    return <li key={noti.idFollower} className={!noti.notificated ? 'notNotificated' : 'notificated'}>
                        <Link to={`/user/${noti.idFollower}`} onClick={()=>{
                            noti.notificated = true; //Cambio estado notificado a true
                            handleClick(noti.idFollower) //Actualizo estado en la BD. 
                        }}>
                            <h4>{`${noti.follower} is now following you`}</h4> 
                            <label></label>
                        </Link>
                    </li>
                })}
            </ul>
        </div>
   } else{
    return ;
   }
}

export default Notifications;