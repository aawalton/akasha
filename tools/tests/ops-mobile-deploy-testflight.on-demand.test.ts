import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runHelp(): Promise<string> {
  const proc = Bun.spawn(["bun", CLI_PATH, "mobile", "deploy-testflight", "--help"], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const stdout = await new Response(proc.stdout).text()
  await proc.exited
  if (proc.exitCode !== 0) throw new Error(`mobile deploy-testflight --help exited ${proc.exitCode}`)
  return stdout
}

function sectionLines(help: string, heading: string): readonly string[] {
  const lines = help.split("\n")
  const start = lines.indexOf(`${heading}:`)
  if (start === -1) return []
  const body: string[] = []
  for (const line of lines.slice(start + 1)) {
    if (line.trim() === "") break
    body.push(line.trim())
  }
  return body
}

function flagLine(help: string, name: string): string {
  return sectionLines(help, "Flags").find((line) => line.split(/\s+/)[0] === name) ?? ""
}

describe("ops mobile deploy-testflight — the surface it declares", () => {
  it("declares the seven flags the cut is driven by, and nothing else", async () => {
    const names = sectionLines(await runHelp(), "Flags").map((line) => line.split(/\s+/)[0])
    expect(names).toEqual([
      "--app",
      "--configuration",
      "--build-number",
      "--no-sync",
      "--no-upload",
      "--wait",
      "--detach",
    ])
  })

  it("defaults --configuration to Release, because TestFlight ships Release", async () => {
    expect(flagLine(await runHelp(), "--configuration")).toContain("default: Release")
  })

  it("names the macbook keychain password as REQUIRED — a headless codesign cannot ask for it", async () => {
    const environment = sectionLines(await runHelp(), "Environment")
    const keychain = environment.find((line) => line.startsWith("MACBOOK_KEYCHAIN_PASSWORD"))
    expect(keychain).toBeDefined()
    expect(keychain).toContain("(required)")
  })
})
