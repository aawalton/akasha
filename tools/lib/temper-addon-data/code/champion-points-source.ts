import { codeModuleSync } from "../../code-import.ts"

type ChampionPointsSourceEntry = { readonly id: string; readonly esoChampionSkillId: number; readonly name: string; readonly description: string; readonly categoryId: string; readonly subcategoryId: string; readonly isSlottable: boolean; readonly effects: readonly { readonly metricId: unknown; readonly effectType: unknown; readonly effectValue: unknown }[] }

type ChampionPointsSourceEntry1 = { readonly id: string; readonly esoChampionSkillId: number; readonly name: string; readonly description: string; readonly categoryId: string; readonly subcategoryId: string; readonly isSlottable: boolean; readonly effects: readonly unknown[] }

const held = codeModuleSync<{
  championPoints: { readonly data: Record<string, ChampionPointsSourceEntry1 | ChampionPointsSourceEntry>; readonly ids: readonly string[]; readonly list: readonly (ChampionPointsSourceEntry1 | ChampionPointsSourceEntry)[] }
}>("@temper/game-characters-champion-points/champion-points-source")

export const championPoints = held.championPoints
