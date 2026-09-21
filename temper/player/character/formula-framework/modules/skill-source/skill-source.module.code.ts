import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { EffectSourceInterface } from "akasha/temper/player/character/formula-framework/modules/effect-source/effect-source.module.code.ts"

export interface SkillSource<TSkillType extends string = string>
  extends EffectSourceInterface<"skills", Effect> {
  skillId: string
  esoSkillId: number
  skillName: string
  skillLineId: string
  skillType: TSkillType
}
