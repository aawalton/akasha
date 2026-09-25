import { describe, expect, test } from "bun:test"
import { MAX_CHAMPION_POINTS } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { AccountCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { ACCOUNT_COMPLETION_CARD_CHECKERS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-checkers/completion-account-checkers.module.code.ts"
import {
  HELD,
  summaryOf,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-account-checkers/completion-account-checkers.module.test-fixtures.ts"
import type { AccountCheckerInput } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import {
  ACCOUNT_CARDS,
  type AccountCardId,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { NO_COMPLETION_CATALOGS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import { resolveGenericCheckerProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-generic-checker-progress/completion-generic-checker-progress.module.code.ts"
import {
  getItemPickerLevels,
  isAccountCard,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-item-picker/completion-item-picker.module.code.ts"
import { transformSubclassingSkillLineProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-subclassing-progress/completion-subclassing-progress.module.code.ts"

const FIRST_LINE = transformSubclassingSkillLineProgress(null).entries[0]
if (FIRST_LINE === undefined) throw new Error("test fixture: no class skill line")
const FIRST_ESO_ID = skillLines.data[FIRST_LINE.skillLineId].esoSkillLineId

function account(overrides: Partial<AccountCompletion> = {}): AccountCheckerInput {
  return {
    account: { achievements: {}, ...overrides },
    rows: [],
    catalogs: NO_COMPLETION_CATALOGS,
  }
}

describe("account cards", () => {
  test("an account card with no checker is still an account card", () => {
    expect(isAccountCard("antiquity-leads-motifs")).toBe(true)
    expect(isAccountCard("quests")).toBe(false)
    expect(
      resolveGenericCheckerProgress("antiquity-leads-motifs", [], {}, account())
    ).toBeUndefined()
  })
})

const COUNTED_FROM_EVERY_CHARACTER: readonly AccountCardId[] = [
  "account-points-of-interest",
  "account-quests",
  "account-recipes",
  "account-scribing-knowledge",
  "account-trait-research",
  "account-zone-completion",
  "lore-library",
]

describe("a card counted from every character", () => {
  for (const card of COUNTED_FROM_EVERY_CHARACTER) {
    test(`${card} counts what the summary counts`, () => {
      const summary = summaryOf(HELD)[card]
      expect(summary.total).toBeGreaterThan(0)
      expect(resolveGenericCheckerProgress(card, [], null, HELD)).toEqual({
        current: summary.count,
        total: summary.total,
      })
    })
  }

  test("a quest one character finished counts for the account", () => {
    expect(resolveGenericCheckerProgress("account-quests", [], null, HELD)).toEqual({
      current: 2,
      total: 2,
    })
    expect(ACCOUNT_COMPLETION_CARD_CHECKERS["account-quests"]?.isCardComplete(HELD)).toBe(true)
    expect(
      ACCOUNT_COMPLETION_CARD_CHECKERS["account-points-of-interest"]?.isCardComplete(HELD)
    ).toBe(false)
  })

  test("a grimoire and a book one character has count for the account", () => {
    expect(
      resolveGenericCheckerProgress("account-scribing-knowledge", [], null, HELD)?.current
    ).toBe(1)
    expect(resolveGenericCheckerProgress("lore-library", [], null, HELD)?.current).toBe(1)
  })

  test("a card no character was read for answers nothing", () => {
    for (const card of COUNTED_FROM_EVERY_CHARACTER) {
      expect(resolveGenericCheckerProgress(card, [], null, { ...HELD, rows: [] })).toBeUndefined()
    }
  })
})

const COUNTED_AGAINST_A_CATALOG: readonly AccountCardId[] = [
  "account-achievements",
  "antiquity-lore",
  "collectibles",
  "tales-of-tribute",
]

describe("a card counted against a catalog", () => {
  for (const card of COUNTED_AGAINST_A_CATALOG) {
    test(`${card} counts what the summary counts`, () => {
      const summary = summaryOf(HELD)[card]
      expect(summary.total).toBeGreaterThan(0)
      expect(resolveGenericCheckerProgress(card, [], null, HELD)).toEqual({
        current: summary.count,
        total: summary.total,
      })
    })
  }

  test("an achievement one character earned counts for the account", () => {
    expect(resolveGenericCheckerProgress("account-achievements", [], null, HELD)).toEqual({
      current: 30,
      total: 35,
    })
    expect(
      resolveGenericCheckerProgress("account-achievements", [], null, { ...HELD, rows: [] })
    ).toEqual({ current: 10, total: 15 })
  })

  test("a patron held with every card upgraded finishes the card", () => {
    expect(ACCOUNT_COMPLETION_CARD_CHECKERS["tales-of-tribute"]?.isCardComplete(HELD)).toBe(true)
    expect(ACCOUNT_COMPLETION_CARD_CHECKERS.collectibles?.isCardComplete(HELD)).toBe(false)
  })

  test("a card with no catalog answers nothing", () => {
    const bare = { ...HELD, catalogs: NO_COMPLETION_CATALOGS }
    for (const card of COUNTED_AGAINST_A_CATALOG) {
      expect(resolveGenericCheckerProgress(card, [], null, bare)).toBeUndefined()
    }
  })

  test("the antiquity leads are the only account cards with no checker", () => {
    expect(
      ACCOUNT_CARDS.map((card) => card.id).filter((id) => !(id in ACCOUNT_COMPLETION_CARD_CHECKERS))
    ).toEqual(["antiquity-leads-legendary", "antiquity-leads-motifs"])
  })
})

describe("champion-points", () => {
  test("counts the points earned against the most there are", () => {
    const completion = account({ championPointsEarned: 120 })
    expect(resolveGenericCheckerProgress("champion-points", [], null, completion)).toEqual({
      current: 120,
      total: MAX_CHAMPION_POINTS,
    })
    expect(ACCOUNT_COMPLETION_CARD_CHECKERS["champion-points"]?.isCardComplete(completion)).toBe(
      false
    )
  })
})

describe("bank-upgrades", () => {
  test("reads the captured upgrade, and answers nothing where none was captured", () => {
    const completion = account({ bankUpgrade: { current: 3, max: 3 } })
    expect(resolveGenericCheckerProgress("bank-upgrades", [], null, completion)).toEqual({
      current: 3,
      total: 3,
    })
    expect(ACCOUNT_COMPLETION_CARD_CHECKERS["bank-upgrades"]?.isCardComplete(completion)).toBe(true)
    expect(resolveGenericCheckerProgress("bank-upgrades", [], null, account())).toBeUndefined()
  })
})

describe("grand-master-stations", () => {
  test("sums the stations each craft has unlocked", () => {
    const completion = account({
      grandMasterStations: { 1: { name: "Clothier", unlocked: [1, 2] } },
    })
    const out = resolveGenericCheckerProgress("grand-master-stations", [], null, completion)
    expect(out?.current).toBe(2)
  })
})

describe("subclassing-skill-lines", () => {
  test("offers every class skill line to pick, with no account captured", () => {
    const level = getItemPickerLevels("subclassing-skill-lines", [], [])
    expect(level?.label).toBe("Skill Line")
    expect(level?.options.map((one) => one.value)).toContain(FIRST_LINE.skillLineId)
  })

  test("counts a line's rank against its most", () => {
    const completion = account({
      subclassingSkillLineProgress: {
        [FIRST_ESO_ID]: { currentRank: 2, currentXP: 0, nextRankXP: 10 },
      },
    })
    expect(
      resolveGenericCheckerProgress(
        "subclassing-skill-lines",
        [FIRST_LINE.skillLineId],
        null,
        completion
      )
    ).toEqual({ current: 2, total: FIRST_LINE.maxRank })
  })
})

describe("subclassing-skill-morphs", () => {
  test("offers a line's skills to pick under that line", () => {
    const level = getItemPickerLevels("subclassing-skill-morphs", [], [FIRST_LINE.skillLineId])
    expect(level?.label).toBe("Skill")
    expect(level?.options.length).toBeGreaterThan(0)
  })
})
