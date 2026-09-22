import { describe, expect, test } from "bun:test"
import { findFirstIncompleteStoryZone } from "akasha/temper/player/completion/temper-player-completion/modules/completion-story-zone-quests/completion-story-zone-quests.module.code.ts"
import { SKILL_POINT_STORY_ZONE_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-zone-sources/skill-point-zone-sources.module.code.ts"

function everyStoryZoneDone(): Record<string, number> {
  const done: Record<string, number> = {}
  for (const zone of SKILL_POINT_STORY_ZONE_SOURCES) done[zone.key] = zone.maxQuests
  return done
}

describe("findFirstIncompleteStoryZone", () => {
  test("owes the first story zone when a character has done nothing", () => {
    const owed = findFirstIncompleteStoryZone({})
    expect(owed?.key).toBe(SKILL_POINT_STORY_ZONE_SOURCES[0]?.key)
    expect(owed?.completedQuests).toBe(0)
    expect(owed?.totalQuests).toBe(SKILL_POINT_STORY_ZONE_SOURCES[0]?.maxQuests)
  })

  test("passes over a story zone whose quests are all done", () => {
    const first = SKILL_POINT_STORY_ZONE_SOURCES[0]
    const second = SKILL_POINT_STORY_ZONE_SOURCES[1]
    if (first === undefined || second === undefined) throw new Error("fixture missing")
    const owed = findFirstIncompleteStoryZone({ [first.key]: first.maxQuests })
    expect(owed?.key).toBe(second.key)
  })

  test("owes a story zone still one quest short", () => {
    const first = SKILL_POINT_STORY_ZONE_SOURCES[0]
    if (first === undefined) throw new Error("fixture missing")
    const owed = findFirstIncompleteStoryZone({ [first.key]: first.maxQuests - 1 })
    expect(owed?.key).toBe(first.key)
    expect(owed?.completedQuests).toBe(first.maxQuests - 1)
  })

  test("owes no zone once every story zone is done", () => {
    expect(findFirstIncompleteStoryZone(everyStoryZoneDone())).toBeUndefined()
  })

  test("owes no contested zone, so Cyrodiil and Imperial City are never named", () => {
    const owed = findFirstIncompleteStoryZone(undefined)
    expect(owed?.key).not.toBe("CY")
    expect(owed?.key).not.toBe("IC")
  })
})
