import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { closeSync, existsSync, openSync, readFileSync } from "node:fs"
import { judge, type Outcome } from "../../outcome/outcome.ts"
import { ownRead } from "../lib/read-record.ts"
import { loadingLines } from "../lib/owed.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, REPOS } from "../../repo/roots/roots.ts"
import { type Fixture, fixture, installRepos } from "./fixture.ts"

type SpawnResult = ReturnType<typeof Bun.spawnSync>

const AGENT = "agent-one"
const GOVERNOR = "pages/page-type/project.page-type.md"
const SUBJECT = "projects/1.md"
const LIVE = `${import.meta.dir}/../..`

const ARM = `${import.meta.dir}/command-arm.ts`

const READ = `${LIVE}/ops-cli/global/read/read.command.code.attachment.ts`

let at: Fixture

beforeEach(() => {
  at = fixture()
  installRepos(at.root)
  at.document(
    GOVERNOR,
    "page-type-slug: page-type\nslug: project\nextends-slug: none\nfiles: akasha:projects/*.md",
    20
  )
  at.put(SUBJECT, `${Array.from({ length: 12 }, (_, i) => `row line ${i + 1}`).join("\n")}\n`)
  at.installRecorder()
  Bun.spawnSync(["git", "-C", at.root, "add", "-A", "pages"])
})

afterEach(() => {
  at.dispose()
})

function roots(): Roots {
  const named: Record<string, string> = {}
  for (const repo of REPOS) named[repo] = `${at.root}-no-${repo}`
  named[AKASHA] = at.root
  return { ...named, target: AKASHA }
}

function gated(): readonly Outcome[] {
  const absolute = `${at.root}/${GOVERNOR}`
  const owed = ownRead(AGENT, absolute) === null ? [absolute] : []
  return [judge("owes-a-reading", `${GOVERNOR} specifies this path`, owed.map(() => "unread"), owed)]
}

function run(command: string): void {
  const args = command.trim().split(/\s+/).slice(2)
  const environment: Record<string, string> = {}
  for (const [name, value] of Object.entries(process.env)) {
    if (name === "CLAUDE_CODE_SESSION_ID" || value === undefined) continue
    environment[name] = value
  }
  const landing = `${at.home}/read-output.txt`
  const out = openSync(landing, "w")
  const ran = ((): SpawnResult => {
    try {
      return Bun.spawnSync({
        cmd: [process.execPath, ARM, READ, ...args],
        cwd: at.root,
        env: { ...environment, AGENT_ID: AGENT, HOME: at.home, AKASHA_ROOT: at.root, CODE_ROOT: LIVE },
        stdout: out,
        stderr: out,
      })
    } finally {
      closeSync(out)
    }
  })()
  expect(readFileSync(landing, "utf8")).not.toContain("refused:")
  expect(ran.exitCode).toBe(0)
}

describe("what a refused act names", () => {
  test("one call, naming the path the refusal owes", () => {
    const lines = loadingLines(gated(), roots())
    expect(lines).toHaveLength(2)
    const command = lines[1] as string
    expect(command.match(/ops read/g)).toHaveLength(1)
    expect(command).toContain(`--file-path ${GOVERNOR}`)
  })

  test("nothing at all where the act owes no reading", () => {
    at.readIt(AGENT, GOVERNOR)
    expect(loadingLines(gated(), roots())).toEqual([])
  })
})

describe("running it", () => {
  test("clears the refusal on the next attempt, with nothing further read", () => {
    const before = gated()
    expect(before.every((outcome) => outcome.verdict === "fail")).toBe(true)

    run(loadingLines(before, roots())[1] as string)

    const after = gated()
    expect(after.map((outcome) => outcome.verdict)).toEqual(["pass"])
    expect(loadingLines(after, roots())).toEqual([])
  })
})
