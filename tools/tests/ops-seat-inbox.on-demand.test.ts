import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  baseEnv.AGENT_ID = undefined
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "inbox", ...args], {
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

describe("ops seat inbox — arg parsing", () => {
  it("no identity (no AGENT_ID, no seat named) → stderr explains, exit 1", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("agent_id")
  })

  it("invalid positional shape → exit 1 with `invalid`", async () => {
    const result = await runCli(["Not-A-Name"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("invalid")
  })

  it("a positional contradicting --agent-id is refused rather than one being picked", async () => {
    const result = await runCli(["ione", "--agent-id", "11111111"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
  })

  it("--limit abc → stderr names --limit, exit 1", async () => {
    const result = await runCli(["--agent-id", "11111111", "--limit", "abc"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--limit")
  })

  it("--limit -5 → stderr names --limit, exit 1", async () => {
    const result = await runCli(["--agent-id", "11111111", "--limit", "-5"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--limit")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })
})
