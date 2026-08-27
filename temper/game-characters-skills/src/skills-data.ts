import { createDataFile, type DataFile } from "@shared/utils-narrow/create-data-file"
import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"
import type { Effect } from "@temper/shared-formula-framework/effects-types"
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
