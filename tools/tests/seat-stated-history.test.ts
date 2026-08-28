
import { describe, expect, test } from "bun:test"
import type { StatedFromHistory } from "../lib/seat-page-history.ts"
import { type Stated, mergeHeld, pageWouldCompose } from "../lib/seat-stated.ts"

const AGENT = "01a0004d-0dd4-7a23-94c1-fea622cd277a"

const BARE: Stated = {
  agent: AGENT,
  attributes: {},
  flex: null,
  mode: "headless",
  recordedMode: null,
  principal: null,
  onCall: false,
  task: null,
  initiative: null,
  errand: null,
  registration: null,
  session: null,
  rotated: null,
  transcript: null,
}

const HELD: StatedFromHistory = {
  commit: "0123456789abcdef0123456789abcdef01234567",
  set: { persona: "thea", domain: "code-quality", role: "developer" },
  principal: "alan",
  onCall: true,
  initiative: "consistent-seats",
}

describe("what a page needs before it can be composed", () => {
  test("a seat stating nothing composes no page, which is why the fallback exists", () => {
    expect(pageWouldCompose(BARE)).toBe(false)
  })

  test("a domain and a role without a principal is still not enough", () => {
    const half: Stated = {
      ...BARE,
      attributes: { domain: { slug: "code-quality" }, role: { slug: "developer" } },
    }
    expect(pageWouldCompose(half)).toBe(false)
  })

  test("a domain, a role and a principal together are the whole of it", () => {
    const whole: Stated = {
      ...BARE,
      attributes: { domain: { slug: "code-quality" }, role: { slug: "developer" } },
      principal: { value: "alan" },
    }
    expect(pageWouldCompose(whole)).toBe(true)
  })
})

describe("what the seat's own history supplies to a seat that states nothing", () => {
  test("every slot the last page held, so the body composes again", () => {
    const merged = mergeHeld(BARE, HELD)
    expect(merged.attributes.persona?.slug).toBe("thea")
    expect(merged.attributes.domain?.slug).toBe("code-quality")
    expect(merged.attributes.role?.slug).toBe("developer")
    expect(merged.principal?.value).toBe("alan")
    expect(pageWouldCompose(merged)).toBe(true)
  })

  test("the assignments the last page held come back with the attributes", () => {
    const merged = mergeHeld(BARE, HELD)
    expect(merged.onCall).toBe(true)
    expect(merged.initiative?.value).toBe("consistent-seats")
  })

  test("what the seat states now wins, history filling only what is absent", () => {
    const standing: Stated = {
      ...BARE,
      attributes: { domain: { slug: "seat" } },
      principal: { value: "sophia" },
      initiative: { value: "consistent-seats-again" },
    }
    const merged = mergeHeld(standing, HELD)
    expect(merged.attributes.domain?.slug).toBe("seat")
    expect(merged.principal?.value).toBe("sophia")
    expect(merged.initiative?.value).toBe("consistent-seats-again")
    expect(merged.attributes.role?.slug).toBe("developer")
  })

  test("no history leaves the seat exactly as it stands, rather than half-filled", () => {
    expect(mergeHeld(BARE, null)).toEqual(BARE)
  })

  test("the agent is never taken from history, a page belonging to the seat reading it", () => {
    expect(mergeHeld(BARE, HELD).agent).toBe(AGENT)
  })
})
