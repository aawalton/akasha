import { describe, expect, it } from "bun:test"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const INVENTORY_FIXTURE = join(import.meta.dir, "plan.fixture.lua")
const CHARACTERS_FIXTURE = join(import.meta.dir, "plan.fixture.characters.lua")

const FIXTURE_FLAGS = [
  "--inventory-path",
  INVENTORY_FIXTURE,
  "--characters-path",
  CHARACTERS_FIXTURE,
]

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "capacity-audit", ...args], {
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

const HEADER = "[TemperInventory] Capacity audit:"
const DESTINATION_ROW = /^ {2}.+ — needed \d+ slots, \d+ free, dropped \d+ \(\d+ items\)$/

interface DroppedItem {
  readonly itemName: string
  readonly units: number
}

interface DroppedRule {
  readonly ruleId: string
  readonly ruleTitle: string | null
  readonly action: string
  readonly droppedStacks: number
  readonly droppedUnits: number
  readonly items: readonly DroppedItem[]
}

interface AuditEntry {
  readonly storageKey: string
  readonly destinationName: string
  readonly freeSlots: number
  readonly neededSlots: number
  readonly droppedStacks: number
  readonly droppedUnits: number
  readonly rules: readonly DroppedRule[]
}

describe("ops temper inventory capacity-audit", () => {
  it("missing inventory file → exit code != 0, error names the path", async () => {
    const missing = "/var/tmp/definitely-not-a-real-temper-inventory-file-14347.lua"
    const result = await runCli([
      "--inventory-path",
      missing,
      "--characters-path",
      CHARACTERS_FIXTURE,
    ])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain(missing)
  })

  it("the fixture overflows, so the report names the destination rather than going quiet", async () => {
    const result = await runCli(FIXTURE_FLAGS)
    expect(result.exitCode).toBe(0)
    const lines = result.stdout.split("\n")
    expect(lines[0]).toBe(HEADER)
    expect(result.stdout).not.toContain("No capacity overflow")
    expect(lines.filter((l) => DESTINATION_ROW.test(l)).length).toBeGreaterThan(0)
  })

  it("--json carries the audit and none of the text report", async () => {
    const result = await runCli([...FIXTURE_FLAGS, "--json"])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).not.toContain(HEADER)
    const parsed = JSON.parse(result.stdout) as { entries: readonly AuditEntry[] }
    expect(Array.isArray(parsed.entries)).toBe(true)
    expect(parsed.entries.length).toBeGreaterThan(0)
  })

  it("every reported entry computes a capacity that is internally consistent", async () => {
    const result = await runCli([...FIXTURE_FLAGS, "--json"])
    expect(result.exitCode).toBe(0)
    const entries = (JSON.parse(result.stdout) as { entries: readonly AuditEntry[] }).entries
    expect(entries.length).toBeGreaterThan(0)
    for (const entry of entries) {
      expect(entry.droppedStacks).toBeGreaterThan(0)
      expect(entry.neededSlots).toBeGreaterThanOrEqual(entry.droppedStacks)
      const ruleStacks = entry.rules.reduce((sum, r) => sum + r.droppedStacks, 0)
      expect(ruleStacks).toBe(entry.droppedStacks)
      const ruleUnits = entry.rules.reduce((sum, r) => sum + r.droppedUnits, 0)
      expect(ruleUnits).toBe(entry.droppedUnits)
    }
  })

  it("every dropped rule names the items that made up its dropped units", async () => {
    const result = await runCli([...FIXTURE_FLAGS, "--json"])
    const entries = (JSON.parse(result.stdout) as { entries: readonly AuditEntry[] }).entries
    const rules = entries.flatMap((e) => e.rules)
    expect(rules.length).toBeGreaterThan(0)
    for (const rule of rules) {
      expect(rule.items.length).toBeGreaterThan(0)
      const itemUnits = rule.items.reduce((sum, i) => sum + i.units, 0)
      expect(itemUnits).toBe(rule.droppedUnits)
    }
  })
})
