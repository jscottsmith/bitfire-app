import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react";
import classnames from "classnames";
import * as styles from "./index.module.css";
import { ColorThumb } from "./components/color-thumb";

export type GradientOption = {
  value: number;
  label: string;
  id: string;
};

export type GradientOptions = GradientOption[];

interface GradientPickerProps {
  min: number;
  max: number;
  options: GradientOptions;
  onChange: Function;
}

function createCSSGradient(options: GradientOptions): string {
  const format = options.map((option) => {
    return `${option.label} ${option.value * 100}%`;
  });

  return `linear-gradient(to right,${format.join(",")})`;
}

export const GradientPicker: FC<GradientPickerProps> = (props) => {
  const [options, setOptions] = useState<GradientOptions>(props.options);

  // handle external updates
  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  useEffect(() => {
    props.onChange && props.onChange(options);
  }, [options]);

  function updateOption(e: ChangeEvent<HTMLInputElement>) {
    // This should be optimized
    const newOptions = options.map((option): GradientOption => {
      if (option.id === e.target.name) {
        return {
          ...option,
          value: parseFloat(e.target.value),
        };
      }
      return option;
    });

    newOptions.sort((a, b) => a.value - b.value);

    setOptions(newOptions);

    // props.onChange(options);
  }

  return (
    <div className={styles.container}>
      {/* NOTE: must insure the order of options 
       remain the same even when they are sorted 
       or else focus will be lost mid change */}
      {props.options.map((option, i) => (
        <ColorThumb
          key={i}
          min={props.min}
          max={props.max}
          value={option.value}
          name={option.id}
          onChange={updateOption}
        />
      ))}

      <div className={styles.slider}>
        <div
          className={styles.track}
          style={{
            backgroundImage: createCSSGradient(options),
          }}
        />
      </div>
    </div>
  );
};
