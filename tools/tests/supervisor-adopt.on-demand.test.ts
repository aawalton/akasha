
import { describe, expect, it } from "bun:test"
import { hold } from "../lib/digest-harness.ts"
import { adoptInheritedProc, InheritedPidDeadError, resolveClaudeHandoff } from "../lib/supervisor-adopt.ts"
import { asPid } from "../lib/supervisor-exec.ts"
import { ADOPT_VECTORS, DEAD_PID, VALID_CLAUDE_FIELDS } from "./supervisor-adopt-vectors.ts"
import { childExitRuleDouble, unusedChildExitRule } from "./supervisor-rule-test-helpers.ts"

const standingOf = (name: string): unknown => {
  const vector = ADOPT_VECTORS.find((one) => one.name === name)
  if (vector === undefined) throw new Error(`no vector named ${name}`)
  return vector.standing
}

const validClaude = { pid: asPid(process.pid), ...VALID_CLAUDE_FIELDS }

function project(result: unknown): unknown {
  if (result === null) return null
  const r = result as Record<string, unknown>
  const pid = r.pid === process.pid ? "<self>" : r.pid === DEAD_PID ? "<dead>" : r.pid
  return {
    pid,
    processId: r.processId,
    account: r.account,
    configDir: r.configDir,
    agentId: r.agentId,
    sessionId: r.sessionId,
  }
}

function silenceWarn<T>(fn: (warned: () => boolean) => T): T {
  let hit = false
  const original = console.warn
  console.warn = () => {
    hit = true
  }
  try {
    return fn(() => hit)
  } finally {
    console.warn = original
  }
}

function agrees(name: string, ported: unknown): void {
  const verdict = hold(name, standingOf(name), ported)
  expect(verdict.ported).toBe(verdict.standing)
  expect(verdict.matches).toBe(true)
}

describe("resolveClaudeHandoff — carried from supervisor-handoff.unit.test.ts", () => {
  it("default (undefined) + alive PID → handoff returned", () => {
    agrees("resolve/default-undefined-alive", {
      returned: project(resolveClaudeHandoff({ claude: validClaude }, undefined)),
    })
  })

  it("default (empty string) + alive PID → handoff returned", () => {
    agrees("resolve/default-empty-string-alive", {
      returned: project(resolveClaudeHandoff({ claude: validClaude }, "")),
    })
  })

  it("escape hatch ('0') → null", () => {
    agrees("resolve/escape-hatch-zero", {
      returned: project(resolveClaudeHandoff({ claude: validClaude }, "0")),
    })
  })

  it("default + no claude → null", () => {
    agrees("resolve/no-claude", {
      returned: project(resolveClaudeHandoff({ claude: null }, undefined)),
    })
  })

  it("explicit '1' + alive PID → handoff returned", () => {
    agrees("resolve/explicit-one-alive", {
      returned: project(resolveClaudeHandoff({ claude: validClaude }, "1")),
    })
  })

  it("default + dead PID → null with warning", () => {
    const observed = silenceWarn((warned) => {
      const dead = { ...validClaude, pid: asPid(DEAD_PID) }
      const returned = project(resolveClaudeHandoff({ claude: dead }, undefined))
      return { returned, warned: warned() }
    })
    agrees("resolve/dead-pid-warns", observed)
  })

  it("non-'0' values still enable the path", () => {
    agrees("resolve/non-zero-values-enable", {
      returned: ["true", "on", "2", "yes"].map((flag) =>
        project(resolveClaudeHandoff({ claude: validClaude }, flag))
      ),
    })
  })
})

describe("adoptInheritedProc — carried from supervisor-handoff.unit.test.ts", () => {
  it("dead PID throws InheritedPidDeadError", () => {
    let threw: string | null = null
    try {
      adoptInheritedProc(DEAD_PID, unusedChildExitRule)
    } catch (err) {
      threw = err instanceof InheritedPidDeadError ? "InheritedPidDeadError" : String(err)
    }
    agrees("adopt/dead-pid-throws", { threw })
  })

  it("alive PID returns InheritedProc shape", () => {
    const proc = adoptInheritedProc(process.pid, childExitRuleDouble())
    agrees("adopt/alive-pid-shape", {
      pidType: typeof proc.pid,
      pidIsSelf: proc.pid === process.pid,
      killType: typeof proc.kill,
      exitedIsPromise: proc.exited instanceof Promise,
    })
  })

  it("exposes the exit-status pair the restart loop classifies from", () => {
    const proc = adoptInheritedProc(process.pid, childExitRuleDouble())
    agrees("adopt/exit-status-pair", {
      exitStatusType: typeof proc.exitStatus,
      exitStatus: proc.exitStatus(),
    })
  })

  it("kill is a no-op when called repeatedly (idempotent)", async () => {
    const child = Bun.spawn(["sleep", "10"])
    const proc = adoptInheritedProc(child.pid, childExitRuleDouble())
    proc.kill("SIGTERM")
    proc.kill("SIGTERM")
    const code = await child.exited
    agrees("adopt/kill-idempotent", { exitedCodeType: typeof code })
  })
})
