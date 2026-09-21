import { describe, expect, test } from "bun:test"
import {
  ACCOUNT_CARDS,
  type AccountSummaryData,
  CHARACTER_CARDS,
  type CharacterSummaryData,
  COMPANION_CARDS,
  type CompanionSummaryData,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-registry/completion-card-registry.module.code.ts"
import { computeOverallCompletionScore } from "akasha/temper/player/completion/temper-player-completion/modules/completion-scope-rollup/completion-scope-rollup.module.code.ts"
import { OverallSummaryPanelCard } from "akasha/temper/web/modules/overall-summary-panel-card/overall-summary-panel-card.module.code.tsx"
import type { ReactElement } from "react"

interface ShownRow {
  key: string
  label: string
  value?: unknown
  count?: number
  total?: number
}

function accountFilled(count: number, total: number): AccountSummaryData {
  return Object.fromEntries(
    ACCOUNT_CARDS.map((card) => [card.id, { count, total }])
  ) as AccountSummaryData
}

function characterFilled(count: number, total: number): CharacterSummaryData {
  return Object.fromEntries(
    CHARACTER_CARDS.map((card) => [card.id, { count, total }])
  ) as CharacterSummaryData
}

function companionFilled(count: number, total: number): CompanionSummaryData {
  return Object.fromEntries(
    COMPANION_CARDS.map((card) => [card.id, { count, total }])
  ) as CompanionSummaryData
}

function rowsOf(
  accountSummary: AccountSummaryData,
  characterSummary: CharacterSummaryData,
  companionSummary: CompanionSummaryData
): readonly ShownRow[] {
  const drawn = OverallSummaryPanelCard({
    accountSummary,
    characterSummary,
    companionSummary,
  }) as ReactElement<{ items: readonly ShownRow[] }>
  return drawn.props.items
}

const SCORE_LABEL = "Items Completed"

describe("the overall completion score on the summary card", () => {
  test("the card carries a row counting what the three scopes have completed", () => {
    const account = accountFilled(4, 7)
    const character = characterFilled(5, 8)
    const companion = companionFilled(6, 9)
    const row = rowsOf(account, character, companion).find((one) => one.label === SCORE_LABEL)

    expect(row).toBeDefined()
    expect(row?.value).toBe(computeOverallCompletionScore(account, character, companion))
  })

  test("the row counts things done rather than reading as a percentage", () => {
    const account = accountFilled(4, 7)
    const character = characterFilled(5, 8)
    const companion = companionFilled(6, 9)
    const row = rowsOf(account, character, companion).find((one) => one.label === SCORE_LABEL)

    expect(typeof row?.value).toBe("number")
    expect(row?.value as number).toBeGreaterThan(100)
  })

  test("the row states a figure rather than a count out of a total", () => {
    const row = rowsOf(accountFilled(4, 7), characterFilled(5, 8), companionFilled(6, 9)).find(
      (one) => one.label === SCORE_LABEL
    )

    expect(row === undefined ? true : "total" in row).toBe(false)
  })

  test("the scope rows the card already had are still there", () => {
    const labels = rowsOf(accountFilled(4, 7), characterFilled(5, 8), companionFilled(6, 9)).map(
      (one) => one.label
    )

    expect(labels).toContain("Account")
    expect(labels).toContain("Characters")
    expect(labels).toContain("Companions")
  })

  test("no such row is drawn where no scope has anything to count", () => {
    const labels = rowsOf(accountFilled(0, 0), characterFilled(0, 0), companionFilled(0, 0)).map(
      (one) => one.label
    )

    expect(labels).not.toContain(SCORE_LABEL)
  })
})
