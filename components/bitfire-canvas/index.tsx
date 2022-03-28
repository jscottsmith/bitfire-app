import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "@gush/candybar";
import { EditMatrix } from "./modules/edit-matrix";
import { useColorsContext } from "../../context/colors";

export const BitfireCanvas = () => {
  const colorsContext = useColorsContext();
  const [run, setRun] = useState(false);
  const [canvas, setCanvas] = useState<Canvas | boolean>(false);
  const [matrix, setMatrix] = useState<EditMatrix | boolean>(false);
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
    const options = { colors: colorsContext.state.colors, isRunning: run };
    const entity = new EditMatrix(options);
    setMatrix(entity);

    if (canvas instanceof Canvas) {
      canvas.addEntity(entity);
    }
  }, [canvas]);

  useEffect(() => {
    if (matrix instanceof EditMatrix) {
      if (run) {
        matrix.setRunMode();
      } else {
        matrix.setEditMode();
      }
    }
  }, [run, canvas, matrix]);

  return (
    <>
      <div ref={containerRef} className="w-[512px] h-[512px] relative">
        <canvas ref={canvasRef} />
      </div>
      <div>
        Mode:{" "}
        <button
          className="bg-black text-white p-2"
          onClick={() => setRun(!run)}
        >
          {run ? "running" : "editing"}
        </button>
      </div>
    </>
  );
};
