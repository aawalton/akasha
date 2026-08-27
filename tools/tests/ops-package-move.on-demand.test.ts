import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "package", "move", ...args], {
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

describe("ops package move — arg parsing", () => {
  it("no args → exit 1, stderr names a required flag", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/--seq|--from|--to/)
  })

  it("missing --seq → exit 1, stderr names --seq", async () => {
    const result = await runCli(["--from", "a", "--to", "b"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--seq")
  })

  it("missing --from → exit 1, stderr names --from", async () => {
    const result = await runCli(["--seq", "1", "--to", "b"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--from")
  })

  it("missing --to → exit 1, stderr names --to", async () => {
    const result = await runCli(["--seq", "1", "--from", "a"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--to")
  })

  it("--seq non-integer → exit 1, stderr mentions integer", async () => {
    const result = await runCli(["--seq", "abc", "--from", "a", "--to", "b"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("integer")
  })

  it("unknown flag → exit 1, stderr names the flag", async () => {
    const result = await runCli(["--seq", "1", "--from", "a", "--to", "b", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })

  it("--json is a pure boolean toggle (does not consume next arg)", async () => {
    const result = await runCli(["--json", "--from", "a", "--to", "b"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--seq")
  })
})
