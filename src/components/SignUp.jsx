import React, { useState } from 'react'
import { supabase } from "../supabaseClient"
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit =  async (e) => {
        e.preventDefault();
        const finalEmail = email;
        const finalPassword = password;
        const finalConfirmPassword = confirmPassword;
        if (password !== confirmPassword) {
            alert("Passwords do not match")
            return
        }
        const { data, error } = await supabase.auth.signUp({email, password})
        if (error) {
            alert(`Sign Up Failed! ${error}`)
            } else {
            alert("Sign Up Successful!")
            navigate("/signin")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        }
    }

  return (
    <div>
        <div className="min-h-screen w-full h-screen bg-[url('/images/bg_image_blur.png')] bg-cover bg-center text-white flex items-center justify-center">
        <div className='w-[30%] h-[60%] rounded-lg bg-white flex flex-col px-10 py-7'>
        <div className='text-4xl text-black'>Welcome User!</div>
        <div className='text-xl text-black pb-8'>Sign up Here for a New Account</div>
        <form onSubmit={(e) => {handleSubmit(e);}}>
        <div className='text-2xl text-black'>
            Email
        </div>
        <input type="text" className='w-full shadow-md border border-gray-900 p-4 rounded-md outline-0 text-black text-xl' value={email} onChange={(e) => {setEmail(e.target.value);}}/>
        <div className='text-2xl text-black mt-2'>
            Password
        </div>
        <input type="password" className='w-full shadow-md border border-gray-900 p-4 rounded-md outline-0 text-black text-xl' value={password} onChange={(e) => {setPassword(e.target.value);}}/>
        <div className='text-2xl text-black mt-2'>
            Confirm Password
        </div>
        <input type="password" className='w-full shadow-md border border-gray-900 p-4 rounded-md outline-0 text-black text-xl' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value);}}/>
        <button className='bg-green-500 w-full mt-5 py-4 rounded-md text-xl cursor-pointer hover:bg-green-400'>Submit</button>
        </form>
        <div className='w-full flex justify-center items-center'>
        <div className='text-black mt-2'>Already Have an Account? <span className='text-blue-600 cursor-pointer hover:text-blue-700' onClick={() => navigate("/signin")}>Login</span></div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default SignUp