import { describe, expect, it } from "bun:test"
import type { PageMark } from "../lib/oauth-page-mark.ts"
import { DISABLED_REASON_KEY } from "../lib/oauth-page-state.ts"
import {
  clearAccountSubscriptionDisabled,
  markAccountSubscriptionDisabled,
  type SubscriptionDisabledEffects,
} from "../lib/oauth-subscription-disabled.ts"

type Call = { account: string; marks: Record<string, string | null> }

function arm(
  answer: (account: string) => PageMark = (account) => ({ kind: "held", account, keys: [] })
): { effects: SubscriptionDisabledEffects; marks: Call[] } {
  const marks: Call[] = []
  const effects: SubscriptionDisabledEffects = {
    holdMark: (account, held) => {
      marks.push({ account, marks: held })
      return answer(account)
    },
  }
  return { effects, marks }
}

describe("markAccountSubscriptionDisabled — what reaches the page", () => {
  it("quotes the reason, so one carrying a colon cannot split into a second key", async () => {
    const { effects, marks } = arm()
    await markAccountSubscriptionDisabled("aine", "denied: no seat", "[t]", effects)
    expect(marks[0]?.marks[DISABLED_REASON_KEY]).toBe('"denied: no seat"')
  })

  it("holds the reason once per call, the page being the only copy", async () => {
    const { effects, marks } = arm()
    await markAccountSubscriptionDisabled("aine", "permission_denied", "[t]", effects)
    expect(marks).toEqual([
      { account: "aine", marks: { [DISABLED_REASON_KEY]: '"permission_denied"' } },
    ])
  })

  it("never throws where the page refused the mark", async () => {
    const { effects, marks } = arm((account) => ({
      kind: "refused",
      account,
      why: "the page opens with no frontmatter block",
    }))
    await expect(
      markAccountSubscriptionDisabled("aine", "permission_denied", "[t]", effects)
    ).resolves.toBeUndefined()
    expect(marks).toHaveLength(1)
  })

  it("never throws where holding the mark threw", async () => {
    const { effects } = arm(() => {
      throw new Error("page unreachable")
    })
    await expect(
      markAccountSubscriptionDisabled("aine", "permission_denied", "[t]", effects)
    ).resolves.toBeUndefined()
  })
})

describe("clearAccountSubscriptionDisabled — what leaves the page", () => {
  it("takes the key off rather than writing an empty one", async () => {
    const { effects, marks } = arm()
    await clearAccountSubscriptionDisabled("aine", "[t]", effects)
    expect(marks).toEqual([{ account: "aine", marks: { [DISABLED_REASON_KEY]: null } }])
  })

  it("never throws where holding the mark threw", async () => {
    const { effects } = arm(() => {
      throw new Error("page unreachable")
    })
    await expect(clearAccountSubscriptionDisabled("aine", "[t]", effects)).resolves.toBeUndefined()
  })
})
