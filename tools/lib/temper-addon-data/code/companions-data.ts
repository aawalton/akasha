import { codeModuleSync } from "../../code-import.ts"

type CompanionsDataEntry = { readonly id: string; readonly name: string; readonly title: string; readonly alliance: string; readonly icon: string; readonly esoCompanionId: number; readonly classPassiveId: string; readonly passiveEffects: readonly { readonly metricId: unknown; readonly value: unknown }[] }

type CompanionsDataEntry1 = { readonly id: string; readonly name: string; readonly title: string; readonly alliance: string; readonly icon: null; readonly esoCompanionId: number; readonly classPassiveId: null; readonly passiveEffects: readonly unknown[] }

const held = codeModuleSync<{
  companions: { readonly data: Record<string, CompanionsDataEntry1 | CompanionsDataEntry>; readonly ids: readonly string[]; readonly list: readonly (CompanionsDataEntry1 | CompanionsDataEntry)[] }
}>("@temper/game-companions-core/companions-data")

export const companions = held.companions
