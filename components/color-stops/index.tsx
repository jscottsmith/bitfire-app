import React, { useState, useRef } from "react";
import { updateColors, useColorsContext } from "../../context/colors";
import { ColorStop } from "../../type";
import { GradientOption, GradientPicker } from "../gradient-picker";

function createStop(stops: ColorStop[]): ColorStop {
  return { stop: 0, id: `${stops.length}`, hex: "#000000" };
}

export const ColorStops = () => {
  const colorContext = useColorsContext();
  const [colorStops, setStops] = useState<ColorStop[]>(
    colorContext.state.colorStops
  );

  function addStop() {
    setStops([...colorStops, createStop(colorStops)]);
  }

  function handleChange(options) {
    const newColorStops = options.map((option: GradientOption) => ({
      hex: option.label,
      id: option.id,
      stop: option.value,
    }));
    colorContext.dispatch(updateColors(newColorStops));
  }

  // function setStopValue(id: string, stop: number) {
  //   setStops(
  //     colorStops.map((colorStop) => {
  //       if (colorStop.id === id) {
  //         return { ...colorStop, stop };
  //       }
  //       return colorStop;
  //     })
  //   );
  // }

  return (
    <>
      <GradientPicker
        min={0}
        max={1}
        // onChange={handleChange}
        options={colorContext.state.colorStops.map((colorStop) => ({
          label: colorStop.hex,
          id: colorStop.id,
          value: colorStop.stop,
        }))}
      />

      <button onClick={addStop}>Add Stop</button>
    </>
  );
};
