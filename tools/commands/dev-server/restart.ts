export const summary = "Stop then start the dev server for a seq+app pair"

import type { CommandHelp } from "../../ops/surface.ts"
import { parseArgs } from "../../lib/parse-args.ts"
import { APP_NAMES } from "../../lib/dev-server-ops.ts"
import devServerStart, { help as startHelp } from "./start.ts"
import devServerStop from "./stop.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--seq",
      argLabel: "<n>",
      valueShape: "token",
      required: true,
      description: "Branch sequence number (integer)",
    },
    {
      name: "--app",
      argLabel: "<name>",
      valueShape: "token",
      required: true,
      description: `App identifier (one of: ${APP_NAMES.join(", ")})`,
    },
    {
      name: "--port",
      argLabel: "<p>",
      valueShape: "token",
      description: "Override the computed port",
    },
    { name: "--json", description: "Emit JSON result instead of the summary line" },
  ],
  positionals: [
    {
      name: "seq",
      required: false,
      aliasOfFlag: "--seq",
      description: "Branch sequence number (integer)",
    },
  ],
  envVars: startHelp.envVars,
  exits: [
    { code: 1, meaning: "input error: missing flag, unknown app" },
    { code: 3, meaning: "operational error: stop or start step failed" },
  ],
  examples: [
    "ops dev-server restart 8485 --app alanwalton",
    "ops dev-server restart --seq 8485 --app alanwalton",
    "ops dev-server restart --seq 8485 --app alanwalton --json",
  ],
}

export default async function devServerRestart(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const seq = parsed.requireString("--seq")
  const app = parsed.requireString("--app")
  const port = parsed.string("--port")
  const json = parsed.boolean("--json")

  const originalWrite = process.stdout.write.bind(process.stdout)
  const noopWrite: typeof process.stdout.write = (
    _chunk: unknown,
    encodingOrCb?: unknown,
    cb?: unknown
  ): boolean => {
    const callback = typeof encodingOrCb === "function" ? encodingOrCb : cb
    if (typeof callback === "function") callback()
    return true
  }
  process.stdout.write = noopWrite
  try {
    await devServerStop(["--seq", seq, "--app", app])
  } finally {
    process.stdout.write = originalWrite
  }

  const startArgs = ["--seq", seq, "--app", app]
  if (port !== undefined) startArgs.push("--port", port)
  if (json) startArgs.push("--json")
  await devServerStart(startArgs)
}
