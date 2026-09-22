import { expect, test } from "bun:test"
import type { CharacterAchievementProgress } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import {
  achievementAt,
  countAchievement,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-achievement-tally/completion-achievement-tally.module.code.ts"

const DAILY: CharacterAchievementProgress = {
  completed: false,
  criteriaProgress: {
    completedSteps: 0,
    totalSteps: 1,
    criteria: { 1: { numCompleted: 11, numRequired: 30 } },
  },
}

const ONE_STEP: CharacterAchievementProgress = {
  completed: true,
  criteriaProgress: { completedSteps: 1, totalSteps: 1 },
}

const MANY_STEPS: CharacterAchievementProgress = {
  completed: true,
  criteriaProgress: { completedSteps: 5, totalSteps: 5 },
}

test("an achievement the record does not name is counted as none of one", () => {
  expect(countAchievement(undefined)).toEqual({ current: 0, total: 1 })
})

test("an achievement is counted by its criteria where those ask for more than one", () => {
  expect(countAchievement(DAILY)).toEqual({ current: 11, total: 30 })
})

test("an achievement asking for one thing is counted as done or not done", () => {
  expect(countAchievement(ONE_STEP)).toEqual({ current: 1, total: 1 })
  expect(countAchievement({ ...ONE_STEP, completed: false })).toEqual({ current: 0, total: 1 })
})

test("an achievement of many steps counts every step once that achievement is done", () => {
  expect(countAchievement(MANY_STEPS)).toEqual({ current: 5, total: 5 })
  expect(countAchievement({ ...MANY_STEPS, completed: false })).toEqual({ current: 0, total: 5 })
})

test("the last step of a path names the achievement counted", () => {
  const held = { 2612: DAILY }

  expect(achievementAt(held, ["Dragonhold", "Quests", "2612"])).toBe(DAILY)
  expect(achievementAt(held, [2612])).toBe(DAILY)
})

test("a path naming no achievement the record holds is answered with nothing", () => {
  expect(achievementAt({ 2612: DAILY }, ["Dragonhold", "Quests", "9"])).toBeUndefined()
  expect(achievementAt({ 2612: DAILY }, [])).toBeUndefined()
  expect(achievementAt(undefined, ["2612"])).toBeUndefined()
})
