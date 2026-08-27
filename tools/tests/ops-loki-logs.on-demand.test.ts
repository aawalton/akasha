import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  env: Record<string, string | undefined> = {}
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const baseEnv = { ...process.env }
  delete baseEnv.PIPELINE_SA_TOKEN
  delete baseEnv.K8S_API_BASE
  delete baseEnv.K8S_CA_CERT_B64
  delete baseEnv.AGENT_ID
  const proc = Bun.spawn(["bun", CLI_PATH, "loki", "logs", ...args], {
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

describe("ops loki logs — arg parsing", () => {
  it("missing pod positional → stderr mentions pod, exit 1", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("pod")
  })

  it("--namespace without value → stderr + exit 1", async () => {
    const result = await runCli(["my-pod", "--namespace"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--namespace")
  })

  it("--since invalid format → stderr names the constraint, exit 1", async () => {
    const result = await runCli(["my-pod", "--since", "forever"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("duration")
  })

  it("--limit non-integer → stderr names the constraint, exit 1", async () => {
    const result = await runCli(["my-pod", "--limit", "not-a-number"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("positive integer")
  })

  it("--limit zero → stderr names the constraint, exit 1", async () => {
    const result = await runCli(["my-pod", "--limit", "0"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("positive integer")
  })

  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["my-pod", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
  })

  it("extra positional → stderr names the arg, exit 1", async () => {
    const result = await runCli(["my-pod", "second-pod"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("second-pod")
  })

  it("missing PIPELINE_SA_TOKEN env → stderr mentions PIPELINE_SA_TOKEN, exit 1", async () => {
    const result = await runCli(["my-pod"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("PIPELINE_SA_TOKEN")
  })

  it("missing K8S_API_BASE env → stderr mentions K8S_API_BASE, exit 1", async () => {
    const result = await runCli(["my-pod"], { PIPELINE_SA_TOKEN: "dummy" })
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("K8S_API_BASE")
  })

  it("--pod flag instead of positional → parser accepts", async () => {
    const result = await runCli(["--pod", "my-pod"])
    expect(result.stderr).not.toContain("unknown flag")
    expect(result.stderr).not.toContain("required positional")
  })

  it("positional pod + matching --pod → parser accepts", async () => {
    const result = await runCli(["my-pod", "--pod", "my-pod"])
    expect(result.stderr).not.toContain("cannot be set both")
  })

  it("positional pod + mismatched --pod → exit 1, error names both", async () => {
    const result = await runCli(["my-pod", "--pod", "other-pod"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("cannot be set both")
  })

  it("--tail (alias of --limit) accepts integer", async () => {
    const result = await runCli(["my-pod", "--tail", "100"])
    expect(result.stderr).not.toContain("positive integer")
    expect(result.stderr).not.toContain("unknown flag")
  })

  it("--tail non-integer → stderr names the constraint, exit 1", async () => {
    const result = await runCli(["my-pod", "--tail", "abc"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("positive integer")
  })

  it("typo --pdo → suggests --pod", async () => {
    const result = await runCli(["--pdo", "my-pod"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toMatch(/did you mean --pod\?/)
  })
})
