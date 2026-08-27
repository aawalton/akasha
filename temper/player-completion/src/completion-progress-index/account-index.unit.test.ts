import { describe, expect, it } from "bun:test"
import type { AccountCompletion } from "@temper/game-completion/completion-types"
import { buildAccountCompletionIndex } from "../completion-progress-index"
import { accountAchievementData } from "../generated/achievement-data.generated"

describe("buildAccountCompletionIndex", () => {
  it("includes account-achievements depth-0 against the full static total with no entries", () => {
    const acctAchTotal = accountAchievementData.reduce(
      (s, c) => s + c.subCategories.reduce((a, sc) => a + sc.achievements.length, 0),
      0
    )
    const account: AccountCompletion = { achievements: {} }
    const idx = buildAccountCompletionIndex(account)
    expect(idx["account-achievements"]).toEqual({ current: 0, total: acctAchTotal })
  })

  it("does not include character-scoped cards in the account index", () => {
    const account: AccountCompletion = { achievements: {} }
    const idx = buildAccountCompletionIndex(account)
    expect(idx["mount-training"]).toBeUndefined()
    expect(idx["daily-writs"]).toBeUndefined()
  })
})
