import { codeModuleSync } from "../../code-import.ts"

const held = codeModuleSync<{
  equipmentQualities: { readonly ids: readonly string[] }
}>("@temper/game-characters-equipment/quality-data")

export const equipmentQualities = held.equipmentQualities
