import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef,
  CSSProperties,
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

function sortById(a: GradientOption, b: GradientOption) {
  const idA = a.id.toUpperCase();
  const idB = b.id.toUpperCase();
  if (idA < idB) {
    return -1;
  }
  if (idA > idB) {
    return 1;
  }
  return 0;
}

function createCSSGradient(
  options: GradientOptions
): CSSProperties | undefined {
  if (options.length === 0) {
    return;
  }
  if (options.length === 1) {
    return { backgroundColor: options[0].label };
  }

  const format = options.map((option) => {
    return `${option.label} ${option.value * 100}%`;
  });

  return { backgroundImage: `linear-gradient(to right,${format.join(",")})` };
}

function createInternalOptions(options: GradientOptions) {
  const internalOptions = [...options].sort(sortById);
  return internalOptions;
}

export const GradientPicker: FC<GradientPickerProps> = (props) => {
  const [options, setOptions] = useState<GradientOptions>(
    createInternalOptions(props.options)
  );

  // handle external updates
  useEffect(() => {
    setOptions(createInternalOptions(props.options));
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

    // internal options sorted by ID so that the DOM remains stable in order
    setOptions(createInternalOptions(newOptions));

    // external options sorted by value
    newOptions.sort((a, b) => a.value - b.value);
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
            color={option.label}
            onChange={updateOption}
            removeColorStop={handleRemoveColorStop}
            canOptionBeRemoved={options.length > 2}
          />
        ))}
      </div>
      <div className={styles.track}>
        <div
          className={styles.startCap}
          style={{ background: props.options[0].label }}
        />
        <div
          className={styles.gradient}
          style={createCSSGradient(props.options)}
        />
        <div
          className={styles.endCap}
          style={{ background: props.options[props.options.length - 1].label }}
        />
      </div>
    </div>
  );
};
