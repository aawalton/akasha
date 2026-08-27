import { codeModuleSync } from "../../code-import.ts"

type GameItemsAlchemyEntry = { readonly id: string; readonly name: string; readonly itemId: number; readonly subcategoryId: string; readonly effects: readonly { metricId?: string; effectType?: string; buffId?: string }[]; readonly reagents?: readonly (readonly unknown[])[] }

const held = codeModuleSync<{
  ALCHEMY_EFFECT_IDS: Record<string, number>
  potions: { readonly ids: readonly string[]; readonly data: Record<string, GameItemsAlchemyEntry | undefined>; readonly list: readonly GameItemsAlchemyEntry[] }
}>("@temper/game-items-alchemy")

export const ALCHEMY_EFFECT_IDS = held.ALCHEMY_EFFECT_IDS
export const potions = held.potions
