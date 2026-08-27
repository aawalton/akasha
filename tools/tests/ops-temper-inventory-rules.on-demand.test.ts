import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { mkdtemp, rm } from "node:fs/promises"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const SCRATCH_ROOT = "/var/tmp"

const INVENTORY_FIXTURE = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["sellCompiled"] =
                {
                    ["version"] = 3,
                    ["orderedRules"] =
                    {
                        {
                            ["id"] = "r1",
                            ["categoryId"] = "motifs",
                            ["action"] = "use",
                            ["destination"] = "character:by-priority",
                            ["canUnlock"] = "can-unlock",
                            ["unlockScope"] = "any-character",
                        },
                        {
                            ["id"] = "r2",
                            ["categoryId"] = "all",
                            ["action"] = "nothing",
                        },
                    },
                    ["itemRules"] = {},
                    ["wantedEquipment"] = {},
                    ["wantedCompanionEquipment"] = {},
                    ["wantedConsumables"] =
                    {
                        ["12345"] =
                        {
                            ["itemId"] = 12345,
                            ["itemName"] = "Test Consumable",
                            ["quantity"] = 20,
                        },
                    },
                    ["consumableStock"] = {},
                    ["characterPriority"] =
                    {
                        "char-1",
                        "char-2",
                    },
                },
            },
        },
    },
}
`

let fixtureDir = ""
let fixturePath = ""

beforeAll(async () => {
  fixtureDir = await mkdtemp(join(SCRATCH_ROOT, "ops-temper-inventory-rules-"))
  fixturePath = join(fixtureDir, "TemperInventory.lua")
  await Bun.write(fixturePath, INVENTORY_FIXTURE)
})

afterAll(async () => {
  await rm(fixtureDir, { recursive: true, force: true })
})

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "rules", ...args], {
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

interface RuleRow {
  readonly id: string
  readonly action: string
  readonly destination: string
  readonly categoryId: string
  readonly conditionCount: number
}

interface RulesSection {
  readonly rules: readonly RuleRow[]
}

interface ConsumablesSection {
  readonly wantedConsumables: Record<string, unknown>
}

interface PrioritySection {
  readonly characterPriority: readonly string[]
}

describe("ops temper inventory rules", () => {
  it("default (no --section) → exit 0, output references all three sections", async () => {
    const result = await runCli(["--inventory-path", fixturePath])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("# rules")
    expect(result.stdout).toContain("# consumables")
    expect(result.stdout).toContain("# priority")
    expect(result.stdout).toContain("r1")
    expect(result.stdout).toContain("r2")
    expect(result.stdout).toContain("12345")
    expect(result.stdout).toContain("char-1")
    expect(result.stdout).toContain("char-2")
  })

  it("--section rules --json → 2 rules with the expected fields", async () => {
    const result = await runCli(["--inventory-path", fixturePath, "--section", "rules", "--json"])
    expect(result.exitCode).toBe(0)
    const parsed = JSON.parse(result.stdout) as RulesSection
    expect(parsed.rules.length).toBe(2)
    const [r1, r2] = parsed.rules
    expect(r1).toBeDefined()
    expect(r2).toBeDefined()
    if (r1 === undefined || r2 === undefined) return
    expect(r1.id).toBe("r1")
    expect(r1.action).toBe("use")
    expect(r1.destination).toBe("character:by-priority")
    expect(r1.categoryId).toBe("motifs")
    expect(r2.id).toBe("r2")
    expect(r2.action).toBe("nothing")
    expect(r2.destination).toBe("")
    expect(r2.categoryId).toBe("all")
  })

  it("--section consumables --json → wantedConsumables map keyed by itemId", async () => {
    const result = await runCli([
      "--inventory-path",
      fixturePath,
      "--section",
      "consumables",
      "--json",
    ])
    expect(result.exitCode).toBe(0)
    const parsed = JSON.parse(result.stdout) as ConsumablesSection
    const keys = Object.keys(parsed.wantedConsumables)
    expect(keys.length).toBe(1)
    expect(keys).toContain("12345")
    const entry = parsed.wantedConsumables["12345"]
    expect(entry).toBeDefined()
    expect(typeof entry).toBe("object")
  })

  it("--section priority --json → ordered ID list of length 2", async () => {
    const result = await runCli([
      "--inventory-path",
      fixturePath,
      "--section",
      "priority",
      "--json",
    ])
    expect(result.exitCode).toBe(0)
    const parsed = JSON.parse(result.stdout) as PrioritySection
    expect(parsed.characterPriority).toEqual(["char-1", "char-2"])
  })

  it("invalid --section → exit 1", async () => {
    const result = await runCli(["--inventory-path", fixturePath, "--section", "bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("section")
  })

  it("missing inventory file → exit code != 0, error names the path", async () => {
    const missing = join(fixtureDir, "no-such-inventory.lua")
    const result = await runCli(["--inventory-path", missing])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain(missing)
  })
})
