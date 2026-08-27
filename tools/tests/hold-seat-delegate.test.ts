
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { appendFileSync } from "node:fs"
import { type Decision, judge } from "../hooks/hold-seat.ts"
import type { Attribute, Attributes } from "../lib/attributes.ts"
import { type Fixture, fixture } from "./fixture.ts"
import { plantSeat } from "./seat-fixture.ts"

const SEAT = "agent-one"
const WITHIN = "sub1"
const DELEGATE = `${SEAT}--${WITHIN}`
const PERSONA = "pages/persona/aria.persona.md"
const ROLE = "pages/role/reviewer.role.md"

function stateSeat(agent: string, held: Attributes, task: string | null = null): void {
  plantSeat(at, {
    agent,
    ...(held.persona === undefined ? {} : { persona: held.persona.slug }),
    ...(held.domain === undefined ? {} : { domain: held.domain.slug }),
    ...(held.role === undefined ? {} : { role: held.role.slug }),
    ...(task === null ? {} : { task }),
  })
}

let at: Fixture
let priorAgent: string | undefined
let priorRoot: string | undefined

function stated(slug: string): Attribute {
  return { slug }
}

beforeEach(() => {
  at = fixture()
  priorAgent = process.env.AGENT_ID
  priorRoot = process.env.INSTRUCTIONS_ROOT
  process.env.AGENT_ID = SEAT
  process.env.INSTRUCTIONS_ROOT = at.root
  at.document(PERSONA, "name: aria\ndomain-parent-slug: global", 30)
  at.document(ROLE, "domain-parent-slug: global", 25)
  at.installRecorder()
  at.installRecorder(DELEGATE)
  stateSeat(SEAT, { persona: stated("aria") })
})

afterEach(() => {
  if (priorAgent === undefined) delete process.env.AGENT_ID
  else process.env.AGENT_ID = priorAgent
  if (priorRoot === undefined) delete process.env.INSTRUCTIONS_ROOT
  else process.env.INSTRUCTIONS_ROOT = priorRoot
  at.dispose()
})

function seatActs(): Decision {
  return judge({ tool_name: "Write", session_id: SEAT })
}

function delegateActs(): Decision {
  return judge({ tool_name: "Write", session_id: SEAT, agent_id: WITHIN })
}

function denial(decision: Decision): string {
  expect(decision).toHaveProperty("deny")
  return (decision as { readonly deny: string }).deny
}

function moveIt(relPath: string): void {
  appendFileSync(`${at.root}/${relPath}`, "body line added\n")
}

describe("a delegate held by a document that moved under it", () => {
  test("clears itself by reading it, with the dispatching seat doing nothing", () => {
    at.readIt(SEAT, PERSONA)
    moveIt(PERSONA)
    expect(delegateActs()).not.toBeNull()
    at.readIt(DELEGATE, PERSONA)
    expect(delegateActs()).toBeNull()
  })

  test("is told to read what IT has not read, rather than what its seat did", () => {
    at.readIt(SEAT, PERSONA)
    moveIt(PERSONA)
    const said = denial(delegateActs())
    expect(said).toContain("NOT YET READ")
    expect(said).not.toContain("CHANGED SINCE YOU READ IT")
  })

  test("is pointed at the record its own `Read` lands in", () => {
    at.readIt(SEAT, PERSONA)
    moveIt(PERSONA)
    const said = denial(delegateActs())
    expect(said).toContain(at.recordAt(DELEGATE))
    expect(said).not.toContain(at.recordAt(SEAT))
  })

  test("the remedy is `ops read` and the walk out closes in one", () => {
    at.readIt(SEAT, PERSONA)
    moveIt(PERSONA)
    const reading = { command: "ops read --file-path x" }
    expect(
      judge({ tool_name: "Bash", tool_input: reading, session_id: SEAT, agent_id: WITHIN })
    ).toBeNull()
    expect(denial(delegateActs())).toContain(`${at.root}/${PERSONA}`)
    at.readIt(DELEGATE, PERSONA)
    expect(delegateActs()).toBeNull()
  })
})

describe("what a delegate's reading does not reach", () => {
  test("its seat is still held after the delegate has read its way out", () => {
    at.readIt(SEAT, PERSONA)
    moveIt(PERSONA)
    at.readIt(DELEGATE, PERSONA)
    expect(delegateActs()).toBeNull()
    expect(denial(seatActs())).toContain("CHANGED SINCE YOU READ IT")
  })

  test("a seat that has read nothing is not freed by a delegate reading everything", () => {
    at.readIt(DELEGATE, PERSONA)
    expect(denial(seatActs())).toContain("NOT YET READ")
  })
})

describe("a delegate that has read nothing", () => {
  test("is held by a document neither it nor its seat has read", () => {
    expect(denial(delegateActs())).toContain("NOT YET READ")
  })

  test("is held by what only its seat has read, a delegate's readings being its own", () => {
    at.readIt(SEAT, PERSONA)
    expect(denial(delegateActs())).toContain(PERSONA)
  })

  test("is held by the document it has not read and not by the one it has", () => {
    stateSeat(SEAT, { persona: stated("aria"), role: stated("reviewer") })
    at.readIt(DELEGATE, PERSONA)
    const said = denial(delegateActs())
    expect(said).toContain(ROLE)
    expect(said).not.toContain(PERSONA)
  })
})
