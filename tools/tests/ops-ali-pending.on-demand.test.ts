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

describe("ops ali pending", () => {
  it("default output is a threshold-relative human report, not a bare number", async () => {
    const result = await runCli("ali", "pending")
    expect(result.exitCode).toBe(0)
    const out = result.stdout.toLowerCase()
    expect(out).toContain("pending")
    expect(out).toContain("point")
    expect(out).toContain("stoplight")
    expect(out).toContain("wallpaper")
    expect(out).toContain("level")
  })

  it("--json takes the other rendering branch: one line of JSON, none of the prose", async () => {
    const result = await runCli("ali", "pending", "--json")
    expect(result.exitCode).toBe(0)
    expect(result.stdout.trimEnd().includes("\n")).toBe(false)
    expect(result.stdout.toLowerCase()).not.toContain("stoplight")
    expect(typeof JSON.parse(result.stdout)).toBe("object")
  })

  it("--help renders the per-command help block", async () => {
    const result = await runCli("ali", "pending", "--help")
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("ops ali pending")
    expect(result.stdout).toContain("--json")
    expect(result.stdout).toContain("Examples:")
  })
})
