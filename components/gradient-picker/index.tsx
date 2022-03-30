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

    props.onChange && props.onChange(newOptions);
  }

  function handleRemoveColorStop(id: string) {
    const newOptions = options.filter(
      (option: GradientOption) => option.id !== id
    );
    setOptions(newOptions);
    props.onChange && props.onChange(newOptions);
  }

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {/* NOTE: must insure the order of options 
       remain the same even when they are sorted 
       or else focus will be lost mid change */}
        {options.map((option, i) => (
          <ColorThumb
            key={option.id}
            min={props.min}
            max={props.max}
            value={option.value}
            name={option.id}
            onChange={updateOption}
            removeColorStop={handleRemoveColorStop}
          />
        ))}
      </div>
      <div
        className={styles.track}
        style={{
          backgroundImage: createCSSGradient(options),
        }}
      />
    </div>
  );
};
