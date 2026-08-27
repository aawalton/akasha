import { describe, expect, test } from "bun:test"

const COMMAND = new URL("../run-checks.ts", import.meta.url).pathname

const ONE = "bash-env-inside"

function run(...argv: readonly string[]): { code: number; out: string; err: string } {
  const spawned = Bun.spawnSync(["bun", COMMAND, ...argv], { stdout: "pipe", stderr: "pipe" })
  return {
    code: spawned.exitCode,
    out: new TextDecoder().decode(spawned.stdout),
    err: new TextDecoder().decode(spawned.stderr),
  }
}

describe("a check named as a bare positional", () => {
  test("runs that check and nothing else", () => {
    const { out } = run(ONE)
    expect(out).toContain(`[${ONE} (instructions)]`)
    expect(out.trimEnd().split("\n")).toHaveLength(1)
  })

  test("reaches the same outcome as naming it through --check", () => {
    expect(run(ONE).out).toBe(run("--check", ONE).out)
  })

  test("is refused where no check carries the name, rather than dropped for a whole suite run", () => {
    const { code, out } = run("no-check-carries-this-name")
    expect(code).toBe(1)
    expect(out).toContain("no such check")
  })
})

describe("an argument that is neither a flag this takes nor a check name", () => {
  test("is refused rather than ignored, a run of everything being no answer about one thing", () => {
    const { code, err } = run("--frobnicate")
    expect(code).toBe(1)
    expect(err).toContain("--frobnicate")
  })

  test("says how to find what the command does take", () => {
    expect(run("--frobnicate").err).toContain("--help")
  })
})

describe("the help", () => {
  test("states that a bare name is a check name, the flag alone having read as the only way", () => {
    const { code, out } = run("--help")
    expect(code).toBe(0)
    expect(out).toContain("A bare name is the check to run")
  })
})
