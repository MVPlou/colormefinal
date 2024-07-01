'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from 'lucide-react';

const MAX_HISTORY = 10;

const ColoringApp: React.FC = () => {
  const [currentColor, setCurrentColor] = useState<string>('#FF0000');
  const [customColor, setCustomColor] = useState({ r: 255, g: 0, b: 0 });
  const [isColorPaletteVisible, setIsColorPaletteVisible] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [scale, setScale] = useState(1);
  const [history, setHistory] = useState<ImageData[]>([]);

  const colors: string[] = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FFA500', '#800080', '#008000', '#000080', '#800000', '#008080',
    '#C0C0C0', '#808080', '#000000'
  ];

  useEffect(() => {
    loadImage();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const hexColor = `#${customColor.r.toString(16).padStart(2, '0')}${customColor.g.toString(16).padStart(2, '0')}${customColor.b.toString(16).padStart(2, '0')}`;
    setCurrentColor(hexColor);
  }, [customColor]);

  const handleResize = () => {
    loadImage();
  };

  const loadImage = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const containerWidth = container.clientWidth;
      const scaleFactor = containerWidth / img.width;
      setScale(scaleFactor);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.style.width = `${containerWidth}px`;
      canvas.style.height = `${img.height * scaleFactor}px`;

      setHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
    };
    img.src = '/ant20.svg'; // Use a single image source
  };

  const saveState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prevHistory => {
      const newHistory = [...prevHistory, currentState];
      return newHistory.slice(-MAX_HISTORY);
    });
  };

  const undo = () => {
    if (history.length <= 1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop();
    const previousState = newHistory[newHistory.length - 1];

    ctx.putImageData(previousState, 0, 0);
    setHistory(newHistory);
  };

  const floodFill = (x: number, y: number, fillColor: number[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    saveState();

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const targetColor = getPixel(imageData, x, y);
    
    if (colorsMatch(targetColor, fillColor)) return;

    const pixelsToCheck: number[] = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop()!;
      const x = pixelsToCheck.pop()!;

      const currentColor = getPixel(imageData, x, y);
      if (colorsMatch(currentColor, targetColor)) {
        setPixel(imageData, x, y, fillColor);
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const getPixel = (imageData: ImageData, x: number, y: number): number[] => {
    const index = (y * imageData.width + x) * 4;
    return [
      imageData.data[index],
      imageData.data[index + 1],
      imageData.data[index + 2],
      imageData.data[index + 3]
    ];
  };

  const setPixel = (imageData: ImageData, x: number, y: number, color: number[]) => {
    const index = (y * imageData.width + x) * 4;
    imageData.data[index] = color[0];
    imageData.data[index + 1] = color[1];
    imageData.data[index + 2] = color[2];
    imageData.data[index + 3] = color[3];
  };

  const colorsMatch = (color1: number[], color2: number[]): boolean => {
    return color1[0] === color2[0] && color1[1] === color2[1] && 
           color1[2] === color2[2] && color1[3] === color2[3];
  };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
  };

  const handleCustomColorChange = (color: 'r' | 'g' | 'b', value: number[]) => {
    setCustomColor(prev => ({ ...prev, [color]: value[0] }));
  };

  const handleClearPage = () => {
    saveState();
    loadImage();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / scale);
    const y = Math.floor((e.clientY - rect.top) / scale);
    const fillColor = hexToRgb(currentColor);
    floodFill(x, y, fillColor);
  };

  const hexToRgb = (hex: string): number[] => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b, 255];
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Coloring Page</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end space-x-2 mb-4">
          <Button onClick={handleClearPage} className="px-2 py-1 text-xs">Clear</Button>
          <Button onClick={undo} className="px-2 py-1 text-xs" disabled={history.length <= 1}>Undo</Button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div ref={containerRef} className="w-full md:w-2/3 mb-4 md:mb-0 md:pr-4">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="border border-gray-300 w-full"
            />
          </div>
          <div className="w-full md:w-1/3">
            <div className="md:hidden mb-2">
              <Button
                onClick={() => setIsColorPaletteVisible(!isColorPaletteVisible)}
                className="w-full flex justify-between items-center"
              >
                {isColorPaletteVisible ? 'Hide Color Palette' : 'Show Color Palette'}
                {isColorPaletteVisible ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
            <div className={`${isColorPaletteVisible ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-wrap justify-center gap-1 mb-4">
                {colors.map((color) => (
                  <div
                    key={color}
                    className="w-6 h-6 rounded-full cursor-pointer border border-gray-300"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                  ></div>
                ))}
              </div>
              <Card className="p-4">
                <CardTitle className="text-sm mb-2">Mix your own color</CardTitle>
                <div className="space-y-2">
                  {(['r', 'g', 'b'] as const).map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Label className="w-2">{color.toUpperCase()}</Label>
                      <Slider
                        className="flex-grow"
                        min={0}
                        max={255}
                        step={1}
                        value={[customColor[color]]}
                        onValueChange={(value) => handleCustomColorChange(color, value)}
                      />
                    </div>
                  ))}
                </div>
                <div 
                  className="w-full h-6 mt-2 rounded"
                  style={{ backgroundColor: currentColor }}
                ></div>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColoringApp;