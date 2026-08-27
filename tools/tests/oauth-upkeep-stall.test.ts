import { describe, expect, test } from "bun:test"
import {
  type AccountReading,
  EXPIRY_FLOOR_MS,
  judgeAccount,
  stallAcross,
  stallLines,
  USAGE_CEILING_MS,
} from "../lib/oauth-upkeep-stall.ts"

const EXPIRES_KEY = "access-token-expires-at"
const NOW = Date.UTC(2026, 7, 18, 20, 0, 0)
const HOUR = 60 * 60 * 1000

function at(ms: number): string {
  return new Date(ms).toISOString()
}

function held(over: Record<string, unknown> = {}): AccountReading {
  return {
    account: "one",
    held: {
      [EXPIRES_KEY]: at(NOW + EXPIRY_FLOOR_MS + HOUR),
      "usage-read-at": at(NOW - HOUR),
      ...over,
    },
    why: null,
  }
}

describe("judgeAccount — a page upkeep is keeping current", () => {
  test("token life over the floor and a usage reading inside the ceiling reads current", () => {
    expect(judgeAccount(held(), NOW, EXPIRES_KEY).verdict).toBe("current")
  })

  test("upkeep having just renewed reads current at the top of a token's life", () => {
    expect(judgeAccount(held({ [EXPIRES_KEY]: at(NOW + 8 * HOUR) }), NOW, EXPIRES_KEY).verdict).toBe(
      "current"
    )
  })
})

describe("judgeAccount — the cases this exists to catch", () => {
  test("a token already expired reads expired", () => {
    const entry = judgeAccount(held({ [EXPIRES_KEY]: at(NOW - HOUR) }), NOW, EXPIRES_KEY)
    expect(entry.verdict).toBe("expired")
    expect(entry.detail).toContain("the only thing that renews one")
  })

  test("token life under the floor reads expiry-behind, one second inside it", () => {
    const entry = judgeAccount(
      held({ [EXPIRES_KEY]: at(NOW + EXPIRY_FLOOR_MS - 1000) }),
      NOW,
      EXPIRES_KEY
    )
    expect(entry.verdict).toBe("expiry-behind")
  })

  test("token life exactly at the floor is not yet behind", () => {
    expect(
      judgeAccount(held({ [EXPIRES_KEY]: at(NOW + EXPIRY_FLOOR_MS) }), NOW, EXPIRES_KEY).verdict
    ).toBe("current")
  })

  test("a usage reading past the ceiling reads usage-behind, naming the frozen eligibility", () => {
    const entry = judgeAccount(
      held({ "usage-read-at": at(NOW - USAGE_CEILING_MS - 1000) }),
      NOW,
      EXPIRES_KEY
    )
    expect(entry.verdict).toBe("usage-behind")
    expect(entry.detail).toContain("eligibility is frozen")
  })

  test("a usage reading exactly at the ceiling is not yet behind", () => {
    expect(
      judgeAccount(held({ "usage-read-at": at(NOW - USAGE_CEILING_MS) }), NOW, EXPIRES_KEY).verdict
    ).toBe("current")
  })

  test("an expired token outranks a stale usage reading, so the worse fault is what is reported", () => {
    expect(
      judgeAccount(
        held({ [EXPIRES_KEY]: at(NOW - HOUR), "usage-read-at": at(NOW - 99 * HOUR) }),
        NOW,
        EXPIRES_KEY
      ).verdict
    ).toBe("expired")
  })

  test("a page holding neither stamp reads never-reached rather than clean", () => {
    expect(judgeAccount({ account: "one", held: {}, why: null }, NOW, EXPIRES_KEY).verdict).toBe(
      "never-reached"
    )
  })

  test("a page holding a usage reading but no expiry reads expiry-behind", () => {
    const bare: AccountReading = {
      account: "one",
      held: { "usage-read-at": at(NOW - HOUR) },
      why: null,
    }
    expect(judgeAccount(bare, NOW, EXPIRES_KEY).verdict).toBe("expiry-behind")
  })
})

describe("judgeAccount — a page it could not look at", () => {
  test("a stated reason reads unread and carries that reason through", () => {
    const entry = judgeAccount(
      { account: "one", held: null, why: "no uncommitted file stands beside it" },
      NOW,
      EXPIRES_KEY
    )
    expect(entry.verdict).toBe("unread")
    expect(entry.detail).toBe("no uncommitted file stands beside it")
  })

  test("a stamp that is not a timestamp reads unread rather than being taken as absent", () => {
    const entry = judgeAccount(held({ [EXPIRES_KEY]: "soon" }), NOW, EXPIRES_KEY)
    expect(entry.verdict).toBe("unread")
    expect(entry.detail).toContain("not a timestamp")
  })

  test("a stamp held as a number reads unread rather than being parsed", () => {
    expect(judgeAccount(held({ "usage-read-at": 1755 }), NOW, EXPIRES_KEY).verdict).toBe("unread")
  })
})

describe("stallAcross — what the population comes to", () => {
  test("no pages at all is a population of zero, not a clean run", () => {
    const stall = stallAcross([], NOW, EXPIRES_KEY)
    expect(stall.pages).toBe(0)
    expect(stall.judged).toBe(0)
    expect(stall.current).toBe(0)
  })

  test("a page it could not look at is counted out of what was judged", () => {
    const stall = stallAcross(
      [held(), { account: "two", held: null, why: "unreadable" }],
      NOW,
      EXPIRES_KEY
    )
    expect(stall.pages).toBe(2)
    expect(stall.judged).toBe(1)
    expect(stall.unread).toEqual(["two"])
    expect(stall.stalled).toEqual([])
  })

  test("every kind of behind lands in stalled, and unread never does", () => {
    const stall = stallAcross(
      [
        held(),
        { ...held({ [EXPIRES_KEY]: at(NOW - HOUR) }), account: "expired" },
        { ...held({ "usage-read-at": at(NOW - 99 * HOUR) }), account: "frozen" },
        { account: "blank", held: {}, why: null },
        { account: "dark", held: null, why: "unreadable" },
      ],
      NOW,
      EXPIRES_KEY
    )
    expect(stall.stalled).toEqual(["expired", "frozen", "blank"])
    expect(stall.unread).toEqual(["dark"])
    expect(stall.current).toBe(1)
  })

  test("the closing line states the population rather than the failures alone", () => {
    const lines = stallLines(stallAcross([held()], NOW, EXPIRES_KEY))
    expect(lines.at(-1)).toContain("1 of 1 account page(s) current")
  })
})
