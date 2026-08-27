
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, statSync } from "node:fs"
import { tmpdir } from "node:os"
import { countLines } from "../lib/read-log.ts"
import { readOne } from "../../agent/read-one.ts"
import { type Fixture, fixture } from "./fixture.ts"

const SUBJECT = "pages/domain/global.domain.md"

let at: Fixture

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

function body(mark: string): string {
  return `${Array.from({ length: 40 }, (_, i) => `line ${i + 1} ${mark}`).join("\n")}\n`
}

function stored(prior: string): string {
  Bun.spawnSync(["git", "init", "-q"], { cwd: at.root })
  const run = Bun.spawnSync(["git", "hash-object", "-w", "--stdin"], {
    cwd: at.root,
    stdin: new TextEncoder().encode(prior),
    stdout: "pipe",
  })
  return new TextDecoder().decode(run.stdout).trim()
}

function since(prior: string): { readonly headline: string; readonly body: string | null } {
  const blob = stored(prior)
  const absolute = `${at.root}/${SUBJECT}`
  const workspace = mkdtempSync(`${tmpdir()}/read-command-`)
  try {
    return readOne({
      named: SUBJECT,
      absolute,
      reading: { at: statSync(absolute).mtimeMs - 1000, spans: [[1, countLines(prior)]], blob },
      forced: false,
      root: at.root,
      workspace,
    })
  } finally {
    rmSync(workspace, { recursive: true, force: true })
  }
}

describe("the smaller of the two", () => {
  test("one line moving comes back as the difference", () => {
    const prior = body("as it was")
    at.put(SUBJECT, prior.replace("line 20 as it was", "line 20 as it now is"))
    const emission = since(prior)
    expect(emission.headline).toContain("the difference from what you last read follows")
    expect(emission.body).toContain("line 20 as it now is")
    expect(emission.body).not.toContain("line 1 as it was")
  })

  test("a rewrite comes back as the file, the difference costing more than what it describes", () => {
    at.put(SUBJECT, body("entirely otherwise"))
    const emission = since(body("as it was"))
    expect(emission.headline).toContain("no smaller than the file it moved in")
    expect(emission.headline).toContain("the whole file follows")
    expect(emission.body).toContain("line 1 entirely otherwise")
    expect(emission.body).not.toContain("@@")
  })
})
