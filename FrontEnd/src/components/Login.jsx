import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField'
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext} from '../contextApi/ContextApi';

const Login = () => {
const navigator = useNavigate();

  const [loader, setloader] = useState(false)
  const {setToken}= useStoreContext();
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({defaultValues:{
    username:"",
    password:"",
  },
  mode: 'onTouched',
})
const handleLogin=async(data)=>{
      setloader(true);
      try {
       const {data:response}= await api.post("/api/auth/public/login",data)
       console.log("1"+data)
       console.log("2"+response)
        // console.log(response)
         localStorage.setItem("JWT_TOKEN",JSON.stringify(response.token))
        reset()
        //store the token in local storage
     
        setToken(response.token)    
        toast.success("Login Successful!")
        navigator("/dashboard")
      } catch (error) {
        console.log(error)
        toast.error("Registration Failed!")
      }finally{
        setloader(false)
      }
}
  const onSubmit = (data) => console.log(data)

  return (
    <div className=' min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form onSubmit={handleSubmit(handleLogin)}
            className='sm:w-[450px] w-[360px] shadow-2xl py-8 sm:px-8 px-4 rounded-md'>
                <h1 className='text-center font-serif text-blue-700 font-bold lg:text-3xl text-2xl'>
                    Login here
                </h1>
                <hr className='mt-2 mb-5 text-black' />
                <div className='flex flex-col gap-3'>
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="text"
                        message="Username is Required"
                        placeholder="Type your Username"
                        register={register}
                        errors={errors}
                    />
                       <TextField
                        label="Password"
                        required
                        id="password"
                        type="text"
                        message="Password is Required"
                        placeholder="Type your Password"
                        register={register}
                        errors={errors}
                    />
                </div>

                 <button disabled={loader} type='submit' className=' px-5 my-4  w-[60%] py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200 mx-auto block'>{loader?"loading":"Login"}</button>
        <p className='text-center text-sm text-slate-700 mt-6'>
          Don't have an account?
          <Link className='font-semibold underline hover:text-black' to="/register"><span className='text-blue-700'>Register</span></Link>
        </p>

        </form>
    
    </div>
  )
}

export default Login
