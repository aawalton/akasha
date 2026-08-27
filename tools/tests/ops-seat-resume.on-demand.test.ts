import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "resume", ...args], {
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

describe("ops seat resume — arg parsing", () => {
  it("no target and no AGENT_ID → stderr names both ways to give one, exit 1", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
    expect(result.stderr).toContain("AGENT_ID")
  })

  it("positional target reaches resolution rather than 'unexpected positional'", async () => {
    const result = await runCli(["Not-A-Uuid"])
    expect(result.exitCode).toBeGreaterThan(0)
    expect(result.stderr).not.toContain("unexpected positional")
    expect(result.stderr).toContain("Not-A-Uuid")
  })

  it("--agent-id spells the same target as the positional", async () => {
    const result = await runCli(["--agent-id", "Not-A-Uuid"])
    expect(result.exitCode).toBeGreaterThan(0)
    expect(result.stderr).toContain("Not-A-Uuid")
  })

  it("--agent-id without value → stderr names it, exit 1", async () => {
    const result = await runCli(["--agent-id"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["lead-12766", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })

  it("invalid-shape target → resolves offline to an error, non-zero exit", async () => {
    const result = await runCli(["Inv@lid"])
    expect(result.exitCode).toBeGreaterThan(0)
    expect(result.stderr).toContain("Inv@lid")
  })

  it("--verify is a recognized flag (unknown-flag rejection does not name it)", async () => {
    const result = await runCli(["--verify"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
    expect(result.stderr).not.toContain("unknown")
  })

  it("invalid --grace duration → input error naming --grace, exit 1 (before any launch)", async () => {
    const result = await runCli(["amy", "--verify", "--grace", "nope"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--grace")
  })

  it("--prompt is a recognized flag (unknown-flag rejection does not name it)", async () => {
    const result = await runCli(["--prompt", "read the reason on your row"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
    expect(result.stderr).not.toContain("unknown")
  })

  it("--prompt beside --prompt-file → input error, exit 1", async () => {
    const result = await runCli(["amy", "--prompt", "go", "--prompt-file", "-"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--prompt")
  })

  it("empty --prompt → input error naming the flag, exit 1 (before any launch)", async () => {
    const result = await runCli(["amy", "--prompt", ""])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--prompt")
  })
})
