import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SKILL_TYPES } from "./generated/temper-skill-type.generated"

export interface SkillTypeTemplate {
  id: string
  name: string
  description: string
}

const skillTypes = createDataFile<SkillTypeTemplate>()(TEMPER_SKILL_TYPES)

export type SkillTypeId = (typeof skillTypes.ids)[number]
