import React from "react";
import { deleteAppointment, setCurrentAppointmentId } from "../../store/appointmentsSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; 
import './tile.css'

export const AppointmentTile = ({passedObj}) => {
  const newObj = { title: passedObj.title,
                  contact: passedObj.contact,
                  data: passedObj.date,
                  time: passedObj.time
  }
  const dispatch = useDispatch();
  const usernameProfile = JSON.parse(localStorage.getItem('profile'));
  
  let currentUserID;
  
  if(usernameProfile === null){
    currentUserID = ''
  }else{
    currentUserID = usernameProfile.userId
  }
  
 
  
  const handleClick = () =>{
    dispatch(setCurrentAppointmentId(passedObj._id));
  }
  
  return (
    (passedObj.creator === currentUserID) &&
    (<div className="tile-container-appointment">
      {Object.values(newObj).map((value,index)=>(
        <p key={index} className={`tile ${index===0 ? "tile-title": ""}`}>
          {value}
        </p>
      ))}
      <button onClick = { () => handleClick()} className='editDeleteAppoint'>
        <FontAwesomeIcon icon={faPenToSquare}/>
      </button>
      <button onClick = {()=>dispatch(deleteAppointment(passedObj._id, currentUserID))} className='editDeleteAppoint delete'>  
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>
    </div>)
  );
};
