import React, { useRef, useEffect, useState } from "react";
import cx from "classnames";
import { Canvas } from "@gush/candybar";
import { EditMatrix } from "./modules/edit-matrix";
import { useColorsContext } from "../../context/colors";
import { MutableRefObject } from "react";

function useCanvas({
  canvasRef,
  containerRef,
}: {
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}) {
  const [canvas, setCanvas] = useState<Canvas | null>(null);

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

  return canvas;
}

function useMatrix(args: { canvas: Canvas | null; isRunning: boolean }) {
  const colorsContext = useColorsContext();

  const [matrix, setMatrix] = useState<EditMatrix | null>(null);

  useEffect(() => {
    const options = {
      colorStops: colorsContext.state.colorStops,
      isRunning: args.isRunning,
    };

    // Creat only once. Update if you need changes
    if (matrix === null && args.canvas instanceof Canvas) {
      const entity = new EditMatrix(options);
      setMatrix(entity);
      args.canvas.addEntity(entity);
    } else if (matrix) {
      matrix.updateColors(colorsContext.state.colorStops);
    }
  }, [matrix, args.canvas, args.isRunning, colorsContext.state.colorStops]);

  return matrix;
}
export const BitfireCanvas = () => {
  const [isRunning, setRun] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const canvas = useCanvas({ containerRef, canvasRef });
  const matrix = useMatrix({ canvas, isRunning });

  useEffect(() => {
    if (matrix instanceof EditMatrix) {
      if (isRunning) {
        matrix.setRunMode();
      } else {
        matrix.setEditMode();
      }
    }
  }, [isRunning, canvas, matrix]);

  return (
    <>
      <div
        ref={containerRef}
        className={cx(
          "w-[512px] h-[512px] relative",
          isRunning ? "cursor-wait" : "cursor-crosshair"
        )}
      >
        <canvas ref={canvasRef} />
      </div>
      <div>
        Mode:{" "}
        <button
          className="bg-black text-white p-2"
          onClick={() => setRun(!isRunning)}
        >
          {isRunning ? "running" : "editing"}
        </button>
      </div>
    </>
  );
};
