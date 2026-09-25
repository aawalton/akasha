import type { SkillTypeId } from "akasha/temper/catalog/skill-kind/modules/skill-types/skill-types.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { SkillLineId } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"

type SkillStatus = "supported" | "partially-supported" | "unsupported"

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
