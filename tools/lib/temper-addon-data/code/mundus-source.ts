import { codeModuleSync } from "../../code-import.ts"

type MundusSourceEntry = { readonly id: string; readonly name: string; readonly description: string; readonly categoryId: string; readonly esoMundusId: number; readonly effects: readonly { readonly metricId: unknown; readonly effectType: unknown; readonly effectValue: unknown }[] }

type MundusSourceEntry1 = { readonly id: string; readonly name: string; readonly description: string; readonly categoryId: string; readonly esoMundusId: number; readonly effects: readonly unknown[] }

const held = codeModuleSync<{
  mundus: { readonly data: Record<string, MundusSourceEntry1 | MundusSourceEntry>; readonly ids: readonly string[]; readonly list: readonly (MundusSourceEntry1 | MundusSourceEntry)[] }
}>("@temper/game-characters-character/mundus-source")

export const mundus = held.mundus
