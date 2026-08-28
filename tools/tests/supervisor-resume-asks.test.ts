import { describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { hold } from "../lib/digest-harness.ts"
import { askRestartNotice, DECISION_UNREACHED_PREFIX } from "../lib/supervisor-resume-asks.ts"
import { RESTART_QUESTION, type Scenario, SCENARIOS } from "./supervisor-resume-asks-vectors.ts"

async function ported(scenario: Scenario): Promise<unknown> {
  let sent: unknown = null
  const ask = (stdin: string): Promise<unknown> => {
    sent = JSON.parse(stdin)
    return "reject" in scenario.answer
      ? Promise.reject(scenario.answer.reject)
      : Promise.resolve({ [scenario.answer.key]: scenario.answer.verdict })
  }
  const plan = await askRestartNotice(scenario.question as never, ask)
  return scenario.records === "sent" ? sent : plan
}

describe("the ported asks answer what the standing records", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const answered = await ported(scenario)
      const verdict = hold(scenario.name, scenario.standing, answered)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }

  it("the opening a caller recognises a fault report by is the standing one", () => {
    expect(DECISION_UNREACHED_PREFIX).toBe("[supervisor] Your resume notice could not be decided")
  })

  it("NO PROSE CROSSES on the way in — the words are composed by the command", async () => {
    for (const scenario of SCENARIOS.filter((one: Scenario) => one.records === "sent")) {
      const payload = JSON.stringify(await ported(scenario)).toLowerCase()
      expect(payload).not.toContain("notices")
      expect(payload).not.toContain("restart-immediate")
    }
  })
})

describe("a decision this side could not reach still drives the respawn", () => {
  function expectFaultTurn(turn: string): undefined {
    expect(turn).not.toBe("")
    expect(turn.length).toBeGreaterThan(DECISION_UNREACHED_PREFIX.length)
    expect(turn.startsWith(DECISION_UNREACHED_PREFIX)).toBe(true)
    expect(turn).toContain("supervisor-decide")
    expect(turn).toContain("Module not found")
    expect(turn.endsWith("Nothing was asked of you by this restart.")).toBe(true)
    return undefined
  }

  async function underEmptyRoot(run: () => Promise<undefined>): Promise<undefined> {
    const root = mkdtempSync(join("/var/tmp", "resume-asks-root-"))
    Bun.spawnSync(["git", "init", "-q", root])
    const had = process.env.AKASHA_ROOT
    process.env.AKASHA_ROOT = root
    try {
      return await run()
    } finally {
      if (had === undefined) delete process.env.AKASHA_ROOT
      else process.env.AKASHA_ROOT = had
      rmSync(root, { recursive: true, force: true })
    }
  }

  it("every arm degrades onto the spawn's argv, carrying a turn that names the failed call", async () => {
    await underEmptyRoot(async () => {
      const restart = await askRestartNotice(RESTART_QUESTION)
      expect(restart.route).toBe("spawn-argv")
      expectFaultTurn(restart.notice)
      return undefined
    })
  })
})
