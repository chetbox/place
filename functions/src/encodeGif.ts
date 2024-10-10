import { ColorHistoryItem } from "../../database/.types";
import { createCanvas } from "canvas";
import { Palette } from "./palette";
import { encode as encodeGif } from "modern-gif";

export async function encodeHistoryAsGif(
  width: number,
  height: number,
  history: ColorHistoryItem[],
  options: {
    speed: number;
    lastFrameDelay: number;
    minFrameDelay: number;
    maxFrameDelay: number;
    scale: number;
  } = {
    speed: 1,
    lastFrameDelay: 1000,
    minFrameDelay: 0,
    maxFrameDelay: Infinity,
    scale: 1,
  }
): Promise<ArrayBuffer> {
  if (history.length === 0) {
    throw new Error("No data to encode");
  }

  const canvas = createCanvas(width * options.scale, height * options.scale);
  const ctx = canvas.getContext("2d");

  const frames: { delay: number; data: Uint8ClampedArray }[] = [];

  for (let i = 0; i < history.length; i++) {
    const { x, y, value, timestamp } = history[i];

    const color = Palette[value];
    ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
    ctx.fillRect(
      x * options.scale,
      y * options.scale,
      options.scale,
      options.scale
    );

    const data = ctx.getImageData(
      0,
      0,
      width * options.scale,
      height * options.scale
    ).data;

    let delay =
      i < history.length - 1
        ? (history[i + 1].timestamp - timestamp) / options.speed
        : options.lastFrameDelay;

    if (delay < options.minFrameDelay) {
      const previousFrame = frames.pop();
      if (previousFrame) {
        delay += previousFrame.delay;
      }
    }

    frames.push({ data, delay });
  }

  for (const frame of frames) {
    if (frame.delay > options.maxFrameDelay) {
      frame.delay = options.maxFrameDelay;
    }
  }

  return await encodeGif({
    width: width * options.scale,
    height: height * options.scale,
    frames,
  });
}
