import React from 'react';
import styles from '../styles/canvas.css';

const Canvas = () => {
  return (
    <div className="canvasContainer">
      <svg
        className="canvas"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
      </svg>
    </div>
  );
};

export default Canvas;
