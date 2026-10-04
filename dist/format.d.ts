/**
 * Number/duration formatting and color helpers.
 */
export interface Theme {
    fg(name: string, text: string): string;
}
/** Format TPS as a compact number string. */
export declare function fmtTps(v: number): string;
/** Format a TTFT duration in seconds. */
export declare function fmtTtft(t: number): string;
/** Format elapsed time as `1h 30m 15s`, `30m 15s`, `15s`, or `0.5s` for sub-second values. */
export declare function fmtElapsed(ms: number): string;
/**
 * Format a wall-clock timestamp as ISO 8601 UTC with second precision,
 * e.g. `2026-06-24T02:22:47Z`. Defaults to the current time.
 */
export declare function fmtClock(date?: Date): string;
/**
 * Color-code TPS: fast = success, medium = warning, slow = error.
 */
export declare function tpsColor(tps: number, text: string, theme: Theme): string;
/**
 * Color-code TTFT: fast = success, medium = warning, slow = error.
 */
export declare function ttftColor(t: number, text: string, theme: Theme): string;
