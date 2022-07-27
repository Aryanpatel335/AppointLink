import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { appointmentsStateSelector, createAppointment, currentAppointmentIdSelector, updateAppointment } from "../../store/appointmentsSlice";

import { contactsStateSelector } from "../../store/contactsSlice";
// import { ContactPicker } from "../contactPicker/ContactPicker";

export const AppointmentForm = () => {
  const [title,setTitle] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate]= useState('');
  const [time, setTime] = useState('');
  const dispatch = useDispatch();
  const appointments = useSelector(appointmentsStateSelector);
  const currentAppointmentId = useSelector(currentAppointmentIdSelector);
  const currentAppointment = useSelector((state)=> currentAppointmentId ? state.appointments.appointments.find((appointment)=> appointment._id===currentAppointmentId) : null);
  const contacts = useSelector(contactsStateSelector);
  const usernameProfile = JSON.parse(localStorage.getItem('profile'));

  let currentUserID;
  let userName;
  if(usernameProfile === null){
    currentUserID = '';
    userName = '';
  }else{
    currentUserID = usernameProfile.userId;
    userName = usernameProfile.username;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // const userName = usernameProfile.result.name;
    const appointmentData = {title,contact,date,time, username: userName};
   
    
    if(currentAppointmentId){
      
      const indexOfIdAppointment = appointments.findIndex(appointment=> appointment._id === currentAppointmentId);
      dispatch(updateAppointment(currentAppointmentId,currentUserID,appointmentData,indexOfIdAppointment));
      setContact('');
      setTitle('');
      setTime('');
      setDate('');
    }
    else if(contact !== '') {
      const userName = usernameProfile.result.name 
      dispatch(createAppointment({title,contact,date,time,username: userName}, currentUserID));
      setContact('');
      setTitle('');
      setTime('');
      setDate('');
    }
    else{
      alert('Pick a Contact');
    }
   
  };
  useEffect(()=>{
    if(currentAppointment){
      setContact(currentAppointment.contact);
      setTitle(currentAppointment.title);
      setTime(currentAppointment.time);
      setDate(currentAppointment.date);
      
    }
    
  }, [currentAppointment])

  const getTodayString = () => {
    const [month, day, year] = new Date()
      .toLocaleDateString("en-US")
      .split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };
  
  
 
  const getName= ()=>{
    return contacts.map(contact => contact.name);
  }
  const renderFirst =() =>{
    if(contact === ""){
      return <option defaultValue={''} key={-1} selected>No Option Selected</option>
    }
  }
  
  const dropDownList= ()=>{
    return(<select onChange={e=>setContact(e.target.value)}>
    
    {renderFirst()}
    {getName().map((name)=>{
      if(currentAppointmentId && name === currentAppointment.contact){
        return(<option value={name} key={name} selected>{name}</option>)
      }
      else{
        return(<option value={name} key={name}>{name}</option>)
      }
    })}



  </select>)
  }
  return (
    <form onSubmit={handleSubmit}>
      
      <input type='text' value={title} name='title' onChange={e=> setTitle(e.target.value)} placeholder="Title" required />
      <input type='date' value = {date} min={getTodayString()} name='date' onChange={e => setDate(e.target.value)} placeholder="Date" required/>
      <input type='time' value={time} name = 'time' onChange={e => setTime(e.target.value)} placeholder="Time" required/>
      {/* <ContactPicker contactsPassed = {getName()} onChange={e=>setContact(e.target.value)} value={contact}/> */}
      {dropDownList()}
      <input type='submit' />

    </form>
  );
};
