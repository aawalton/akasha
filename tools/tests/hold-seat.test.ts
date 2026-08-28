
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { appendFileSync, rmSync } from "node:fs"
import { listDocuments } from "../lib/check.ts"
import { duringOneCall } from "../../during-call/during-call.ts"
import { recordEpoch } from "../lib/epoch.ts"
import { seatStanding, refuses, type Standing, stoodAside } from "../lib/hold-seat.ts"
import type { Attribute, Attributes } from "../lib/attributes.ts"
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

function stateSeat(agent: string, held: Attributes, task: string | null = null): void {
  plantSeat(at, {
    agent,
    ...(held.persona === undefined ? {} : { persona: held.persona.slug }),
    ...(held.domain === undefined ? {} : { domain: held.domain.slug }),
    ...(held.role === undefined ? {} : { role: held.role.slug }),
    ...(task === null ? {} : { task }),
  })
}

function plantSeatPages(): void {
  at.document("pages/persona/aria.persona.md", "name: aria\ndomain-parent-slug: instructions", 30)
  at.document("pages/domain/agent-harness.domain.md", "slug: instructions\ndomain-parent-slug: global", 20)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 15)
  at.document("pages/role/reviewer.role.md", "domain-parent-slug: instructions", 25)
  at.document("pages/task/rebuild.task.md", "domain-parent-slug: instructions", 18)
}

function attribute(slug: string): Attribute {
  return { slug }
}

function wholeSeat(): Attributes {
  return {
    persona: attribute("aria"),
    domain: attribute("instructions"),
    role: attribute("reviewer"),
  }
}

function run(agent: string | null = AGENT): Standing {
  return seatStanding({ agent, root: at.root })
}

function said(standing: Standing): string {
  return standing.refusals.join("\n")
}

function noticed(standing: Standing): string {
  return standing.notices.join("\n")
}

function readEverything(agent: string = AGENT): void {
  for (const relPath of [
    "pages/persona/aria.persona.md",
    "pages/role/reviewer.role.md",
    "pages/task/rebuild.task.md",
    "pages/domain/agent-harness.domain.md",
    "pages/domain/global.domain.md",
  ]) {
    at.readIt(agent, relPath)
  }
}

describe("what arms it", () => {
  test("a fresh seat that has stated nothing is refused nothing", () => {
    plantSeatPages()
    at.installRecorder()
    const standing = run()
    expect(standing.kind).toBe("unstated")
    expect(refuses(standing)).toBe(false)
  })

  test("a workstation where nothing has ever been stated is refused nothing", () => {
    plantSeatPages()
    at.installRecorder()
    expect(run().kind).toBe("unstated")
    expect(run().refusals).toHaveLength(0)
  })

  test("stating an attribute arms it, and the very next act is refused", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(refuses(standing)).toBe(true)
  })

  test("stated and having read everything passes", () => {
    plantSeatPages()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    readEverything()
    const standing = run()
    expect(standing.kind).toBe("read")
    expect(refuses(standing)).toBe(false)
  })
})

describe("compaction", () => {
  test("after a compaction what the seat states stands and the reads do not, so it refuses", () => {
    plantSeatPages()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    readEverything()
    expect(run().kind).toBe("read")

    recordEpoch(AGENT, "compact")

    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain("You are persona")
    expect(said(standing)).toContain("persona `aria`")
    expect(said(standing)).toContain("NOT YET READ")
  })

  test("the refusal names why the reads are gone", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    recordEpoch(AGENT, "compact")
    expect(said(run())).toContain("(`compact`)")
  })

  test.each(["resume", "clear", "fork", "somethingNew"])("%s reads as a replaced context too", (source) => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    recordEpoch(AGENT, source)
    expect(said(run())).toContain(`(\`${source}\`)`)
  })

  test("a fresh startup adds no such clause, because nothing was replaced", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    recordEpoch(AGENT, "startup")
    expect(said(run())).not.toContain("(`startup`)")
  })

  test("re-reading everything clears it", () => {
    plantSeatPages()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    readEverything()
    recordEpoch(AGENT, "compact")
    expect(run().kind).toBe("missing")
    readEverything()
    expect(run().kind).toBe("read")
  })
})

describe("partial readings", () => {
  test("re-reading some of it still refuses, and names only what is missing", () => {
    plantSeatPages()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    at.readIt(AGENT, "pages/persona/aria.persona.md")
    at.readIt(AGENT, "pages/domain/agent-harness.domain.md")
    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain("pages/role/reviewer.role.md")
    expect(said(standing)).toContain("pages/task/rebuild.task.md")
    expect(said(standing)).not.toContain("pages/persona/aria.persona.md")
    expect(said(standing)).not.toContain("pages/domain/agent-harness.domain.md")
  })

  test("a document several attributes reach is named once, not once per attribute", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    const lines = said(run()).split("\n").filter((line) => line.includes("pages/domain/global.domain.md"))
    expect(lines).toHaveLength(1)
    expect(lines[0]).toContain("domain `instructions`")
    expect(lines[0]).toContain("and task `rebuild`")
  })

  test("a document that moved under the agent is carried apart from one never read", () => {
    plantSeatPages()
    stateSeat(AGENT, { persona: attribute("aria") })
    at.readIt(AGENT, "pages/persona/aria.persona.md")
    at.readIt(AGENT, "pages/domain/agent-harness.domain.md")
    at.readIt(AGENT, "pages/domain/global.domain.md")
    expect(run().kind).toBe("read")
    appendFileSync(`${at.root}/pages/persona/aria.persona.md`, "body line added\n")
    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(noticed(standing)).toContain("CHANGED SINCE YOU READ IT")
    expect(said(standing)).toBe("")
    expect(refuses(standing)).toBe(false)
  })

  test("a document never read and one that moved are partitioned rather than merged", () => {
    plantSeatPages()
    stateSeat(AGENT, {
      persona: attribute("aria"),
      role: attribute("reviewer"),
    })
    at.readIt(AGENT, "pages/persona/aria.persona.md")
    appendFileSync(`${at.root}/pages/persona/aria.persona.md`, "body line added\n")
    const standing = run()
    expect(said(standing)).toContain("pages/role/reviewer.role.md")
    expect(said(standing)).not.toContain("pages/persona/aria.persona.md")
    expect(noticed(standing)).toContain("pages/persona/aria.persona.md")
    expect(noticed(standing)).not.toContain("pages/role/reviewer.role.md")
    expect(refuses(standing)).toBe(true)
  })

  test("an agent with no persona is judged on the slots it does have", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, { role: attribute("reviewer") }, "rebuild")
    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain("role `reviewer`")
    expect(said(standing)).not.toContain("persona")
    at.readIt(AGENT, "pages/role/reviewer.role.md")
    at.readIt(AGENT, "pages/task/rebuild.task.md")
    at.readIt(AGENT, "pages/domain/agent-harness.domain.md")
    at.readIt(AGENT, "pages/domain/global.domain.md")
    expect(run().kind).toBe("read")
  })
})

describe("where no act by the agent would satisfy it", () => {
  test("an unidentifiable agent is permitted, against required reading's answer for the same state", () => {
    plantSeatPages()
    at.installRecorder()
    const standing = run(null)
    expect(standing.kind).toBe("unattributed")
    expect(refuses(standing)).toBe(false)
    expect(stoodAside(standing)).toBe(true)
    expect(standing.detail).toContain("THIS GUARANTEE IS ABSENT")
  })

  test("a stated document that is gone never refuses, because reading cannot restore it", () => {
    plantSeatPages()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    readEverything()
    rmSync(`${at.root}/pages/role/reviewer.role.md`, { force: true })
    const standing = run()
    expect(standing.kind).toBe("unresolvable")
    expect(refuses(standing)).toBe(false)
    expect(standing.detail).toContain("no longer there")
    expect(standing.detail).toContain("no document stands for the role \`reviewer\`")
  })
})

describe("a subagent", () => {
  test("with no attributes of its own is judged against its seat's", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    at.installRecorder(`${AGENT}--sub1`)
    const standing = run(`${AGENT}--sub1`)
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain("persona `aria`")
  })

  test("its own reads satisfy its seat's attributes, a subagent stating none of its own", () => {
    plantSeatPages()
    stateSeat(AGENT, { persona: attribute("aria") })
    at.readIt(`${AGENT}--sub1`, "pages/persona/aria.persona.md")
    at.readIt(`${AGENT}--sub1`, "pages/domain/agent-harness.domain.md")
    at.readIt(`${AGENT}--sub1`, "pages/domain/global.domain.md")
    expect(run(`${AGENT}--sub1`).kind).toBe("read")
  })
})

function readMemory(agent: string, relPath: string): void {
  at.plantReading(agent, `${at.memory}/${relPath}`)
}

const INITIATIVE_AT = "pages/initiative/athena-consistent-seats.initiative.md"

function plantInitiativePages(): void {
  plantSeatPages()
  at.document("pages/page-type/initiative.page-type.md", "slug: initiative\ndomain-parent-slug: global", 12)
  at.memoryDocument(INITIATIVE_AT, "page-type-slug: initiative\nslug: consistent-seats", 14)
}

function stateInitiativeSeat(): void {
  plantSeat(at, {
    agent: AGENT,
    persona: "aria",
    domain: "instructions",
    role: "reviewer",
    initiative: "consistent-seats",
  })
}

describe("an initiative the seat carries", () => {
  test("its own document is required reading, named where it actually stands", () => {
    plantInitiativePages()
    at.installRecorder()
    stateInitiativeSeat()
    const standing = run()
    expect(standing.kind).toBe("missing")
    expect(said(standing)).toContain(`${at.memory}/${INITIATIVE_AT}`)
    expect(said(standing)).toContain("initiative `consistent-seats`")
  })

  test("the page type the initiative states comes with it", () => {
    plantInitiativePages()
    at.installRecorder()
    stateInitiativeSeat()
    expect(said(run())).toContain("pages/page-type/initiative.page-type.md")
  })

  test("reading every one of them, the memory document included, clears it", () => {
    plantInitiativePages()
    stateInitiativeSeat()
    readEverything()
    at.readIt(AGENT, "pages/page-type/initiative.page-type.md")
    readMemory(AGENT, INITIATIVE_AT)
    expect(run().kind).toBe("read")
  })

  test("an initiative deleted since it was stated leaves the seat working rather than trapped", () => {
    plantInitiativePages()
    stateInitiativeSeat()
    rmSync(`${at.memory}/${INITIATIVE_AT}`, { force: true })
    readEverything()
    expect(run().kind).toBe("read")
  })
})

const MORTAL_TASK_AT = "pages/task/wind-down.md"

function plantTaskPages(mortal: boolean): void {
  plantSeatPages()
  at.document(
    "pages/page-type/task.page-type.md",
    `slug: task\nfiles: instructions:pages/task/**/*.md${mortal ? "\nmortal: true" : ""}`,
    12
  )
  at.document(MORTAL_TASK_AT, "slug: wind-down\ndomain-parent-slug: global", 18)
  stateSeat(AGENT, wholeSeat(), "wind-down")
  readEverything()
  at.readIt(AGENT, MORTAL_TASK_AT)
}

function standingOnceItGoes(): Standing {
  return duringOneCall(() => {
    listDocuments(at.root)
    rmSync(`${at.root}/${MORTAL_TASK_AT}`, { force: true })
    return run()
  })
}

describe("a required document the tree no longer holds", () => {
  test("a mortal page that is gone is no longer required reading", () => {
    plantTaskPages(true)
    const standing = standingOnceItGoes()
    expect(standing.kind).toBe("read")
    expect(refuses(standing)).toBe(false)
    expect(standing.detail).toContain("over 4 document(s)")
    expect(standing.detail).not.toContain(MORTAL_TASK_AT)
  })

  test("a page that is gone and is not mortal leaves the guarantee out of reach", () => {
    plantTaskPages(false)
    const standing = standingOnceItGoes()
    expect(standing.kind).toBe("unresolvable")
    expect(stoodAside(standing)).toBe(true)
    expect(standing.detail).toContain("no longer there")
    expect(standing.detail).toContain(MORTAL_TASK_AT)
  })
})

describe("the recovery walk", () => {
  test("a fresh agent can always state, because nothing refuses it before it has", () => {
    plantSeatPages()
    at.installRecorder()
    expect(refuses(run())).toBe(false)
  })

  test("an agent whose attribute has rotted is never trapped by it", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    rmSync(`${at.root}/pages/persona/aria.persona.md`, { force: true })
    expect(refuses(run())).toBe(false)
    expect(stoodAside(run())).toBe(true)
  })

  test("an agent no page carries a record for is refused, and reading cannot mend it", () => {
    plantSeatPages()
    at.installRecorder()
    stateSeat(AGENT, wholeSeat(), "rebuild")
    const standing = run(`${AGENT}--sub2`)
    expect(standing.kind).toBe("unrecorded")
    expect(refuses(standing)).toBe(true)
    expect(stoodAside(standing)).toBe(false)
    expect(standing.refusals.join("\n")).toContain("no page carries that record")
  })
})
