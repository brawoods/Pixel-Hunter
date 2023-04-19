import React, { useRef, useEffect } from 'react';

export default function Canvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  return (
    <div>
      <canvas id="canvas" ref={canvasRef} onKeyDown={e => console.log(e)} />
    </div>

  );
}
