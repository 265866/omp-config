import { spawn } from "node:child_process";
import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

function textFromContent(content: unknown) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";

  return content
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      if (!("type" in block)) return "";

      if (
        block.type === "text" &&
        "text" in block &&
        typeof block.text === "string"
      ) {
        return block.text;
      }

      if (block.type === "image") return "[image]";

      return "";
    })
    .filter(Boolean)
    .join("\n");
}

function copyToClipboard(text: string) {
  return new Promise<void>((resolve, reject) => {
    const child = spawn("pbcopy");
    let stderr = "";

    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(stderr.trim() || `pbcopy exited with code ${code}`));
      }
    });

    child.stdin.end(text);
  });
}

type TranscriptMessage = {
  role?: unknown;
  content?: unknown;
  synthetic?: unknown;
  steering?: unknown;
  hidden?: unknown;
  source?: unknown;
  origin?: unknown;
  kind?: unknown;
  metadata?: Record<string, unknown>;
};

function shouldCopyMessage(message: TranscriptMessage) {
  if (message.role !== "user" && message.role !== "assistant") return false;
  if (message.synthetic === true || message.steering === true || message.hidden === true) {
    return false;
  }

  const sourceMarkers = [
    message.source,
    message.origin,
    message.kind,
    message.metadata?.source,
    message.metadata?.origin,
    message.metadata?.kind,
  ];

  return !sourceMarkers.some((marker) => {
    if (typeof marker !== "string") return false;
    const normalized = marker.toLowerCase();
    return normalized === "synthetic" || normalized === "steering";
  });
}

function renderedTranscriptSection(message: TranscriptMessage) {
  const content = textFromContent(message.content).trim();
  if (!content) return undefined;
  return `${String(message.role).toUpperCase()}:\n${content}`;
}


export default function copyAll(pi: ExtensionAPI) {
  pi.setLabel("Copy All");

  pi.registerCommand("copy-all", {
    description:
      "Copy all previous user and assistant messages in this thread to the clipboard",
    handler: async (_args, ctx) => {
      await ctx.waitForIdle();

      if (!ctx.hasUI) {
        throw new Error("/copy-all requires an interactive UI");
      }

      if (process.platform !== "darwin") {
        ctx.ui.notify("/copy-all currently requires macOS pbcopy", "error");
        return;
      }

      const sections = ctx.sessionManager
        .getBranch()
        .filter((entry) => entry.type === "message")
        .map((entry) => entry.message as TranscriptMessage)
        .filter(shouldCopyMessage)
        .map(renderedTranscriptSection)
        .filter((section): section is string => Boolean(section));

      const text = sections.join("\n\n---\n\n");

      if (!text) {
        ctx.ui.notify("No user or assistant messages to copy", "info");
        return;
      }

      try {
        await copyToClipboard(text);
        ctx.ui.notify(`Copied ${sections.length} messages to clipboard`, "info");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        ctx.ui.notify(`Failed to copy messages: ${message}`, "error");
      }
    },
  });
}
