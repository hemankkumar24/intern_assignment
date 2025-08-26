import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient'

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate()

    const handleClick = async () => {
        if (currentPath === '/')
        {
            const { error } = await supabase.auth.signOut();
            navigate("/signin");
        }
        else
        {
            navigate("/signin");
        }
    }
  return (
    <div className='z-50'>
    <div className='flex justify-between fixed w-full  px-10 py-5 bg-white/5 items-center'>
        <div className='text-white text-3xl cursor-pointer' id='heading' onClick={() => navigate("/")}>HOME</div>
        <div className='text-white text-3xl cursor-pointer' id='heading'
        onClick={handleClick}>{currentPath === '/' ? 'LOGOUT' : 'LOGIN'}</div>
    </div>
    </div>
  )
}

export default Navbar