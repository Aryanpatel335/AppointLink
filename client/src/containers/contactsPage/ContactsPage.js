import React,{  useEffect } from "react";
import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";
import { useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { contactsStateSelector, currentIdSelector, getContacts} from "../../store/contactsSlice";
import { useDispatch } from "react-redux";
import { getAppointments } from "../../store/appointmentsSlice";
import { setCurrentUserId } from "../../store/authSlice";


import './ContactsPage.css'
export const ContactsPage = () => {
  const usernameProfile = JSON.parse(localStorage.getItem('profile'));
 
  let currentUserID;
  const dispatch = useDispatch();
  if(usernameProfile === null){
    currentUserID = ''
  }else{
    currentUserID = usernameProfile.userId
  }
  
  //currentUserID = usernameProfile.data.sub;
  
  // const logout = ()=>{
  //   dispatch(logOut());
  //   navigate('/auth');
  //   dispatch(clearContacts());
  //   dispatch(clearAppointments());
    
  // }  
  
  useEffect(()=>{ 
    // const token = usernameProfile.token;

    // if(token){
    //   const decodeToken = decode(token);
    //   if(decodeToken.exp * 1000 < new Date().getTime()) logout();
    // }
    
    dispatch(getContacts(currentUserID));
    dispatch(getAppointments(currentUserID));
    dispatch(setCurrentUserId(currentUserID));
  },[dispatch,currentUserID]);
 
  
  
  const contacts= useSelector(contactsStateSelector);
  const currentId = useSelector(currentIdSelector);
  const renderHeader = () =>{
    if(currentId){
      return(<h2>Currently Editing Contact</h2>);
    }
    else{
      return(<h2>Add Contact</h2>);
    }
    
  }
  
  
  
  
  return (
    <div className="mainbody">
      
      <NavBar/>
      <section>
        {renderHeader()}
        <ContactForm/> 
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList tiles={contacts}/>
      </section>
    </div>
  );
};
