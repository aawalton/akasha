import type { Effect } from "@akasha/temper-formula-framework/effect"
import type { SkillTypeId } from "@akasha/temper-skill-kinds/skill-types"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

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
