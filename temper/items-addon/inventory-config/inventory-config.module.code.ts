import { getSavedVariables } from "../inventory-saved-variables-ref/inventory-saved-variables-ref.module.code.ts"
import type {
  InventoryConfigGlobal,
  SavedVariablesData,
} from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export interface InventoryConfigView {
  sell: SavedVariablesData["sell"]
  sellTimestamps: SavedVariablesData["sellTimestamps"]
  sellCompiled: SavedVariablesData["sellCompiled"]
  logging: SavedVariablesData["logging"]
  safety: SavedVariablesData["safety"]
  automation: SavedVariablesData["automation"]
  backpack: SavedVariablesData["backpack"]
  currencyRates: Record<string, number>
  crownReplacementCosts: Record<number, number>
}

function isActiveInventoryConfig(value: unknown): value is InventoryConfigGlobal {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value)) return false
  return typeof value.version === "number" && value.version > 0
}

function getActiveConfig(): InventoryConfigGlobal | undefined {
  const candidate: unknown = globalThis.TemperInventoryConfig
  return isActiveInventoryConfig(candidate) ? candidate : undefined
}

export function getInventoryConfig(): InventoryConfigView {
  const cfg = getActiveConfig()
  const sv = getSavedVariables()
  return {
    sell: cfg?.sell ?? sv.sell,
    sellTimestamps: cfg?.sellTimestamps ?? sv.sellTimestamps,
    sellCompiled: cfg?.sellCompiled ?? sv.sellCompiled,
    logging: cfg?.logging ?? sv.logging,
    safety: cfg?.safety ?? sv.safety,
    automation: cfg?.automation ?? sv.automation,
    backpack: cfg?.backpack ?? sv.backpack,
    currencyRates: cfg?.currencyRates ?? {},
    crownReplacementCosts: cfg?.crownReplacementCosts ?? {},
  }
}
