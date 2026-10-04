/**
 * pi-pulse — Live TPS, TTFT, and response-time footer for pi.
 *
 * Displays a single-line footer under the "tps" status key:
 *
 *   TPS ⣤⣸⠀⠀ 42 avg | μ 38 | p10 25 | p95 55 | TTFT μ 0.25s | Elapsed 15s
 *
 * Metrics:
 *   - TPS: tokens per second during assistant text/thinking/tool-call-stream output
 *   - TTFT: mean time from `before_provider_request` to first assistant output token
 *   - Elapsed: duration of the current response while streaming, then the
 *     accumulated total across completed responses while idle.
 *
 * Built as a Pi package. Source lives in `src/`; Pi loads the compiled
 * output declared in `package.json#pi.extensions`.
 */
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { type StatsMeter } from "./meter.js";
/** Called once per Pi session when this extension is loaded. */
export default function piPulseExtension(pi: ExtensionAPI, deps?: {
    meter?: StatsMeter;
}): void;
