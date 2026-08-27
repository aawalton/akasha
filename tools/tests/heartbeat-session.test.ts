
import { afterAll, afterEach, beforeAll, describe, expect, test } from "bun:test"
import { statedForPage } from "../lib/supervisor-heartbeat-beat.ts"
import {
  setCurrentAgentIdForSelfHeal,
  setCurrentSessionIdForSelfHeal,
} from "../lib/supervisor-self-heal-state.ts"
import { type Fixture, fixture } from "./fixture.ts"

const AGENT = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff4444"

const ELSEWHERE = "0193aaaa-bbbb-4ccc-8ddd-eeeeffff5555"

const COMPOSED = "11111111-2222-4333-8444-555555555555"

const RUNNING = "99999999-8888-4777-8666-555555555555"

let at: Fixture

// A SEAT PAGE STANDS UNDER `agent/seat` IN THE AKASHA ROOT, and the fixture is the root
// `AKASHA_ROOT` names. This planted `seats/amy.md` under `MEMORY_ROOT`: two things neither of
// which is read any more — the `memory` repository is absorbed into akasha, and seat pages moved
// out of `seats/`. So `statedForPage` searched the live checkout, found no page carrying this
// agent, and answered no session at all wherever it had nothing running to fall back on.
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

afterEach(() => {
  setCurrentAgentIdForSelfHeal(null)
  setCurrentSessionIdForSelfHeal(null)
})

afterAll(() => {
  at.dispose()
})

describe("which session the beat composes into a seat's page", () => {
  test("is the one this supervisor is running, so a new session reaches the page", () => {
    setCurrentAgentIdForSelfHeal(AGENT)
    setCurrentSessionIdForSelfHeal(RUNNING)

    expect(statedForPage(AGENT).session?.value).toBe(RUNNING)
  })

  test("is what stands where this supervisor runs some other agent", () => {
    setCurrentAgentIdForSelfHeal(ELSEWHERE)
    setCurrentSessionIdForSelfHeal(RUNNING)

    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })

  test("is what stands where nothing is running, so a beat outside a supervisor composes the same", () => {
    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })

  test("is what stands where the running session is no uuid at all", () => {
    setCurrentAgentIdForSelfHeal(AGENT)
    setCurrentSessionIdForSelfHeal("not-a-uuid")

    expect(statedForPage(AGENT).session?.value).toBe(COMPOSED)
  })
})
