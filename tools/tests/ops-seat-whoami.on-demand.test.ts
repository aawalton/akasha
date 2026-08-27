import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

function envWithoutIdentity(): Record<string, string> {
  const env: Record<string, string> = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (key === "AGENT_ID") continue
    if (value !== undefined) env[key] = value
  }
  return env
}

async function runCli(
  args: readonly string[],
  env: Record<string, string> = envWithoutIdentity()
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "seat", "whoami", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    env,
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

const REGISTRY_USAGE_DUMP = "Usage: ops <command>"

describe("ops seat whoami — unidentified caller", () => {
  it("refuses with exit 1 when no identity is available", async () => {
    const result = await runCli([])
    expect(result.stderr).not.toContain(REGISTRY_USAGE_DUMP)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("no agent identity")
  })

  it("names the ways to supply an identity rather than failing bare", async () => {
    const result = await runCli([])
    expect(result.stderr).not.toContain(REGISTRY_USAGE_DUMP)
    expect(result.stderr).toContain("--agent-id")
  })

  it("refuses under --json too — the refusal is not swallowed by the output mode", async () => {
    const result = await runCli(["--json"])
    expect(result.stderr).not.toContain(REGISTRY_USAGE_DUMP)
    expect(result.exitCode).toBe(1)
    expect(result.stdout).toBe("")
  })
})

describe("ops seat whoami — the identity flags take values", () => {
  it("declares --agent-id as value-taking, over the whole handle grammar", async () => {
    const result = await runCli(["--help"])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("--agent-id <uuid|prefix|name>")
  })

  it("takes the seat as a positional, aliasing --agent-id", async () => {
    const result = await runCli(["--help"])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("agent-id")
  })

  it("refuses a positional that contradicts --agent-id rather than picking one", async () => {
    const result = await runCli(["ione", "--agent-id", "dalla"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--agent-id")
  })
})
