
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { recordEpoch } from "../lib/epoch.ts"
import { blobId } from "../../repo/git/git.ts"
import { readOid, readingsOf, recordRead } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "agent-one"

const SUBAGENT = `${AGENT}--sub1`

const DOCUMENT = "pages/domain/global.domain.md"

let at: Fixture

beforeEach(() => {
  at = fixture()
  at.document(DOCUMENT, "slug: global\ndomain-parent-slug: global", 12)
  at.installRecorder(AGENT)
  at.installRecorder(SUBAGENT)
})

afterEach(() => {
  at.dispose()
})

function target(): string {
  return canonicalize(`${at.root}/${DOCUMENT}`)
}

function landRead(agent: string, seenAt: number | null): void {
  const absolute = `${at.root}/${DOCUMENT}`
  const entry: Record<string, unknown> = { oid: blobId(readFileSync(absolute)) }
  if (seenAt !== null) entry.seenAt = seenAt
  writeFileSync(at.recordAt(agent), `${JSON.stringify({ [target()]: entry })}\n`, "utf8")
}

const vouched = (agent: string): string | null => readOid(agent, target())

describe("a read taken before the context was replaced", () => {
  test("does not vouch, though its record is still there", () => {
    landRead(AGENT, Date.now() - 1000)
    recordEpoch(AGENT, "compact", Date.now())
    expect(readingsOf(AGENT)).toEqual({})
    expect(vouched(AGENT)).toBeNull()
  })

  test("a read taken after it does vouch", () => {
    recordEpoch(AGENT, "compact", Date.now() - 1000)
    landRead(AGENT, Date.now())
    expect(vouched(AGENT)).not.toBeNull()
  })

  test("startup left no context standing, so a read before it does not vouch", () => {
    landRead(AGENT, Date.now() - 1000)
    recordEpoch(AGENT, "startup", Date.now())
    expect(vouched(AGENT)).toBeNull()
  })

  test("resume held the context it had, so a read before it still vouches", () => {
    landRead(AGENT, Date.now() - 1000)
    recordEpoch(AGENT, "resume", Date.now())
    expect(vouched(AGENT)).not.toBeNull()
  })

  test("no epoch at all suspects nothing", () => {
    landRead(AGENT, Date.now() - 1000)
    expect(vouched(AGENT)).not.toBeNull()
  })

  test("a record that cannot say when it was read is dropped rather than trusted", () => {
    landRead(AGENT, null)
    recordEpoch(AGENT, "compact", Date.now())
    expect(vouched(AGENT)).toBeNull()
  })
})

describe("whose context a replacement reaches", () => {
  test("a seat's replacement is not a subagent's, which holds a context that was not replaced", () => {
    landRead(SUBAGENT, Date.now() - 1000)
    recordEpoch(AGENT, "compact", Date.now())
    expect(vouched(SUBAGENT)).not.toBeNull()
  })
})

describe("an agent no page carries a record for", () => {
  test("records nothing, rather than failing the call that read", () => {
    expect(() => recordRead("agent-pageless", target(), 1, "blob")).not.toThrow()
    expect(readingsOf("agent-pageless")).toEqual({})
  })
})
