import React, { useState, useEffect } from 'react';
import './App.css';
import Loader from './components/loader';
import Canvas from './components/canvas';

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
        <Canvas />
      )}
    </div>
  );
}

export default App;
