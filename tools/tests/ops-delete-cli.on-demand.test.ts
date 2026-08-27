import { describe, expect, it } from "bun:test"

const OPS_CLI = `${import.meta.dir}/../ops/cli.ts`

async function runOps(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", OPS_CLI, ...args], { stdout: "pipe", stderr: "pipe" })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops tracking delete — wiring + arg contract", () => {
  it("is registered and requires an id → exit 1, stderr names the missing id", async () => {
    const result = await runOps(["tracking", "delete"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("id is required")
  })

  it("renders help listing the --id flag", async () => {
    const result = await runOps(["tracking", "delete", "--help"])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("--id")
  })
})
