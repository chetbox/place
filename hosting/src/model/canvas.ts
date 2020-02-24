import { Square } from '../../../database/.types';

const SQUARE_KEYS: Array<keyof Square<any>> = ['00', '01', '10', '11'];

export function toGrid<T>(
  canvas: Square<Square<any>> | Square<T>,
  flattened: Array<Array<T|undefined>> = [],
  xOffsets = '',
  yOffsets = '',
) {
  SQUARE_KEYS.forEach((key) => {
    const value = canvas[key];
    if (typeof value === 'object') {
      toGrid(value, flattened, xOffsets + key[0], yOffsets + key[1]);
    } else if (value !== undefined) {
      // parse binary
      const x = parseInt(xOffsets + key[0], 2);
      const y = parseInt(yOffsets + key[1], 2);
      flattened[x][y] = value;
    }
  });
  return flattened;
}

export function emptyGrid<T>(depth: number): T[][] {
  return [...Array(depth).keys()].map(() => Array(depth));
}
