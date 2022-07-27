import React from "react";
import { setCurrentId, deleteContact} from "../../store/contactsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; 
import { useDispatch  } from "react-redux";

import './tile.css'
export const Tile = ({passedObj}) => {
  const newObj = {name: passedObj.name,
                  phone: passedObj.phone,
                  email: passedObj.email
  
  }
  //const currentId= useSelector(currentIdSelector);
  const dispatch = useDispatch();
  const usernameProfile = JSON.parse(localStorage.getItem('profile'));
  
  let currentUserID;
  
  
  currentUserID = usernameProfile.userId;
  
  const handleClickEdit = () =>{
    dispatch(setCurrentId(passedObj._id));
  }
  
  const handleClickDelete=()=>{
    dispatch(deleteContact(passedObj._id, currentUserID));
    
  }
  
 
  return (
    (passedObj.creator ===  currentUserID) && (
    <div className="tile-container">
      {Object.values(newObj).map((value,index)=>(
        <p key={index} className={`tile ${index===0 ? "tile-title": ""}`}>
          {value}
        </p>
      ))}
      <button onClick ={ () => handleClickEdit()} className="editDelete">
        <FontAwesomeIcon icon={faPenToSquare}/>
      </button>
      <button onClick = { ()=> handleClickDelete()} className="editDelete delete">
        <FontAwesomeIcon icon={faTrashCan}/>
      </button>
    </div>)
  );
};
