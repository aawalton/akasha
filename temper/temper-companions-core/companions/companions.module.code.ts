import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"
import type { CompanionSkillId } from "../companion-skills/companion-skills.module.code.ts"

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

const COMPANIONS_DATA = {
  "no-companion": {
    id: "no-companion" as const,
    name: "No Companion",
    title: "",
    alliance: "none" as const,
    icon: null,
    esoCompanionId: 0,
    classPassiveId: null,
    passiveEffects: [] as const,
  },
  "bastian": {
    id: "bastian" as const,
    name: "Bastian Hallix",
    title: "The Dragonknight",
    alliance: "daggerfall-covenant" as const,
    icon: "/esoui/art/icons/comp_bastian.dds",
    esoCompanionId: 1,
    classPassiveId: "bastian-tough" as const,
    passiveEffects: [
      { metricId: "companion-health-maximum" as const, value: 0.03 },
      { metricId: "companion-damage-done" as const, value: 0.03 },
    ] as const,
  },
  "mirri": {
    id: "mirri" as const,
    name: "Mirri Elendis",
    title: "The Nightblade",
    alliance: "ebonheart-pact" as const,
    icon: "/esoui/art/icons/comp_mirri.dds",
    esoCompanionId: 2,
    classPassiveId: "mirri-dynamic" as const,
    passiveEffects: [
      { metricId: "companion-damage-done" as const, value: 0.03 },
      { metricId: "companion-healing-done" as const, value: 0.03 },
    ] as const,
  },
  "ember": {
    id: "ember" as const,
    name: "Ember",
    title: "The Sorcerer",
    alliance: "aldmeri-dominion" as const,
    icon: "/esoui/art/icons/comp_ember.dds",
    esoCompanionId: 5,
    classPassiveId: "ember-cunning" as const,
    passiveEffects: [
      { metricId: "companion-critical-chance" as const, value: 0.03 },
      { metricId: "companion-damage-done" as const, value: 0.03 },
    ] as const,
  },
  "isobel": {
    id: "isobel" as const,
    name: "Isobel Veloise",
    title: "The Templar",
    alliance: "daggerfall-covenant" as const,
    icon: "/esoui/art/icons/comp_isobel.dds",
    esoCompanionId: 6,
    classPassiveId: "isobel-enchanted" as const,
    passiveEffects: [
      { metricId: "companion-ability-cooldown" as const, value: -0.03 },
      { metricId: "companion-damage-taken" as const, value: -0.03 },
    ] as const,
  },
  "sharp-as-night": {
    id: "sharp-as-night" as const,
    name: "Sharp-as-Night",
    title: "The Warden",
    alliance: "ebonheart-pact" as const,
    icon: "/esoui/art/icons/companion_sharp.dds",
    esoCompanionId: 8,
    classPassiveId: "sharp-survivalist" as const,
    passiveEffects: [
      { metricId: "companion-armor" as const, value: 0.03 },
      { metricId: "companion-healing-done" as const, value: 0.03 },
    ] as const,
  },
  "azandar": {
    id: "azandar" as const,
    name: "Azandar",
    title: "The Arcanist",
    alliance: "daggerfall-covenant" as const,
    icon: "/esoui/art/icons/companion_azander.dds",
    esoCompanionId: 9,
    classPassiveId: "azandar-son-of-kozanset" as const,
    passiveEffects: [
      { metricId: "companion-health-maximum" as const, value: 0.03 },
      { metricId: "companion-ability-cooldown" as const, value: -0.03 },
    ] as const,
  },
  "tanlorin": {
    id: "tanlorin" as const,
    name: "Tanlorin",
    title: "The Soulweaver",
    alliance: "aldmeri-dominion" as const,
    icon: "/esoui/art/icons/u44_companion_tanlorin.dds",
    esoCompanionId: 12,
    classPassiveId: "tanlorin-spirited" as const,
    passiveEffects: [
      { metricId: "companion-damage-taken" as const, value: -0.03 },
      { metricId: "companion-damage-done" as const, value: 0.03 },
    ] as const,
  },
  "zerith-var": {
    id: "zerith-var" as const,
    name: "Zerith-var",
    title: "The Necromancer",
    alliance: "aldmeri-dominion" as const,
    icon: "/esoui/art/icons/u44_companion_zerith.dds",
    esoCompanionId: 13,
    classPassiveId: "zerith-var-third-moons-chosen" as const,
    passiveEffects: [
      { metricId: "companion-ability-cooldown" as const, value: -0.03 },
      { metricId: "companion-health-maximum" as const, value: 0.03 },
    ] as const,
  },
} satisfies Record<string, CompanionTemplate>

export const companions = createDataFile<CompanionTemplate>()(COMPANIONS_DATA)

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
