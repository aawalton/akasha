import type { BuffOrDebuffSource } from "akasha/temper/formula-framework/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import type { Effect } from "akasha/temper/formula-framework/effect/effect.module.code.ts"
import type { SourceCategoryId } from "akasha/temper/formula-framework/source-category/source-category.module.code.ts"

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
