import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "decode-link", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

const SAMPLE_LINK = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h"

const DECODED_FIELDS: readonly string[] = [
  "itemId",
  "subType",
  "level",
  "enchantId",
  "enchantSubType",
  "enchantLevel",
  "traitType",
  "flags",
  "style",
  "crafted",
  "bound",
  "stolen",
  "charges",
  "potionData",
]

function tsvToMap(stdout: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const line of stdout.trimEnd().split("\n")) {
    const tab = line.indexOf("\t")
    if (tab === -1) continue
    map.set(line.slice(0, tab), line.slice(tab + 1))
  }
  return map
}

describe("ops temper inventory decode-link — refusals", () => {
  it("missing positional → exit 1, stderr names the link it wanted", async () => {
    const r = await runCli([])
    expect(r.exitCode).toBe(1)
    expect(r.stderr.toLowerCase()).toContain("link")
    expect(r.stdout).toBe("")
  })

  it("a string that is not an item link → exit 1, stderr says it could not parse it", async () => {
    const r = await runCli(["not-a-link"])
    expect(r.exitCode).toBe(1)
    expect(r.stderr).toContain("could not parse")
    expect(r.stdout).toBe("")
  })
})

describe("ops temper inventory decode-link — the decoded shape", () => {
  it("default TSV labels every declared field, one per line, and ends with a newline", async () => {
    const r = await runCli([SAMPLE_LINK])
    expect(r.exitCode).toBe(0)
    expect(r.stdout.endsWith("\n")).toBe(true)
    const fields = tsvToMap(r.stdout)
    expect([...fields.keys()]).toEqual([...DECODED_FIELDS])
    expect(fields.get("itemId")).toBe("16424")
    expect(fields.get("subType")).toBe("4")
    expect(fields.get("level")).toBe("1")
    expect(fields.get("style")).toBe("7")
    expect(fields.get("crafted")).toBe("false")
    expect(fields.get("bound")).toBe("false")
    expect(fields.get("stolen")).toBe("false")
  })

  it("--json carries exactly the same field names, typed rather than stringified", async () => {
    const r = await runCli([SAMPLE_LINK, "--json"])
    expect(r.exitCode).toBe(0)
    const decoded = JSON.parse(r.stdout) as Record<string, unknown>
    expect(Object.keys(decoded)).toEqual([...DECODED_FIELDS])
    expect(decoded.itemId).toBe(16424)
    expect(decoded.subType).toBe(4)
    expect(decoded.style).toBe(7)
    expect(decoded.crafted).toBe(false)
    expect(decoded.bound).toBe(false)
    expect(decoded.stolen).toBe(false)
  })

  it("the two renderings disagree about nothing a caller could read", async () => {
    const [tsv, json] = await Promise.all([runCli([SAMPLE_LINK]), runCli([SAMPLE_LINK, "--json"])])
    const decoded = JSON.parse(json.stdout) as Record<string, unknown>
    const fields = tsvToMap(tsv.stdout)
    for (const name of DECODED_FIELDS) {
      expect({ name, value: fields.get(name) }).toEqual({ name, value: String(decoded[name]) })
    }
  })
})
