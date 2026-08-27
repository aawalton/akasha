import { describe, expect, it } from "bun:test"

const CLI_PATH = `${import.meta.dir}/../ops/cli.ts`

async function runHelp(verb: readonly string[]): Promise<string> {
  const proc = Bun.spawn(["bun", CLI_PATH, ...verb, "--help"], {
    stdout: "pipe",
    stderr: "pipe",
    env: process.env,
  })
  const stdout = await new Response(proc.stdout).text()
  await proc.exited
  if (proc.exitCode !== 0) throw new Error(`${verb.join(" ")} --help exited ${proc.exitCode}`)
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

function flagNames(help: string): readonly string[] {
  return sectionLines(help, "Flags").map((line) => line.split(/\s+/)[0] ?? "")
}

function exitMeaning(help: string, code: number): string {
  const line = sectionLines(help, "Exit codes").find((one) => one.startsWith(`${code} `))
  return line ?? ""
}

describe("ops mobile testflight-status — the surface it declares", () => {
  it("declares --app and --wait, and nothing else", async () => {
    expect(flagNames(await runHelp(["mobile", "testflight-status"]))).toEqual(["--app", "--wait"])
  })

  it("documents exit 3 as the terminal FAILED/INVALID exit, naming the marker a caller dispatches on", async () => {
    const meaning = exitMeaning(await runHelp(["mobile", "testflight-status"]), 3)
    expect(meaning).toContain("deploy-testflight-processing-failure")
    expect(meaning).toContain("FAILED/INVALID")
  })

  it("documents exit 0 as covering PROCESSING, so a one-shot read is a fact rather than an error", async () => {
    expect(exitMeaning(await runHelp(["mobile", "testflight-status"]), 0)).toContain("PROCESSING")
  })

  it("asks for no environment at all — it reaches App Store Connect directly, never the macbook", async () => {
    const help = await runHelp(["mobile", "testflight-status"])
    expect(help).not.toContain("\nEnvironment:\n")
    expect(help).not.toContain("MACBOOK_KEYCHAIN_PASSWORD")
  })

  it("its ssh-bound sibling DOES declare that environment, so the absence above is a difference and not a blind renderer", async () => {
    const help = await runHelp(["mobile", "deploy-testflight"])
    expect(help).toContain("\nEnvironment:\n")
    expect(sectionLines(help, "Environment").join("\n")).toContain("MACBOOK_KEYCHAIN_PASSWORD")
  })
})
