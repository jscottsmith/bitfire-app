import React, { useRef, useState, ChangeEvent, MouseEvent } from "react";
import cx from "classnames";
import * as styles from "./index.module.css";

export type ColorThumbProps = {
  min: number;
  max: number;
  value: number;
  name: string;
  color: string;
  canOptionBeRemoved: boolean;
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

  function onMouseMove(e: MouseEvent<HTMLInputElement>) {
    if (isMouseDown) {
      const nextDelta = deltaY + e.movementY;
      setDeltaY(nextDelta);
      if (Math.abs(nextDelta) > 50 && props.canOptionBeRemoved) {
        if (!shouldDeleteStop) {
          setShouldDeleteStop(true);
        }
      } else if (shouldDeleteStop) {
        setShouldDeleteStop(false);
      }
    }
  }

  function onMouseUp() {
    setMouseDown(false);
    if (shouldDeleteStop) {
      props.removeColorStop(props.name);
    }
    setDeltaY(0);
  }

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(parseFloat(event.target.value));
    props.onChange(event);
  }

  return (
    // @ts-expect-error
    <div style={{ "--color": props.color }}>
      <input
        type="range"
        step="0.01"
        name={props.name}
        min={props.min}
        max={props.max}
        value={value}
        ref={inputRef}
        className={cx(styles.thumb, {
          "z-10": isFocused,
          [styles.shouldDelete]: shouldDeleteStop,
        })}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseMove={onMouseMove}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={onMouseUp}
        onChange={onChange}
      />
    </div>
  );
};
