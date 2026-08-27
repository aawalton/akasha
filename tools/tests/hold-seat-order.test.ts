
import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { seatStanding, refuses, type Standing } from "../lib/hold-seat.ts"
import type { Attribute, Attributes } from "../lib/attributes.ts"
import { type Fixture, fixture } from "./fixture.ts"
import { plantSeat } from "./seat-fixture.ts"

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

beforeEach(() => {
  at = fixture()
})

afterEach(() => {
  at.dispose()
})

const AGENT = "agent-one"

function plantPages(): void {
  at.document("pages/persona/aria.persona.md", "name: aria\ndomain-parent-slug: instructions", 30)
  at.document("pages/domain/agent-harness.domain.md", "slug: instructions\ndomain-parent-slug: global", 20)
  at.document("pages/domain/global.domain.md", "slug: global\ndomain-parent-slug: global", 15)
  at.document("pages/role/reviewer.role.md", "domain-parent-slug: global", 9)
  at.installRecorder()
}

function attribute(slug: string): Attribute {
  return { slug }
}

function twoSlots(): void {
  stateSeat(AGENT, {
    persona: attribute("aria"),
    role: attribute("reviewer"),
  })
}

function run(): Standing {
  return seatStanding({ agent: AGENT, root: at.root })
}

function order(): readonly string[] {
  return run()
    .refusals.filter((line) => line.includes("NOT YET READ"))
    .map((line) => (line.match(/`([^`]+\.md)`/)?.[1] as string) ?? "")
}

describe("the order the refusal recommends", () => {
  test("most required first, so nothing defines a term after it has been read used", () => {
    plantPages()
    twoSlots()
    expect(order()).toEqual([
      "pages/domain/global.domain.md",
      "pages/domain/agent-harness.domain.md",
      "pages/persona/aria.persona.md",
      "pages/role/reviewer.role.md",
    ])
  })

  test("reading them in another order still holds them, because the order is a recommendation", () => {
    plantPages()
    twoSlots()
    for (const relPath of [
      "pages/role/reviewer.role.md",
      "pages/persona/aria.persona.md",
      "pages/domain/global.domain.md",
      "pages/domain/agent-harness.domain.md",
    ]) {
      at.readIt(AGENT, relPath)
    }
    expect(run().kind).toBe("read")
    expect(refuses(run())).toBe(false)
  })
})
