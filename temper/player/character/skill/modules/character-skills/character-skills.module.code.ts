import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import {
  type SkillTable,
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"

export const skills: SkillTable<SkillTemplate> = tableView(() => skillCatalog().skills)

export type SkillId = (typeof skills.ids)[number]

export type Skill = SkillTemplate & { id: SkillId }
