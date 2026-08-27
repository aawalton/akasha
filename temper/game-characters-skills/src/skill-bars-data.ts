import { createDataFile } from "@shared/utils-narrow/create-data-file"
import { TEMPER_SKILL_BARS } from "./generated/temper-skill-bars.generated"

export interface SkillBarTemplate {
  id: string
  name: string
}

export const skillBars = createDataFile<SkillBarTemplate>()(TEMPER_SKILL_BARS)

export type SkillBarId = (typeof skillBars.ids)[number]
