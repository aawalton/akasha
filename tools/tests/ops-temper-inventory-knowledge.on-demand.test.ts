import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const CHARACTERS_LUA = `TemperCharacters_SavedVariables =
{
    ["Default"] =
    {
        ["@acct"] =
        {
            ["$AccountWide"] =
            {
                ["characters"] =
                {
                    ["char-1"] =
                    {
                        ["name"] = "Auriel",
                        ["recipes"] =
                        {
                            [1] =
                            {
                                [1] = 1234,
                            },
                        },
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
                        ["scribing"] =
                        {
                            ["scripts"] =
                            {
                                [9999] =
                                {
                                    ["unlocked"] = true,
                                    ["slot"] = 1,
                                    ["name"] = "Test Script",
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

let dir = ""
let fixture = ""

beforeAll(() => {
  dir = mkdtempSync("/var/tmp/ops-temper-knowledge-")
  fixture = join(dir, "TemperCharacters.lua")
  writeFileSync(fixture, CHARACTERS_LUA)
})

afterAll(() => {
  rmSync(dir, { recursive: true, force: true })
})

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(
    ["bun", CLI_PATH, "temper", "inventory", "knowledge", ...args, "--characters-path", fixture],
    { stdout: "pipe", stderr: "pipe" }
  )
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

interface KnowsRow {
  readonly id: string
  readonly knows: boolean
}

async function knowsByCharacter(itemKey: string): Promise<Record<string, boolean>> {
  const r = await runCli(["--item-key", itemKey, "--json"])
  expect(r.exitCode).toBe(0)
  const rows = JSON.parse(r.stdout) as readonly KnowsRow[]
  return Object.fromEntries(rows.map((row) => [row.id, row.knows]))
}

describe("ops temper inventory knowledge — counting what each character knows", () => {
  it("with no mode flag, lists every character in the scan with its three counts", async () => {
    const r = await runCli([])
    expect(r.exitCode).toBe(0)
    expect(r.stdout.endsWith("\n")).toBe(true)
    const rows = r.stdout.trimEnd().split("\n").map((line) => line.split("\t"))
    expect(rows).toEqual([
      ["char-1", "Auriel", "1", "1", "1"],
      ["char-2", "Belen", "0", "0", "0"],
    ])
  })

  it("--char narrows to one character and --json makes it one object rather than a list", async () => {
    const r = await runCli(["--char", "char-1", "--json"])
    expect(r.exitCode).toBe(0)
    expect(JSON.parse(r.stdout)).toEqual({
      id: "char-1",
      name: "Auriel",
      recipeCount: 1,
      motifCount: 1,
      scriptCount: 1,
    })
  })

  it("--json without --char is the whole list, so the shape follows the mode not the data", async () => {
    const r = await runCli(["--json"])
    expect(r.exitCode).toBe(0)
    expect(JSON.parse(r.stdout)).toEqual([
      { id: "char-1", name: "Auriel", recipeCount: 1, motifCount: 1, scriptCount: 1 },
      { id: "char-2", name: "Belen", recipeCount: 0, motifCount: 0, scriptCount: 0 },
    ])
  })
})

describe("ops temper inventory knowledge — does this character know this item", () => {
  it("recipe:<resultItemId> answers from the character's known recipes", async () => {
    expect(await knowsByCharacter("recipe:1234")).toEqual({ "char-1": true, "char-2": false })
  })

  it("motif:<styleId>:<chapterId> answers from the chapters that character holds", async () => {
    expect(await knowsByCharacter("motif:15:4")).toEqual({ "char-1": true, "char-2": false })
  })

  it("motif:<styleId>:master is known only on the full style, never on a chapter of it", async () => {
    expect(await knowsByCharacter("motif:15:master")).toEqual({
      "char-1": false,
      "char-2": false,
    })
  })

  it("script:<scriptId> answers from the scripts that character has unlocked", async () => {
    expect(await knowsByCharacter("script:9999")).toEqual({ "char-1": true, "char-2": false })
  })

  it("an id nobody holds is false for everyone rather than absent from the answer", async () => {
    expect(await knowsByCharacter("script:1")).toEqual({ "char-1": false, "char-2": false })
  })

  it("knows-mode TSV carries the same verdicts the JSON does", async () => {
    const r = await runCli(["--item-key", "recipe:1234"])
    expect(r.exitCode).toBe(0)
    expect(r.stdout).toBe("char-1\tAuriel\ttrue\nchar-2\tBelen\tfalse\n")
  })
})

describe("ops temper inventory knowledge — refusals", () => {
  it("an --item-key with no kind → exit 1, stderr names the flag and the forms it takes", async () => {
    const r = await runCli(["--item-key", "bogus"])
    expect(r.exitCode).toBe(1)
    expect(r.stderr).toContain("--item-key")
    expect(r.stderr).toContain("recipe:")
    expect(r.stderr).toContain("motif:")
    expect(r.stderr).toContain("script:")
    expect(r.stdout).toBe("")
  })

  it("an --item-key of a known kind with a non-integer id → exit 1", async () => {
    const r = await runCli(["--item-key", "recipe:abc"])
    expect(r.exitCode).toBe(1)
    expect(r.stderr).toContain("--item-key")
  })

  it("--char naming nobody in the scan → exit 1 rather than an empty list", async () => {
    const r = await runCli(["--char", "char-absent"])
    expect(r.exitCode).toBe(1)
    expect(r.stderr).toContain("char-absent")
    expect(r.stdout).toBe("")
  })
})
