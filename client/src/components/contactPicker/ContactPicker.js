import React from "react";


export const ContactPicker = ({ value, contactsPassed, onChange }) => {
  const renderFirst =() =>{
    if(value === ""){
      return <option defaultValue={''} key={-1} selected>No Option Selected</option>
    }
  }
  return (
    <select onChange={onChange}>
      
      {renderFirst()}
      {contactsPassed.map((name)=>(
        <option value={name} key={name}>{name}</option>
      ))}



    </select>
  );
};
