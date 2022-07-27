import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createContact, contactsStateSelector, currentIdSelector, updateContact } from "../../store/contactsSlice";
import { useState,useEffect } from "react";

export const ContactForm = () => {
  
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [email,setEmail] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const contacts = useSelector(contactsStateSelector);
  const currentId = useSelector(currentIdSelector);
  const currentContact = useSelector((state)=> currentId ? state.contacts.contacts.find((contact)=> contact._id === currentId): null);
  const dispatch = useDispatch();
  const usernameProfile = JSON.parse(localStorage.getItem('profile'));
  
  
  // let currentUserID;
  // currentUserID = usernameProfile.result._id;
  let currentUserID;
  let userName;
  if(usernameProfile === null){
    currentUserID = '';
    userName = '';
  }else{
    currentUserID = usernameProfile.userId;
    userName = usernameProfile.username;
  }
  
  const renderError = ()=>{
    if(duplicate){
      return(<h3 className="errorForm">Cannot have same contact</h3>)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    //const contactData = {name,phone,email, username: usernameProfile.result.name};
    const contactData = {name,phone,email, username: userName};
    if(currentId){
      const indexOfId = contacts.findIndex(contact=> contact._id === currentId);
      let duplicateEdit = contacts.find(contact => contact.name === name && contact._id !== currentId  );
      if(duplicateEdit === undefined){
        dispatch(updateContact(currentId, currentUserID, contactData,indexOfId));
        setDuplicate(false);
        setName('');
        setPhone('');
        setEmail('');
      }else{
        setDuplicate(true);
      }
      
    }else{
      //duplicate might cause a problem
      let found = contacts.find(contact => contact.name === name  );
      if(found === undefined){
        
        dispatch(createContact({name,phone,email, username:userName}, currentUserID));
        setDuplicate(false);
        setName('');
        setPhone('');
        setEmail('');
      }else{
        setDuplicate(true);
      }
       

    }
  };
  
  
  useEffect(()=>{
    if(currentContact) {
      setName(currentContact.name);
      setPhone(currentContact.phone);
      setEmail(currentContact.email);
      
    }
   
  }, [currentContact] )



  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} name='name' onChange={e=> {setName(e.target.value); setDuplicate(false)}} placeholder='Name' required />
        <input type='tel' value = {phone} name='phone' onChange={e => setPhone(e.target.value)} pattern = "^[2-9]\d{2}-\d{3}-\d{4}$" placeholder="Phone" required/>
        <input type='email' value={email} name = 'email' onChange={e => setEmail(e.target.value)} placeholder="Email" required/>
        {renderError()}
        <input type='submit' />


      </form>
      
    </>
  );
};
