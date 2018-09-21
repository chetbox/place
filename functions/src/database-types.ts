export interface Canvas {
  depth: number;
  canvas: Square<Square<Square<Square<Square<Square<Square<Color>>>>>>>;
}

export interface Square<T> {
  '00': T | null;
  '01': T | null;
  '10': T | null;
  '11': T | null;
}

export type Color = number;
