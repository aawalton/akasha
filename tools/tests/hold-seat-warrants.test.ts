
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { type Standing, seatStanding } from "../lib/hold-seat.ts"
import { type Fixture, fixture } from "./fixture.ts"
import { plantSeat } from "./seat-fixture.ts"

let at: Fixture

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

const AGENT = "agent-one"

const ON_CALL_AT = "pages/domain/seat-assignment-on-call.domain.md"

const PERSON_AT = "pages/person/alan.person.md"

const PERSON_DOMAIN_AT = "pages/page-type/person.page-type.md"

function plantPages(): void {
  at.document("pages/persona/aria.persona.md", "name: aria\ndomain-parent-slug: global", 30)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 15)
  at.document("pages/role/reviewer.role.md", "domain-parent-slug: global", 25)
  at.document(ON_CALL_AT, "slug: seat-assignment-on-call\ndomain-parent-slug: global", 16)
  at.document(PERSON_DOMAIN_AT, "slug: person\ndomain-parent-slug: global", 16)
  at.document(PERSON_AT, "slug: alan\ndomain-parent-slug: person", 16)
  at.installRecorder()
}

function run(): Standing {
  return seatStanding({ agent: AGENT, root: at.root })
}

function said(standing: Standing): string {
  return standing.refusals.join("\n")
}

describe("the assignment and charter a seat states", () => {
  test("an on-call assignment brings the on-call domain, claimed by the assignment", () => {
    plantPages()
    plantSeat(at, { agent: AGENT, persona: "aria", domain: "global", role: "reviewer", onCall: true })
    const standing = run()
    expect(said(standing)).toContain(ON_CALL_AT)
    expect(said(standing)).toContain("on-call")
  })

  test("a seat stating no on-call assignment is not held for the on-call domain", () => {
    plantPages()
    plantSeat(at, { agent: AGENT, persona: "aria", domain: "global", role: "reviewer" })
    expect(said(run())).not.toContain(ON_CALL_AT)
  })

  test("a person principal brings their page and the person domain above it", () => {
    plantPages()
    plantSeat(at, { agent: AGENT, persona: "aria", domain: "global", role: "reviewer", principal: "alan" })
    const standing = run()
    expect(said(standing)).toContain(PERSON_AT)
    expect(said(standing)).toContain(PERSON_DOMAIN_AT)
  })

  test("an agent principal brings nothing, answering to no person", () => {
    plantPages()
    plantSeat(at, { agent: AGENT, persona: "aria", domain: "global", role: "reviewer", above: "some-seat" })
    const standing = run()
    expect(said(standing)).not.toContain(PERSON_AT)
    expect(said(standing)).not.toContain(PERSON_DOMAIN_AT)
  })
})
