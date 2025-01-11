import * as functions from "firebase-functions";
import { PNG } from "pngjs";
import { Canvas, Square } from "../../database/.types";
import { Color as PaletteColor, Palette } from "./palette";

import * as admin from "firebase-admin";
import { encodeHistoryAsGif } from "./encodeGif";
admin.initializeApp();

const IMAGE_ID = "the-one-and-only";
const database = admin.database();

function zeroPad(n: number | string, padding: number): string {
  return ("0".repeat(padding) + n).slice(-padding);
}

function colorIndexFrom(
  depth: Canvas["depth"],
  canvas: Canvas["canvas"],
  x: number,
  y: number
): number | undefined {
  const xPath = zeroPad(x.toString(2), depth);
  const yPath = zeroPad(y.toString(2), depth);
  let square: Square<any> | number | undefined = canvas;
  for (let i = 0; i < depth; i++) {
    square = (square !== undefined && square[xPath[i] + yPath[i]]) || undefined;
  }
  return square as number;
}

function setColor(png: PNG, x: number, y: number, color: PaletteColor) {
  const index = (y + x * png.width) * 4;
  png.data[index] = color.r;
  png.data[index + 1] = color.g;
  png.data[index + 2] = color.b;
  png.data[index + 3] = color.a;
}

export const imagePng = functions
  .runWith({ maxInstances: 1 })
  .https.onRequest(async (request, response) => {
    try {
      const [depthSnapshot, canvasSnapshot] = await Promise.all([
        database.ref("canvas").child(IMAGE_ID).child("depth").once("value"),
        database.ref("canvas").child(IMAGE_ID).child("canvas").once("value"),
      ]);
      const depth = depthSnapshot.val() as Canvas["depth"];
      const canvas = canvasSnapshot.val() as Canvas["canvas"];

      const size = Math.pow(2, depth);
      const image = new PNG({ width: size, height: size });
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const colorIndex = colorIndexFrom(depth, canvas, x, y);
          if (colorIndex !== undefined) {
            setColor(image, x, y, Palette[colorIndex]);
          }
        }
      }
      const packedImage = image.pack();
      packedImage
        .pipe(response)
        .set("Cache-Control", "public, max-age=86400, s-maxage=86400")
        .type("image/png");
    } catch (error) {
      response.status(500).send(error);
    }
  });

export const historyGif = functions
  .runWith({ memory: "2GB", timeoutSeconds: 540, maxInstances: 1 })
  .https.onRequest(async (_request, response) => {
    try {
      const [depthSnapshot, historySnapshot] = await Promise.all([
        database.ref("canvas").child(IMAGE_ID).child("depth").once("value"),
        database.ref("canvas").child(IMAGE_ID).child("history").orderByChild("timestamp").limitToLast(200_000).once("value"),
      ]);
      const depth = depthSnapshot.val() as Canvas["depth"];
      const history = Object.values(
        historySnapshot.val() as Canvas["history"]
      ).sort((a, b) => a.timestamp - b.timestamp);

      const size = Math.pow(2, depth);
      const imageData = await encodeHistoryAsGif(size, size, history, {
        speed: 10000,
        lastFrameDelay: 5000,
        minFrameDelay: 1,
        maxFrameDelay: 500,
        scale: 1,
      });
      response
        .set("Cache-Control", "public, max-age=86400, s-maxage=604800")
        .type("image/gif")
        .end(Buffer.from(imageData), "binary");
    } catch (error) {
      response.status(500).send(error);
    }
  });
