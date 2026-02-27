import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Eraser, Pen, Download } from 'lucide-react';

const colors = ['#0F172A', '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];

const ArtCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0F172A');
  const [brushSize, setBrushSize] = useState(5);
  const [mode, setMode] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 400;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.strokeStyle = mode === 'eraser' ? '#FFFFFF' : color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'wings-academy-masterpiece.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl">
          <button 
            onClick={() => setMode('pen')}
            className={`p-2 rounded-lg transition-all ${mode === 'pen' ? 'bg-white shadow-sm text-sky-500' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Pen className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setMode('eraser')}
            className={`p-2 rounded-lg transition-all ${mode === 'eraser' ? 'bg-white shadow-sm text-sky-500' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <Eraser className="w-5 h-5" />
          </button>
          <div className="w-[1px] h-6 bg-slate-200 mx-1" />
          <button 
            onClick={clearCanvas}
            className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-3">
          {colors.map(c => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setMode('pen');
              }}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c && mode === 'pen' ? 'border-sky-500 scale-125' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <button 
          onClick={downloadArt}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-800 transition-all ml-auto"
        >
          <Download className="w-4 h-4" />
          Save
        </button>
      </div>

      <div className="relative flex-1 bg-white border-4 border-slate-100 rounded-3xl overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchEnd={stopDrawing}
          onTouchMove={draw}
          className="w-full h-full block"
        />
        {mode === 'eraser' && <div className="absolute top-4 right-4 text-xs font-bold text-slate-400 uppercase tracking-widest bg-white/80 px-2 py-1 rounded">Eraser Active</div>}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-bold text-slate-500 uppercase">Brush Size</span>
        <input 
          type="range" 
          min="1" 
          max="50" 
          value={brushSize} 
          onChange={(e) => setBrushSize(parseInt(e.target.value))}
          className="flex-1 accent-sky-500 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-sm font-bold text-slate-800 w-8">{brushSize}px</span>
      </div>
    </div>
  );
};

export default ArtCanvas;