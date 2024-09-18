import React, { useRef, useState, useEffect } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#ffffff'); // default color white
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    // Fill the background with a "blackboard" color
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext('2d');
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext('2d');
    context.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    // Refill the background after clearing
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={1300}
        height={600}
        style={{ border: '2px solid #000' }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setColor('#ffffff')}>White Pen</button>
        <button onClick={() => setColor('#ff0000')}>Red Pen</button>
        <button onClick={() => setColor('#00ff00')}>Green Pen</button>
        <button onClick={() => setColor('#0000ff')}>Blue Pen</button>
        <button onClick={clearCanvas}>Eraser</button>
      </div>
    </div>
  );
};

export default Canvas;
