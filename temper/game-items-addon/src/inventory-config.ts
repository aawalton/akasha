import { getSavedVariables } from "./saved-variables"
import type { InventoryConfigGlobal, SavedVariablesData } from "./types"

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

function isInventoryConfig(value: unknown): value is InventoryConfigGlobal {
  if (typeof value !== "object" || value === null) return false
  if (!("version" in value)) return false
  return typeof value.version === "number"
}

function getActiveConfig(): InventoryConfigGlobal | undefined {
  const candidate: unknown = globalThis.TemperInventoryConfig
  if (!isInventoryConfig(candidate)) return undefined
  if (candidate.version <= 0) return undefined
  return candidate
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
