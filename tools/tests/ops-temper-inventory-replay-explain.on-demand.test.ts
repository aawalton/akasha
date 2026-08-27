import { describe, expect, it } from "bun:test"
import { join } from "node:path"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const INVENTORY_FIXTURE = join(import.meta.dir, "replay-explain.fixture.lua")

const FIXTURE_ITEM_LINK = "|H1:item:16424:4:1:0:0:0:0:0:0:0:0:0:0:0:0:7:0:0:0:0:0|h|h"
const MISMATCH_ITEM_LINK = "|H1:item:99999:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h"

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "replay-explain", ...args], {
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

function tsvToMap(stdout: string): Map<string, string> {
  const map = new Map<string, string>()
  for (const line of stdout.split("\n")) {
    if (line === "" || line.startsWith("#") || line.startsWith("-") || line.startsWith("[")) {
      continue
    }
    const tab = line.indexOf("\t")
    if (tab === -1) continue
    map.set(line.slice(0, tab), line.slice(tab + 1))
  }
  return map
}

function findRuleWalkRow(stdout: string): string | undefined {
  const lines = stdout.split("\n")
  let inWalk = false
  for (const line of lines) {
    if (line.startsWith("# rule walk:")) {
      inWalk = true
      continue
    }
    if (inWalk && line.includes("\t") && !line.startsWith("#")) {
      return line
    }
  }
  return undefined
}

describe("ops temper inventory replay-explain", () => {
  it("missing fixture file → exit code != 0, error names the path", async () => {
    const missing = "/tmp/definitely-not-a-real-temper-inventory-file-9622.lua"
    const result = await runCli(["--inventory-path", missing])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain(missing)
  })

  it("default invocation against fixture → exit 0, TSV walk with addon timestamp header", async () => {
    const result = await runCli(["--inventory-path", INVENTORY_FIXTURE])
    expect(result.exitCode).toBe(0)
    const lines = result.stdout.split("\n")
    expect(lines[0]).toBe("[addon @ 20085498]")

    const fields = tsvToMap(result.stdout)
    expect(fields.get("itemId")).toBe("16424")
    expect(fields.get("outcome")).toBe("matched")
    expect(fields.get("outcomeAction")).toBe("use")
    expect(fields.get("outcomeDestination")).toBe("character:char-2")

    expect(result.stdout).toContain("# rule walk:")
    const walkRow = findRuleWalkRow(result.stdout)
    expect(walkRow).toBeDefined()
    if (walkRow === undefined) return
    expect(walkRow).toContain("motif-chapters")
    expect(walkRow).toContain("use")
  })

  it("--itemlink matching the stored trace → exit 0, same output as no-flag case", async () => {
    const result = await runCli([
      "--inventory-path",
      INVENTORY_FIXTURE,
      "--itemlink",
      FIXTURE_ITEM_LINK,
    ])
    expect(result.exitCode).toBe(0)
    expect(result.stdout.split("\n")[0]).toBe("[addon @ 20085498]")
    const fields = tsvToMap(result.stdout)
    expect(fields.get("itemId")).toBe("16424")
    expect(fields.get("outcomeDestination")).toBe("character:char-2")
  })

  it("--itemlink not matching the stored trace → exit code != 0, stderr names the stored item", async () => {
    const result = await runCli([
      "--inventory-path",
      INVENTORY_FIXTURE,
      "--itemlink",
      MISMATCH_ITEM_LINK,
    ])
    expect(result.exitCode).not.toBe(0)
    const stderr = result.stderr
    const namesStoredItem =
      stderr.includes("16424") ||
      stderr.includes(FIXTURE_ITEM_LINK) ||
      /no matching trace|does not match/i.test(stderr)
    expect(namesStoredItem).toBe(true)
  })
})
