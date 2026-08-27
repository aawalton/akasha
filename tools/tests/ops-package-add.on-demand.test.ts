import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "package", "add", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env: { ...baseEnv, ...env },
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops package add — arg parsing", () => {
  it("no args → exit 1, stderr names a required flag", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/--seq|--path/)
  })

  it("missing --seq → exit 1, stderr names --seq", async () => {
    const result = await runCli(["--path", "packages/x/y"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--seq")
  })

  it("missing --path → exit 1, stderr names --path", async () => {
    const result = await runCli(["--seq", "1"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--path")
  })

  it("--seq non-integer → exit 1, stderr mentions integer", async () => {
    const result = await runCli(["--seq", "abc", "--path", "packages/x/y"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("integer")
  })

  it("invalid --type → exit 1, stderr names the bad type and lists valid ones", async () => {
    const result = await runCli(["--seq", "1", "--path", "packages/x/y", "--type", "bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("bogus")
    expect(result.stderr).toContain("pure")
  })

  it("unknown flag → exit 1, stderr names the flag", async () => {
    const result = await runCli(["--seq", "1", "--path", "packages/x/y", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })

  it("--json is a pure boolean toggle (does not consume next arg)", async () => {
    const result = await runCli(["--json", "--path", "packages/x/y"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--seq")
  })
})
