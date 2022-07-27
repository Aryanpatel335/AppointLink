import React,{ useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate} from "react-router-dom";
import { clearAppointments } from '../../store/appointmentsSlice';
import { logOut } from '../../store/authSlice';
import { clearContacts } from '../../store/contactsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

export const NavBar = () => {
    const ROUTES = {
        CONTACTS: "/contacts",
        APPOINTMENTS: "/appointments",
    };
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let userName;
    if(user === null){
      userName = ''
    }else{
      userName = user.username;
    }
    // userName = user.username;  
    const logout = ()=>{
      dispatch(logOut());
      navigate('/auth');
      dispatch(clearContacts());
      dispatch(clearAppointments());
      setUser(null);
    }  
    useEffect(()=>{
      //need for webtoken
      
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [dispatch])
    
    return (
      <div>
          
          <p className='title'>PLANNER</p>
          
          <button className="logout" onClick={()=> logout()}>Logout</button>
          <span>
          {user && (
                 <p className='user'><span className='icon'><FontAwesomeIcon icon={faUser}/></span> <span className='userName'>{userName}</span></p>
              )
          }
          </span>
          
         
       
        <nav>


            <NavLink to={ROUTES.CONTACTS} className={(navData) => (navData.isActive ? "active" : 'none')} >
              Contacts
            </NavLink>
            <NavLink to={ROUTES.APPOINTMENTS} className={(navData) => (navData.isActive ? "active" : 'none')}>
              Appointments
            </NavLink>


        </nav>
      </div>
      
    )
}
export default NavBar;