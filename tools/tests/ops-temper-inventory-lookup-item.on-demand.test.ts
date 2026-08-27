import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const SAMPLE_LINK = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h"

const MOTIF_ITEM_NAME = "Crafting Motif 15: Dwemer Bows"

const MOTIF_CHAPTER_NODE_IDS: readonly string[] = ["knowledge", "style-motifs", "motif-chapters"]

const INVENTORY_LUA = `TemperInventory_SavedVariables =
{
    ["Default"] =
    {
        ["@acct"] =
        {
            ["$AccountWide"] =
            {
                ["db"] =
                {
                    ["meta"] =
                    {
                        ["displayName"] = "@acct",
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
                                        ["itemName"] = "${MOTIF_ITEM_NAME}",
                                        ["itemLink"] = "${SAMPLE_LINK}",
                                        ["quality"] = 3,
                                        ["filterType"] = 0,
                                        ["itemType"] = 8,
                                        ["specializedItemType"] = 61,
                                        ["traitType"] = 0,
                                        ["requiredLevel"] = 0,
                                        ["requiredCP"] = 0,
                                        ["stackCount"] = 1,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
}
`

let dir = ""
let fixture = ""

beforeAll(() => {
  dir = mkdtempSync("/var/tmp/ops-temper-lookup-item-")
  fixture = join(dir, "TemperInventory.lua")
  writeFileSync(fixture, INVENTORY_LUA)
})

afterAll(() => {
  rmSync(dir, { recursive: true, force: true })
})

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(
    ["bun", CLI_PATH, "temper", "inventory", "lookup-item", ...args, "--inventory-path", fixture],
    { stdout: "pipe", stderr: "pipe" }
  )
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

function tsvToMap(stdout: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const line of stdout.trimEnd().split("\n")) {
    const tab = line.indexOf("\t")
    if (tab === -1) continue
    map.set(line.slice(0, tab), line.slice(tab + 1))
  }
  return map
}

describe("ops temper inventory lookup-item — refusals", () => {
  it("missing positional → exit 1, stderr names the item id or link it wanted", async () => {
    const r = await runCli([])
    expect(r.exitCode).toBe(1)
    expect(r.stderr.toLowerCase()).toContain("itemidorlink")
    expect(r.stdout).toBe("")
  })

  it("neither an integer nor a link → exit 1, stderr says it could not parse it", async () => {
    const r = await runCli(["not-an-item"])
    expect(r.exitCode).toBe(1)
    expect(r.stderr).toContain("could not parse")
    expect(r.stdout).toBe("")
  })
})

describe("ops temper inventory lookup-item — a hit resolves and classifies", () => {
  it("by bare itemId: names the item from the scan and classifies it as a motif chapter", async () => {
    const r = await runCli(["16424"])
    expect(r.exitCode).toBe(0)
    expect(r.stdout.endsWith("\n")).toBe(true)
    const fields = tsvToMap(r.stdout)
    expect(fields.get("itemId")).toBe("16424")
    expect(fields.get("itemName")).toBe(MOTIF_ITEM_NAME)
    expect(fields.get("classification")).toBe("motif")
    expect(fields.get("motifStyleId")).toBe("15")
    expect(fields.get("motifChapterId")).toBe("4")
    expect(fields.get("categoryNodeIds")).toBe(JSON.stringify(MOTIF_CHAPTER_NODE_IDS))
  })

  it("by full item link: the same item, so the two spellings are one input", async () => {
    const [byId, byLink] = await Promise.all([runCli(["16424"]), runCli([SAMPLE_LINK])])
    expect(byLink.exitCode).toBe(0)
    expect(byLink.stdout).toBe(byId.stdout)
  })

  it("--json carries the same answer typed, and no field the classification does not warrant", async () => {
    const r = await runCli(["16424", "--json"])
    expect(r.exitCode).toBe(0)
    expect(JSON.parse(r.stdout)).toEqual({
      itemId: 16424,
      itemLink: SAMPLE_LINK,
      itemName: MOTIF_ITEM_NAME,
      classification: "motif",
      categoryNodeIds: MOTIF_CHAPTER_NODE_IDS,
      motifStyleId: 15,
      motifChapterId: 4,
    })
  })
})

describe("ops temper inventory lookup-item — a miss is an answer, not a failure", () => {
  it("an id absent from the scan → exit 0, classification unknown, no category chain", async () => {
    const r = await runCli(["999999999"])
    expect(r.exitCode).toBe(0)
    const fields = tsvToMap(r.stdout)
    expect(fields.get("itemId")).toBe("999999999")
    expect(fields.get("classification")).toBe("unknown")
    expect(fields.get("itemName")).toBe("")
    expect(fields.get("itemLink")).toBe("")
    expect(fields.get("categoryNodeIds")).toBe("[]")
    expect(fields.has("motifStyleId")).toBe(false)
    expect(fields.has("scriptId")).toBe(false)
    expect(fields.has("recipeResultItemId")).toBe(false)
  })

  it("--json spells the miss as null rather than as an empty string", async () => {
    const r = await runCli(["999999999", "--json"])
    expect(r.exitCode).toBe(0)
    expect(JSON.parse(r.stdout)).toEqual({
      itemId: 999999999,
      itemLink: null,
      itemName: null,
      classification: "unknown",
      categoryNodeIds: [],
    })
  })
})
