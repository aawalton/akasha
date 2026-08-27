import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  jewelryTraits: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly material: string; readonly effect: string; readonly effects: readonly unknown[]; readonly esoTraitConstantName: string } | { readonly id: string; readonly name: string; readonly material: string; readonly effect: string; readonly effects: readonly { readonly metricId: unknown; readonly effectType: unknown; readonly effectValue: unknown }[]; readonly esoTraitConstantName: string }>; readonly ids: readonly string[] }
}>("@temper/game-characters-equipment/traits/jewelry-traits-data")

export const jewelryTraits = held.jewelryTraits
