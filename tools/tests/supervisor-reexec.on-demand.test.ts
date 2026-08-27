
import { afterAll, describe, expect, it } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { hold } from "../lib/digest-harness.ts"
import { SCENARIOS } from "./supervisor-reexec-drive.ts"
import { type Recording, STANDING_RECORDINGS } from "./supervisor-reexec-vectors.ts"

const REPO_ROOT = new URL("../..", import.meta.url).pathname
const DRIVE = `${REPO_ROOT}tools/tests/supervisor-reexec-drive.ts`

const scratchHomes: string[] = []

afterAll(() => {
  for (const home of scratchHomes) rmSync(home, { recursive: true, force: true })
})

async function drive(name: string): Promise<Recording> {
  const armHome = mkdtempSync("/var/tmp/supervisor-reexec-arm-")
  scratchHomes.push(armHome)

  const proc = Bun.spawn(["bun", DRIVE, name], {
    cwd: REPO_ROOT,
    env: { ...process.env, HOME: armHome },
    stdout: "pipe",
    stderr: "pipe",
  })
  const stdout = (await new Response(proc.stdout).text()).replaceAll(armHome, "<ARM_HOME>")
  const stderr = (await new Response(proc.stderr).text()).replaceAll(armHome, "<ARM_HOME>")
  const exitCode = await proc.exited

  const answerLine = stdout.split("\n").find((l) => l.startsWith("ANSWER "))
  const action = SCENARIOS[name]?.action

  if (action === "exec") {
    return {
      exitCode,
      inherited: stdout
        .split("\n")
        .filter((l) => l.startsWith("_SUPERVISOR_INHERIT_"))
        .sort(),
      replacedImage: answerLine === undefined,
    }
  }
  if (action === "execfail") {
    const logged = stderr.split("\n").find((l) => l.includes("execvpe re-exec failed"))
    const cut = logged?.indexOf("Bun.spawn:") ?? -1
    return {
      exitCode,
      returnedToCaller: answerLine !== undefined,
      logPrefix: logged !== undefined && cut >= 0 ? logged.slice(0, cut + "Bun.spawn:".length) : null,
    }
  }
  return {
    exitCode,
    handoff: answerLine === undefined ? "<<none>>" : JSON.parse(answerLine.slice("ANSWER ".length)),
    stderr: stderr.trim() === "" ? null : stderr.trim(),
  }
}

function projected(observed: Recording, standing: Recording): Recording {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) picked[key] = observed[key]
  return picked
}

describe("supervisor-reexec, held against what the code repository answered", () => {
  for (const [name, standing] of Object.entries(STANDING_RECORDINGS)) {
    it(name, async () => {
      const verdict = hold(name, standing, projected(await drive(name), standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("drives every scenario the recording holds, and records every scenario it drives", () => {
    expect(Object.keys(STANDING_RECORDINGS).sort()).toEqual(Object.keys(SCENARIOS).sort())
  })

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const standing of Object.values(STANDING_RECORDINGS)) {
      expect(Object.keys(standing).length).toBeGreaterThan(0)
    }
  })
})
