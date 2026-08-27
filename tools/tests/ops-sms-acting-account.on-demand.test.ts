import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[],
  stdin?: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "sms", "acting-account", ...args], {
    stdout: "pipe",
    stderr: "pipe",
    stdin: stdin !== undefined ? "pipe" : "ignore",
    env: { ...process.env },
  })
  if (stdin !== undefined && proc.stdin) {
    proc.stdin.write(stdin)
    await proc.stdin.end()
  }
  const [stdout, stderr] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
  ])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("ops sms acting-account", () => {
  it("a surface with no trusted footer → exit 1, nothing on stdout, stderr says fail-closed", async () => {
    const result = await runCli(["--surface-file", "-"], "an inbound message and no footer at all\n")
    expect(result.exitCode).toBe(1)
    expect(result.stdout.trim()).toBe("")
    expect(result.stderr.toLowerCase()).toContain("fail-closed")
  })
})
