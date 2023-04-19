import React, { useRef, useEffect } from 'react';

export default function Canvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(10, 10, 150, 100);
  });

  return (
    <canvas id="canvas" ref={canvasRef} />
  );
}
