
import { afterAll, expect, test } from "bun:test"
import { spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const SEAM = `${import.meta.dir}/../bash-env.sh`

const ROOT = mkdtempSync("/var/tmp/bash-env-test-")
afterAll(() => rmSync(ROOT, { recursive: true, force: true }))

let counter = 0

function freshHome(secrets?: string): string {
  const home = join(ROOT, String(counter++))
  mkdirSync(home)
  if (secrets !== undefined) writeFileSync(join(home, ".secrets.env"), secrets)
  return home
}

function run(bashEnv: string, home: string, script: string): { exitCode: number; stdout: string } {
  const result = spawnSync("bash", ["-c", script], {
    encoding: "utf8",
    env: { PATH: process.env.PATH ?? "", HOME: home, BASH_ENV: bashEnv },
  })
  return { exitCode: result.status ?? -1, stdout: result.stdout ?? "" }
}

test("a failing producer's status survives a pipe to a truncating consumer", () => {
  expect(run(SEAM, freshHome(), "false | head -1").exitCode).toBe(1)
})

test("without it, the same pipeline reports success — the defect itself", () => {
  expect(run("", freshHome(), "false | head -1").exitCode).toBe(0)
})

test("the secrets file still reaches the shell", () => {
  expect(run(SEAM, freshHome("export SEAM_PROBE=loaded\n"), 'printf %s "$SEAM_PROBE"').stdout).toBe(
    "loaded"
  )
})

test("a missing secrets file leaks no status into the first command", () => {
  expect(run(SEAM, freshHome(), 'printf %s "$?"').stdout).toBe("0")
})

test("it is sourced rather than executed, so the execute bit is not what it needs", () => {
  expect(run(SEAM, freshHome("export SEAM_PROBE=loaded\n"), 'printf %s "$SEAM_PROBE"').stdout).toBe(
    "loaded"
  )
  expect(spawnSync("test", ["-x", SEAM]).status).not.toBe(0)
})
