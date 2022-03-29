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
        {context.state.colors.map((color, i) => (
          <li key={i}>
            <button
              onClick={() => {
                setColorIndex(i);
                setColor(color);
                setPickerOpen(true);
              }}
              className="block p-2 hover:border-2 hover:border-solid hover:border-black"
              style={{ background: color }}
            >
              {color}
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
