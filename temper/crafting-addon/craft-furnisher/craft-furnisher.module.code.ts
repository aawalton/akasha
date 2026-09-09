import type { RecipeEntry } from "../craft-cook/craft-cook.module.code.ts"
import { FURNISHER_PLANS_EARLY } from "../craft-furnisher-early/craft-furnisher-early.module.code.ts"
import { FURNISHER_PLANS_LATE } from "../craft-furnisher-late/craft-furnisher-late.module.code.ts"
import { FURNISHER_PLANS_MIDDLE } from "../craft-furnisher-middle/craft-furnisher-middle.module.code.ts"

export interface FurnisherTable {
  recipe: Record<number, RecipeEntry>
  recipelist: number[]
}

export const FURNISHER: FurnisherTable = {
  recipe: {},
  recipelist: [...FURNISHER_PLANS_EARLY, ...FURNISHER_PLANS_MIDDLE, ...FURNISHER_PLANS_LATE],
}
