export const CELL_WIDTH = 16;
export const CELL_HEIGHT = 16;

export enum Sides {
  "top" = "top",
  "bottom" = "bottom",
  "left" = "left",
  "right" = "right",
}

export type SpreadFromSide = keyof typeof Sides;

export const SPREAD_FROM: SpreadFromSide[] = [
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "bottom",
  "left",
  "left",
  "right",
  "right",
  "top",
];
export const FLAME_DEPTH = 64;
