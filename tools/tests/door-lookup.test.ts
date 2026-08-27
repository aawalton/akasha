
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { readOid } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path"
import { type Fixture, fixture } from "./fixture.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

describe("the command lookup", () => {
  const SEAT = "seat-one"
  const SUB = "seat-one--sub1"

  function recordSubagentRead(relPath: string): string {
    at.readIt(SUB, relPath)
    return canonicalize(`${at.root}/${relPath}`)
  }

  test("a subagent's read does not answer for its seat", () => {
    at.document("pages/persona/aria.persona.md", "name: aria", 20)
    expect(readOid(SEAT, recordSubagentRead("pages/persona/aria.persona.md"))).toBeNull()
  })

  test("the seat's own read answers for itself", () => {
    at.document("pages/persona/aria.persona.md", "name: aria", 20)
    at.readIt(SEAT, "pages/persona/aria.persona.md")
    expect(readOid(SEAT, canonicalize(`${at.root}/pages/persona/aria.persona.md`))).not.toBeNull()
  })

  test("a subagent's own read answers for the subagent", () => {
    at.document("pages/persona/aria.persona.md", "name: aria", 20)
    const absolute = recordSubagentRead("pages/persona/aria.persona.md")
    expect(readOid(SUB, absolute)).not.toBeNull()
  })
})
