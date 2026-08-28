import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { utimesSync } from "node:fs"
import { noticeFor } from "../hooks/agent-hook-compose-subagent.agent-hook.code.attachment.ts"
import { type Fixture, fixture } from "./fixture.ts"
import { plantSeat, seatStore } from "./seat-fixture.ts"

const SEAT = "seat-one"
const WITHIN = "sub1"
const DELEGATE = `${SEAT}${"--"}${WITHIN}`

const PERSONA = "pages/persona/aria.persona.md"
const ROLE = "pages/role/reviewer.role.md"
const DOMAIN = "pages/domain/technology.domain.md"
const GLOBAL = "pages/domain/global.domain.md"

const GOVERNING = [PERSONA, ROLE, DOMAIN, GLOBAL] as const

let at: Fixture

beforeEach(() => {
  at = fixture()
  seatStore(at)
  at.document(GLOBAL, "slug: global\ndomain-parent-slug: global", 20)
  at.document(PERSONA, "slug: aria\ndomain-parent-slug: global", 30)
  at.document(ROLE, "slug: reviewer\ndomain-parent-slug: global", 25)
  at.document(DOMAIN, "slug: technology\ndomain-parent-slug: global", 17)
  at.document(
    "pages/page-property-definition/seat-persona-slug.page-property-definition.md",
    "page-type-slug: page-property-definition\ndefined-on-slug: seat\nkey: persona-slug\ntype: relation-slug\ntarget-slug: persona\ndefault: aria\nslug: seat-persona-slug\ndomain-parent-slug: global",
    20
  )
  at.document(
    "pages/page-property-definition/seat-role-slug.page-property-definition.md",
    "page-type-slug: page-property-definition\ndefined-on-slug: seat\nkey: role-slug\ntype: relation-slug\ntarget-slug: role\ndefault: reviewer\nslug: seat-role-slug\ndomain-parent-slug: global",
    20
  )
  plantSeat(at, { agent: SEAT, domain: "technology" })
  at.installRecorder(DELEGATE)
})

afterEach(() => {
  at.dispose()
})

function named(): readonly string[] {
  const said = noticeFor(DELEGATE, at.root)
  if (said === null) return []
  return [...said.matchAll(/--file-path (\S+)/g)].map((one) => one[1] as string).sort()
}

function readAll(agent: string): void {
  for (const relPath of GOVERNING) at.readIt(agent, relPath)
}

function moveIt(relPath: string): void {
  const later = new Date(Date.now() + 5_000)
  utimesSync(`${at.root}/${relPath}`, later, later)
}

describe("what a subagent is told at its start", () => {
  test("one that has read nothing is named every document that is required for it", () => {
    expect(named()).toEqual([...GOVERNING].sort())
  })

  test("one that has read them all is told nothing, the record being what settles it", () => {
    readAll(DELEGATE)
    expect(noticeFor(DELEGATE, at.root)).toBeNull()
  })

  test("one that has read part is named that part's remainder and nothing else", () => {
    at.readIt(DELEGATE, PERSONA)
    at.readIt(DELEGATE, GLOBAL)
    expect(named()).toEqual([DOMAIN, ROLE].sort())
  })

  test("a document that changed under it is named again, a stale reading being no reading", () => {
    readAll(DELEGATE)
    at.put(ROLE, "---\nslug: reviewer\ndomain-parent-slug: global\n---\n\nchanged\n")
    moveIt(ROLE)
    expect(named()).toEqual([ROLE])
  })

  test("what its seat above read clears nothing, a delegate's readings being its own", () => {
    readAll(SEAT)
    expect(named()).toEqual([...GOVERNING].sort())
  })
})
