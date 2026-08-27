
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { statSync, writeFileSync } from "node:fs"
import { standingOn } from "../lib/required-reading-standing.ts"
import { readingsOf } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path"
import { CLAIMED, type Fixture, fileKeyDeclared, fixture } from "./fixture.ts"

const AGENT = "agent-one"
const GOVERNOR = "pages/page-type/persona.page-type.md"

let at: Fixture

beforeEach(() => {
  at = fixture()
  fileKeyDeclared(at)
  at.document(GOVERNOR, `${CLAIMED}: pages/persona/aria.persona.md`, 40)
})

afterEach(() => {
  at.dispose()
})

const key = (relPath: string): string => canonicalize(`${at.root}/${relPath}`)

function delivered(relPath: string): void {
  at.installRecorder(AGENT)
  const entry = {
    at: statSync(`${at.root}/${relPath}`).mtimeMs,
    spans: [[1, at.linesOf(relPath)]],
    seen: Date.now(),
    via: "notify",
  }
  writeFileSync(at.recordAt(AGENT), `${JSON.stringify({ [key(relPath)]: entry })}\n`, "utf8")
}

describe("a record saying a difference was sent rather than read", () => {
  test("reads as no record at all, whatever coverage it claims", () => {
    delivered(GOVERNOR)
    expect(readingsOf(AGENT)[key(GOVERNOR)]).toBeUndefined()
  })

  test("leaves what is required for a path still owed", () => {
    delivered(GOVERNOR)
    const standing = standingOn({ relPath: "pages/persona/aria.persona.md", repo: "instructions", root: at.root, agent: AGENT })
    expect(standing.kind).toBe("missing")
    expect(standing.refusals.join("\n")).toContain(GOVERNOR)
  })

})

describe("a reading", () => {
  test("settles what a path requires, which nothing short of one does", () => {
    delivered(GOVERNOR)
    at.readIt(AGENT, GOVERNOR)
    const standing = standingOn({ relPath: "pages/persona/aria.persona.md", repo: "instructions", root: at.root, agent: AGENT })
    expect(standing.kind).toBe("read")
  })

  test("says nothing about another agent's standing", () => {
    at.readIt(AGENT, GOVERNOR)
    at.installRecorder("agent-two")
    const standing = standingOn({ relPath: "pages/persona/aria.persona.md", repo: "instructions", root: at.root, agent: "agent-two" })
    expect(standing.kind).toBe("missing")
  })
})
