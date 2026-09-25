import { expect, test } from "bun:test"
import { COMPANION_QUEST_DATA } from "akasha/temper/player/completion/temper-player-completion/modules/companion-quest-data/companion-quest-data.module.code.ts"
import { countCompanionQuests } from "akasha/temper/player/completion/temper-player-completion/modules/completion-companion-quest-tally/completion-companion-quest-tally.module.code.ts"

const EVERY_QUEST = COMPANION_QUEST_DATA.flatMap((group) =>
  group.quests.map((quest) => quest.questId)
)

const AZANDAR = COMPANION_QUEST_DATA.filter((group) => group.companionId === "azandar")

test("a character with no quest record is counted as nothing rather than as none done", () => {
  expect(countCompanionQuests(undefined)).toBeUndefined()
})

test("a character who has done none of them is counted against every companion quest", () => {
  expect(countCompanionQuests([])).toEqual({ current: 0, total: EVERY_QUEST.length })
})

test("a character who has done all of them is counted as whole", () => {
  expect(countCompanionQuests(EVERY_QUEST)).toEqual({
    current: EVERY_QUEST.length,
    total: EVERY_QUEST.length,
  })
})

test("a quest that is no companion quest is passed over", () => {
  expect(countCompanionQuests([1, 2, 3])).toEqual({ current: 0, total: EVERY_QUEST.length })
})

test("a path names the companion whose quests are counted", () => {
  const mine = AZANDAR.flatMap((group) => group.quests.map((quest) => quest.questId))

  expect(countCompanionQuests(mine, ["azandar"])).toEqual({
    current: mine.length,
    total: mine.length,
  })
  expect(countCompanionQuests(mine)).toEqual({
    current: mine.length,
    total: EVERY_QUEST.length,
  })
})

test("a path naming a companion that is not there is answered with nothing", () => {
  expect(countCompanionQuests(EVERY_QUEST, ["nobody"])).toBeUndefined()
})
