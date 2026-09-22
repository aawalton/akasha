import { expect, test } from "bun:test"
import { MAX_COMPANION_RAPPORT } from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import {
  countCompanionRapport,
  RAPPORT_COMPANION_IDS,
  TOTAL_COMPANION_RAPPORT,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-rapport-tally/completion-companion-rapport-tally.module.code.ts"

const FIRST = RAPPORT_COMPANION_IDS[0] ?? 0

test("every companion that holds rapport is counted in the whole", () => {
  expect(TOTAL_COMPANION_RAPPORT).toBe(RAPPORT_COMPANION_IDS.length * MAX_COMPANION_RAPPORT)
})

test("a character with no rapport record is counted against the whole", () => {
  expect(countCompanionRapport(undefined)).toEqual({
    current: 0,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("rapport past what a companion holds counts as what that companion holds", () => {
  expect(countCompanionRapport({ [FIRST]: MAX_COMPANION_RAPPORT + 500 })).toEqual({
    current: MAX_COMPANION_RAPPORT,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("rapport below nothing counts as nothing", () => {
  expect(countCompanionRapport({ [FIRST]: -3000 })).toEqual({
    current: 0,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("a companion the game gives no id of its own holds no rapport", () => {
  expect(countCompanionRapport({ 0: 4000 })).toEqual({
    current: 0,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("a path names the companion whose rapport is counted", () => {
  expect(countCompanionRapport({ [FIRST]: 1200 }, [FIRST])).toEqual({
    current: 1200,
    total: MAX_COMPANION_RAPPORT,
  })
})

test("a path naming a companion that is not there is answered with nothing", () => {
  expect(countCompanionRapport({ [FIRST]: 1200 }, [0])).toBeUndefined()
})
