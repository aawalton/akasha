import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "stop", ...args], {
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

describe("ops seat stop — arg parsing", () => {
  it("no target and no $AGENT_ID → stderr names both, exit 1", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("agent-id")
    expect(result.stderr).toContain("AGENT_ID")
  })

  it("no target reads $AGENT_ID — the value is what the shape gate refuses", async () => {
    const result = await runCli([], { AGENT_ID: "NotAUuid" })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("NotAUuid")
  })

  it("malformed identifier (uppercase) → stderr says invalid, exit 1", async () => {
    const result = await runCli(["WriterBot"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("invalid")
    expect(result.stderr).toContain("WriterBot")
  })

  it("malformed identifier (whitespace) → stderr says invalid, exit 1", async () => {
    const result = await runCli(["not a handle"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("invalid")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["writer-bot", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })
})
