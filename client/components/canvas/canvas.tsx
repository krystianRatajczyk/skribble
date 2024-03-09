import React from "react";

const Canvas = () => {
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseDown={onMouseDown}
      width={0}
      height={0}
      className="touch-none bg-white"
    />
  );
};

export default Canvas;
