import { createDataFile } from "@akasha/utils-narrow/create-data-file"

export interface SkillTypeTemplate {
  id: string
  name: string
  description: string
}

const SKILL_TYPE_DATA = {
  "active": {
    id: "active",
    name: "Active",
    description: "Regular ability with cooldown or resource cost",
  },
  "ultimate": {
    id: "ultimate",
    name: "Ultimate",
    description: "High-cost ability that requires Ultimate resource",
  },
  "passive": {
    id: "passive",
    name: "Passive",
    description: "Passive ability that provides permanent bonuses",
  },
} as const satisfies Record<string, SkillTypeTemplate>

export const skillTypes = createDataFile<SkillTypeTemplate>()(SKILL_TYPE_DATA)

export type SkillTypeId = (typeof skillTypes.ids)[number]
