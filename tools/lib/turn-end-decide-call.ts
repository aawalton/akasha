import { existsSync, readFileSync, rmSync } from "node:fs"
import type { Keeper } from "./hook-decision-record.ts"

const PATIENCE = "20"

const WRAPPER_EXIT = /^error: "ops" exited with code /

function saidPath(agent: string): string {
  return `/var/tmp/turn-end-decide-${agent.replaceAll(/[^A-Za-z0-9_-]/g, "_")}.${process.pid}`
}

function lastLine(out: string): string {
  const lines = out.split("\n")
  while (lines.length > 0 && lines[lines.length - 1] === "") lines.pop()
  return lines.length === 0 ? "" : (lines[lines.length - 1] as string)
}

function forget(path: string): void {
  try {
    rmSync(path, { force: true })
  } catch {
    return
  }
}

export function decideTurnEnd(keeper: Keeper, agent: string, stdin: string): number {
  if (Bun.which("ops") === null) {
    keeper.record("allow", "verb-unavailable")
    return 0
  }
  const said = saidPath(agent)
  let out = ""
  try {
    const ran = Bun.spawnSync({
      cmd: ["timeout", PATIENCE, "ops", "seat", "turn-end", "decide", "--agent", agent],
      stdin: Buffer.from(stdin),
      stdout: "pipe",
      stderr: Bun.file(said),
    })
    out = ran.stdout.toString()
  } catch {
    out = ""
  }
  const [decision = "", reason = ""] = lastLine(out).split("\t")
  if (decision !== "allow" && decision !== "block") {
    forget(said)
    keeper.record("allow", "verb-unavailable")
    return 0
  }
  keeper.record(decision, reason)
  if (decision === "block") {
    const kept = existsSync(said) ? readFileSync(said, "utf8") : ""
    const lines = kept.split("\n")
    if (lines[lines.length - 1] === "") lines.pop()
    const shown = lines.filter((line) => !WRAPPER_EXIT.test(line))
    if (shown.length > 0) process.stderr.write(`${shown.join("\n")}\n`)
    forget(said)
    return 2
  }
  forget(said)
  return 0
}
