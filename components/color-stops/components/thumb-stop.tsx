import React, { useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useState } from "react";

export const ThumbStop = (props: {
  constraintsRef: any;
  label: string;
  value: number;
  setStopValue: (label: string, value: number) => void;
}) => {
  const x = useMotionValue(0);
  const [value, setVal] = useState(0);

  useEffect(
    () =>
      x.onChange((latest) => {
        setVal(latest);
      }),
    []
  );

  return (
    <motion.div
      key={props.label}
      className="absolute top-0 h-[40px] w-[40px] bg-gray-500"
      whileHover={{ scale: 1.2 }}
      drag="x"
      style={{ x }}
      onDragEnd={() => {
        const total =
          props.constraintsRef.current.getBoundingClientRect().width - 40;
        const v = parseFloat((value / total).toFixed(2));
        props.setStopValue(props.label, v);
      }}
      dragConstraints={props.constraintsRef}
      dragMomentum={false}
      dragElastic={0}
    >
      <span className="block text-xs text-white text-center">
        {props.value}
      </span>
      <span className="block text-xs text-white text-center">
        {props.label}
      </span>
    </motion.div>
  );
};
