const TOTAL_ACTIVE_SLOTS = 10
const TOTAL_ULTIMATE_SLOTS = 2

const FREE_SLOT_BUDGET = 3

const VARIANT_ORDER: Record<"base" | "morph1" | "morph2", number> = {
  base: 0,
  morph1: 1,
  morph2: 2,
}

export interface SkillMorphVariantInput {
  name: string
  rank: number | undefined
}

export interface SkillMorphInput {
  base: SkillMorphVariantInput
  morph1: SkillMorphVariantInput
  morph2: SkillMorphVariantInput
  currentMorph: number
  atMorph?: boolean
  abilityIndex: number
  isUltimate?: boolean
}

export interface MorphSkillLineInput {
  skills?: Record<number, SkillMorphInput>
}

export interface PickRelevantSkillLineIdsInput {
  taskItemPath?: readonly (string | number)[]
  skillLineKeys: Iterable<number>
  classLineEsoIds: ReadonlySet<number>
  playerClassLineEsoIds: ReadonlySet<number>
  morphableLineDisplayOrders: ReadonlyMap<number, number>
}

import { buildMorphEntry } from "../build-morph-entry/build-morph-entry.module.code.ts"
import type { ExpectedMorphableSkill } from "../character-morph-progress-eso/character-morph-progress-eso.module.code.ts"

export type ExpectedMorphableSkillForSuggestion = ExpectedMorphableSkill

export interface MorphSuggestionInput {
  taskItemPath?: readonly (string | number)[]
  skillLineProgress: Record<number, MorphSkillLineInput | undefined>
  classLineEsoIds: ReadonlySet<number>
  playerClassLineEsoIds: ReadonlySet<number>
  mutuallyExclusiveLineGroups: ReadonlyArray<ReadonlySet<number>>
  equippedSkillNames: ReadonlySet<string>
  caps: { active: number; ultimate: number }
  morphableLineDisplayOrders: ReadonlyMap<number, number>
  expectedSkillsByEsoLineId: ReadonlyMap<number, ReadonlyArray<ExpectedMorphableSkillForSuggestion>>
  skillLineRanks: ReadonlyMap<number, number>
}

export interface MorphSuggestionEntry {
  skillName: string
  skillType: "active" | "ultimate"
  variant: "base" | "morph1" | "morph2"
  isEquipped: boolean
  isLineConflict: boolean
  isIncompatible: boolean
  rank: number
  lineDisplayOrder: number
  abilityIndex: number
}

export interface MorphSuggestionResult {
  suggestions: readonly MorphSuggestionEntry[] | undefined
  isComplete: boolean
}

export function pickRelevantSkillLineIds(input: PickRelevantSkillLineIdsInput): readonly number[] {
  const path = input.taskItemPath
  if (path !== undefined && path.length > 0) {
    return [Number(path[0])]
  }

  const result: number[] = []
  for (const lineId of input.skillLineKeys) {
    if (!input.morphableLineDisplayOrders.has(lineId)) continue
    if (input.classLineEsoIds.has(lineId) && !input.playerClassLineEsoIds.has(lineId)) {
      continue
    }
    result.push(lineId)
  }
  return result
}

export function selectMorphSuggestions(input: MorphSuggestionInput): MorphSuggestionResult {
  const expectedKeys: number[] = []
  for (const id of input.expectedSkillsByEsoLineId.keys()) {
    expectedKeys.push(id)
  }
  const lineIds = pickRelevantSkillLineIds({
    taskItemPath: input.taskItemPath,
    skillLineKeys: expectedKeys,
    classLineEsoIds: input.classLineEsoIds,
    playerClassLineEsoIds: input.playerClassLineEsoIds,
    morphableLineDisplayOrders: input.morphableLineDisplayOrders,
  })

  const path = input.taskItemPath

  const built: { entry: MorphSuggestionEntry; lineId: number }[] = []
  const levelingLineIds = new Set<number>()

  for (const lineId of lineIds) {
    const lineRank = input.skillLineRanks.get(lineId)
    if (lineRank === undefined) continue

    const expectedForLine = input.expectedSkillsByEsoLineId.get(lineId)
    if (expectedForLine === undefined || expectedForLine.length === 0) continue

    const lineDisplayOrder = input.morphableLineDisplayOrders.get(lineId) ?? 999
    const line = input.skillLineProgress[lineId]

    const captured = new Map<string, SkillMorphInput>()
    if (line?.skills !== undefined) {
      for (const morphData of Object.values(line.skills)) {
        captured.set(morphData.base.name, morphData)
      }
    }

    let toIterate: ReadonlyArray<ExpectedMorphableSkill>
    if (path !== undefined && path.length > 1) {
      const skillId = Number(path[1])
      const targetMorph = line?.skills?.[skillId]
      if (targetMorph === undefined) continue
      const targetBaseName = targetMorph.base.name
      toIterate = expectedForLine.filter((e) => e.baseName === targetBaseName)
    } else {
      toIterate = expectedForLine
    }

    for (let i = 0; i < toIterate.length; i++) {
      const expected = toIterate[i]
      if (expected === undefined) continue

      if (lineRank < expected.lineRankNeeded) continue

      const cap = captured.get(expected.baseName)
      const morphData: SkillMorphInput =
        cap !== undefined
          ? cap
          : {
              base: { name: expected.baseName, rank: undefined },
              morph1: { name: expected.morph1Name, rank: undefined },
              morph2: { name: expected.morph2Name, rank: undefined },
              currentMorph: 0,
              atMorph: false,
              abilityIndex: i + 1,
              isUltimate: expected.skillType === "ultimate",
            }

      const entry = buildMorphEntry(morphData, false, lineDisplayOrder, input.equippedSkillNames)
      if (entry === undefined) continue
      built.push({ entry, lineId })
      if (entry.isEquipped) levelingLineIds.add(lineId)
    }
  }

  const conflictLineIds = new Set<number>()
  for (const group of input.mutuallyExclusiveLineGroups) {
    let groupHasLeveling = false
    for (const id of group) {
      if (levelingLineIds.has(id)) {
        groupHasLeveling = true
        break
      }
    }
    if (!groupHasLeveling) continue
    for (const id of group) {
      if (!levelingLineIds.has(id)) conflictLineIds.add(id)
    }
  }

  const finalEntries: MorphSuggestionEntry[] = []
  for (const { entry, lineId } of built) {
    if (!conflictLineIds.has(lineId)) {
      finalEntries.push(entry)
      continue
    }
    finalEntries.push({
      ...entry,
      isLineConflict: true,
      isIncompatible: true,
    })
  }

  finalEntries.sort((a, b) => {
    if (a.skillType !== b.skillType) return a.skillType === "ultimate" ? -1 : 1
    if (a.variant !== b.variant) return VARIANT_ORDER[a.variant] - VARIANT_ORDER[b.variant]
    if (a.isIncompatible !== b.isIncompatible) return a.isIncompatible ? 1 : -1
    if (a.lineDisplayOrder !== b.lineDisplayOrder) {
      return a.lineDisplayOrder - b.lineDisplayOrder
    }
    return a.abilityIndex - b.abilityIndex
  })

  let activeCount = 0
  let ultimateCount = 0
  const capped: MorphSuggestionEntry[] = []
  for (const entry of finalEntries) {
    if (entry.skillType === "ultimate") {
      if (ultimateCount < input.caps.ultimate) {
        capped.push(entry)
        ultimateCount++
      }
    } else {
      if (activeCount < input.caps.active) {
        capped.push(entry)
        activeCount++
      }
    }
  }

  let slottedActive = 0
  let slottedUltimate = 0
  let fillableActive = 0
  let fillableUltimate = 0
  for (const entry of finalEntries) {
    if (entry.skillType === "ultimate") {
      if (entry.isEquipped) slottedUltimate++
      if (!entry.isIncompatible) fillableUltimate++
    } else {
      if (entry.isEquipped) slottedActive++
      if (!entry.isIncompatible) fillableActive++
    }
  }
  const emptyActive = Math.max(0, TOTAL_ACTIVE_SLOTS - slottedActive)
  const emptyUltimate = Math.max(0, TOTAL_ULTIMATE_SLOTS - slottedUltimate)
  const wastedActive = fillableActive > 0 ? emptyActive : 0
  const wastedUltimate = fillableUltimate > 0 ? emptyUltimate : 0
  const isComplete = wastedActive + wastedUltimate <= FREE_SLOT_BUDGET

  return {
    suggestions: capped.length > 0 ? capped : undefined,
    isComplete,
  }
}
