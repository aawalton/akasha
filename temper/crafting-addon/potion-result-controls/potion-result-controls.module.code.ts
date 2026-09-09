import type { Ingredient, Potion } from "../potion-types/potion-types.module.code.ts"

export interface ResultControl extends Control {
  potion?: Potion
  traits: Record<number, TraitControl | undefined>
  reagents: Record<number, ReagentControl | undefined>
}
export interface TraitControl extends TextureControl {
  Trait?: string
}
export interface ReagentControl extends TextureControl {
  reagent?: Ingredient
}

export interface IngredientRuntime extends Ingredient {
  iconTraits: Record<string, string | undefined>
  protected?: boolean
}

export function asPotion(value: unknown): Potion {
  return value as Potion
}
export function asResultControl(value: unknown): ResultControl {
  return value as ResultControl
}
export function asIngredientRuntime(value: unknown): IngredientRuntime {
  return value as IngredientRuntime
}

export type VoidHolderMethod = (this: void) => undefined
export function asVoidHolderMethod(value: unknown): VoidHolderMethod {
  return value as VoidHolderMethod
}
