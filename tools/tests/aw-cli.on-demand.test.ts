import { afterAll, describe, expect, it } from "bun:test"
import { join } from "node:path"
import { bash } from "./aw-run.ts"
import { type AliasEntry, readAliasSnapshot } from "../aw/init/alias-snapshot.ts"
import { generateBashInit } from "../aw/init/bash.ts"

const FIXTURE_ACCOUNTS: readonly AliasEntry[] = [
  { account: "aawalton", aliasIndex: 1 },
  { account: "alanwalton", aliasIndex: 2 },
  { account: "audhdalan", aliasIndex: 3 },
  { account: "tempereso", aliasIndex: 4 },
  { account: "ctw", aliasIndex: 5 },
  { account: "aow", aliasIndex: 6 },
]

const FIXTURE_CN = FIXTURE_ACCOUNTS.map((a) => `c${a.aliasIndex}`)
const EXPECTED_FUNCTION_NAMES = ["cu", ...FIXTURE_CN, "cna", "sn", "sr"]

const EXPECTED_ALIASES = ["s.", "gs", "gc", "gca", "gcc", "gp", "gl", "gg", "gcb"]

const tmpFile = join("/var/tmp", `aw-init-test-${Date.now()}.sh`)
const output = generateBashInit(FIXTURE_ACCOUNTS)
await Bun.write(tmpFile, output)

afterAll(async () => {
  const { unlink } = await import("node:fs/promises")
  await unlink(tmpFile).catch(() => {})
})

async function runCli(
  ...args: readonly string[]
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const cliPath = join(import.meta.dir, "..", "aw", "cli.ts")
  const proc = Bun.spawn(["bun", cliPath, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const stdoutP = new Response(proc.stdout).text()
  const stderrP = new Response(proc.stderr).text()
  const [stdout, stderr] = await Promise.all([stdoutP, stderrP])
  await proc.exited
  return { stdout, stderr, exitCode: proc.exitCode ?? -1 }
}

describe("generateBashInit", () => {
  it("produces valid bash syntax (bash -n)", async () => {
    const result = await bash(`bash -n "${tmpFile}"`)
    expect(result.stderr).toBe("")
    expect(result.exitCode).toBe(0)
  })
})

describe("bash integration", () => {
  it("all functions are available after sourcing", async () => {
    const checks = EXPECTED_FUNCTION_NAMES.map((name) => `type -t ${name}`).join(" && ")
    const result = await bash(`source "${tmpFile}" && ${checks}`)
    const types = result.stdout.trim().split("\n")
    expect(types.length).toBe(EXPECTED_FUNCTION_NAMES.length)
    for (let i = 0; i < EXPECTED_FUNCTION_NAMES.length; i++) {
      expect(types[i]).toBe("function")
    }
  })

  it("all aliases are available after sourcing", async () => {
    const checks = EXPECTED_ALIASES.map((name) => `type -t '${name}'`).join(" && ")
    const result = await bash(`shopt -s expand_aliases; source "${tmpFile}" && ${checks}`)
    const types = result.stdout.trim().split("\n")
    expect(types.length).toBe(EXPECTED_ALIASES.length)
    for (let i = 0; i < EXPECTED_ALIASES.length; i++) {
      expect(types[i]).toBe("alias")
    }
  })
})

describe("cli entrypoint", () => {
  it("init bash reads the live snapshot and matches generateBashInit(snapshot), exit 0", async () => {
    const result = await runCli("init", "bash")
    expect(result.exitCode).toBe(0)
    expect(result.stdout).toBe(`${generateBashInit(readAliasSnapshot())}\n`)
    expect(result.stderr).toBe("")
  })

  it("invalid subcommand exits 1 with error on stderr", async () => {
    const result = await runCli("foo")
    expect(result.exitCode).toBe(1)
    expect(result.stderr).toContain("Usage: aw init bash")
  })

  it("no arguments exits 1", async () => {
    const result = await runCli()
    expect(result.exitCode).toBe(1)
  })

  it("init without subcommand exits 1", async () => {
    const result = await runCli("init")
    expect(result.exitCode).toBe(1)
  })
})
