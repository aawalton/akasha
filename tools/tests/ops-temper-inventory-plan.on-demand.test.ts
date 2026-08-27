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
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@TestAccount",
                        ["worldName"] = "NA Megaserver",
                        ["lastFullScan"] = 0,
                    },
                    ["locations"] =
                    {
                        ["backpack"] =
                        {
                            ["displayName"] = "Backpack",
                            ["lastScanned"] = 0,
                            ["bags"] =
                            {
                                [1] =
                                {
                                    [1] =
                                    {
                                        ["itemId"] = 16424,
                                        ["itemName"] = "Crafting Motif 15: Dwemer Bows",
                                        ["itemLink"] = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h",
                                        ["quality"] = 3, ["filterType"] = 0,
                                        ["itemType"] = 8, ["specializedItemType"] = 61,
                                        ["traitType"] = 0, ["requiredLevel"] = 0,
                                        ["requiredCP"] = 0, ["stackCount"] = 1,
                                    },
                                },
                            },
                        },
                    },
                },
                ["sellCompiled"] =
                {
                    ["version"] = 3,
                    ["orderedRules"] =
                    {
                        {
                            ["id"] = "r1",
                            ["categoryId"] = "motif-chapters",
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
                    ["wantedConsumables"] = {},
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

const CHARACTERS_FIXTURE = `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@TestAccount"] =
        {
            ["$AccountWide"] =
            {
                ["characters"] =
                {
                    ["char-1"] =
                    {
                        ["name"] = "Auriel",
                        ["loreLibrary"] =
                        {
                            [2] =
                            {
                                [2] =
                                {
                                    [1] = 4,
                                },
                            },
                        },
                    },
                    ["char-2"] =
                    {
                        ["name"] = "Belen",
                    },
                },
            },
        },
    },
}
`

let fixtureDir = ""
let inventoryPath = ""
let charactersPath = ""
let fixtureFlags: readonly string[] = []

beforeAll(async () => {
  fixtureDir = await mkdtemp(join(SCRATCH_ROOT, "ops-temper-inventory-plan-"))
  inventoryPath = join(fixtureDir, "TemperInventory.lua")
  charactersPath = join(fixtureDir, "TemperCharacters.lua")
  await Bun.write(inventoryPath, INVENTORY_FIXTURE)
  await Bun.write(charactersPath, CHARACTERS_FIXTURE)
  fixtureFlags = ["--inventory-path", inventoryPath, "--characters-path", charactersPath]
})

afterAll(async () => {
  await rm(fixtureDir, { recursive: true, force: true })
})

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "plan", ...args], {
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

interface PlanItem {
  readonly itemId: number
  readonly itemName: string
  readonly stackCount: number
  readonly quality: number
  readonly action: string
}

interface ActionGroup {
  readonly label: string
  readonly items: readonly PlanItem[]
  readonly slotCount: number
}

interface VenueStop {
  readonly venue: string
  readonly label: string
  readonly actionGroups: readonly ActionGroup[]
  readonly slotCount: number
}

interface CharacterSession {
  readonly characterId: string
  readonly characterName: string
  readonly venues: readonly VenueStop[]
  readonly totalSlots: number
}

interface ManagementPlan {
  readonly sessions: readonly CharacterSession[]
  readonly totalCharacterSwitches: number
  readonly totalVenueVisits: number
  readonly totalSlots: number
}

const HEADER = "[TemperInventory] Plan:"
const VENUE_ROW = /^ {2}.+ — [a-z-]+ \d+(?:, [a-z-]+ \d+)*$/

function findVenueRows(stdout: string): readonly string[] {
  const rows: string[] = []
  for (const line of stdout.split("\n")) {
    if (VENUE_ROW.test(line)) rows.push(line)
  }
  return rows
}

describe("ops temper inventory plan", () => {
  it("missing inventory file → exit code != 0, error names the path", async () => {
    const missing = join(fixtureDir, "no-such-inventory.lua")
    const result = await runCli(["--inventory-path", missing, "--characters-path", charactersPath])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain(missing)
  })

  it("default invocation → header + at least one venue row in canonical format", async () => {
    const result = await runCli(fixtureFlags)
    expect(result.exitCode).toBe(0)
    const lines = result.stdout.split("\n")
    expect(lines[0]).toBe(HEADER)
    const rows = findVenueRows(result.stdout)
    expect(rows.length).toBeGreaterThan(0)
    for (const row of rows) {
      expect(row).toContain(" — ")
    }
  })

  it("--char is no longer a valid flag → exit code != 0, error names --char", async () => {
    const result = await runCli([...fixtureFlags, "--char", "char-2"])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain("--char")
  })

  it("--json → a plan whose sessions carry venues, action groups and items", async () => {
    const result = await runCli([...fixtureFlags, "--json"])
    expect(result.exitCode).toBe(0)
    const parsed = JSON.parse(result.stdout) as ManagementPlan
    expect(Array.isArray(parsed.sessions)).toBe(true)
    expect(typeof parsed.totalCharacterSwitches).toBe("number")
    expect(parsed.totalSlots).toBeGreaterThanOrEqual(0)
    expect(parsed.totalVenueVisits).toBeGreaterThanOrEqual(0)

    const session = parsed.sessions[0]
    expect(session).toBeDefined()
    if (session === undefined) return
    expect(typeof session.characterId).toBe("string")
    expect(typeof session.characterName).toBe("string")
    expect(typeof session.totalSlots).toBe("number")

    const venue = session.venues[0]
    expect(venue).toBeDefined()
    if (venue === undefined) return
    expect(typeof venue.venue).toBe("string")
    expect(typeof venue.label).toBe("string")
    expect(typeof venue.slotCount).toBe("number")

    const group = venue.actionGroups[0]
    expect(group).toBeDefined()
    if (group === undefined) return
    expect(typeof group.label).toBe("string")
    expect(typeof group.slotCount).toBe("number")

    const item = group.items[0]
    expect(item).toBeDefined()
    if (item === undefined) return
    expect(item.itemId).toBe(16424)
    expect(typeof item.itemName).toBe("string")
    expect(typeof item.stackCount).toBe("number")
    expect(typeof item.quality).toBe("number")
    expect(typeof item.action).toBe("string")
  })
})
