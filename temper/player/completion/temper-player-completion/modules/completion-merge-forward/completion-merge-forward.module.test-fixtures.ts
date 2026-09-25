import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import fc from "fast-check"

export function makeSkillPoints(over: {
  total: number
  unassigned: number
}): NonNullable<CharacterCompletion["skillPoints"]> {
  return {
    total: over.total,
    unassigned: over.unassigned,
    level: 0,
    mainQuests: 0,
    tutorial: 0,
    foliumDiscognitum: 0,
    pvpRank: 0,
    maelstromArena: 0,
    endlessArchive: 0,
    skyshardPoints: 0,
    totalSkyshards: 0,
    zoneQuestTotal: 0,
    groupDungeonTotal: 0,
    publicDungeonTotal: 0,
    skyshards: {},
    zoneQuests: {},
    groupDungeons: {},
    publicDungeons: {},
  }
}

export function makeMorph(over: {
  currentMorph: number
  baseRank: number
}): NonNullable<NonNullable<CharacterCompletion["skillLineProgress"]>[number]["skills"]>[number] {
  const ability = (rank: number) => ({ name: "x", rank })
  return {
    base: ability(over.baseRank),
    morph1: ability(0),
    morph2: ability(0),
    currentMorph: over.currentMorph,
    abilityIndex: 0,
  }
}

export function dominatesForward(merged: unknown, base: unknown): boolean {
  if (base === undefined) return true
  if (typeof base === "number") {
    return typeof merged === "number" && merged >= base
  }
  if (typeof base === "boolean") {
    return typeof merged === "boolean" && (!base || merged)
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(merged)) return false
    const present = new Set<unknown>(merged)
    return base.every((entry) => present.has(entry))
  }
  if (isRecord(base)) {
    if (!isRecord(merged)) return false
    return Object.keys(base).every((key) => dominatesForward(merged[key], base[key]))
  }
  return true
}

const numberArb = fc.integer({ min: 0, max: 1000 })
const numberArrayArb = fc.array(fc.integer({ min: 0, max: 50 }), { maxLength: 8 })

const letrecPairs = fc.letrec<{ pair: readonly [unknown, unknown] }>((tie) => ({
  pair: fc
    .oneof(
      { depthSize: "small", withCrossShrink: true },
      fc.tuple(numberArb, numberArb),
      fc.tuple(fc.boolean(), fc.boolean()),
      fc.tuple(numberArrayArb, numberArrayArb),
      fc
        .dictionary(
          fc.constantFrom("a", "b", "c", "d", "e"),
          fc.tuple(tie("pair"), fc.constantFrom("both", "existing", "incoming")),
          { maxKeys: 5 }
        )
        .map((dict): readonly [unknown, unknown] => {
          const existing: Record<string, unknown> = {}
          const incoming: Record<string, unknown> = {}
          for (const [key, [[existingValue, incomingValue], where]] of Object.entries(dict)) {
            if (where === "both" || where === "existing") existing[key] = existingValue
            if (where === "both" || where === "incoming") incoming[key] = incomingValue
          }
          return [existing, incoming]
        })
    )
    .map((value): readonly [unknown, unknown] => value),
}))

export const pairArb = letrecPairs.pair

export const RAFAEMA_LIST_23_BEFORE = [
  115330, 115282, 115283, 115281, 115284, 115642, 117694, 151756, 151760, 219738, 219737,
]

export const RAFAEMA_LIST_23_LIVE = [
  115330, 115282, 115283, 115281, 115284, 115642, 115392, 117694, 115561, 151756, 151760, 219738,
  219737,
]

export function heldIds(list: unknown): readonly number[] {
  if (!Array.isArray(list)) return []
  return list.filter((entry): entry is number => typeof entry === "number")
}
