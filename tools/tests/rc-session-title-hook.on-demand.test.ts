import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fire, type Ran } from "./hook-shell.ts"

const SCRIPT = "agent-hook-rc-session-title-hook.agent-hook.code.attachment.ts"
const AGENT = "01a03a2d-4beb-7000-a3c1-6d0e1f2a9b44"

interface HookOutput {
  readonly hookEventName: string
  readonly sessionTitle: string
}

function field(of: unknown, name: string): unknown {
  if (typeof of !== "object" || of === null) {
    throw new Error(`expected an object carrying \`${name}\`, got ${JSON.stringify(of)}`)
  }
  return (of as Record<string, unknown>)[name]
}

function text(value: unknown, what: string): string {
  if (typeof value !== "string") throw new Error(`\`${what}\` is ${JSON.stringify(value)}, not a string`)
  return value
}

function parseHookOutput(stdout: string): HookOutput {
  const specific = field(JSON.parse(stdout), "hookSpecificOutput")
  return {
    hookEventName: text(field(specific, "hookEventName"), "hookEventName"),
    sessionTitle: text(field(specific, "sessionTitle"), "sessionTitle"),
  }
}

interface RunOpts {
  seatName?: string
  withAgentId?: boolean
  stdin?: string
}

function runHook(opts: RunOpts = {}): Ran {
  const home = mkdtempSync(join(tmpdir(), "rc-title-"))
  const root = join(home, "akasha")
  try {
    if (opts.seatName !== undefined) {
      const dir = join(root, "agent", "seat")
      mkdirSync(dir, { recursive: true })
      writeFileSync(
        join(dir, `${opts.seatName}.seat.md`),
        `---\npage-type-slug: seat\nid: ${AGENT}\ntitle: "${opts.seatName}"\n---\n`
      )
    }
    return fire(SCRIPT, {
      stdin: opts.stdin ?? JSON.stringify({ hook_event_name: "UserPromptSubmit" }),
      env: {
        HOME: home,
        AKASHA_ROOT: root,
        AGENT_ID: opts.withAgentId === false ? null : AGENT,
      },
    })
  } finally {
    rmSync(home, { recursive: true, force: true })
  }
}

test("emits the seat name as the pinned session title", () => {
  const r = runHook({ seatName: "Athena" })
  expect(r.exitCode).toBe(0)
  const parsed = parseHookOutput(r.stdout)
  expect(parsed.hookEventName).toBe("UserPromptSubmit")
  expect(parsed.sessionTitle).toBe("Athena")
})

test("emits the worker-<seq> title", () => {
  const r = runHook({ seatName: "worker-14745" })
  expect(r.exitCode).toBe(0)
  expect(parseHookOutput(r.stdout).sessionTitle).toBe("worker-14745")
})

test("no-ops when AGENT_ID is unset", () => {
  const r = runHook({ seatName: "Athena", withAgentId: false })
  expect(r.exitCode).toBe(0)
  expect(r.stdout).toBe("")
})

test("no-ops when no seat page names this agent", () => {
  const r = runHook()
  expect(r.exitCode).toBe(0)
  expect(r.stdout).toBe("")
})

test("titles a seat whose name is the bare persona 'claude'", () => {
  const r = runHook({ seatName: "claude" })
  expect(r.exitCode).toBe(0)
  expect(parseHookOutput(r.stdout).sessionTitle).toBe("claude")
})

test("escapes a name with quotes/backslashes/ampersands", () => {
  const tricky = 'A"B\\C&D'
  const r = runHook({ seatName: tricky })
  expect(r.exitCode).toBe(0)
  expect(parseHookOutput(r.stdout).sessionTitle).toBe(tricky)
})

test("consumes a large stdin payload and still emits", () => {
  const r = runHook({ seatName: "Athena", stdin: "x".repeat(1_000_000) })
  expect(r.exitCode).toBe(0)
  expect(parseHookOutput(r.stdout).sessionTitle).toBe("Athena")
})
