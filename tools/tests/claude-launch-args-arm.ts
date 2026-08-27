
import { expect, it } from "bun:test"
import { canonical, decided, hold } from "../lib/digest-harness.ts"

export interface Scenario {
  readonly name: string
  readonly ported: () => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

function projected(
  answer: Record<string, unknown>,
  shape: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = answer[key]
  return picked
}

export function holdAgainstStanding(scenarios: readonly Scenario[]): void {
  for (const scenario of scenarios) {
    it(scenario.name, () => {
      const answer = decided("ported", { value: scenario.ported(), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(answer, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every case, so none passes on an empty projection", () => {
    for (const scenario of scenarios) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })

  it("records no undefined, so no assertion is dropped on its way into the digest", () => {
    for (const scenario of scenarios) {
      for (const [key, held] of Object.entries(scenario.standing)) {
        expect(`${scenario.name}.${key}=${String(held)}`).not.toBe(
          `${scenario.name}.${key}=undefined`
        )
      }
    }
    expect(canonical({ flag: null })).not.toBe(canonical({ flag: undefined }))
    expect(canonical({ flag: undefined })).toBe(canonical({}))
  })
}

export function after(argv: readonly string[], flag: string): string | null {
  const i = argv.indexOf(flag)
  return i < 0 ? null : (argv[i + 1] ?? null)
}

export function count(argv: readonly string[], flag: string): number {
  return argv.filter((a) => a === flag).length
}

export function has(held: object, key: string): boolean {
  return Object.hasOwn(held, key)
}
