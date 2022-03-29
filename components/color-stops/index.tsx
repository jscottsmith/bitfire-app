import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ThumbStop } from "./components/thumb-stop";
import { useColorsContext } from "../../context/colors";
import { ColorStop } from "../../type";

function createStop(stops: ColorStop[]): ColorStop {
  return { stop: 0, id: `${stops.length}`, hex: "#000000" };
}

export const ColorStops = () => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const colorContext = useColorsContext();
  const [colorStops, setStops] = useState<ColorStop[]>(
    colorContext.state.colorStops
  );

  function addStop() {
    setStops([...colorStops, createStop(colorStops)]);
  }

  function setStopValue(id: string, stop: number) {
    setStops(
      colorStops.map((colorStop) => {
        if (colorStop.id === id) {
          return { ...colorStop, stop };
        }
        return colorStop;
      })
    );
  }

  return (
    <>
      <motion.div
        className="relative w-full h-[40px] bg-blue-100"
        ref={constraintsRef}
      >
        {colorStops.map((colorStop) => (
          <ThumbStop
            key={colorStop.id}
            label={colorStop.hex}
            value={colorStop.stop}
            setStopValue={setStopValue}
            constraintsRef={constraintsRef}
          />
        ))}
      </motion.div>
      <button onClick={addStop}>Add Stop</button>
    </>
  );
};
