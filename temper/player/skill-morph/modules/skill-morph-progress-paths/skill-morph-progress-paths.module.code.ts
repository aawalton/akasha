import type {
  ExpectedMorphableSkill,
  MorphSkillLineProgressMap,
} from "akasha/temper/player/skill-morph/modules/character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import {
  morphMost,
  morphPoints,
  morphRanksOf,
} from "akasha/temper/player/skill-morph/modules/morph-ranks/morph-ranks.module.code.ts"

interface MorphVariantProgress {
  name: string
  rank: number | undefined
}

interface MorphSkillProgress {
  base: MorphVariantProgress
  morph1: MorphVariantProgress
  morph2: MorphVariantProgress
}

function pointsFor(morph: MorphSkillProgress, morphRankMost: number): number {
  return morphPoints(morphRanksOf(morph, morphRankMost))
}

interface SkillMorphLineProgressInput {
  expectedSkillsForLine: ReadonlyArray<ExpectedMorphableSkill>
  lineSkills: Record<number, MorphSkillProgress> | undefined
  morphRankMost: number
}

function resolveSkillMorphLineProgress(input: SkillMorphLineProgressInput): {
  current: number
  total: number
} {
  const total = input.expectedSkillsForLine.length * morphMost(input.morphRankMost)

  if (!input.lineSkills) return { current: 0, total }

  const addonLookup = new Map<string, MorphSkillProgress>()
  for (const morphData of Object.values(input.lineSkills)) {
    addonLookup.set(morphData.base.name, morphData)
  }

  let current = 0
  for (const expected of input.expectedSkillsForLine) {
    const morph = addonLookup.get(expected.baseName)
    if (morph !== undefined) current += pointsFor(morph, input.morphRankMost)
  }
  return { current, total }
}

interface SkillMorphSkillProgressInput {
  expectedSkillsForLine: ReadonlyArray<ExpectedMorphableSkill>
  lineSkills: Record<number, MorphSkillProgress> | undefined
  skillBaseName: string
  morphRankMost: number
}

function resolveSkillMorphSkillProgress(
  input: SkillMorphSkillProgressInput
): { current: number; total: number } | undefined {
  const isExpected = input.expectedSkillsForLine.some((s) => s.baseName === input.skillBaseName)
  if (!isExpected) return undefined
  const total = morphMost(input.morphRankMost)

  if (!input.lineSkills) return { current: 0, total }

  for (const morph of Object.values(input.lineSkills)) {
    if (morph.base.name === input.skillBaseName) {
      return { current: pointsFor(morph, input.morphRankMost), total }
    }
  }
  return { current: 0, total }
}

interface SkillMorphProgressByPathInput {
  esoLineId: number
  skillBaseName?: string
  expectedSkillsForLine: ReadonlyArray<ExpectedMorphableSkill> | undefined
  skillLineProgress: MorphSkillLineProgressMap | null | undefined
  morphRankMost: number
}

export function resolveSkillMorphProgressByPath(
  input: SkillMorphProgressByPathInput
): { current: number; total: number } | undefined {
  if (input.expectedSkillsForLine === undefined) return undefined
  const sl = input.skillLineProgress?.[input.esoLineId]

  if (input.skillBaseName !== undefined) {
    return resolveSkillMorphSkillProgress({
      expectedSkillsForLine: input.expectedSkillsForLine,
      lineSkills: sl?.skills,
      skillBaseName: input.skillBaseName,
      morphRankMost: input.morphRankMost,
    })
  }

  if (!sl?.skills) return undefined
  return resolveSkillMorphLineProgress({
    expectedSkillsForLine: input.expectedSkillsForLine,
    lineSkills: sl.skills,
    morphRankMost: input.morphRankMost,
  })
}
