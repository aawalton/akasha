import { skillLines } from "akasha/temper/skill-lines/skill-lines/skill-lines.module.code.ts"
import { morphableSkillsByLine } from "akasha/temper/skill-morphs/morphable-skills/morphable-skills.module.code.ts"
import type {
  ExpectedMorphableSkillForSuggestion,
  MorphSkillLineInput,
  MorphSuggestionInput,
  SkillMorphInput,
} from "akasha/temper/skill-morphs/select-morph-suggestions/select-morph-suggestions.module.code.ts"

const MORPHABLE_LINE_DISPLAY_ORDERS: ReadonlyMap<number, number> = (() => {
  const map = new Map<number, number>()
  for (const sl of skillLines.list) {
    if (sl.esoSkillLineId !== 0 && morphableSkillsByLine.has(sl.id)) {
      map.set(sl.esoSkillLineId, sl.displayOrder)
    }
  }
  return map
})()

const DK_ARDENT_FLAME = 35
const DK_DRACONIC_POWER = 36
const DK_EARTHEN_HEART = 37
const SORC_DARK_MAGIC = 41
const SORC_DAEDRIC_SUMMONING = 42
const SORC_STORM_CALLING = 43
const VAMPIRE = 51
const WEREWOLF = 50

const ALL_CLASS_LINES: ReadonlySet<number> = new Set<number>([
  DK_ARDENT_FLAME,
  DK_DRACONIC_POWER,
  DK_EARTHEN_HEART,
  SORC_DARK_MAGIC,
  SORC_DAEDRIC_SUMMONING,
  SORC_STORM_CALLING,
])
const DK_CLASS_LINES: ReadonlySet<number> = new Set<number>([
  DK_ARDENT_FLAME,
  DK_DRACONIC_POWER,
  DK_EARTHEN_HEART,
])
const VAMPIRE_WEREWOLF_GROUP: ReadonlyArray<ReadonlySet<number>> = [
  new Set<number>([VAMPIRE, WEREWOLF]),
]

export interface SkillOpts {
  base: { name: string; rank: number }
  morph1: { name: string; rank: number }
  morph2: { name: string; rank: number }
  currentMorph: number
  abilityIndex: number
  atMorph?: boolean
  isUltimate?: boolean
}

function makeSkill(opts: SkillOpts): SkillMorphInput {
  return {
    base: opts.base,
    morph1: opts.morph1,
    morph2: opts.morph2,
    currentMorph: opts.currentMorph,
    abilityIndex: opts.abilityIndex,
    atMorph: opts.atMorph,
    isUltimate: opts.isUltimate,
  }
}

export function blankSkill(
  prefix: string,
  abilityIndex: number,
  isUltimate?: boolean
): SkillMorphInput {
  return makeSkill({
    base: { name: `${prefix}-base`, rank: 0 },
    morph1: { name: `${prefix}-m1`, rank: 0 },
    morph2: { name: `${prefix}-m2`, rank: 0 },
    currentMorph: 0,
    abilityIndex,
    atMorph: false,
    isUltimate,
  })
}

export function lineOf(skills: Record<number, SkillMorphInput>): MorphSkillLineInput {
  return { skills }
}

const DEFAULT_CAPS = { active: 7, ultimate: 2 }

function deriveExpectedFromProgress(slp: Record<number, MorphSkillLineInput | undefined>): {
  expectedSkillsByEsoLineId: ReadonlyMap<number, ReadonlyArray<ExpectedMorphableSkillForSuggestion>>
  skillLineRanks: ReadonlyMap<number, number>
} {
  const expected = new Map<number, ExpectedMorphableSkillForSuggestion[]>()
  const ranks = new Map<number, number>()
  for (const [lineKey, line] of Object.entries(slp)) {
    const lineId = Number(lineKey)
    ranks.set(lineId, 50)
    if (line?.skills === undefined) continue
    const list: ExpectedMorphableSkillForSuggestion[] = []
    for (const morphData of Object.values(line.skills)) {
      list.push({
        baseName: morphData.base.name,
        morph1Name: morphData.morph1.name,
        morph2Name: morphData.morph2.name,
        skillType: morphData.isUltimate === true ? "ultimate" : "active",
        lineRankNeeded: 0,
      })
    }
    expected.set(lineId, list)
  }
  return { expectedSkillsByEsoLineId: expected, skillLineRanks: ranks }
}

export function defaultInput(overrides: Partial<MorphSuggestionInput> = {}): MorphSuggestionInput {
  const skillLineProgress = overrides.skillLineProgress ?? {}
  const derived = deriveExpectedFromProgress(skillLineProgress)
  return {
    skillLineProgress,
    classLineEsoIds: ALL_CLASS_LINES,
    playerClassLineEsoIds: DK_CLASS_LINES,
    mutuallyExclusiveLineGroups: VAMPIRE_WEREWOLF_GROUP,
    equippedSkillNames: new Set<string>(),
    caps: DEFAULT_CAPS,
    morphableLineDisplayOrders: MORPHABLE_LINE_DISPLAY_ORDERS,
    expectedSkillsByEsoLineId: derived.expectedSkillsByEsoLineId,
    skillLineRanks: derived.skillLineRanks,
    ...overrides,
  }
}
