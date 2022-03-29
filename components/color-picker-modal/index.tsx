import React from "react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import ReactModal from "react-modal";
import { updateColor, useColorsContext } from "../../context/colors";

export const ColorPickerModal = (props: {
  closeModal: () => void;
  isOpen: boolean;
  color: string;
  colorIndex: number;
}) => {
  const [color, setColor] = useState(props.color);
  const context = useColorsContext();

  function handleSave() {
    context.dispatch(updateColor({ color, index: props.colorIndex }));
    props.closeModal();
  }

  return (
    <ReactModal isOpen={props.isOpen}>
      <HexColorPicker color={props.color} onChange={setColor} />
      <button className="p-4 text-white bg-black" onClick={handleSave}>
        Save
      </button>
    </ReactModal>
  );
};
