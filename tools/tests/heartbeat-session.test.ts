import { afterAll, beforeAll, describe, expect, test } from "bun:test"
import { statedForPage } from "../seat-page-beat.ts"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff4444"

const ELSEWHERE = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff5555"

const COMPOSED = "11111111-2222-4333-8444-555555555555"

const RUNNING = "99999999-8888-4777-8666-555555555555"

let at: Fixture

beforeAll(() => {
  at = fixture()
  at.put(
    "agent/seat/amy.seat.md",
    [
      "---",
      "page-type-slug: seat",
      `id: ${AGENT}`,
      'title: "amy"',
      "domain-slug: seat",
      "role-slug: definer",
      "person-slug: alan",
      `claude-code-session-uuid: ${COMPOSED}`,
      "---",
      "",
    ].join("\n")
  )
})

afterAll(() => {
  at.dispose()
})

describe("which session the beat composes into a seat's page", () => {
  test("is the one this supervisor is running, so a new session reaches the page", () => {
    expect(statedForPage(AGENT, null, AGENT, RUNNING).session?.value).toBe(RUNNING)
  })

  test("is what stands where this supervisor runs some other agent", () => {
    expect(statedForPage(AGENT, null, ELSEWHERE, RUNNING).session?.value).toBe(COMPOSED)
  })

  test("is what stands where nothing is running, so a beat outside a supervisor composes the same", () => {
    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })

  test("is what stands where the running session is no uuid at all", () => {
    expect(statedForPage(AGENT, null, AGENT, "not-a-uuid").session?.value).toBe(COMPOSED)
  })
})
