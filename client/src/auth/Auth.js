import React, { useEffect, useState} from 'react'
import { GoogleLogin} from "@react-oauth/google";
import { Input } from './Input';
import { useDispatch, useSelector} from 'react-redux';
import jwt_decode from 'jwt-decode';
import { useLocation,useNavigate } from 'react-router-dom';
import { signIn, signUp, googleSignIn, logOut } from '../store/authSlice';
import { clearContacts } from '../store/contactsSlice';
import { clearAppointments } from '../store/appointmentsSlice';
import { errorSelector, setErrorMessage } from '../store/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock , faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';

export const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({firstName: '', lastName: '', username: '', password: '', confirmPassword: '' });
    const errorState = useSelector(errorSelector);
    if(location.pathname === '/auth'){
        localStorage.clear();
    }
    useEffect(()=>{
        dispatch(logOut());
        navigate('/auth');
        dispatch(clearContacts());
        dispatch(clearAppointments());
       

    },[dispatch])
    const renderLoginStatus = ()=>{
        if(errorState){
            return(
                <div className='error'>
                    <span>{errorState}</span>
                </div>
            )
        }
    }
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        if(isSignUp){
            
            dispatch(signUp(formData,navigate));
            
        }else{
            
            dispatch(signIn(formData,navigate));
            
           
        }
    }
    const handleChange = (e) =>{
        dispatch(setErrorMessage(''));
        setFormData({...formData, [e.target.name]: e.target.value });
    }
    
    const switchMode = () =>{
        setIsSignUp(prev=> !prev);
    }
    const googleSuccess = async (res)=>{
        const data= jwt_decode(res.credential);
        const token = res.credential;
        //res.credentail is our google token 
       
    
        try{
            dispatch(googleSignIn({data,token}, navigate))
        
        }catch(error){
            console.log(error);
        }

    }
    const googleFailure= (error) =>{
        console.log(error);
        console.log('Google Sign Up unsuccessful')
    }
    
    return (
        <div className='mainBody'>
            <div className='banner'>
                <span className='bannerIcon'><FontAwesomeIcon icon={faCalendarDays}/></span>
                <h1>PLANNER</h1>
            </div>
            <div className='container'>
                <div className='form'>
                    <span className='title'>{ isSignUp ? 'Sign Up' : 'Login'}</span>
                    <form onSubmit={handleSubmit} className="formLogin">
                        {
                            isSignUp && (
                                <div className='inputs'>

                                    <Input name="firstName" onChange={handleChange} placeholder="First Name *" type="text"/>
                                    <Input name="lastName" onChange={handleChange} placeholder="Last Name *" type="text"/>

                                </div>
                            )
                        }
                        <div className='inputs'>
                            {!isSignUp && <span className='icon'><FontAwesomeIcon icon={faUser}/></span>}
                            <Input name="username" onChange={handleChange} placeholder="Username *" type="text"/>
                            
                            
                        </div>
                        <div className='inputs'>
                            {!isSignUp && <span className='icon'><FontAwesomeIcon icon={faLock}/></span>}
                            <Input name="password" onChange={handleChange} placeholder="Password *" type="password"/>
                        </div>
                        { isSignUp && (
                            <div className='inputs'>
                            <Input name="confirmPassword" onChange={handleChange} placeholder="Confirm Password *" type="password"/>
                            </div>
                        )}
                        {renderLoginStatus()}
                        <div className='buttns'>
                            <button type="submit"  className='btn'>
                                {
                                    isSignUp ? 'Sign Up': 'Login'
                                } 
                            </button>
                            {!isSignUp && ( 
                                <div className='googleBtn'>
                                    <GoogleLogin 

                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}

                                    />
                                </div>

                            )
                            }
                            <button onClick={()=> switchMode()} className='promptsign'>
                                {isSignUp ? 'Already Have an Account ? Sign In ' : "Don't Have an Account? Sign Up"}
                            </button>
                        </div>
                    </form>
                    
                </div>
                    
                    
                    
                


                

            </div> 
        </div> 
    )
}
