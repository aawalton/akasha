import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  jewelryEnchants: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly glyphName: string; readonly essenceRune: string; readonly effect: string; readonly effects: readonly unknown[]; readonly esoEnchantConstantName: string } | { readonly id: string; readonly name: string; readonly glyphName: string; readonly essenceRune: string; readonly effect: string; readonly effects: readonly { readonly metricId: unknown; readonly effectType: unknown; readonly effectValue: unknown }[]; readonly esoEnchantConstantName: string }>; readonly ids: readonly string[] }
}>("@temper/game-characters-equipment/enchants/jewelry-enchants-data")

export const jewelryEnchants = held.jewelryEnchants
