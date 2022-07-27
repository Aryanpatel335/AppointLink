import React from 'react';

import App from './App';
import { store } from './store/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';


import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');


const root = createRoot(container); 
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    
    <Provider store={store}>
      <Router>

        <App/>
       
      </Router>

    </Provider>
  </GoogleOAuthProvider>
  
);