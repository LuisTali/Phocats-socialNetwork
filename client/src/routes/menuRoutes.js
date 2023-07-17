import Home from '../components/pages/home/Home.jsx';
import UserProfile from '../components/pages/user/UserProfile.jsx';
import PublicationsPerTag from '../components/pages/publisPerTag/PublicationsPerTag.jsx';
import Friends from '../components/pages/friends/Friends.jsx';
import Register from '../components/pages/register/Register.jsx';

export const menuRoutes = [
    {
        id:'home',
        path:'/',
        Element: Home
    },
    {
        id:'userProfile',
        path:'/user/:id',
        Element: UserProfile
    },
    {
        id:'perTag',
        path:'/tags/:nameTag',
        Element: PublicationsPerTag
    },
    {
        id:'friends',
        path:'/friends',
        Element: Friends
    },
    {
        id:'register',
        path:'/register',
        Element: Register
    },
]