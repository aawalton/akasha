
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { appendFileSync } from "node:fs"
import { type Decision, clearsTheHold, judge, permitted } from "../hooks/hold-seat.ts"
import type { Attribute, Attributes } from "../lib/attributes.ts"
import { type Fixture, fixture } from "./fixture.ts"
import { plantSeat } from "./seat-fixture.ts"

const AGENT = "agent-one"
const DOCUMENT = "pages/persona/aria.persona.md"

let at: Fixture

function stateSeat(agent: string, held: Attributes, task: string | null = null): void {
  plantSeat(at, {
    agent,
    ...(held.persona === undefined ? {} : { persona: held.persona.slug }),
    ...(held.domain === undefined ? {} : { domain: held.domain.slug }),
    ...(held.role === undefined ? {} : { role: held.role.slug }),
    ...(task === null ? {} : { task }),
  })
}
let priorAgent: string | undefined

beforeEach(() => {
  // `fixture()` NAMES ITS OWN ROOT through `AKASHA_ROOT`. This set `INSTRUCTIONS_ROOT` beside it,
  // which nothing reads, so the hold was judged against the live checkout rather than `at.root`.
  at = fixture()
  priorAgent = process.env.AGENT_ID
  process.env.AGENT_ID = AGENT
  at.document(DOCUMENT, "name: aria\ndomain-parent-slug: global", 30)
  at.installRecorder()
  stateSeat(AGENT, { persona: { slug: "aria" } as Attribute })
})

afterEach(() => {
  if (priorAgent === undefined) delete process.env.AGENT_ID
  else process.env.AGENT_ID = priorAgent
  at.dispose()
})

function decide(tool = "Write"): Decision {
  return judge({ tool_name: tool, session_id: AGENT })
}

function refusal(): string {
  const decision = decide()
  expect(decision).not.toBeNull()
  expect(decision).toHaveProperty("deny")
  return (decision as { readonly deny: string }).deny
}

function moveIt(): void {
  appendFileSync(`${at.root}/${DOCUMENT}`, "body line added\n")
}

describe("a document that moved after it was read", () => {
  test("stops the next act, where it once cost only a command", () => {
    at.readIt(AGENT, DOCUMENT)
    expect(decide()).toBeNull()
    moveIt()
    expect(refusal()).toContain("CHANGED SINCE YOU READ IT")
  })

  test("is stopped in its own words rather than as a document never read", () => {
    at.readIt(AGENT, DOCUMENT)
    moveIt()
    const said = refusal()
    expect(said).toContain("moved after you")
    expect(said).not.toContain("NOT YET READ")
  })

  test("is not promised a difference that nothing sends any more", () => {
    at.readIt(AGENT, DOCUMENT)
    moveIt()
    expect(refusal()).toContain("Nothing was sent to you when they landed")
  })
})

describe("the way out of it", () => {
  test("names the one read that clears it, the shell being refused for everything else", () => {
    at.readIt(AGENT, DOCUMENT)
    moveIt()
    expect(refusal()).toContain("ops read --seat")
    expect(permitted("Bash")).toBe(false)
    expect(clearsTheHold("Bash", "ops read --seat")).toBe(true)
    expect(clearsTheHold("Bash", "rm -rf /var/tmp/anything")).toBe(false)
  })

  test("permits that read alone, so nothing rides in beside it", () => {
    expect(clearsTheHold("Bash", "ops read --seat && rm -rf /var/tmp/x")).toBe(false)
    expect(clearsTheHold("Bash", "ops read --seat; rm -rf /var/tmp/x")).toBe(false)
    expect(clearsTheHold("Bash", "rm -rf /var/tmp/x # ops read --seat")).toBe(false)
    expect(clearsTheHold("Bash", "ops read --seat | tee /var/tmp/x")).toBe(false)
    expect(clearsTheHold("Write", "ops read --seat")).toBe(false)
  })

  test("admits a leading `cd` and nothing riding in after it", () => {
    expect(clearsTheHold("Bash", "cd ~/repos/akasha && ops read --file-path x")).toBe(true)
    expect(clearsTheHold("Bash", "cd ~/repos/akasha && ops search needle")).toBe(true)
    expect(clearsTheHold("Bash", "cd ~/x && ops read --file-path y && rm -rf /var/tmp/x")).toBe(false)
    expect(clearsTheHold("Bash", "cd ~/x && rm -rf /var/tmp/x")).toBe(false)
  })

  test("is `ops read`, the native tool being permitted no longer", () => {
    at.readIt(AGENT, DOCUMENT)
    moveIt()
    expect(refusal()).toContain(`${at.root}/${DOCUMENT}`)
    expect(permitted("Read")).toBe(false)
    expect(clearsTheHold("Bash", "ops read --file-path x")).toBe(true)
  })

  test("clears it: one reading, and the very next act passes", () => {
    at.readIt(AGENT, DOCUMENT)
    moveIt()
    expect(decide()).not.toBeNull()
    at.readIt(AGENT, DOCUMENT)
    expect(decide()).toBeNull()
  })
})

describe("a document never read at all", () => {
  test("still stops the next act, whatever stands beside it", () => {
    expect(refusal()).toContain("NOT YET READ")
  })
})
