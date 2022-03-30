import React, { useRef, useState, ChangeEvent } from "react";
import cx from "classnames";
import * as styles from "./index.module.css";

export type ColorThumbProps = {
  min: number;
  max: number;
  value: number;
  name: string;
  removeColorStop: (id: string) => unknown;
  onChange: (event: ChangeEvent<HTMLInputElement>) => unknown;
};

export const ColorThumb = (props: ColorThumbProps) => {
  const [value, setValue] = useState(props.value);
  const [isFocused, setFocus] = useState(false);
  const [isMouseDown, setMouseDown] = useState(false);
  const [deltaY, setDeltaY] = useState(0);
  const [shouldDeleteStop, setShouldDeleteStop] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onMouseMove={(e) => {
        if (isMouseDown) {
          const nextDelta = deltaY + e.movementY;
          setDeltaY(nextDelta);
          if (Math.abs(nextDelta) > 50) {
            if (!shouldDeleteStop) {
              setShouldDeleteStop(true);
            }
          } else if (shouldDeleteStop) {
            setShouldDeleteStop(false);
          }
        }
      }}
      onMouseDown={(e) => {
        setMouseDown(true);
      }}
      onMouseUp={(e) => {
        setMouseDown(false);
        if (shouldDeleteStop) {
          // console.log("remove");
          props.removeColorStop(props.name);
        }
        setDeltaY(0);
      }}
    >
      <input
        type="range"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        step="0.01"
        name={props.name}
        min={props.min}
        max={props.max}
        value={value}
        ref={inputRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setValue(parseFloat(event.target.value));
          props.onChange(event);
        }}
        className={cx(styles.thumb, {
          "z-10": isFocused,
          [styles.shouldDelete]: shouldDeleteStop,
        })}
      />
    </div>
  );
};
