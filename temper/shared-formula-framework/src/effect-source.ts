import type { BuffOrDebuffSource } from "./buff-or-debuff-source"
import type { Effect } from "./effects-types"
import type { SourceCategoryId } from "./source-categories-data"

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
