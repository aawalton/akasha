import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  weaponTraits: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly esoTraitConstantName: string; readonly material: string; readonly effect: string; readonly effects: readonly unknown[] } | { readonly id: string; readonly name: string; readonly esoTraitConstantName: string; readonly material: string; readonly effect: string; readonly effects: readonly { readonly metricId: unknown; readonly effectType: unknown; readonly effectValue: unknown }[] }>; readonly ids: readonly string[] }
}>("@temper/game-characters-equipment/traits/weapon-traits-data")

export const weaponTraits = held.weaponTraits
