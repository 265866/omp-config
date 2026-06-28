import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

const COMMAND_BOUNDARIES = new Set([";", "&&", "||", "|", "&", "(", ")"]);
const GIT_OPTIONS_WITH_VALUE = new Set([
  "-C",
  "-c",
  "--git-dir",
  "--work-tree",
  "--namespace",
  "--config-env",
]);

export default function vcsPushGuard(pi: ExtensionAPI) {
  pi.setLabel("VCS Push Guard");

  pi.on("tool_call", async (event) => {
    if (event.toolName !== "bash") return;

    const command = getBashCommand(event.input);
    if (!command || !containsBlockedPush(command)) return;

    return {
      block: true,
      reason:
        "Blocked by VCS Push Guard: remote VCS push/merge commands are disabled in OMP. Ask the user to run the remote operation outside OMP if they still want it.",
    };
  });
}

function getBashCommand(input: unknown): string | undefined {
  if (!input || typeof input !== "object" || !("command" in input)) {
    return undefined;
  }

  const command = input.command;
  return typeof command === "string" ? command : undefined;
}

function containsBlockedPush(command: string): boolean {
  const tokens = tokenizeShellLike(command);

  for (let start = 0; start < tokens.length; start = nextCommandStart(tokens, start)) {
    if (startsWithGitPush(tokens, start)) return true;
    if (startsWithJjGitPush(tokens, start)) return true;
    if (startsWithGhPrMerge(tokens, start)) return true;
    if (startsWithShellWrappedPush(tokens, start)) return true;
  }

  return false;
}

function nextCommandStart(tokens: string[], start: number): number {
  let index = start;

  if (COMMAND_BOUNDARIES.has(tokens[index])) {
    index += 1;
  }

  while (index < tokens.length && !COMMAND_BOUNDARIES.has(tokens[index])) {
    index += 1;
  }

  while (index < tokens.length && COMMAND_BOUNDARIES.has(tokens[index])) {
    index += 1;
  }

  return index;
}

function startsWithGitPush(tokens: string[], start: number): boolean {
  let index = skipCommandPrefixes(tokens, start);

  if (!commandNameEquals(tokens[index], "git")) return false;
  index = skipGitGlobalOptions(tokens, index + 1);

  return tokens[index] === "push";
}

function startsWithJjGitPush(tokens: string[], start: number): boolean {
  let index = skipCommandPrefixes(tokens, start);

  if (!commandNameEquals(tokens[index], "jj")) return false;
  index += 1;

  return tokens[index] === "git" && tokens[index + 1] === "push";
}

function startsWithGhPrMerge(tokens: string[], start: number): boolean {
  let index = skipCommandPrefixes(tokens, start);

  if (!commandNameEquals(tokens[index], "gh")) return false;
  index += 1;

  return tokens[index] === "pr" && tokens[index + 1] === "merge";
}

function startsWithShellWrappedPush(tokens: string[], start: number): boolean {
  let index = skipCommandPrefixes(tokens, start);

  const isKnownShell =
    commandNameEquals(tokens[index], "sh") ||
    commandNameEquals(tokens[index], "bash") ||
    commandNameEquals(tokens[index], "zsh");
  if (!isKnownShell) return false;

  index += 1;

  while (tokens[index]?.startsWith("-")) {
    const option = tokens[index];
    index += 1;

    if (option === "-o" || option === "-O") {
      index += 1;
      continue;
    }

    const runsCommandString = option === "-c" || /^-[^-].*c/.test(option);
    if (runsCommandString) {
      const wrappedCommand = tokens[index];
      return typeof wrappedCommand === "string" && containsBlockedPush(wrappedCommand);
    }
  }

  return false;
}

function skipCommandPrefixes(tokens: string[], start: number): number {
  let index = start;

  while (isAssignment(tokens[index])) {
    index += 1;
  }

  while (["builtin", "command", "exec"].includes(tokens[index])) {
    index += 1;
  }

  if (tokens[index] === "env") {
    index += 1;

    while (tokens[index]?.startsWith("-") || isAssignment(tokens[index])) {
      index += 1;
    }
  }

  while (isAssignment(tokens[index])) {
    index += 1;
  }

  return index;
}

function skipGitGlobalOptions(tokens: string[], start: number): number {
  let index = start;

  while (tokens[index]?.startsWith("-")) {
    const option = tokens[index];
    index += 1;

    const optionName = option.includes("=") ? option.slice(0, option.indexOf("=")) : option;
    if (GIT_OPTIONS_WITH_VALUE.has(optionName) && !option.includes("=") && index < tokens.length) {
      index += 1;
    }
  }

  return index;
}

function commandNameEquals(token: string | undefined, expected: string): boolean {
  if (!token) return false;

  const lastSlash = token.lastIndexOf("/");
  const commandName = lastSlash === -1 ? token : token.slice(lastSlash + 1);

  return commandName === expected;
}

function isAssignment(token: string | undefined): boolean {
  return Boolean(token && /^[A-Za-z_][A-Za-z0-9_]*=.*/.test(token));
}

function tokenizeShellLike(command: string): string[] {
  const tokens: string[] = [];
  let current = "";
  let quote: '"' | "'" | undefined;

  for (let index = 0; index < command.length; index += 1) {
    const char = command[index];

    if (quote) {
      if (char === quote) {
        quote = undefined;
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (/\s/.test(char)) {
      pushCurrent(tokens, current);
      current = "";
      continue;
    }

    if (";&|()".includes(char)) {
      pushCurrent(tokens, current);
      current = "";

      const next = command[index + 1];
      if ((char === "&" && next === "&") || (char === "|" && next === "|")) {
        tokens.push(char + next);
        index += 1;
      } else {
        tokens.push(char);
      }
      continue;
    }

    current += char;
  }

  pushCurrent(tokens, current);
  return tokens;
}

function pushCurrent(tokens: string[], current: string): void {
  if (current.length > 0) {
    tokens.push(current);
  }
}
