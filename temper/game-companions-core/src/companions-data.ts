import type { CompanionState } from "./companion-types"
import { companionsFromPages } from "./generated/temper-eso-companion.generated"
import { setUltimate } from "./skills/companion-skill-slots-data"
import type { CompanionSkillId } from "./skills/companion-skills-data"
import { getDefaultUltimateForCompanion } from "./skills/companion-skills-data"
import type { CompanionMetricId } from "./stats/companion-metric-ids.generated"

interface CompanionPassiveEffect {
  metricId: CompanionMetricId
  value: number
}

export interface CompanionTemplate {
  id: string
  name: string
  title: string
  alliance: "aldmeri-dominion" | "daggerfall-covenant" | "ebonheart-pact" | "none"
  icon: string | null
  esoCompanionId: number
  classPassiveId: CompanionSkillId | null
  passiveEffects: readonly CompanionPassiveEffect[]
}

export const companions = companionsFromPages

export type CompanionId = (typeof companions.ids)[number]

export function getCompanionName(companionId: CompanionId): string {
  return companions.data[companionId].name
}

const esoCompanionIdToId = new Map<number, CompanionId>()
const idToEsoCompanionId = new Map<CompanionId, number>()
for (const companion of companions.list) {
  if (companion.esoCompanionId !== 0) {
    esoCompanionIdToId.set(companion.esoCompanionId, companion.id)
  }
  idToEsoCompanionId.set(companion.id, companion.esoCompanionId)
}

export function getCompanionIdByDefId(defId: number): CompanionId | undefined {
  return esoCompanionIdToId.get(defId)
}

export function getDefIdByCompanionId(companionId: CompanionId): number | undefined {
  return idToEsoCompanionId.get(companionId)
}

export function setCompanion(build: CompanionState, companionId: CompanionId): CompanionState {
  return setUltimate(
    {
      ...build,
      companion: {
        ...build.companion,
        id: companionId,
      },
    },
    getDefaultUltimateForCompanion(companionId)
  )
}
