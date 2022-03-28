import { CELL_HEIGHT, CELL_WIDTH, FLAME_DEPTH } from "../constants";
import { Table } from "../types";
import { createFlameGraph, createGradientArray } from "../utils";
import { StaticPixel } from "./static-pixel";

export class EditMatrix {
  rows: number;
  columns: number;
  pixels: Table;
  colors: string[];

  constructor(options: { colors: string[] }) {
    this.colors = options.colors;
  }

  createMatrix(bounds) {
    const colors = createGradientArray(
      FLAME_DEPTH,
      createFlameGraph(this.colors)
    );

    this.rows = Math.ceil(bounds.h / CELL_HEIGHT);
    this.columns = Math.ceil(bounds.w / CELL_WIDTH);
    const table = Array(this.rows).fill(Array(this.columns).fill(null));

    this.pixels = table.map((row, y) =>
      row.map(
        (col, x) =>
          new StaticPixel({
            x: x * CELL_WIDTH,
            y: y * CELL_HEIGHT,
            colors,
            index: y >= this.rows - 2 ? 0 : colors.length - 1,
          })
      )
    );

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const bounds = {
          top: this.pixels[row - 1] && this.pixels[row - 1][col],
          left: this.pixels[row][col - 1],
          bottom: this.pixels[row + 1] && this.pixels[row + 1][col],
          right: this.pixels[row][col + 1],
        };

        this.pixels[row][col].setSides(bounds);
      }
    }
  }

  setup = ({ bounds, canvas }) => {
    this.createMatrix(bounds);
    canvas.addEventListener("mousedown", this.handleMouseDown);
    canvas.addEventListener("mouseup", this.handleMouseUp);
  };

  resize = ({ bounds }) => this.createMatrix(bounds);

  handleMouseDown = () => {
    this.mousedown = true;
  };

  handleMouseUp = () => {
    this.mousedown = false;
  };

  draw = ({ ctx, pointer, tick, bounds }) => {
    const { x, y } = pointer.position;

    // pointer
    const pointCol = Math.floor(x / CELL_WIDTH);
    const pointRow = Math.floor(y / CELL_HEIGHT);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const pixel = this.pixels[row][col];
        if (pointRow === row && pointCol === col && this.mousedown) {
          pixel.index = 0;
        }

        pixel.draw({ ctx });
        pixel.update();
      }
    }
  };
}