import { CELL_HEIGHT, CELL_WIDTH, FLAME_DEPTH } from "../constants";
import { Table } from "../types";
import { createFlameGraph, createGradientArray } from "../utils";
import { Pixel } from "./pixel";

export type PixelBounds = {
  top: Pixel;
  bottom: Pixel;
  left: Pixel;
  right: Pixel;
};

export class Matrix {
  rows: number;
  columns: number;
  pixels: Table;
  colors: string[];

  constructor(options: { colors: string[] }) {
    this.rows = 0;
    this.columns = 0;
    this.pixels = [];
    this.colors = options.colors;
  }

  createMatrix(bounds: any) {
    const colors = createGradientArray(
      FLAME_DEPTH,
      createFlameGraph(this.colors)
    );

    this.rows = Math.ceil(bounds.h / CELL_HEIGHT);
    this.columns = Math.ceil(bounds.w / CELL_WIDTH);
    const table = Array(this.rows).fill(Array(this.columns).fill(null));

    this.pixels = table.map((row, y) =>
      row.map(
        (_: any, x: number) =>
          new Pixel({
            x: x * CELL_WIDTH,
            y: y * CELL_HEIGHT,
            colors,
            index: y >= this.rows - 2 ? 0 : colors.length - 1,
            isStatic: false,
          })
      )
    );

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const bounds: PixelBounds = {
          top: this.pixels[row - 1] && this.pixels[row - 1][col],
          left: this.pixels[row][col - 1],
          bottom: this.pixels[row + 1] && this.pixels[row + 1][col],
          right: this.pixels[row][col + 1],
        };

        this.pixels[row][col].setSides(bounds);
      }
    }
  }

  setup = ({ bounds }: any) => this.createMatrix(bounds);

  resize = ({ bounds }: any) => this.createMatrix(bounds);

  draw = ({ ctx, pointer, tick, bounds }: any) => {
    const { x, y } = pointer.position;
    let pointCol;
    let pointRow;
    if (x !== null && y !== null) {
      // pointer
      pointCol = Math.floor(x / CELL_WIDTH);
      pointRow = Math.floor(y / CELL_HEIGHT);
    } else {
      // demo circle
      const z = tick / 10;
      const s = bounds.h / 4;
      const { center: c } = bounds;
      pointCol = Math.floor((c.x + Math.sin(z) * s) / CELL_WIDTH);
      pointRow = Math.floor((c.y + Math.cos(z) * s) / CELL_HEIGHT);
    }

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const pixel = this.pixels[row][col];
        if (pointRow === row && pointCol === col) {
          pixel.index = 0;
        }

        pixel.draw({ ctx });
        pixel.update();
      }
    }
  };
}
