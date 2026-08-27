import { describe, expect, it } from "bun:test"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const PARITY_FIXTURE = join(import.meta.dir, "parity.fixture.lua")
const PARITY_INPUTS_FIXTURE = join(import.meta.dir, "parity.fixture.divergent-inputs.lua")
const PARITY_WALK_FIXTURE = join(import.meta.dir, "parity.fixture.divergent-walk.lua")
const PARITY_LATE_MATCH_FIXTURE = join(import.meta.dir, "parity.fixture.late-match.lua")
const CHARACTERS_FIXTURE = join(import.meta.dir, "parity.fixture.characters.lua")

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "parity", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

const FIXTURE_FLAGS = ["--inventory-path", PARITY_FIXTURE, "--characters-path", CHARACTERS_FIXTURE]

const INPUTS_FIXTURE_FLAGS = [
  "--inventory-path",
  PARITY_INPUTS_FIXTURE,
  "--characters-path",
  CHARACTERS_FIXTURE,
]

const WALK_FIXTURE_FLAGS = [
  "--inventory-path",
  PARITY_WALK_FIXTURE,
  "--characters-path",
  CHARACTERS_FIXTURE,
]

const LATE_MATCH_FIXTURE_FLAGS = [
  "--inventory-path",
  PARITY_LATE_MATCH_FIXTURE,
  "--characters-path",
  CHARACTERS_FIXTURE,
]

function extractSection(stdout: string, heading: string): readonly string[] {
  const lines = stdout.split("\n")
  const start = lines.indexOf(heading)
  if (start === -1) return []
  const body: string[] = []
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i] ?? ""
    if (line === "") break
    if (/^[A-Z][A-Z ]+ DIFF$/.test(line)) break
    body.push(line)
  }
  return body
}

describe("ops temper inventory parity", () => {
  it("missing positional <itemId> → exit 1, error names the missing input", async () => {
    const result = await runCli(["--char", "char-2", ...FIXTURE_FLAGS])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("itemid")
  })

  it("missing --char → exit 1, error names the missing flag", async () => {
    const result = await runCli(["16424", ...FIXTURE_FLAGS])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("char")
  })

  it("full parity → exit 0; INPUTS DIFF and WALK DIFF both (no divergence)", async () => {
    const result = await runCli(["16424", "--char", "char-2", ...FIXTURE_FLAGS])
    expect(result.exitCode).toBe(0)
    const inputs = extractSection(result.stdout, "INPUTS DIFF")
    const walk = extractSection(result.stdout, "WALK DIFF")
    expect(inputs.length).toBeGreaterThan(0)
    expect(walk.length).toBeGreaterThan(0)
    expect(inputs.some((line) => line.trim() === "(no divergence)")).toBe(true)
    expect(walk.some((line) => line.trim() === "(no divergence)")).toBe(true)
  })

  it("inputs divergence → exit 1; INPUTS DIFF lists the divergent field", async () => {
    const result = await runCli(["16424", "--char", "char-2", ...INPUTS_FIXTURE_FLAGS])
    expect(result.exitCode).toBe(1)
    const inputs = extractSection(result.stdout, "INPUTS DIFF")
    expect(inputs.length).toBeGreaterThan(0)
    expect(inputs.some((line) => line.trim() === "(no divergence)")).toBe(false)
    const divergentRow = inputs.find((line) => line.includes("web=") && line.includes("addon="))
    expect(divergentRow).toBeDefined()
  })

  it("walk divergence → exit 1; INPUTS DIFF (no divergence); WALK DIFF lists a rule row", async () => {
    const result = await runCli(["16424", "--char", "char-2", ...WALK_FIXTURE_FLAGS])
    expect(result.exitCode).toBe(1)
    const inputs = extractSection(result.stdout, "INPUTS DIFF")
    const walk = extractSection(result.stdout, "WALK DIFF")
    expect(inputs.some((line) => line.trim() === "(no divergence)")).toBe(true)
    expect(walk.length).toBeGreaterThan(0)
    expect(walk.some((line) => line.trim() === "(no divergence)")).toBe(false)
    const ruleRow = walk.find(
      (line) => /rule\s+\d+/i.test(line) && line.includes("web=") && line.includes("addon=")
    )
    expect(ruleRow).toBeDefined()
  })

  it("late match with leading category-mismatch rules → exit 0; WALK DIFF (no divergence)", async () => {
    const result = await runCli(["16424", "--char", "char-2", ...LATE_MATCH_FIXTURE_FLAGS])
    expect(result.exitCode).toBe(0)
    const inputs = extractSection(result.stdout, "INPUTS DIFF")
    const walk = extractSection(result.stdout, "WALK DIFF")
    expect(inputs.some((line) => line.trim() === "(no divergence)")).toBe(true)
    expect(walk.some((line) => line.trim() === "(no divergence)")).toBe(true)
    expect(walk.find((line) => /rule\s+\d+/i.test(line))).toBeUndefined()
  })

  it("itemId without an addon trace → exit ≠ 0, stderr names the missing trace", async () => {
    const result = await runCli(["99999", "--char", "char-2", ...FIXTURE_FLAGS])
    expect(result.exitCode).not.toBe(0)
    const stderr = result.stderr.toLowerCase()
    const namesMissingTrace =
      stderr.includes("trace") ||
      stderr.includes("lastexplain") ||
      stderr.includes("no addon") ||
      stderr.includes("99999")
    expect(namesMissingTrace).toBe(true)
  })
})
