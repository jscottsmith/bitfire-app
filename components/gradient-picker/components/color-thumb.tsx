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
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <input
      type="range"
      step="0.01"
      name={props.name}
      min={props.min}
      max={props.max}
      value={value}
      ref={inputRef}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        props.onChange(event);
      }}
      className={cx(styles.thumb)}
    />
  );
};
