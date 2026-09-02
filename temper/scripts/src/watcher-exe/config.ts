import { join } from "node:path"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import { addonsDir as resolveAddonsDir, savedVarsDir as resolveSavedVarsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import type { FileType } from "./dispatch"

export interface WatcherConfig {
  savedVarsDir: string
  addonsDir: string
  temperCharactersPath: string
  temperCompanionsPath: string
  temperCatalogPath: string
  dataMiningPath: string
  inventoryPath: string
  inventoryConfigPath: string
  catalogConfigPath: string
  charactersConfigPath: string
  companionsConfigPath: string
  temperErrorsPath: string
  temperSalesPath: string
}

function resolveEsoSavedVarsDir(): string {
  return resolveSavedVarsDir()
}

function resolveEsoAddonsDir(): string {
  return resolveAddonsDir()
}

export function buildConfig(): WatcherConfig {
  const savedVarsDir = resolveEsoSavedVarsDir()
  const addonsDir = resolveEsoAddonsDir()

  return {
    savedVarsDir,
    addonsDir,
    temperCharactersPath: join(savedVarsDir, "TemperCharacters.lua"),
    temperCompanionsPath: join(savedVarsDir, "TemperCompanions.lua"),
    temperCatalogPath: join(savedVarsDir, "TemperCatalog.lua"),
    dataMiningPath: join(savedVarsDir, "TemperDataMining.lua"),
    inventoryPath: join(savedVarsDir, "TemperInventory.lua"),
    inventoryConfigPath: join(addonsDir, "TemperInventory", "TemperInventoryConfig.lua"),
    catalogConfigPath: join(addonsDir, "TemperCatalog", "TemperCatalogConfig.lua"),
    charactersConfigPath: join(addonsDir, "TemperCharacters", "TemperCharactersConfig.lua"),
    companionsConfigPath: join(addonsDir, "TemperCompanions", "TemperCompanionsConfig.lua"),
    temperErrorsPath: join(savedVarsDir, "TemperErrors.lua"),
    temperSalesPath: join(savedVarsDir, "TemperSales.lua"),
  }
}

export function sourcePathFor(fileType: FileType, config: WatcherConfig): string {
  switch (fileType) {
    case "catalog":
      return config.temperCatalogPath
    case "characters":
      return config.temperCharactersPath
    case "companions":
      return config.temperCompanionsPath
    case "data-mining":
      return config.dataMiningPath
    case "errors":
      return config.temperErrorsPath
    case "inventory":
      return config.inventoryPath
    case "sales":
      return config.temperSalesPath
    default:
      return assertNever(fileType)
  }
}
