import React from 'react';
import AkutagawaApp from './components/AkutagawaApp'
import { AuthProvider } from './components/contexts/AuthContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <AuthProvider>
          <AkutagawaApp />
      </AuthProvider>
      
    </div>
  );
}

export default App;
