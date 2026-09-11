import type { SkillTemplate } from "akasha/temper/character-skills/character-skill-template/character-skill-template.module.code.ts"
import { skillsFromPages } from "akasha/temper/character-skills/character-skills-from-pages/character-skills-from-pages.module.code.ts"
import { scribedSkills } from "akasha/temper/character-skills/scribed-skills/scribed-skills.module.code.ts"
import type { SkillLineId } from "akasha/temper/skill-lines/skill-lines/skill-lines.module.code.ts"
import {
  createDataFile,
  type DataFile,
} from "akasha/utils/narrow/create-data-file/create-data-file.module.code.ts"

const SKILLS_DATA = {
  ...skillsFromPages.data,
  ...scribedSkills.data,
}

export const skills: DataFile<string, SkillTemplate, SkillLineId | "scribed" | "none"> =
  createDataFile<SkillTemplate>()(SKILLS_DATA)

export type SkillId = (typeof skills.ids)[number]

export type Skill = SkillTemplate & { id: SkillId }
