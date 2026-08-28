
import { afterAll, expect } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { decided, hold } from "../lib/digest-harness.ts"

export const RESET = "\x1b[<u\x1b[>4;0m"

export const MODULE_PATH = `${import.meta.dir}/../lib/supervisor-terminal.ts`

const made: string[] = []

afterAll(() => {
  for (const one of made) rmSync(one, { recursive: true, force: true })
})

export function scratchDir(): string {
  const at = mkdtempSync(join("/var/tmp", "supervisor-terminal-test-"))
  made.push(at)
  return at
}

export function guardScript(parts: {
  head?: string
  shutdown?: string
  alive?: string
  sink?: string
  tail?: string
}): string {
  return `
    import { installSupervisorTerminalGuard, recordTermiosState } from "${MODULE_PATH}"
    import { appendFileSync } from "node:fs"
    const sinkTo = (path: string) => (level: string, text: string): undefined => {
      appendFileSync(path, "[termios] " + text + "\\n")
    }
    ${parts.head ?? ""}
    installSupervisorTerminalGuard({
      shutdown: ${parts.shutdown ?? "async () => {}"},
      isClaudeAlive: () => ${parts.alive ?? "false"},
      getSink: ${parts.sink ?? `() => () => undefined`},
    })
    ${parts.tail ?? ""}
  `
}

export async function runChild(
  script: string,
  opts: { signal?: NodeJS.Signals; signalAfterMs?: number; secondSignalMs?: number } = {}
): Promise<{ stdout: string; stderr: string; exitCode: number | null }> {
  const proc = Bun.spawn(["bun", "-e", script], { stdout: "pipe", stderr: "pipe" })
  const fire = (at: number): void => {
    setTimeout(() => {
      try {
        proc.kill(opts.signal)
      } catch {
      }
    }, at)
  }
  if (opts.signal !== undefined) fire(opts.signalAfterMs ?? 100)
  if (opts.signal !== undefined && opts.secondSignalMs !== undefined) fire(opts.secondSignalMs)
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { stdout, stderr, exitCode }
}

export interface Scenario {
  readonly name: string
  readonly observe: () => Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}

function projected(
  observed: Record<string, unknown>,
  shape: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) {
    if (!(key in observed)) {
      throw new Error(`the ported arm observed no \`${key}\`, which the standing arm asserts`)
    }
    picked[key] = observed[key]
  }
  return picked
}

export async function holdScenario(scenario: Scenario): Promise<void> {
  const observed = decided("ported", { value: await scenario.observe(), notice: null })
  const verdict = hold(scenario.name, scenario.standing, projected(observed, scenario.standing))
  expect(verdict.matches).toBe(true)
}

export function everyScenarioCompares(scenarios: readonly Scenario[]): void {
  for (const scenario of scenarios) {
    expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
  }
}
