import React from "react";
import {
  updateColor,
  useColorsContext,
  resetColors,
} from "../../context/colors";

export const ColorOptions = () => {
  const context = useColorsContext();

  return (
    <ul className="flex">
      <button onClick={() => context.dispatch(resetColors())}>Reset</button>
      {context.state.colors.map((color, i) => (
        <li key={i}>
          <button
            onClick={() =>
              context.dispatch(updateColor({ color: "red", index: i }))
            }
            className="block p-2 hover:border-2 hover:border-solid hover:border-black"
            style={{ background: color }}
          >
            {color}
          </button>
        </li>
      ))}
    </ul>
  );
};
