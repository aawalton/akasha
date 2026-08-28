
import { describe, expect, test } from "bun:test"
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import type { CheckOutcome, RepoView } from "../lib/check.ts"
import { bashEnvInside, declaredIn } from "../audits/bash-env-inside.ts"
import { installRefusals } from "./fixture.ts"
import { rootsNamed } from "../../repo/roots/roots.ts"

const STARTUP = "tools/bash-env.sh"
const INSIDE = `$HOME/repos/akasha/${STARTUP}`
const OUTSIDE = "$HOME/repos/code-editor/tools/bash-env.sh"

function declaring(value: string): string {
  return JSON.stringify({ env: { BASH_ENV: value } })
}

function repoViewOf(root: string): RepoView {
  return {
    roots: rootsNamed({ akasha: root }),
    name: "akasha",
    documents: [],
    read: (relPath) => readFileSync(`${root}/${relPath}`, "utf8"),
    exists: (absolute) => existsSync(absolute),
  }
}

function ran(settings: string | null, startup: boolean): CheckOutcome {
  const root = mkdtempSync(`${tmpdir()}/bash-env-inside-`)
  try {
    installRefusals(root)
    if (settings !== null) {
      mkdirSync(`${root}/settings`, { recursive: true })
      writeFileSync(`${root}/settings/agents.json`, settings.replaceAll("$ROOT", root))
    }
    if (startup) {
      mkdirSync(`${root}/tools`, { recursive: true })
      writeFileSync(`${root}/${STARTUP}`, "true\n")
    }
    return bashEnvInside(repoViewOf(root))
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
}

describe("where the declaration points", () => {
  test("a startup file in this repo, which is there, passes over the one declaration", () => {
    const outcome = ran(declaring(INSIDE), true)
    expect(outcome.verdict).toBe("pass")
    expect(outcome.population.measured).toBe(1)
  })

  test("a startup file across the seam is refused, and the refusal quotes what it read", () => {
    const outcome = ran(declaring(OUTSIDE), true)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain(OUTSIDE)
  })

  test("a path in this repo naming no file is refused, which bash would not report", () => {
    const outcome = ran(declaring(INSIDE), false)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.messages.join("\n")).toContain(STARTUP)
  })

  test("an absolute spelling of the same file passes, `$HOME` not being the only one", () => {
    expect(ran(declaring(`$ROOT/${STARTUP}`), true).verdict).toBe("pass")
  })
})

describe("where there is nothing to point", () => {
  test("a settings file declaring no BASH_ENV is refused rather than passed over", () => {
    const outcome = ran(JSON.stringify({ env: { DISABLE_AUTOUPDATER: "1" } }), true)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.population.measured).toBe(0)
  })

  test("no settings file at all is refused, and nothing here reads a second one", () => {
    const outcome = ran(null, false)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.population.measured).toBe(0)
  })

  test("a settings file that is not JSON is refused rather than read as empty", () => {
    const outcome = ran("{ not json", true)
    expect(outcome.verdict).toBe("fail")
    expect(outcome.population.measured).toBe(0)
  })
})

describe("what counts as a declaration", () => {
  test("an empty string is no declaration, an empty BASH_ENV sourcing nothing", () => {
    expect(declaredIn({ env: { BASH_ENV: "" } })).toBeNull()
  })

  test("a non-string is no declaration either", () => {
    expect(declaredIn({ env: { BASH_ENV: ["a"] } })).toBeNull()
  })

  test("a document with no env block declares nothing", () => {
    expect(declaredIn({ hooks: {} })).toBeNull()
  })
})
