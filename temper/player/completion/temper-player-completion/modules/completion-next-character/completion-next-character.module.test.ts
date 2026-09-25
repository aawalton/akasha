import { describe, expect, test } from "bun:test"
import { emptySkillPointProgress } from "akasha/temper/player/completion/modules/completion-progress/completion-progress.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { NO_COMPLETION_CATALOGS as NONE } from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"
import {
  type NextCharacterInput,
  resolveNextCharacter,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-next-character/completion-next-character.module.code.ts"
import { SKILL_POINT_STORY_ZONE_SOURCES } from "akasha/temper/player/completion/temper-player-completion/modules/skill-point-zone-sources/skill-point-zone-sources.module.code.ts"
import {
  sparseComplete,
  sparseMissingOne,
} from "akasha/temper/player/completion/temper-player-completion/test-fixtures/lore-library-sparse-test-utils/lore-library-sparse-test-utils.test-fixture.code.ts"

const CARD = "lore-library-character"
const CATEGORY = 1

function mkChar(
  id: string,
  sortOrder: number | null,
  loreLibrary: CharacterCompletion["loreLibrary"]
): NextCharacterInput {
  return { id, name: id, sortOrder, completion: { loreLibrary } }
}

describe("resolveNextCharacter — lore-library with sparse data (Shalidor's Library)", () => {
  test("skips a sortOrder-1 character that is complete and returns the next incomplete one", () => {
    const erin = mkChar("erin", 1, sparseComplete(CATEGORY))
    const maviola = mkChar("maviola", 2, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([erin, maviola], CARD, [CATEGORY], NONE)
    expect(result?.characterId).toBe("maviola")
  })

  test("returns null when every character is complete for the category", () => {
    const a = mkChar("a", 1, sparseComplete(CATEGORY))
    const b = mkChar("b", 2, sparseComplete(CATEGORY))
    expect(resolveNextCharacter([a, b], CARD, [CATEGORY], NONE)).toBeNull()
  })
})

describe("resolveNextCharacter — the order the roster is walked in", () => {
  test("walks by sort order rather than by the order the roster is given in", () => {
    const later = mkChar("later", 2, sparseMissingOne(CATEGORY))
    const earlier = mkChar("earlier", 1, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([later, earlier], CARD, [CATEGORY], NONE)
    expect(result?.characterId).toBe("earlier")
  })

  test("orders a character naming no sort order after every character that names one", () => {
    const unordered = mkChar("unordered", null, sparseMissingOne(CATEGORY))
    const ordered = mkChar("ordered", 9000, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([unordered, ordered], CARD, [CATEGORY], NONE)
    expect(result?.characterId).toBe("ordered")
  })

  test("breaks a tie on sort order by name", () => {
    const zeta = mkChar("zeta", 1, sparseMissingOne(CATEGORY))
    const alpha = mkChar("alpha", 1, sparseMissingOne(CATEGORY))
    const result = resolveNextCharacter([zeta, alpha], CARD, [CATEGORY], NONE)
    expect(result?.characterId).toBe("alpha")
  })

  test("names the character as well as the id", () => {
    const only = mkChar("solo", 1, sparseMissingOne(CATEGORY))
    expect(resolveNextCharacter([only], CARD, [CATEGORY], NONE)).toEqual({
      characterId: "solo",
      characterName: "solo",
    })
  })
})

const EVERY_STORY_ZONE: Record<string, number> = Object.fromEntries(
  SKILL_POINT_STORY_ZONE_SOURCES.map((zone) => [zone.key, zone.maxQuests])
)

function mkSkillPointChar(
  id: string,
  sortOrder: number,
  zoneQuests: Record<string, number>
): NextCharacterInput {
  return {
    id,
    name: id,
    sortOrder,
    completion: { skillPoints: { ...emptySkillPointProgress(), zoneQuests } },
  }
}

describe("resolveNextCharacter — skill-points story zone quests", () => {
  test("skips the character holding every story zone's quest skill points", () => {
    const done = mkSkillPointChar("done", 1, EVERY_STORY_ZONE)
    const left = mkSkillPointChar("left", 2, {})
    const result = resolveNextCharacter([done, left], "skill-points", ["storyZoneQuests"], NONE)
    expect(result?.characterId).toBe("left")
  })

  test("reads a character holding every story zone as finished, Imperial City or not", () => {
    const done = mkSkillPointChar("done", 1, EVERY_STORY_ZONE)
    expect(resolveNextCharacter([done], "skill-points", ["storyZoneQuests"], NONE)).toBeNull()
  })

  test("still owes Imperial City on the whole zone-quest branch", () => {
    const done = mkSkillPointChar("done", 1, EVERY_STORY_ZONE)
    const result = resolveNextCharacter([done], "skill-points", ["zoneQuests"], NONE)
    expect(result?.characterId).toBe("done")
  })
})

describe("resolveNextCharacter — cards with no checker", () => {
  test("returns null for a card no checker names", () => {
    const only = mkChar("solo", 1, sparseMissingOne(CATEGORY))
    expect(resolveNextCharacter([only], "guild-sales", [CATEGORY], NONE)).toBeNull()
  })

  test("returns null for an empty roster", () => {
    expect(resolveNextCharacter([], CARD, [CATEGORY], NONE)).toBeNull()
  })
})
