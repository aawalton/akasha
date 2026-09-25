import { expect, test } from "bun:test"
import type { AccountCheckerInput } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checker-types/completion-card-checker-types.module.code.ts"
import { resolveTaskProgress } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-task-progress/completion-card-task-progress.module.code.ts"
import { NO_COMPLETION_CATALOGS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"

const HELD: AccountCheckerInput = {
  account: { achievements: {}, antiquityLore: { 24: 1, 31: 1 } },
  rows: [],
  catalogs: {
    ...NO_COMPLETION_CATALOGS,
    antiquityCategories: [
      {
        esoAntiquityCategoryId: 5,
        title: "An Invented Desert",
        antiquities: [
          { esoAntiquityId: 24, antiquityName: "An Invented Glove", totalLoreEntries: 1 },
          { esoAntiquityId: 31, antiquityName: "An Invented Sword", totalLoreEntries: 3 },
        ],
      },
    ],
  },
}

test("the antiquity-lore card is counted against the catalog handed in", () => {
  expect(resolveTaskProgress("antiquity-lore", [], null, HELD)).toEqual({ current: 2, total: 4 })
})

test("the antiquity-lore card answers nothing where no catalog is handed in", () => {
  expect(
    resolveTaskProgress("antiquity-lore", [], null, { ...HELD, catalogs: NO_COMPLETION_CATALOGS })
  ).toBeUndefined()
})

test("an antiquity lead is measured by nothing", () => {
  expect(resolveTaskProgress("antiquity-leads-motifs", [], null, HELD)).toBeUndefined()
})
