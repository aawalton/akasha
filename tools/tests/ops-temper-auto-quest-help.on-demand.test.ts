import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runHelp(): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "auto-quest", "trace", "--help"], {
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

describe("ops temper auto-quest trace --help", () => {
  it("exits 0 with non-empty stdout naming the command", async () => {
    const result = await runHelp()
    expect(result.exitCode).toBe(0)
    expect(result.stdout.length).toBeGreaterThan(0)
    expect(result.stdout).toContain("temper auto-quest trace")
  })

  it("mentions the description, --path, and --json", async () => {
    const result = await runHelp()
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("Read TemperQuests.lua")
    expect(result.stdout).toContain("--path")
    expect(result.stdout).toContain("--json")
  })
})
