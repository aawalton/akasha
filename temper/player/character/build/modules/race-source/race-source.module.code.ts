import {
  type RaceId,
  races,
} from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import { getRacialSkillLineIdForRace } from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"

export interface RaceSource {
  id: RaceId
  name: string
  description: string
  effects: readonly Effect[]
}

export const NO_RACE_SOURCE: RaceSource = {
  id: "no-race",
  name: "No Race",
  description: "",
  effects: [],
}

function buildRaceSources(list: typeof skills.list): readonly RaceSource[] {
  const sources: RaceSource[] = []

  for (const race of races.list) {
    if (race.id === "no-race") continue

    const skillLineId = getRacialSkillLineIdForRace(race.id)
    if (skillLineId == null) continue

    const effects: Effect[] = []

    for (const skill of list) {
      if (skill.skillLineId !== skillLineId) continue
      if (skill.skillType !== "passive") continue
      if (skill.rank !== 3) continue

      if (!("effects" in skill) || !skill.effects) continue

      for (const effect of skill.effects) {
        effects.push(effect)
      }
    }

    sources.push({
      id: race.id,
      name: race.name,
      description: race.altName,
      effects,
    })
  }

  return sources.sort((a, b) => a.name.localeCompare(b.name))
}

interface RaceSources {
  readonly list: typeof skills.list
  readonly sorted: readonly RaceSource[]
  readonly all: readonly RaceSource[]
  readonly byId: ReadonlyMap<RaceId, RaceSource>
}

let memo: RaceSources | null = null

function raceSourcesNow(): RaceSources {
  const list = skills.list
  if (memo?.list === list) return memo
  const sorted = buildRaceSources(list)
  const all = [NO_RACE_SOURCE, ...sorted]
  memo = { list, sorted, all, byId: new Map(all.map((source) => [source.id, source])) }
  return memo
}

export function sortedRaces(): readonly RaceSource[] {
  return raceSourcesNow().sorted
}

export function allRaceSources(): readonly RaceSource[] {
  return raceSourcesNow().all
}

export function getRaceSourceById(id: RaceId | null): RaceSource | undefined {
  if (id == null) return undefined
  return raceSourcesNow().byId.get(id)
}
