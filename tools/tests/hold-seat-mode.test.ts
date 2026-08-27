
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import type { Mode } from "../lib/attributes.ts"
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

const INTERACTIVE_AT = "pages/domain/seat-mode-interactive.domain.md"

const HEADLESS_AT = "pages/domain/seat-mode-headless.domain.md"

const ABOVE_THE_MODE = [
  "pages/page-property-definition/seat-mode.page-property-definition.md",
  "pages/domain/seat-charter.domain.md",
  "pages/domain/seat-declaration.domain.md",
  "pages/page-type/seat.page-type.md",
  "pages/page-type/agent.page-type.md",
  "pages/domain/agent-mode.domain.md",
]

const ABOVE_WHAT_THE_MODE_NAMES = ["pages/domain/agent-property.domain.md"]

const STATED = [
  "pages/persona/aria.persona.md",
  "pages/role/reviewer.role.md",
  "pages/domain/agent-harness.domain.md",
  "pages/domain/global.domain.md",
]

function plantSeatPages(): void {
  at.document("pages/persona/aria.persona.md", "name: aria\ndomain-parent-slug: instructions", 30)
  at.document("pages/domain/agent-harness.domain.md", "slug: instructions\ndomain-parent-slug: global", 20)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 15)
  at.document("pages/role/reviewer.role.md", "domain-parent-slug: instructions", 25)
}

function plantModePages(): void {
  plantSeatPages()
  at.document(INTERACTIVE_AT, "slug: seat-mode-interactive\ndomain-parent-slug: seat-mode", 16)
  at.document(HEADLESS_AT, "slug: seat-mode-headless\ndomain-parent-slug: seat-mode", 16)
  at.document(
    "pages/page-property-definition/seat-mode.page-property-definition.md",
    "slug: seat-mode\ndomain-parent-slug: seat-charter\nrequired-reading-slugs:\n  - agent-mode",
    10
  )
  at.document("pages/domain/seat-charter.domain.md", "slug: seat-charter\ndomain-parent-slug: seat-declaration", 10)
  at.document("pages/domain/seat-declaration.domain.md", "slug: seat-declaration\ndomain-parent-slug: seat", 10)
  at.document("pages/page-type/seat.page-type.md", "slug: seat\ndomain-parent-slug: agent", 10)
  at.document("pages/domain/agent-mode.domain.md", "slug: agent-mode\ndomain-parent-slug: agent-property", 10)
  at.document("pages/domain/agent-property.domain.md", "slug: agent-property\ndomain-parent-slug: agent", 10)
  at.document("pages/page-type/agent.page-type.md", "slug: agent\ndomain-parent-slug: instructions", 10)
}

function stateModeSeat(mode: Mode): void {
  plantSeat(at, { agent: AGENT, persona: "aria", domain: "instructions", role: "reviewer", mode })
}

function run(agent: string = AGENT): Standing {
  return seatStanding({ agent, root: at.root })
}

function said(standing: Standing): string {
  return standing.refusals.join("\n")
}

function readWhatIsStated(): void {
  for (const relPath of STATED) at.readIt(AGENT, relPath)
}

describe("the domain for the mode a seat is in", () => {
  test("is required reading, claimed by the mode rather than by an attribute", () => {
    plantModePages()
    at.installRecorder()
    stateModeSeat("interactive")
    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain(INTERACTIVE_AT)
    expect(said(standing)).toContain("mode `interactive`")
  })

  test("is the headless one, and not the interactive one, where no terminal is attached", () => {
    plantModePages()
    at.installRecorder()
    stateModeSeat("headless")
    const standing = run()
    expect(said(standing)).toContain(HEADLESS_AT)
    expect(said(standing)).not.toContain(INTERACTIVE_AT)
  })

  test("holds the seat until it is read, and clears once it is", () => {
    plantModePages()
    stateModeSeat("interactive")
    readWhatIsStated()
    for (const relPath of ABOVE_THE_MODE) at.readIt(AGENT, relPath)
    expect(run().kind).toBe("missing")
    at.readIt(AGENT, INTERACTIVE_AT)
    expect(run().kind).toBe("read")
  })

  test("brings every domain above it, the way declared reading does for any declaration", () => {
    plantModePages()
    at.installRecorder()
    stateModeSeat("interactive")
    const standing = run()
    for (const above of ABOVE_THE_MODE) expect(said(standing)).toContain(above)
  })

  test("stops above what it names, because required reading follows names and never parents", () => {
    plantModePages()
    at.installRecorder()
    stateModeSeat("interactive")
    const standing = run()
    for (const above of ABOVE_WHAT_THE_MODE_NAMES) expect(said(standing)).not.toContain(above)
  })

  test("leaves the seat working rather than trapped where no document declares it", () => {
    plantSeatPages()
    stateModeSeat("interactive")
    readWhatIsStated()
    expect(run().kind).toBe("read")
  })

  test("reaches no subagent, one working inside its seat's turn holding no terminal", () => {
    plantModePages()
    at.installRecorder()
    stateModeSeat("interactive")
    expect(said(run(`${AGENT}--sub1`))).not.toContain(INTERACTIVE_AT)
    expect(said(run())).toContain(INTERACTIVE_AT)
  })
})
