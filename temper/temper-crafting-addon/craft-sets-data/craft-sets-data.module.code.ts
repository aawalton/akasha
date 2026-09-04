import { SETS_TIERS2TO5 } from "../craft-sets-data-tiers-2-5/craft-sets-data-tiers-2-5.module.code.ts"
import { SETS_TIERS6TO9 } from "../craft-sets-data-tiers-6-9/craft-sets-data-tiers-6-9.module.code.ts"

export interface CraftedSetEntry {
  traits: number
  nodes: Record<number, number>
  item: Record<number, number>
  zone: Record<number, number>
  name?: string
}

export const SETS: Record<number, CraftedSetEntry> = {
  ...SETS_TIERS2TO5,
  ...SETS_TIERS6TO9,
}
