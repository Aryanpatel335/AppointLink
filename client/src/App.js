import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";


import { Auth } from './auth/Auth';
function App() {
  
  
  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
    AUTH:"/auth"
  };

  return (
    <>
      
      <main>
        
          <Routes>

            <Route path={ROUTES.CONTACTS} element={<ContactsPage/>}/>
            <Route path={ROUTES.APPOINTMENTS} element={<AppointmentsPage/>}/>
            <Route path={ROUTES.AUTH} element={<Auth/>}/>
            <Route exact path="/" element={<Navigate replace to={'/auth'}/>} />
            
          </Routes>
        
      </main>
    </>
  );

  
}

export default App;
