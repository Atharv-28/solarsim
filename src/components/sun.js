import React from "react";
import { CANVAS_CENTER } from "../utils/constants";

const Sun = () => {
  return (
    <circle cx={CANVAS_CENTER.x} cy={CANVAS_CENTER.y} r="95" fill="yellow" />
  );
};

export default Sun;