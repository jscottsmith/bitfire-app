import React, { useRef, useState, ChangeEvent } from "react";
import cx from "classnames";
import * as styles from "./index.module.css";

export type ColorThumbProps = {
  min: number;
  max: number;
  value: number;
  name: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => unknown;
};

export const ColorThumb = (props: ColorThumbProps) => {
  const [value, setValue] = useState(props.value);
  const [isFocused, setFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
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
        // if (!isFocused) {
        //   event.target.focus();
        // }
        setValue(parseFloat(event.target.value));
        props.onChange(event);
      }}
      className={cx(styles.thumb, isFocused && "z-10")}
    />
  );
};
