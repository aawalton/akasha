
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { writeFileSync } from "node:fs"
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

function unnamed(relPath: string): void {
  at.installRecorder(AGENT)
  const entry = { seenAt: Date.now() }
  writeFileSync(at.recordAt(AGENT), `${JSON.stringify({ [key(relPath)]: entry })}\n`, "utf8")
}

describe("a record that does not name the body it read", () => {
  test("reads as no record at all, whatever else it claims", () => {
    unnamed(GOVERNOR)
    expect(readingsOf(AGENT)[key(GOVERNOR)]).toBeUndefined()
  })

  test("leaves what is required for a path still owed", () => {
    unnamed(GOVERNOR)
    const standing = standingOn({ relPath: "pages/persona/aria.persona.md", repo: "instructions", root: at.root, agent: AGENT })
    expect(standing.kind).toBe("missing")
    expect(standing.refusals.join("\n")).toContain(GOVERNOR)
  })

})

describe("a reading", () => {
  test("settles what a path requires, which nothing short of one does", () => {
    unnamed(GOVERNOR)
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
