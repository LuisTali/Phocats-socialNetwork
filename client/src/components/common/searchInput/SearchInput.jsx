import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './SearchInput.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";

const SearchInput = ({setModalOpen,setModalContent}) =>{
    const [search,setSearch] = useState('');
    const navigate = useNavigate();
    const baseUrl = 'http://localhost:5000/'

    const handleSubmit = async(e) =>{
        if(search == '') return;
        e.preventDefault();
        if(search.charAt(0) == '#'){
            const nameTag = search.slice(1);
            const response = await axios.get(`${baseUrl}publication/publicationsByTag/${nameTag}`);
            if(response.data.success){
                navigate(`/tags/${nameTag}`);
                setSearch('');
            }else{
                setModalContent('No publications with that tag');
                setModalOpen(true);
            }
        }else{
            const response = await axios.post(`${baseUrl}user/byUsername`,{username:search});
            if(response.data.success){
                const userId = response.data.user.id;
                navigate(`/user/${userId}`);
                setSearch('');
            }else{
                setModalContent('No users with that username');
                setModalOpen(true);
            }
        }
    }

    return <form onSubmit={handleSubmit} id='searchForm'>
        <div id="searchGroup">
        <input type="text" id="searchInput" value={search} placeholder="By Username or #Hashtag" onChange={(e)=>setSearch(e.target.value)}/>
        <label onClick={handleSubmit}><SearchIcon/></label>
        </div>
    </form> 
}

export default SearchInput;