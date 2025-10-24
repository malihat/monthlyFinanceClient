import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TotalMoneyProvider } from './TotalMoneyContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TotalMoneyProvider >
      {/* <ClerkProvider publishableKey={vite_key}> */}
        <App />
      {/* </ClerkProvider> */}
    </TotalMoneyProvider>
  </React.StrictMode>
);


