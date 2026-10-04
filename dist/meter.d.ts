/**
 * Core stats accumulator: TPS rolling window, TTFT samples, and elapsed time.
 *
 * All state lives in a class instance created by the extension factory so
 * multiple extension loads (tests, reloads) never share mutable module state.
 */
import { type Theme } from "./format.js";
export interface MeterOptions {
    /** Injectable clock for deterministic tests. Defaults to `performance.now()`. */
    now?: () => number;
}
export interface MeterSnapshot {
    savedAt: number;
    allTps: {
        values: number[];
        times: number[];
    };
    allTtft: {
        values: number[];
        times: number[];
    };
    win: {
        values: number[];
        times: number[];
    };
    graph: number[];
    lastElapsedMs: number;
    totalElapsedMs: number;
}
/** Type guard for a persisted `MeterSnapshot` loaded from a session file. */
export declare function isMeterSnapshot(data: unknown): data is MeterSnapshot;
export declare class StatsMeter {
    private nowFn;
    private streaming;
    private streamStart;
    private streamChars;
    private streamTokens;
    private requestStart;
    private msgRequestStart;
    private firstTokenArrived;
    private firstTokenTime;
    private currentTtft;
    private elapsedStart;
    private lastElapsedMs;
    private totalElapsedMs;
    private spinIndex;
    private win;
    private allTps;
    private allTtft;
    private graph;
    private graphLen;
    private graphHead;
    constructor(options?: MeterOptions);
    private now;
    reset(): void;
    hasData(): boolean;
    serialize(): MeterSnapshot;
    restore(data: MeterSnapshot): void;
    markRequestStart(): void;
    startAssistantMessage(): void;
    /**
     * Record the arrival of the first assistant output token. Idempotent:
     * only the first call for a message has an effect.
     */
    private recordFirstToken;
    /** Public hook for non-streamed first-token events (e.g. `toolcall_start`). */
    markFirstToken(): void;
    addDelta(type: string, delta?: string): void;
    /** Decode-phase TPS: tokens per second from first output token to now. */
    private effectiveTps;
    endAssistantMessage(): void;
    private pushGraph;
    private graphSnapshotArray;
    /** Count of samples in `buf` that fall within the trailing 10-minute window. */
    private windowedCount;
    private calcTpsMean;
    private calcTpsP95;
    private calcTpsP10;
    private calcTtftMean;
    private spin;
    renderLive(theme: Theme): string;
    renderFinal(theme: Theme): string;
    /**
     * Diagnostic accessor: inspect internal state without breaking encapsulation.
     * Useful for tests and commands.
     */
    isStreaming(): boolean;
    inspect(): {
        streaming: boolean;
        ttftSamples: number;
        tpsSamples: number;
        tpsSamplesRecent: number;
        ttftSamplesRecent: number;
        lastElapsedMs: number;
        totalElapsedMs: number;
        graphLen: number;
        currentTtft: number;
        streamTokens: number;
        firstTokenTime: number;
        elapsedStart: number;
    };
}
export declare function createMeter(options?: MeterOptions): StatsMeter;
