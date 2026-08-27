import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  vampireStages: { readonly data: Record<string, { readonly id: string; readonly name: string; readonly stage: number; readonly esoVampireStageId: number; readonly description: string }>; readonly ids: readonly string[]; readonly list: readonly { readonly id: string; readonly name: string; readonly stage: number; readonly esoVampireStageId: number; readonly description: string }[] }
}>("@temper/game-characters-character/vampire-stages-data")

export const vampireStages = held.vampireStages
