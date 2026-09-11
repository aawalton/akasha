import type { Effect } from "akasha/temper/formula-framework/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/formula-framework/effect-source/effect-source.module.code.ts"

export interface SkillSource<TSkillType extends string = string>
  extends EffectSourceInterface<"skills", Effect> {
  skillId: string
  esoSkillId: number
  skillName: string
  skillLineId: string
  skillType: TSkillType
}
