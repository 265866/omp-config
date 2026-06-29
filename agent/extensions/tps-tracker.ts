/**
 * TPS Tracker Extension
 *
 * Tracks tokens per second during model generation and reports final TPS
 * statistics at the end of each agent run.
 */

import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

const OUTPUT_DELTA_TYPES: Record<string, true> = {
  text_delta: true,
  thinking_delta: true,
  toolcall_delta: true,
};

export default function tpsTracker(pi: ExtensionAPI) {
  pi.setLabel("TPS Tracker");

  /** Timestamp when the current assistant message event started. Used as a fallback. */
  let messageStart: number | null = null;
  /** Timestamp of the first streamed output delta for the current assistant message. */
  let streamStart: number | null = null;
  /** Estimated streamed output tokens for live display before providers report final usage. */
  let estimatedStreamedTokens = 0;
  /** Cumulative official output tokens across all assistant messages in this agent run. */
  let totalOutputTokens = 0;
  /** Cumulative time (ms) spent actually streaming output deltas. */
  let totalStreamMs = 0;

  pi.on("agent_start", async (_event, ctx) => {
    totalOutputTokens = 0;
    totalStreamMs = 0;
    messageStart = null;
    streamStart = null;
    estimatedStreamedTokens = 0;

    const theme = ctx.ui.theme;
    ctx.ui.setStatus("tps", theme.fg("dim", "generating..."));
  });

  pi.on("message_start", async (event) => {
    if (event.message.role !== "assistant") return;

    messageStart = Date.now();
    streamStart = null;
    estimatedStreamedTokens = 0;
  });

  pi.on("message_update", async (event, ctx) => {
    if (event.message.role !== "assistant") return;

    const streamEvent = event.assistantMessageEvent;
    if (!OUTPUT_DELTA_TYPES[streamEvent.type]) return;

    const deltaLength = getDeltaLength(streamEvent);
    if (deltaLength <= 0) return;

    const now = Date.now();
    streamStart ??= now;
    estimatedStreamedTokens += deltaLength / 4;

    const elapsed = (now - streamStart) / 1000;
    const officialTokens = getOutputTokens(event.message);
    const currentTokens = officialTokens > 0 ? officialTokens : estimatedStreamedTokens;

    if (elapsed > 0 && currentTokens > 0) {
      const tps = Math.round(currentTokens / elapsed);
      const tokenLabel = officialTokens > 0
        ? `${officialTokens} tok`
        : `~${Math.round(estimatedStreamedTokens)} tok`;
      const theme = ctx.ui.theme;

      ctx.ui.setStatus(
        "tps",
        `${theme.fg("accent", `${tps} tok/s`)} ${theme.fg("dim", `(${tokenLabel} / ${elapsed.toFixed(1)}s)`)}`,
      );
    }
  });

  pi.on("message_end", async (event) => {
    if (event.message.role !== "assistant") return;

    const officialMessageTokens = getOutputTokens(event.message);
    const messageTokens = officialMessageTokens > 0
      ? officialMessageTokens
      : Math.round(estimatedStreamedTokens);
    const timingStart = streamStart ?? messageStart;
    if (!timingStart || messageTokens <= 0) {
      resetMessageTracking();
      return;
    }

    totalOutputTokens += messageTokens;
    totalStreamMs += Math.max(0, Date.now() - timingStart);
    resetMessageTracking();
  });

  pi.on("agent_end", async (_event, ctx) => {
    const elapsed = totalStreamMs / 1000;
    const tps = totalOutputTokens > 0 && elapsed > 0 ? Math.round(totalOutputTokens / elapsed) : 0;

    const theme = ctx.ui.theme;
    const tpsLabel = tps > 0 ? theme.fg("accent", `${tps} tok/s`) : theme.fg("dim", "N/A");
    const detail = theme.fg("dim", `${totalOutputTokens} tokens in ${elapsed.toFixed(1)}s streaming`);

    ctx.ui.notify(`TPS ${tpsLabel}  ${detail}`, "info");
  });

  function resetMessageTracking() {
    messageStart = null;
    streamStart = null;
    estimatedStreamedTokens = 0;
  }
}

function getOutputTokens(message: { usage?: { output?: number | null } }): number {
  const output = message.usage?.output;
  return typeof output === "number" && Number.isFinite(output) && output > 0 ? output : 0;
}

function getDeltaLength(streamEvent: { delta?: unknown }): number {
  return typeof streamEvent.delta === "string" ? streamEvent.delta.length : 0;
}
