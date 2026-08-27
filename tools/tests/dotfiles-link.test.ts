import { afterAll, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const REPO_ROOT = resolve(import.meta.dir, "..", "..")
const LINK_LIB = join(REPO_ROOT, "dotfiles", "lib", "link.sh")

const scratchRoot = mkdtempSync(join(tmpdir(), "dotfiles-link-"))
afterAll(() => rmSync(scratchRoot, { recursive: true, force: true }))

let scratchHome: string
let dotfiles: string
let caseIndex = 0

beforeEach(() => {
  caseIndex += 1
  scratchHome = join(scratchRoot, `home-${caseIndex}`)
  dotfiles = join(scratchHome, "instructions", "dotfiles")
})

type Run = { stdout: string; stderr: string; exitCode: number }

function runShell(body: string): Run {
  const script = [
    "set -euo pipefail",
    `HOME=${JSON.stringify(scratchHome)}`,
    'DOTFILES="$HOME/instructions/dotfiles"',
    'mkdir -p "$DOTFILES"',
    `. ${JSON.stringify(LINK_LIB)}`,
    body,
  ].join("\n")
  const proc = Bun.spawnSync(["bash", "-c", script])
  return {
    stdout: proc.stdout.toString(),
    stderr: proc.stderr.toString(),
    exitCode: proc.exitCode,
  }
}

const DANGLING = /DANGLING/

describe("link() reports whether the link it is talking about resolves", () => {
  test("A — creating a link whose target does not exist is reported as dangling, not as created", () => {
    const target = join(dotfiles, ".caseA")
    const linkPath = join(scratchHome, ".caseA")
    const run = runShell(`link ${JSON.stringify(target)} ${JSON.stringify(linkPath)}`)

    expect(run.exitCode).toBe(0)
    expect(run.stderr).toMatch(DANGLING)
    expect(run.stderr).toContain(linkPath)
    expect(run.stdout).not.toContain(`${linkPath} -> ${target}`)
  })

  test("B — a dangling link already in place is reported, not silently affirmed", () => {
    const target = join(dotfiles, ".caseB")
    const linkPath = join(scratchHome, ".caseB")
    const run = runShell(
      [
        `ln -s ${JSON.stringify(target)} ${JSON.stringify(linkPath)}`,
        `link ${JSON.stringify(target)} ${JSON.stringify(linkPath)}`,
      ].join("\n")
    )

    expect(run.exitCode).toBe(0)
    expect(run.stderr).toMatch(DANGLING)
    expect(run.stderr).toContain(linkPath)
  })

  test("C — control: creating a link whose target exists is still reported as created", () => {
    const target = join(dotfiles, ".caseC")
    const linkPath = join(scratchHome, ".caseC")
    const run = runShell(
      [
        `printf 'real\\n' > ${JSON.stringify(target)}`,
        `link ${JSON.stringify(target)} ${JSON.stringify(linkPath)}`,
      ].join("\n")
    )

    expect(run.exitCode).toBe(0)
    expect(run.stdout).toContain(`${linkPath} -> ${target}`)
    expect(run.stderr).not.toMatch(DANGLING)
  })

  test("D — control: a healthy link already in place stays silent", () => {
    const target = join(dotfiles, ".caseD")
    const linkPath = join(scratchHome, ".caseD")
    const run = runShell(
      [
        `printf 'real\\n' > ${JSON.stringify(target)}`,
        `ln -s ${JSON.stringify(target)} ${JSON.stringify(linkPath)}`,
        `link ${JSON.stringify(target)} ${JSON.stringify(linkPath)}`,
      ].join("\n")
    )

    expect(run.exitCode).toBe(0)
    expect(run.stdout.trim()).toBe("")
    expect(run.stderr).not.toMatch(DANGLING)
  })
})

describe("link_summary reports the count without refusing", () => {
  test("names every dangling link and still exits 0", () => {
    const targetA = join(dotfiles, ".sumA")
    const linkA = join(scratchHome, ".sumA")
    const targetB = join(dotfiles, ".sumB")
    const linkB = join(scratchHome, ".sumB")
    const healthy = join(dotfiles, ".sumOk")
    const linkOk = join(scratchHome, ".sumOk")

    const run = runShell(
      [
        `printf 'real\\n' > ${JSON.stringify(healthy)}`,
        `link ${JSON.stringify(targetA)} ${JSON.stringify(linkA)}`,
        `link ${JSON.stringify(targetB)} ${JSON.stringify(linkB)}`,
        `link ${JSON.stringify(healthy)} ${JSON.stringify(linkOk)}`,
        "link_summary",
      ].join("\n")
    )

    expect(run.exitCode).toBe(0)
    expect(run.stderr).toContain(linkA)
    expect(run.stderr).toContain(linkB)
    expect(run.stderr).toContain("2")
    expect(run.stderr).not.toContain(linkOk)
  })

  test("a run with nothing dangling says nothing", () => {
    const healthy = join(dotfiles, ".quiet")
    const linkOk = join(scratchHome, ".quiet")
    const run = runShell(
      [
        `printf 'real\\n' > ${JSON.stringify(healthy)}`,
        `link ${JSON.stringify(healthy)} ${JSON.stringify(linkOk)}`,
        "link_summary",
      ].join("\n")
    )

    expect(run.exitCode).toBe(0)
    expect(run.stderr.trim()).toBe("")
  })
})
