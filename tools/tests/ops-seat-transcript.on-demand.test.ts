import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "transcript", ...args], {
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

describe("ops seat transcript — arg parsing", () => {
  it("missing positional <target> → stderr names it, exit 1", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("target")
  })

  it("invalid target shape (rejected by UUID, prefix, and name) → exit 1 with `invalid`", async () => {
    const result = await runCli(["Not-A-Uuid"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("invalid")
    expect(result.stderr).toContain("Not-A-Uuid")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["11111111", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })

  it("--help → prints usage, exit 0", async () => {
    const result = await runCli(["--help"])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("ops seat transcript")
    expect(result.stdout).toContain("--json")
  })
})
