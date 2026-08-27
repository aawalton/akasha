import { describe, expect, it } from "bun:test"
import { classes } from "@temper/game-characters-classes/classes-data"
import { races } from "@temper/game-characters-races/generated/temper-race.generated"
import { skillLines as skillLinesData } from "@temper/game-characters-skill-lines/skill-lines-data"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "@temper/game-completion/completion-types"
import { resolveTaskProgress } from "./completion-card-progress-resolver"
import type { CompletionCharacterEntry } from "./completion-next-character-resolver"
import { buildCrossCharacterCompletionIndex } from "./completion-progress-index"

const SL_DARK_BROTHERHOOD = skillLinesData.list.find((l) => l.id === "guild-dark-brotherhood")
const SL_ORC = skillLinesData.list.find((l) => l.id === "racial-orc-skills")
const SL_DARK_ELF = skillLinesData.list.find((l) => l.id === "racial-dark-elf-skills")
const SL_ARCANIST = skillLinesData.list.find((l) => l.id === "arcanist-soldier-of-apocrypha")
const SL_DRAGONKNIGHT = skillLinesData.list.find((l) => l.id === "dragonknight-ardent-flame")
const SL_NO_UNIVERSE = skillLinesData.list.find((l) => l.maxRank === 0 && l.esoSkillLineId !== 0)
if (
  SL_DARK_BROTHERHOOD === undefined ||
  SL_ORC === undefined ||
  SL_DARK_ELF === undefined ||
  SL_ARCANIST === undefined ||
  SL_DRAGONKNIGHT === undefined ||
  SL_NO_UNIVERSE === undefined
)
  throw new Error("test fixture: expected skill lines missing from the static catalog")

const ESO_DRAGONKNIGHT = classes.list.find((c) => c.id === "dragonknight")?.esoClassId
const ESO_ARCANIST = classes.list.find((c) => c.id === "arcanist")?.esoClassId
const ESO_DUNMER = races.list.find((r) => r.id === "dunmer")?.esoRaceId
const ESO_ORC = races.list.find((r) => r.id === "orc")?.esoRaceId
if (
  ESO_DRAGONKNIGHT === undefined ||
  ESO_ARCANIST === undefined ||
  ESO_DUNMER === undefined ||
  ESO_ORC === undefined
)
  throw new Error("test fixture: expected classes/races missing from the static catalogs")

function mkScanned(
  classId: number,
  raceId: number,
  ranks: Record<number, number>
): CharacterCompletion {
  const skillLineProgress: NonNullable<CharacterCompletion["skillLineProgress"]> = {}
  for (const [esoId, rank] of Object.entries(ranks)) {
    skillLineProgress[Number(esoId)] = {
      currentRank: rank,
      currentXP: 0,
      nextRankXP: 100,
      skills: {},
    }
  }
  return { classId, raceId, skillLineProgress }
}

const ROSTER_STUB: CharacterCompletion = {
  gender: 0,
  level: 50,
  classId: ESO_DRAGONKNIGHT,
  allianceId: 1,
  raceId: ESO_DUNMER,
  className: "Dragonknight",
  classIcon: "/esoui/art/icons/class/class_dragonknight.dds",
}

const DUNMER_DRAGONKNIGHT = mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {})
const ORC_ARCANIST = mkScanned(ESO_ARCANIST, ESO_ORC, {})

describe("skill-lines / static fixtures", () => {
  it("pins the static facts the applicability assertions rest on", () => {
    expect(SL_DARK_BROTHERHOOD.esoSkillLineId).toBe(118)
    expect(SL_DARK_BROTHERHOOD.subcategoryId).toBe("guild")
    expect(SL_DARK_BROTHERHOOD.maxRank).toBe(12)
    expect(SL_ORC.esoSkillLineId).toBe(52)
    expect(SL_ORC.subcategoryId).toBe("racial")
    expect(SL_ORC.maxRank).toBe(50)
    expect(SL_ARCANIST.esoSkillLineId).toBe(219)
    expect(SL_ARCANIST.subcategoryId).toBe("class")
    expect(SL_ARCANIST.maxRank).toBe(50)
  })
})

describe("skill-lines / tier 1 — applicability", () => {
  it("returns undefined for a RACIAL line of another race (never rankable)", () => {
    expect(
      resolveTaskProgress("skill-lines", [SL_ORC.esoSkillLineId], DUNMER_DRAGONKNIGHT, null)
    ).toBeUndefined()
  })

  it("returns 0/maxRank for the character's OWN racial line when unranked", () => {
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_ELF.esoSkillLineId], DUNMER_DRAGONKNIGHT, null)
    ).toEqual({ current: 0, total: SL_DARK_ELF.maxRank })
  })

  it("returns undefined for a CLASS line of another class", () => {
    expect(
      resolveTaskProgress("skill-lines", [SL_ARCANIST.esoSkillLineId], DUNMER_DRAGONKNIGHT, null)
    ).toBeUndefined()
  })

  it("returns 0/maxRank for the character's OWN class line when unranked", () => {
    expect(
      resolveTaskProgress(
        "skill-lines",
        [SL_DRAGONKNIGHT.esoSkillLineId],
        DUNMER_DRAGONKNIGHT,
        null
      )
    ).toEqual({ current: 0, total: SL_DRAGONKNIGHT.maxRank })
  })

  it("applies the racial gate symmetrically — the Orc ranks Orc Skills, not Dark Elf Skills", () => {
    expect(resolveTaskProgress("skill-lines", [SL_ORC.esoSkillLineId], ORC_ARCANIST, null)).toEqual(
      {
        current: 0,
        total: SL_ORC.maxRank,
      }
    )
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_ELF.esoSkillLineId], ORC_ARCANIST, null)
    ).toBeUndefined()
  })
})

describe("skill-lines / tier 2 — unscanned characters are dropped, not scored", () => {
  it("returns undefined for an applicable line when there is no completion blob", () => {
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], null, null)
    ).toBeUndefined()
  })

  it("returns undefined for an applicable line when the blob is empty", () => {
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], {}, null)
    ).toBeUndefined()
  })

  it("returns undefined for an applicable line when the blob carries only the roster stub", () => {
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], ROSTER_STUB, null)
    ).toBeUndefined()
  })

  it("scores the same stub the moment one collector key joins it", () => {
    const scanned: CharacterCompletion = { ...ROSTER_STUB, skillLineProgress: {} }
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], scanned, null)
    ).toEqual({ current: 0, total: SL_DARK_BROTHERHOOD.maxRank })
  })
})

describe("skill-lines / tier 3 — a scanned character's missing line is a real zero", () => {
  it("returns 0/maxRank for an APPLICABLE guild line the character never unlocked", () => {
    const scanned = mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {
      [SL_DRAGONKNIGHT.esoSkillLineId]: 30,
    })
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], scanned, null)
    ).toEqual({ current: 0, total: SL_DARK_BROTHERHOOD.maxRank })
  })

  it("returns 0/maxRank when the skill-line collector ran and found nothing", () => {
    expect(
      resolveTaskProgress(
        "skill-lines",
        [SL_DARK_BROTHERHOOD.esoSkillLineId],
        DUNMER_DRAGONKNIGHT,
        null
      )
    ).toEqual({ current: 0, total: SL_DARK_BROTHERHOOD.maxRank })
  })

  it("returns 0/maxRank when another collector ran but skillLineProgress is absent", () => {
    const scanned: CharacterCompletion = {
      classId: ESO_DRAGONKNIGHT,
      raceId: ESO_DUNMER,
      quests: [1, 2, 3],
    }
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], scanned, null)
    ).toEqual({ current: 0, total: SL_DARK_BROTHERHOOD.maxRank })
  })
})

describe("skill-lines / known-good (unchanged behavior)", () => {
  it("returns the stored currentRank over the static maxRank for a ranked line", () => {
    const scanned = mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {
      [SL_DARK_BROTHERHOOD.esoSkillLineId]: 7,
    })
    expect(
      resolveTaskProgress("skill-lines", [SL_DARK_BROTHERHOOD.esoSkillLineId], scanned, null)
    ).toEqual({ current: 7, total: SL_DARK_BROTHERHOOD.maxRank })
  })

  it("returns undefined for a line with no static universe (maxRank 0)", () => {
    const scanned = mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {
      [SL_NO_UNIVERSE.esoSkillLineId]: 1,
    })
    expect(
      resolveTaskProgress("skill-lines", [SL_NO_UNIVERSE.esoSkillLineId], scanned, null)
    ).toBeUndefined()
  })

  it("returns undefined for an unknown skill line id", () => {
    expect(resolveTaskProgress("skill-lines", [999999], DUNMER_DRAGONKNIGHT, null)).toBeUndefined()
  })

  it("returns undefined when itemPath[0] is not a number", () => {
    expect(
      resolveTaskProgress("skill-lines", ["guild-dark-brotherhood"], DUNMER_DRAGONKNIGHT, null)
    ).toBeUndefined()
  })

  it("depth-0 stays character-derived: maxed lines over the lines the character has", () => {
    const scanned: CharacterCompletion = {
      classId: ESO_DRAGONKNIGHT,
      raceId: ESO_DUNMER,
      skillLineProgress: {
        [SL_DARK_BROTHERHOOD.esoSkillLineId]: {
          currentRank: 12,
          currentXP: 0,
          nextRankXP: 0,
          skills: {},
        },
        [SL_DRAGONKNIGHT.esoSkillLineId]: {
          currentRank: 30,
          currentXP: 0,
          nextRankXP: 500,
          skills: {},
        },
      },
    }
    expect(resolveTaskProgress("skill-lines", null, scanned, null)).toEqual({
      current: 1,
      total: 2,
    })
  })

  it("depth-0 stays undefined when the character has no skillLineProgress at all", () => {
    expect(resolveTaskProgress("skill-lines", null, ROSTER_STUB, null)).toBeUndefined()
    expect(resolveTaskProgress("skill-lines", null, null, null)).toBeUndefined()
  })
})

function mkRosterEntry(
  id: string,
  name: string,
  sortOrder: number | null,
  completion: CharacterCompletion | null
): CompletionCharacterEntry {
  return { id, name, firstName: name, sortOrder, completion }
}

const EMPTY_ACCOUNT: AccountCompletion = { achievements: {} }

describe("buildCrossCharacterCompletionIndex / skill-lines rollup", () => {
  const DK_WITH_DB = mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {
    [SL_DARK_BROTHERHOOD.esoSkillLineId]: 5,
  })
  const DK_WITHOUT_DB = mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {
    [SL_DRAGONKNIGHT.esoSkillLineId]: 30,
  })
  const ORC_ARCANIST_SCANNED = mkScanned(ESO_ARCANIST, ESO_ORC, {
    [SL_ORC.esoSkillLineId]: 20,
    [SL_ARCANIST.esoSkillLineId]: 40,
  })

  const roster = [
    mkRosterEntry("c1", "Alpha", 1, DK_WITH_DB),
    mkRosterEntry("c2", "Beta", 2, DK_WITHOUT_DB),
    mkRosterEntry("c3", "Gamma", 3, ORC_ARCANIST_SCANNED),
  ]

  it("enters every applicable scanned character into the denominator, including those with no data for the line", () => {
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths[`skill-lines/${SL_DARK_BROTHERHOOD.esoSkillLineId}`]
    if (!entry) throw new Error("skill-lines/dark-brotherhood missing")
    expect(Object.keys(entry.entries).sort()).toEqual(["c1", "c2", "c3"])
    expect(entry.entries.c2).toEqual({ current: 0, total: SL_DARK_BROTHERHOOD.maxRank })
    expect(entry.entries.c3).toEqual({ current: 0, total: SL_DARK_BROTHERHOOD.maxRank })
    expect(entry.current).toBe(5)
    expect(entry.total).toBe(3 * SL_DARK_BROTHERHOOD.maxRank)
  })

  it("keeps a non-applicable RACIAL line out of both sides of the ratio", () => {
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const entry = idx.paths[`skill-lines/${SL_ORC.esoSkillLineId}`]
    if (!entry) throw new Error("skill-lines/orc-skills missing")
    expect(Object.keys(entry.entries)).toEqual(["c3"])
    expect(entry.current).toBe(20)
    expect(entry.total).toBe(SL_ORC.maxRank)
  })

  it("keeps a non-applicable CLASS line out of both sides of the ratio", () => {
    const idx = buildCrossCharacterCompletionIndex(roster, EMPTY_ACCOUNT)
    const arcanist = idx.paths[`skill-lines/${SL_ARCANIST.esoSkillLineId}`]
    if (!arcanist) throw new Error("skill-lines/soldier-of-apocrypha missing")
    expect(Object.keys(arcanist.entries)).toEqual(["c3"])
    expect(arcanist.total).toBe(SL_ARCANIST.maxRank)

    const dk = idx.paths[`skill-lines/${SL_DRAGONKNIGHT.esoSkillLineId}`]
    if (!dk) throw new Error("skill-lines/ardent-flame missing")
    expect(Object.keys(dk.entries).sort()).toEqual(["c1", "c2"])
    expect(dk.current).toBe(30)
    expect(dk.total).toBe(2 * SL_DRAGONKNIGHT.maxRank)
  })

  it("leaves an unscanned roster member out of the rollup entirely", () => {
    const withStub = [...roster, mkRosterEntry("c4", "Delta", 4, ROSTER_STUB)]
    const idx = buildCrossCharacterCompletionIndex(withStub, EMPTY_ACCOUNT)
    const entry = idx.paths[`skill-lines/${SL_DARK_BROTHERHOOD.esoSkillLineId}`]
    if (!entry) throw new Error("skill-lines/dark-brotherhood missing")
    expect(Object.keys(entry.entries).sort()).toEqual(["c1", "c2", "c3"])
    expect(entry.total).toBe(3 * SL_DARK_BROTHERHOOD.maxRank)
    expect(idx.characters.c4).toEqual({ label: "Delta", sortOrder: 4 })
  })

  it("known-good: a fully-covered roster rolls up unchanged", () => {
    const covered = [
      mkRosterEntry(
        "c1",
        "Alpha",
        1,
        mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, {
          [SL_DARK_BROTHERHOOD.esoSkillLineId]: SL_DARK_BROTHERHOOD.maxRank,
        })
      ),
      mkRosterEntry(
        "c2",
        "Beta",
        2,
        mkScanned(ESO_DRAGONKNIGHT, ESO_DUNMER, { [SL_DARK_BROTHERHOOD.esoSkillLineId]: 7 })
      ),
    ]
    const idx = buildCrossCharacterCompletionIndex(covered, EMPTY_ACCOUNT)
    const entry = idx.paths[`skill-lines/${SL_DARK_BROTHERHOOD.esoSkillLineId}`]
    if (!entry) throw new Error("skill-lines/dark-brotherhood missing")
    expect(entry.entries.c1).toEqual({ current: SL_DARK_BROTHERHOOD.maxRank, total: 12 })
    expect(entry.entries.c2).toEqual({ current: 7, total: 12 })
    expect(entry.current).toBe(SL_DARK_BROTHERHOOD.maxRank + 7)
    expect(entry.total).toBe(2 * SL_DARK_BROTHERHOOD.maxRank)
    expect(entry.activeEntryKey).toBe("c2")
  })
})
