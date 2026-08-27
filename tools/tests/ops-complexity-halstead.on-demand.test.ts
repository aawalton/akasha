import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "complexity", "halstead", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops complexity halstead — arg parsing", () => {
  it("--help → exit 0, prints usage, mentions Halstead", async () => {
    const r = await runCli(["--help"])
    expect(r.exitCode).toBe(0)
    expect(r.stdout).toContain("complexity halstead")
    expect(r.stdout.toLowerCase()).toContain("halstead")
  })

  it("unknown flag → exit 1, stderr names it", async () => {
    const r = await runCli(["--zzz"])
    expect(r.exitCode).toBe(1)
    expect(r.stderr).toContain("--zzz")
  })

  it("--top with non-integer → exit 1", async () => {
    const r = await runCli(["--top", "abc"])
    expect(r.exitCode).toBe(1)
  })
})
