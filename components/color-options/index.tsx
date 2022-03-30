import React, { useState } from "react";
import {
  updateColor,
  resetColors,
  useColorsContext,
} from "../../context/colors";
import { ColorPickerModal } from "../color-picker-modal";

export const ColorOptions = () => {
  const context = useColorsContext();
  const [isPickerOpen, setPickerOpen] = useState<boolean>(false);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [color, setColor] = useState<string>("");

  return (
    <>
      <ul className="flex">
        <button onClick={() => context.dispatch(resetColors())}>Reset</button>
        {context.state.colorStops.map((colorStop, i) => (
          <li key={colorStop.id}>
            <button
              onClick={() => {
                setColorIndex(i);
                setColor(colorStop.hex);
                setPickerOpen(true);
              }}
              className="block p-2 text-xs hover:border-2 hover:border-solid hover:border-black"
              style={{ background: colorStop.hex }}
            >
              {colorStop.hex}
            </button>
          </li>
        ))}
      </ul>
      <ColorPickerModal
        isOpen={isPickerOpen}
        colorIndex={colorIndex}
        color={color}
        closeModal={() => {
          setPickerOpen(false);
        }}
      />
    </>
  );
};
