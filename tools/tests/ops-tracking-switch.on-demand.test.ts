import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "tracking", "switch", ...args], {
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

describe("ops tracking switch — the title gate refuses before the transition", () => {
  it.each([
    ["no title at all", [] as readonly string[]],
    ["an empty title", ["--title", ""]],
    ["a whitespace-only title", ["--title", "   "]],
    ["an empty positional title", [""]],
    ["a whitespace-only positional title", ["  \t "]],
  ])("%s → exit 1 naming --title, and nothing closed or opened", async (_case, args) => {
    const result = await runCli(args)
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--title")
    expect(result.stdout).toBe("")
  })
})

describe("ops tracking switch — arg parsing", () => {
  it("unknown flag → stderr names the flag, exit 1", async () => {
    const result = await runCli(["Lunch", "--bogus"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--bogus")
    expect(result.stdout).toBe("")
  })

  it("--safety without a value → exit 1, nothing written", async () => {
    const result = await runCli(["Lunch", "--safety"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("--safety")
    expect(result.stdout).toBe("")
  })
})

describe("ops tracking switch — help", () => {
  it("documents the title it requires and the transition it makes", async () => {
    const result = await runCli(["--help"])
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toContain("--title")
    expect(result.stdout).toContain("--difficulty")
    expect(result.stdout).toContain("--safety")
    expect(result.stdout).toContain("--at")
  })
})
