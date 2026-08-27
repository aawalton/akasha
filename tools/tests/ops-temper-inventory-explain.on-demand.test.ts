import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runCli(
  args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = Bun.spawn(["bun", CLI_PATH, "temper", "inventory", "explain", ...args], {
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

describe("ops temper inventory explain", () => {
  it("missing positional → exit 1, error names the missing input", async () => {
    const result = await runCli([])
    expect(result.exitCode).toBe(1)
    expect(result.stderr.toLowerCase()).toContain("itemidorlink")
  })

  it("input that is neither an item id nor a link → exit 1", async () => {
    const result = await runCli(["not-an-item"])
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("could not parse")
  })

  it("missing inventory file → exit code != 0, error names the path", async () => {
    const missing = "/var/tmp/definitely-not-a-real-temper-inventory-file-9436.lua"
    const result = await runCli([
      "16424",
      "--inventory-path",
      missing,
      "--characters-path",
      "/var/tmp/definitely-not-a-real-temper-characters-file-9436.lua",
    ])
    expect(result.exitCode).not.toBe(0)
    expect(result.stderr).toContain(missing)
  })
})
