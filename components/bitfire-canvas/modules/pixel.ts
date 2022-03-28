import { utils } from "@gush/candybar";
import { CELL_HEIGHT, CELL_WIDTH, SPREAD_FROM } from "../constants";

export class Pixel {
  constructor(x, y, arr, idx) {
    this.x = x;
    this.y = y;
    this.idx = idx;
    this.arr = arr;
  }

  setSides({ top, left, bottom, right }) {
    this.top = top;
    this.left = left;
    this.bottom = bottom;
    this.right = right;
  }

  draw = ({ ctx }) => {
    const fill = this.arr[this.idx];
    ctx.fillStyle = fill;
    ctx.fillRect(this.x, this.y, CELL_WIDTH, CELL_HEIGHT);
  };

  update = () => {
    const side = SPREAD_FROM[utils.getRandomInt(0, SPREAD_FROM.length - 1)];
    const dest = this[side];

    // check if it can dest to designated side
    if (dest && dest.idx < this.idx) {
      const rand = utils.getRandomInt(-1, 4);
      this.idx = dest.idx + rand;
    } else {
      this.idx += 1;
    }

    // resets if overflow
    if (this.idx > this.arr.length - 1) {
      this.idx = this.arr.length - 1;
    } else if (this.idx < 0) {
      this.idx = 0;
    }
  };
}
