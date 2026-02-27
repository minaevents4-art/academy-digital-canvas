import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eraser, Paintbrush, Download, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ArtModuleProps {
  onScore: (points: number) => void;
}

export default function ArtModule({ onScore }: ArtModuleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#6366f1');
  const [brushSize, setBrushSize] = useState(5);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas resolution
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    // Set initial white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    
    if (!hasStarted) {
      setHasStarted(true);
      onScore(100);
      toast.info("Artistic Journey Started! +100 XP");
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { offsetX: 0, offsetY: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        offsetX: (e as React.MouseEvent).nativeEvent.offsetX,
        offsetY: (e as React.MouseEvent).nativeEvent.offsetY
      };
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    toast("Canvas Cleared!");
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'wings-academy-masterpiece.png';
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Masterpiece saved!");
  };

  const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#000000'];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Digital Art Studio</h2>
          <p className="text-slate-500">Unleash your creativity. Your imagination is the only limit.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={clearCanvas} className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all text-slate-600">
            <Trash2 className="w-5 h-5" />
          </button>
          <button onClick={downloadArt} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            <Download className="w-5 h-5" /> Save Work
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-8 lg:col-span-1">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Colors</h4>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-full aspect-square rounded-xl border-4 transition-all ${color === c ? 'border-indigo-200 scale-110 shadow-lg' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Brush Size</h4>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between mt-2 text-xs text-slate-400 font-bold">
              <span>Thin</span>
              <span>Thick</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => setColor('#ffffff')}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold ${color === '#ffffff' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Eraser className="w-5 h-5" /> Eraser
            </button>
            <button 
              onClick={() => setColor('#6366f1')}
              className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all font-bold ${color !== '#ffffff' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
            >
              <Paintbrush className="w-5 h-5" /> Brush
            </button>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white rounded-3xl border-8 border-slate-100 shadow-inner overflow-hidden relative cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full aspect-[4/3] bg-white touch-none"
          />
        </div>
      </div>
    </div>
  );
}