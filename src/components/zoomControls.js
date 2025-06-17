import React from "react";
import { useControls } from "react-zoom-pan-pinch";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CropFreeIcon from "@mui/icons-material/CropFree";

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="zoom-controls">
      <button onClick={zoomIn}>
        <ZoomInIcon fontSize="small" />
      </button>
      <button onClick={zoomOut}>
        <ZoomOutIcon fontSize="small" />
      </button>
      <button onClick={resetTransform}>
        <CropFreeIcon fontSize="small" />
      </button>
    </div>
  );
};

export default ZoomControls;