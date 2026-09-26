import { expect, test } from "bun:test"
import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { getCompanionIdByDefId } from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { COMPANION_QUEST_DATA } from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import { MAX_COMPANION_RAPPORT } from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"
import {
  countCompanionRapport,
  rapportCompanionIds,
  totalCompanionRapport,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-rapport-tally/completion-companion-rapport-tally.module.code.ts"

holdCompanionCatalogFromCheckout()

const QUESTED = COMPANION_QUEST_DATA[0]
const FIRST =
  rapportCompanionIds().find((id) => getCompanionIdByDefId(id) === QUESTED?.companionId) ?? 0
const FIRST_QUESTS = QUESTED?.quests.map((quest) => quest.questId) ?? []

const TOTAL_COMPANION_RAPPORT = totalCompanionRapport()

test("every companion that holds rapport is counted in the whole", () => {
  expect(TOTAL_COMPANION_RAPPORT).toBe(rapportCompanionIds().length * MAX_COMPANION_RAPPORT)
})

test("a character with no rapport record is counted against the whole", () => {
  expect(countCompanionRapport(undefined)).toEqual({
    current: 0,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("rapport past what a companion holds counts as what that companion holds", () => {
  const completion = {
    companionRapport: { [FIRST]: MAX_COMPANION_RAPPORT + 500 },
    quests: FIRST_QUESTS,
  }
  expect(countCompanionRapport(completion)).toEqual({
    current: MAX_COMPANION_RAPPORT,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("a companion at full rapport with a quest left counts one short of full", () => {
  const completion = {
    companionRapport: { [FIRST]: MAX_COMPANION_RAPPORT },
    quests: FIRST_QUESTS.slice(1),
  }
  expect(countCompanionRapport(completion, [FIRST])).toEqual({
    current: MAX_COMPANION_RAPPORT - 1,
    total: MAX_COMPANION_RAPPORT,
  })
})

test("rapport below nothing counts as nothing", () => {
  expect(countCompanionRapport({ companionRapport: { [FIRST]: -3000 } })).toEqual({
    current: 0,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("a companion the game gives no id of its own holds no rapport", () => {
  expect(countCompanionRapport({ companionRapport: { 0: 4000 } })).toEqual({
    current: 0,
    total: TOTAL_COMPANION_RAPPORT,
  })
})

test("a path names the companion whose rapport is counted", () => {
  expect(countCompanionRapport({ companionRapport: { [FIRST]: 1200 } }, [FIRST])).toEqual({
    current: 1200,
    total: MAX_COMPANION_RAPPORT,
  })
})

test("a path naming a companion that is not there is answered with nothing", () => {
  expect(countCompanionRapport({ companionRapport: { [FIRST]: 1200 } }, [0])).toBeUndefined()
})
