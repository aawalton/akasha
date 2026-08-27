
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { readFileSync, statSync } from "node:fs"
import { attachmentPathFor, writeAttachment } from "../../page/attachment-file.ts"
import { recordEpoch, replacedAt } from "../lib/epoch.ts"
import { blobId } from "../../repo/git/git.ts"
import { lastReadAt, loadPath, READINGS, readingsOf, recordRead, resetReadings } from "../lib/read-record.ts"
import { canonicalize } from "../../repo/path/path"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "agent-one"

const SUBAGENT = `${AGENT}--sub1`

const DOCUMENT = "pages/domain/global.domain.md"

const EXTENSION = "json"

const UNCOMMITTED = true

const SEAT_PAGE = `---\npage-type-slug: seat\nid: ${AGENT}\ntitle: "${AGENT}"\ndomain-slug: global\n---\n`

const SUBAGENT_PAGE = `---\npage-type-slug: subagent\nid: ${SUBAGENT}\ntitle: "${SUBAGENT}"\ndomain-slug: global\n---\n`

let at: Fixture

beforeEach(() => {
  at = fixture()
  at.document(DOCUMENT, "slug: global\ndomain-parent-slug: global", 12)
  at.putMemory(`pages/seat/${AGENT}.md`, SEAT_PAGE)
  at.putMemory(`pages/subagent/${SUBAGENT}.md`, SUBAGENT_PAGE)
})

afterEach(() => {
  at.dispose()
})

function pageOf(agent: string): string {
  const kind = agent === SUBAGENT ? "subagent" : "seat"
  return `${at.memory}/pages/${kind}/${agent}.md`
}

function target(): string {
  return canonicalize(`${at.root}/${DOCUMENT}`)
}

function landRead(agent: string, seen: number | null): void {
  const absolute = `${at.root}/${DOCUMENT}`
  const entry: Record<string, unknown> = {
    at: statSync(absolute).mtimeMs,
    spans: [[1, at.linesOf(DOCUMENT)]],
    blob: blobId(readFileSync(absolute)),
  }
  if (seen !== null) entry.seen = seen
  writeAttachment(
    pageOf(agent),
    READINGS,
    EXTENSION,
    JSON.stringify({ [target()]: entry }),
    UNCOMMITTED
  )
}

const vouched = (agent: string): number | null => lastReadAt(agent, target())

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

describe("a replacement the file itself was told about", () => {
  test("no longer carries the reads it dropped, rather than dropping them on every load", () => {
    landRead(AGENT, Date.now() - 1000)
    recordEpoch(AGENT, "compact", Date.now())
    resetReadings(AGENT, replacedAt(AGENT))
    const held = attachmentPathFor(pageOf(AGENT), READINGS, EXTENSION, UNCOMMITTED)
    expect(loadPath(held)).toEqual({})
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
    expect(() => recordRead("agent-pageless", target(), 1, [1, 12], "blob")).not.toThrow()
    expect(readingsOf("agent-pageless")).toEqual({})
  })
})
