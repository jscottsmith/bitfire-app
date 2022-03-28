import React, { useRef, useEffect } from "react";
import { Canvas } from "@gush/candybar";

import Fire from "./modules/Fire";

export const BitfireCanvas = () => {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = new Canvas({
      canvas: canvasRef?.current,
      container: containerRef?.current,
      hasPointer: true,
      pauseInBackground: true,
      entities: [new Fire()],
    });

    return () => {
      canvas.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: 500, height: 500 }}>
      <canvas ref={canvasRef} />
    </div>
  );
};
