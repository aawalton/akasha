
import { afterEach, describe, expect, it } from "bun:test"
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs"
import { decided, hold } from "../lib/digest-harness.ts"
import { buildAgentLogRedirect } from "../lib/supervisor-console.ts"

interface Scenario {
  readonly name: string
  readonly drive: (supervisorsDir: string) => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

function bootstrapPath(supervisorsDir: string): string {
  return `${supervisorsDir}/bootstrap-${process.pid}.log`
}

function textOf(path: string): string {
  return existsSync(path) ? readFileSync(path, "utf8") : ""
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "redirectToBootstrap captures console output to bootstrap-<pid>.log",
    drive: (dir) => {
      const log = buildAgentLogRedirect(dir)
      const restore = log.redirectToBootstrap()
      try {
        console.log("hello bootstrap")
        console.warn("careful")
        console.error("oops")
      } finally {
        restore()
      }
      const contents = textOf(bootstrapPath(dir))
      return {
        bootstrapExists: existsSync(bootstrapPath(dir)),
        bootstrapHasLog: contents.includes("[LOG] hello bootstrap"),
        bootstrapHasWarn: contents.includes("[WARN] careful"),
        bootstrapHasError: contents.includes("[ERROR] oops"),
      }
    },
    standing: {
      bootstrapExists: true,
      bootstrapHasLog: true,
      bootstrapHasWarn: true,
      bootstrapHasError: true,
    },
  },
  {
    name: "redirectTo(agentId) appends bootstrap contents into the per-agent log and unlinks bootstrap",
    drive: (dir) => {
      const log = buildAgentLogRedirect(dir)
      log.redirectToBootstrap()
      console.log("during bootstrap")
      const restore = log.redirectTo("agent-1")
      try {
        console.log("during agent")
      } finally {
        restore()
      }
      const contents = textOf(`${dir}/agent-1/supervisor.log`)
      return {
        bootstrapExists: existsSync(bootstrapPath(dir)),
        agentHasBootstrapLine: contents.includes("[LOG] during bootstrap"),
        agentHasAgentLine: contents.includes("[LOG] during agent"),
      }
    },
    standing: { bootstrapExists: false, agentHasBootstrapLine: true, agentHasAgentLine: true },
  },
  {
    name: "second redirectTo(newAgentId) re-targets without re-migrating bootstrap",
    drive: (dir) => {
      const log = buildAgentLogRedirect(dir)
      log.redirectToBootstrap()
      console.log("boot line")
      log.redirectTo("agent-1")
      console.log("agent-1 line")
      const restore = log.redirectTo("agent-2")
      try {
        console.log("agent-2 line")
      } finally {
        restore()
      }
      const agent1 = textOf(`${dir}/agent-1/supervisor.log`)
      const agent2 = textOf(`${dir}/agent-2/supervisor.log`)
      return {
        agent1HasBootLine: agent1.includes("[LOG] boot line"),
        agent1HasOwnLine: agent1.includes("[LOG] agent-1 line"),
        agent1HasAgent2Line: agent1.includes("agent-2 line"),
        agent2HasBootLine: agent2.includes("boot line"),
        agent2HasOwnLine: agent2.includes("[LOG] agent-2 line"),
      }
    },
    standing: {
      agent1HasBootLine: true,
      agent1HasOwnLine: true,
      agent1HasAgent2Line: false,
      agent2HasBootLine: false,
      agent2HasOwnLine: true,
    },
  },
  {
    name: "redirectTo without prior bootstrap installs cleanly (no migration error)",
    drive: (dir) => {
      const log = buildAgentLogRedirect(dir)
      const restore = log.redirectTo("agent-x")
      try {
        console.log("only-agent line")
      } finally {
        restore()
      }
      return {
        agentHasLine: textOf(`${dir}/agent-x/supervisor.log`).includes("[LOG] only-agent line"),
      }
    },
    standing: { agentHasLine: true },
  },
]

function projected(
  observed: Record<string, unknown>,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) picked[key] = observed[key]
  return picked
}

describe("buildAgentLogRedirect, held against what the code repository asserts", () => {
  const origLog = console.log
  const origWarn = console.warn
  const origError = console.error
  const scratch: string[] = []

  afterEach(() => {
    console.log = origLog
    console.warn = origWarn
    console.error = origError
    for (const dir of scratch.splice(0)) rmSync(dir, { recursive: true, force: true })
  })

  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const dir = mkdtempSync("/var/tmp/supervisor-console-")
      scratch.push(dir)
      const observed = decided("ported", { value: scenario.drive(dir), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(observed, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
