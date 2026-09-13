import { createDataFile } from "akasha/utils/narrow/modules/create-data-file/create-data-file.module.code.ts"

export interface SkillBarTemplate {
  id: string
  name: string
}

const SKILL_BAR_DATA = {
  "primary-skill-bar": { id: "primary-skill-bar", name: "Primary Bar" },
  "backup-skill-bar": { id: "backup-skill-bar", name: "Backup Bar" },
} as const satisfies Record<string, SkillBarTemplate>

export const skillBars = createDataFile<SkillBarTemplate>()(SKILL_BAR_DATA)

export type SkillBarId = (typeof skillBars.ids)[number]
