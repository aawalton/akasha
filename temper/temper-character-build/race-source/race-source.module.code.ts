import { skills } from "@akasha/temper-character-skills/character-skills"
import { getRacialSkillLineIdForRace } from "@akasha/temper-character-skills/passive-queries"
import type { Effect } from "@akasha/temper-formula-framework/effect"
import { type RaceId, races } from "@akasha/temper-races/races"

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

function buildRaceSources(): readonly RaceSource[] {
  const sources: RaceSource[] = []

  for (const race of races.list) {
    if (race.id === "no-race") continue

    const skillLineId = getRacialSkillLineIdForRace(race.id)
    if (skillLineId == null) continue

    const effects: Effect[] = []

    for (const skill of skills.list) {
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

export const sortedRaces: readonly RaceSource[] = buildRaceSources()

const raceSourceMap = new Map<RaceId, RaceSource>()
raceSourceMap.set("no-race", NO_RACE_SOURCE)
for (const source of sortedRaces) {
  raceSourceMap.set(source.id, source)
}

export const ALL_RACE_SOURCES: RaceSource[] = [NO_RACE_SOURCE, ...sortedRaces]

export function getRaceSourceById(id: RaceId | null): RaceSource | undefined {
  if (id == null) return undefined
  return raceSourceMap.get(id)
}
