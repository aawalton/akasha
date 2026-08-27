import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

const COMMANDS = ["list"] as const

async function runHelp(
  verb: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "errors", verb, "--help"], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops temper errors <verb> --help", () => {
  for (const verb of COMMANDS) {
    it(`${verb} --help → exit 0, non-empty stdout`, async () => {
      const result = await runHelp(verb)
      expect(result.exitCode).toBe(0)
      expect(result.stdout.length).toBeGreaterThan(0)
      expect(result.stdout).toContain(`temper errors ${verb}`)
    })
  }

  it("list --help mentions the description, --errors-path, and --json", async () => {
    const result = await runHelp("list")
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("Read TemperErrors.lua")
    expect(result.stdout).toContain("--errors-path")
    expect(result.stdout).toContain("--json")
  })
})
