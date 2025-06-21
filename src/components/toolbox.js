import React, { useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import ReplayIcon from "@mui/icons-material/Replay";

const Toolbox = ({
  isPlaying,
  setIsPlaying,
  displaySpeed,
  setDisplaySpeed,
  handleReset,
  daysElapsed,
}) => {
  // Add event listener for spacebar to toggle play/pause
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        event.preventDefault(); // Prevent default scrolling behavior
        setIsPlaying((prev) => !prev); // Toggle play/pause
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup event listener
    };
  }, [setIsPlaying]);

  return (
    <div className="toolbox">
      <button onClick={handleReset}>
        <ReplayIcon fontSize="small" />
      </button>
      <span style={{ marginLeft: "10px", color: "white" }}>
        {displaySpeed}x
      </span>
      <button onClick={() => setDisplaySpeed((prev) => Math.max(0.25, prev / 2))}>
        <FastRewindIcon fontSize="small" />
      </button>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <PauseIcon fontSize="small" />
        ) : (
          <PlayArrowIcon fontSize="small" />
        )}
      </button>
      <button onClick={() => setDisplaySpeed((prev) => Math.min(16, prev * 2))}>
        <FastForwardIcon fontSize="small" />
      </button>
      <span style={{ marginLeft: "10px", color: "white" }}>
        Days: {daysElapsed}
      </span>
    </div>
  );
};

export default Toolbox;