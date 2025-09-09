import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecruiterLogin = () => {

  const { setShowRecuriterLogin } = useContext(AppContext)
  const [state, setState] = useState('Login');
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(false);
  const [istextDataSubmitted, setIsTextDataSubmitted] = useState(false)

  const handelSubmit = (e) => {
    e.preventDefault();
    if (state === 'Signup' && !istextDataSubmitted) setIsTextDataSubmitted(true);
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
    
  }, []);

  return (
    <div className='absolute top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      <form onSubmit={handelSubmit} className='relative bg-white p-10 w-sm rounded-xl text-slate-500'>
        <h2 className='text-center text-2xl text-neutral-700 font-medium mb-2'>Recuriter {state}</h2>
        {state === 'Login' ? <p className='text-sm text-center'>Welcome back! Please sign in to continue</p> : <p className='text-sm text-center'>Welcome Create a New Account</p>}
        {state === 'Signup' && istextDataSubmitted ? (
          <>
            <div className='flex flex-col items-center gap-3 my-5'>
              <label htmlFor="image">
                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} />
                <input onChange={(e) => setImage(e.target.files[0])} id='image' type="file" hidden />
              </label>
              <p>Upload Company Logo</p>
            </div>
          </>
        ) : (
          <>
            {state != 'Login' &&
              <div className='border border-gray-400 px-4 py-3 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.person_icon} />
                <input className='outline-none text-sm bg-transparent' onChange={(e) => setname(e.target.value)} value={name} type="text" placeholder='Company Name' required />
              </div>}

            <div className='border border-gray-400 px-4 py-3 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.email_icon} />
              <input className='outline-none text-sm bg-transparent' onChange={(e) => setEmail(e.target.value)} value={email} type="Email" placeholder='Email Id' required />
            </div>
            <div className='border border-gray-400 px-4 py-3 flex items-center gap-2 rounded-full mt-5'>
              <img src={assets.lock_icon} />
              <input className='outline-none text-sm bg-transparent' onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='password' required />
            </div>
            {state === 'Login' && <p className='text-blue-600 text-sm mt-4 cursor-pointer'>Forgot password?</p>}
          </>
        )}
        <button type='submit' className='bg-blue-600 w-full text-white py-2 rounded-full mt-4'>{state === 'Login' ? 'login' : 'Create Account'}</button>
        {state == 'Login' ? <p className='my-4 text-sm text-center'>Don’t have an account? <span onClick={() => setState("Signup")} className='text-sm text-blue-600 cursor-pointer'>Sign up</span></p> : <p className='my-4 text-sm text-center'>Already have an account? <span onClick={() => setState("Login")} className='text-sm text-blue-600 cursor-pointer'>Login</span></p>}
        <img onClick={() => setShowRecuriterLogin(false)} className='absolute top-5 right-7 w-3 cursor-pointer' src={assets.cross_icon} />
      </form>
    </div>
  )
}

export default RecruiterLogin
