import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@gush/candybar";
import { EditMatrix } from "./modules/edit-matrix";
import { Matrix } from "./modules/matrix";
import { useColorsContext } from "../../context/colors";

export const BitfireCanvas = () => {
  const colorsContext = useColorsContext();
  const [run, setRun] = useState(false);
  const [canvas, setCanvas] = useState<Canvas | boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    setCanvas(
      new Canvas({
        canvas: canvasRef?.current,
        container: containerRef?.current,
        hasPointer: true,
        pauseInBackground: true,
        entities: [],
      })
    );

    return () => {
      console.warn("destroy canvas if you ever see this");
      // canvas.destroy();
    };
  }, []);

  useEffect(() => {
    if (canvas instanceof Canvas) {
      const options = { colors: colorsContext.state.colors };
      const entity = run ? new Matrix(options) : new EditMatrix(options);
      canvas.removeEntity(0);
      canvas.addEntity(entity);
    }
  }, [run, canvas, colorsContext.state.colors]);

  return (
    <>
      <div ref={containerRef} className="w-[512px] h-[512px] relative">
        <canvas ref={canvasRef} />
      </div>
      <button onClick={() => setRun(!run)}>
        run {run ? "running" : "editing"}
      </button>
    </>
  );
};
