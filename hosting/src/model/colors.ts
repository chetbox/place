export type Color = number;

export function colorClass(color: Color|undefined): string|undefined {
  return color !== undefined
    ? `color-${color.toString(16).toUpperCase()}`
    : undefined;
}
