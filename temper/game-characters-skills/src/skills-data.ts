import { createDataFile, type DataFile } from "@akasha/utils-narrow/create-data-file"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import type { Effect } from "@akasha/temper-formula-framework/effect"
import { skillsFromPages } from "./generated/temper-skill.generated"
import { scribedSkills } from "./scribing/scribed-skills-data"
import type { SkillTypeId } from "./skill-types-data"

export type SkillStatus = "supported" | "partially-supported" | "unsupported"

export interface SkillTemplate {
  id: string
  esoSkillId: number
  name: string
  baseName: string
  skillLineId: SkillLineId
  skillType: SkillTypeId
  description: string
  icon: string | null
  isMorph: boolean
  morphIndex: number
  lineRankNeeded: number
  rank: number
  effects?: readonly Effect[]
  status?: SkillStatus
  subcategoryId: SkillLineId | "scribed" | "none"
}

const SKILLS_DATA = {
  ...skillsFromPages.data,
  ...scribedSkills.data,
}

export const skills: DataFile<string, SkillTemplate, SkillLineId | "scribed" | "none"> =
  createDataFile<SkillTemplate>()(SKILLS_DATA)

export type SkillId = (typeof skills.ids)[number]

export type Skill = SkillTemplate & { id: SkillId }
