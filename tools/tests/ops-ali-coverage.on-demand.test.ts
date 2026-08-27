import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  ...args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, ...args], { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops ali coverage", () => {
  it("default output names both denominators and the audit-phase framing", async () => {
    const result = await runCli("ali", "coverage")
    expect(result.exitCode).toBe(0)
    const out = result.stdout.toLowerCase()
    expect(out).toContain("coverage")
    expect(out).toContain("section")
    expect(out).toContain("materialized")
    expect(out).toContain('status != "unopened"')
    expect(out).toContain("by part")
    expect(out).toContain("by division")
  })

  it("--json is recognized and replaces the prose tables with one line of JSON, exit 0", async () => {
    const result = await runCli("ali", "coverage", "--json")
    expect(result.exitCode).toBe(0)
    expect(result.stdout.trimEnd().split("\n")).toHaveLength(1)
    expect(result.stdout).not.toContain("By Part:")
    expect(typeof JSON.parse(result.stdout)).toBe("object")
  })

  it("--help renders the per-command help block", async () => {
    const result = await runCli("ali", "coverage", "--help")
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("ops ali coverage")
    expect(result.stdout).toContain("--json")
    expect(result.stdout).toContain("Examples:")
  })
})
