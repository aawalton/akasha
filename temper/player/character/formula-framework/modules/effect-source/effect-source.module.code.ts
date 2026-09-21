import type { BuffOrDebuffSource } from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import type { Effect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import type { SourceCategoryId } from "akasha/temper/player/character/formula-framework/modules/source-category/source-category.module.code.ts"

export interface EffectSourceInterface<
  TCategoryId extends string = SourceCategoryId,
  TEffect = Effect,
> {
  id: string
  categoryId: TCategoryId
  effects: readonly TEffect[]
}

export type EffectSource = EffectSourceInterface

export type NamedSource = BuffOrDebuffSource

export function isNamedSource(source: EffectSource): source is NamedSource {
  return source.categoryId === "buffs" || source.categoryId === "debuffs"
}
