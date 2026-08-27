import { createHash } from "node:crypto"
import { readFileSync, writeFileSync } from "node:fs"
import {
  type InventoryConfigFileInputs,
  serializeInventoryConfigFile,
} from "./export-settings-config-file"

export interface SideFileValues {
  sell?: unknown
  sellTimestamps?: unknown
  sellCompiled?: unknown
  logging?: unknown
  safety?: unknown
  automation?: unknown
  backpack?: unknown
  currencyRates?: Record<string, number>
  crownReplacementCosts?: Record<number, number>
}

export function buildSideFileContent(values: SideFileValues): string {
  if (
    values.logging === undefined ||
    values.safety === undefined ||
    values.backpack === undefined ||
    values.currencyRates === undefined ||
    values.crownReplacementCosts === undefined
  ) {
    throw new Error(
      "runExportSettings: side-file inputs missing required logging/safety/backpack/pricing values"
    )
  }
  const inputs: InventoryConfigFileInputs = {
    sell: values.sell,
    sellTimestamps: values.sellTimestamps,
    sellCompiled: values.sellCompiled,
    logging: values.logging,
    safety: values.safety,
    backpack: values.backpack,
    automation: values.automation,
    currencyRates: values.currencyRates,
    crownReplacementCosts: values.crownReplacementCosts,
  }
  return serializeInventoryConfigFile(inputs)
}

export function writeSideFileIfChanged(path: string, desired: string): string {
  let current: string | null = null
  try {
    current = readFileSync(path, "utf-8")
  } catch {}
  if (current !== desired) {
    writeFileSync(path, desired)
  }
  return createHash("sha256").update(desired).digest("hex")
}
