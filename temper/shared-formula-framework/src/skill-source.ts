import type { EffectSourceInterface } from "./effect-source"
import type { Effect } from "./effects-types"

export interface SkillSource<TSkillType extends string = string>
  extends EffectSourceInterface<"skills", Effect> {
  skillId: string
  esoSkillId: number
  skillName: string
  skillLineId: string
  skillType: TSkillType
}
