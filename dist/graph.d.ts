/**
 * Braille sparkline renderer for the footer status graph.
 */
import type { Theme } from "./format.js";
/**
 * Render a 10-column colored braille sparkline from a circular buffer of TPS
 * values. Each column combines two adjacent samples into one braille glyph and
 * is colored by the *average* of those two samples, so the color reflects the
 * combined column rather than only its left half.
 */
export declare function brailleGraph(buf: Float64Array, len: number, head: number, theme: Theme): string;
