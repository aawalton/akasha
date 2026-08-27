
import { describe, expect, it } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import {
  everyScenarioCompares,
  guardScript,
  holdScenario,
  MODULE_PATH,
  type Scenario,
  runChild,
  scratchDir,
} from "./supervisor-terminal-fixture.ts"

const SCENARIOS: readonly Scenario[] = [
  {
    name: "applySttySane is a no-op when stdin is not a TTY (piped harness)",
    observe: async () => {
      const { stdout, stderr, exitCode } = await runChild(`
        import { applySttySane } from "${MODULE_PATH}"
        applySttySane()
        console.log("OK")
      `)
      return { exitCode, ok: stdout.includes("OK"), sttyError: stderr.includes("stty:") }
    },
    standing: { exitCode: 0, ok: true, sttyError: false },
  },
  {
    name: "under a real PTY, applySttySane ends in cooked mode regardless of initial state",
    observe: async () => {
      const childScript = `
        import { applySttySane } from "${MODULE_PATH}"
        import { spawnSync } from "node:child_process"
        function sttyA(): string {
          return spawnSync("stty", ["-a"], { stdio: ["inherit", "pipe", "inherit"], encoding: "utf8" })
            .stdout?.replace(/\\s+/g, " ").trim() ?? ""
        }
        function isCooked(s: string): boolean {
          // Cooked-mode flags appear without a leading dash; raw mode shows the negative form.
          return / echo /.test(s) && / icanon /.test(s) && / isig /.test(s)
        }
        function damage(): void {
          spawnSync("stty", ["-echo", "-icanon", "-isig"], { stdio: "inherit" })
        }
        spawnSync("stty", ["sane"], { stdio: "inherit" })
        const aInitial = sttyA()
        damage()
        const aDamaged = sttyA()
        applySttySane()
        const aRestored = sttyA()
        damage()
        const bInitial = sttyA()
        applySttySane()
        const bRestored = sttyA()
        if (isCooked(aInitial) && !isCooked(aDamaged) && isCooked(aRestored) &&
            !isCooked(bInitial) && isCooked(bRestored)) {
          console.log("MARK_RESTORED")
        } else {
          console.log("MARK_BROKEN")
        }
      `
      const childPath = join(scratchDir(), "child.ts")
      writeFileSync(childPath, childScript)
      const proc = Bun.spawn(["script", "-q", "-c", `bun ${childPath}`, "/dev/null"], {
        stdout: "pipe",
        stderr: "pipe",
      })
      const [stdout, , exitCode] = await Promise.all([
        new Response(proc.stdout).text(),
        new Response(proc.stderr).text(),
        proc.exited,
      ])
      return {
        exitCode,
        restored: stdout.includes("MARK_RESTORED"),
        broken: stdout.includes("MARK_BROKEN"),
      }
    },
    standing: { exitCode: 0, restored: true, broken: false },
  },
  {
    name: "appends [termios] lines at install + manual call + exit-handler entry + post-restore",
    observe: async () => {
      const logPath = join(scratchDir(), "supervisor.log")
      const quoted = JSON.stringify(logPath)
      const { exitCode } = await runChild(
        guardScript({
          sink: `() => sinkTo(${quoted})`,
          tail: `recordTermiosState("manual-test-event", () => sinkTo(${quoted}))`,
        })
      )
      const log = readFileSync(logPath, "utf8")
      const lines = log.split("\n").filter((l) => l.startsWith("[termios]"))
      const has = (m: string): boolean => log.includes(m)
      return {
        exitCode,
        termios: has("[termios]"),
        install: has("tag=install"),
        manual: has("tag=manual-test-event"),
        entry: has("tag=exit-handler-entry"),
        postRestore: has("tag=exit-handler-post-restore"),
        fourLines: lines.length >= 4,
        everyIsatty: lines.every((l) => /isatty=/.test(l)),
        everyTag: lines.every((l) => / tag=/.test(l)),
      }
    },
    standing: {
      exitCode: 0,
      termios: true,
      install: true,
      manual: true,
      entry: true,
      postRestore: true,
      fourLines: true,
      everyIsatty: true,
      everyTag: true,
    },
  },
  {
    name: "getSink is read at write time, not captured at install time",
    observe: async () => {
      const dir = scratchDir()
      const earlyPath = join(dir, "early.log")
      const latePath = join(dir, "late.log")
      const { exitCode } = await runChild(
        guardScript({
          head: `let active = ${JSON.stringify(earlyPath)}`,
          sink: "() => sinkTo(active)",
          tail: `active = ${JSON.stringify(latePath)}
        recordTermiosState("after-flip", () => sinkTo(active))`,
        })
      )
      const early = readFileSync(earlyPath, "utf8")
      const late = readFileSync(latePath, "utf8")
      return {
        exitCode,
        earlyInstall: early.includes("tag=install"),
        earlyFlip: early.includes("tag=after-flip"),
        earlyEntry: early.includes("tag=exit-handler-entry"),
        lateFlip: late.includes("tag=after-flip"),
        lateEntry: late.includes("tag=exit-handler-entry"),
        latePostRestore: late.includes("tag=exit-handler-post-restore"),
      }
    },
    standing: {
      exitCode: 0,
      earlyInstall: true,
      earlyFlip: false,
      earlyEntry: false,
      lateFlip: true,
      lateEntry: true,
      latePostRestore: true,
    },
  },
]

describe("the terminal guard's TTY restore and termios lines, held against the code repository", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      await holdScenario(scenario)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    everyScenarioCompares(SCENARIOS)
  })

  it("carries all four scenarios of the two suites this half stands for", () => {
    expect(SCENARIOS.length).toBe(4)
    expect(new Set(SCENARIOS.map((s) => s.name)).size).toBe(4)
  })
})
