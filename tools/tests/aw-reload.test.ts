
import { afterAll, describe, expect, it } from "bun:test"
import { chmod, mkdir, mkdtemp, rm, unlink } from "node:fs/promises"
import { join } from "node:path"
import { FIXTURE_ACCOUNTS, SCRATCH_ROOT } from "./aw-front.ts"
import { bash } from "./aw-run.ts"
import { generateBashInit } from "../aw/init/bash.ts"

function captureText(raw: unknown): string {
  if (typeof raw !== "string") throw new Error("capture file did not read as text")
  return raw
}

const STARTUP_SET = generateBashInit(FIXTURE_ACCOUNTS)

const startupFile = join(SCRATCH_ROOT, `bash-reload-startup-${Date.now()}.sh`)
await Bun.write(startupFile, STARTUP_SET)

afterAll(async () => {
  await unlink(startupFile).catch(() => {})
})

const MARKER = "RELOADED-IMPLEMENTATION-RAN"

const SEEDED_ACCOUNT = "probe"

const SEEDED_PAGE =
  "{five-hour-percent-used: 7,seven-day-percent-used: 9,five-hour-resets-at: 2026-08-19T05:39:59.800107+00:00,seven-day-resets-at: 2026-08-20T22:59:59.800133+00:00,usage-read-at: 2026-08-19T01:10:05.850Z}"

const MOVED_SET = STARTUP_SET.replace(/_aw_fn_cu\(\) \{[\s\S]*?\n\}/, `_aw_fn_cu() { echo ${MARKER}; }`)

const TRUNCATED_SET = `_aw_fn_cu() { echo ${MARKER}; }\n_aw_fn_sr() { echo truncated\n`

interface Run {
  readonly stdout: string
  readonly stderr: string
  readonly launched: string
  readonly exitCode: number
}

interface Case {
  readonly generated: string | null
  readonly generatorExits?: number
}

async function run({ generated, generatorExits = 0 }: Case): Promise<Run> {
  const home = await mkdtemp(join(SCRATCH_ROOT, "aw-reload-"))
  try {
    const bin = join(home, "bin")
    const capture = join(home, "captured")
    const generatedFile = join(home, "generated.sh")
    await mkdir(bin, { recursive: true })
    await Bun.write(capture, "")
    await Bun.write(generatedFile, generated ?? "")
    if (generated !== null) {
      const awDir = join(home, "repos/instructions/tools/aw")
      await mkdir(awDir, { recursive: true })
      await Bun.write(join(awDir, "cli.ts"), "// stub\n")
    }
    await mkdir(join(home, "repos/instructions/pages/claude-account"), { recursive: true })
    await Bun.write(
      join(
        home,
        `repos/instructions/pages/claude-account/${SEEDED_ACCOUNT}.claude-account.uncommitted.yaml`
      ),
      SEEDED_PAGE
    )
    await Bun.write(
      join(bin, "bun"),
      [
        "#!/usr/bin/env bash",
        'case "$*" in *"init bash"*)',
        `  cat ${JSON.stringify(generatedFile)}`,
        `  exit ${generatorExits} ;;`,
        "esac",
        `printf '%s\\n' "$*" >> ${JSON.stringify(capture)}`,
        "",
      ].join("\n")
    )
    await chmod(join(bin, "bun"), 0o755)

    const result = await bash(
      `export HOME=${JSON.stringify(home)}
       unset INSTRUCTIONS_ROOT
       export PATH=${JSON.stringify(bin)}:"$PATH"
       source ${JSON.stringify(startupFile)}
       cu`
    )
    return {
      stdout: result.stdout,
      stderr: result.stderr,
      launched: captureText(await Bun.file(capture).text()),
      exitCode: result.exitCode,
    }
  } finally {
    await rm(home, { recursive: true, force: true })
  }
}

describe("a launcher runs the definition the checkout generates now", () => {
  it("runs the moved implementation, not the one the shell started with", async () => {
    const { stdout, launched, exitCode } = await run({ generated: MOVED_SET })
    expect(exitCode).toBe(0)
    expect(stdout).toContain(MARKER)
    expect(stdout).not.toContain(SEEDED_ACCOUNT)
  })

  it("runs the startup implementation when the checkout has not moved", async () => {
    const { stdout, launched, exitCode } = await run({ generated: STARTUP_SET })
    expect(exitCode).toBe(0)
    expect(stdout).not.toContain(MARKER)
    expect(stdout).toContain(SEEDED_ACCOUNT)
  })
})

describe("a reload that fails leaves the launcher working", () => {
  const cases: readonly (readonly [string, Case, string])[] = [
    ["the generator is not on disk at all", { generated: null }, "no generator at"],
    ["the generator exits nonzero", { generated: "", generatorExits: 1 }, "exited nonzero"],
    ["the generator prints nothing", { generated: "" }, "produced nothing"],
    ["the generated set does not parse", { generated: TRUNCATED_SET }, "does not parse"],
  ]

  it.each(cases)("%s: the launcher still runs, and says so", async (_label, one, why) => {
    const { stdout, stderr, exitCode } = await run(one)
    expect(exitCode).toBe(0)
    expect(stdout).toContain(SEEDED_ACCOUNT)
    expect(stderr).toContain(why)
    expect(stderr).toContain("running the definition your terminal started with")
  })

  it("applies no part of a set that is truncated partway", async () => {
    const { launched, stdout } = await run({ generated: TRUNCATED_SET })
    expect(stdout).not.toContain(MARKER)
    expect(stdout).toContain(SEEDED_ACCOUNT)
  })
})
