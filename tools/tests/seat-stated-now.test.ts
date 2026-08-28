import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import type { Attributes } from "../lib/attributes.ts"
import { type Said, statedNow } from "../lib/seat-stated.ts"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff0000"

const SEAT = "amy"

const held: Attributes = {
  persona: { slug: "amy" },
  domain: { slug: "seat" },
  role: { slug: "definer" },
}

function said(over: Partial<Said> = {}): Said {
  return {
    clear: [],
    errand: null,
    flex: null,
    initiative: null,
    mode: null,
    onCall: false,
    principal: null,
    registration: null,
    task: null,
    ...over,
  }
}

let at: Fixture

beforeAll(() => {
  at = fixture()
  at.put(
    "pages/initiative/seat-identity.initiative.md",
    "---\nslug: seat-identity\n---\n\n# Definition\n\n- **Seat identity** — what a seat is.\n"
  )
  at.put(
    `agent/seat/${SEAT}.seat.md`,
    [
      "---",
      "page-type-slug: seat",
      `id: ${AGENT}`,
      `title: "${SEAT}"`,
      "persona-slug: amy",
      "domain-slug: seat",
      "role-slug: definer",
      "person-slug: alan",
      "start-mode: interactive",
      "on-call: true",
      "initiative-slug: seat-identity",
      "registration-account: aawalton",
      "---",
      "",
    ].join("\n")
  )
})

afterAll(() => {
  at.dispose()
})

describe("what a seat states now, against what its page already holds", () => {
  test("a value said now wins over the page, so a restatement is never frozen out", () => {
    const now = statedNow(AGENT, held, said({ initiative: "seat-naming", mode: "headless", principal: "agent" }))

    expect(now.initiative?.value).toBe("seat-naming")
    expect(now.recordedMode?.value).toBe("headless")
    expect(now.mode).toBe("headless")
    expect(now.principal?.value).toBe("agent")
  })

  test("a value said nothing about stands at what the page holds", () => {
    const now = statedNow(AGENT, held, said())

    expect(now.recordedMode?.value).toBe("interactive")
    expect(now.principal?.value).toBe("alan")
    expect(now.onCall).toBe(true)
    expect(now.initiative?.value).toBe("seat-identity")
  })

  test("the account stands at what the page holds, and a said one replaces it", () => {
    expect(statedNow(AGENT, held, said()).registration?.value).toBe("aawalton")
    expect(statedNow(AGENT, held, said({ registration: "bwalton" })).registration?.value).toBe(
      "bwalton"
    )
  })

  test("a cleared key drops what the page holds rather than letting it stand", () => {
    const now = statedNow(AGENT, held, said({ clear: ["initiative", "on-call", "flex"] }))

    expect(now.initiative).toBe(null)
    expect(now.onCall).toBe(false)
    expect(now.flex).toBe(null)
  })

  test("an on-call assignment taken now stands even where the same call clears it", () => {
    expect(statedNow(AGENT, held, said({ clear: ["on-call"], onCall: true })).onCall).toBe(true)
  })

  test("the attributes it is handed are the ones it carries, whatever the page says", () => {
    const now = statedNow(AGENT, { ...held, role: { slug: "reviewer" } }, said())

    expect(now.attributes.role?.slug).toBe("reviewer")
    expect(now.agent).toBe(AGENT)
  })
})
