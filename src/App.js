import React, { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/loader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : (
        <header className="App-header">
          <h1>Welcome to Solar-Sim</h1>
          
        </header>
      )}
    </div>
  );
}

export default App;
