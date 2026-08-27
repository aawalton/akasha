
import { describe, expect, it } from "bun:test"
import {
  everyScenarioCompares,
  guardScript,
  holdScenario,
  RESET,
  type Scenario,
  runChild,
} from "./supervisor-terminal-fixture.ts"

function exitPath(tail?: string): () => Promise<Record<string, unknown>> {
  return async () => {
    const { stdout, exitCode } = await runChild(guardScript(tail === undefined ? {} : { tail }))
    return { exitCode, exitedZero: exitCode === 0, reset: stdout.includes(RESET) }
  }
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "writes reset sequence on normal end-of-script exit",
    observe: exitPath(),
    standing: { exitCode: 0, reset: true },
  },
  {
    name: "writes reset sequence on explicit process.exit(1)",
    observe: exitPath("process.exit(1)"),
    standing: { exitCode: 1, reset: true },
  },
  {
    name: "writes reset sequence on uncaught exception (Bun exits 1)",
    observe: exitPath(`throw new Error("boom")`),
    standing: { exitedZero: false, reset: true },
  },
  {
    name: "SIGINT is a no-op while Claude is alive (shutdown not called)",
    observe: async () => {
      const { stdout, exitCode } = await runChild(
        guardScript({
          shutdown: `async () => { console.log("SHUTDOWN") }`,
          alive: "true",
          tail: `console.log("READY")
        await new Promise((r) => setTimeout(r, 800))
        console.log("END")`,
        }),
        { signal: "SIGINT", signalAfterMs: 100 }
      )
      const has = (m: string): boolean => stdout.includes(m)
      return { exitCode, ready: has("READY"), end: has("END"), shutdown: has("SHUTDOWN"), reset: has(RESET) }
    },
    standing: { exitCode: 0, ready: true, end: true, shutdown: false, reset: true },
  },
  {
    name: "SIGTERM triggers shutdown even while Claude is alive",
    observe: async () => {
      const { stdout, exitCode } = await runChild(
        guardScript({
          shutdown: `async (sig: string) => {
        console.log("SHUTDOWN:" + sig)
        process.exit(0)
      }`,
          alive: "true",
          tail: `console.log("READY")
        await new Promise((r) => setTimeout(r, 5000))
        console.log("END_NOT_REACHED")`,
        }),
        { signal: "SIGTERM", signalAfterMs: 100 }
      )
      const has = (m: string): boolean => stdout.includes(m)
      return {
        exitCode,
        ready: has("READY"),
        shutdownSigterm: has("SHUTDOWN:SIGTERM"),
        endNotReached: has("END_NOT_REACHED"),
        reset: has(RESET),
      }
    },
    standing: { exitCode: 0, ready: true, shutdownSigterm: true, endNotReached: false, reset: true },
  },
  {
    name: "a second SIGINT during a hanging shutdown force-exits with code 130",
    observe: async () => {
      const { stdout, exitCode } = await runChild(
        guardScript({
          shutdown: `async () => {
        console.log("SHUTDOWN_HANGING")
        await new Promise(() => {})
      }`,
          tail: `console.log("READY")
        await new Promise((r) => setTimeout(r, 5000))`,
        }),
        { signal: "SIGINT", signalAfterMs: 100, secondSignalMs: 400 }
      )
      const has = (m: string): boolean => stdout.includes(m)
      return { exitCode, ready: has("READY"), hanging: has("SHUTDOWN_HANGING"), reset: has(RESET) }
    },
    standing: { exitCode: 130, ready: true, hanging: true, reset: true },
  },
  {
    name: "a second SIGTERM during a hanging shutdown is ignored, leaving the graceful path running",
    observe: async () => {
      const { stdout, exitCode } = await runChild(
        guardScript({
          shutdown: `async () => {
        console.log("SHUTDOWN_HANGING")
        await new Promise(() => {})
      }`,
          tail: `console.log("READY")
        await new Promise((r) => setTimeout(r, 400))
        console.log("STILL_HERE")`,
        }),
        { signal: "SIGTERM", signalAfterMs: 50, secondSignalMs: 150 }
      )
      const has = (m: string): boolean => stdout.includes(m)
      return {
        exitCode,
        ready: has("READY"),
        hanging: has("SHUTDOWN_HANGING"),
        stillHere: has("STILL_HERE"),
        reset: has(RESET),
      }
    },
    standing: { exitCode: 0, ready: true, hanging: true, stillHere: true, reset: true },
  },
]

describe("installSupervisorTerminalGuard exit and signal paths, held against the code repository", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      await holdScenario(scenario)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    everyScenarioCompares(SCENARIOS)
  })

  it("names every scenario apart, so none of them silently stands for another", () => {
    expect(new Set(SCENARIOS.map((s) => s.name)).size).toBe(SCENARIOS.length)
  })
})
