import { expect, test } from "bun:test"
import { FILE_TYPES } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { buildConfig, sourcePathFor } from "./watcher-config.module.code.ts"

const DIRS = { savedVarsDir: "/game/SavedVariables", addonsDir: "/game/AddOns" }

const CONFIG = buildConfig(DIRS)

test("the directories the caller names are the directories used", () => {
  expect(CONFIG.savedVarsDir).toBe("/game/SavedVariables")
  expect(CONFIG.addonsDir).toBe("/game/AddOns")
})

test("a saved-variables file sits in the saved-variables directory", () => {
  for (const path of [
    CONFIG.temperCharactersPath,
    CONFIG.temperCompanionsPath,
    CONFIG.temperCatalogPath,
    CONFIG.dataMiningPath,
    CONFIG.inventoryPath,
    CONFIG.temperErrorsPath,
    CONFIG.temperSalesPath,
  ]) {
    expect(path).toStartWith("/game/SavedVariables/")
    expect(path).toEndWith(".lua")
  }
})

test("a config file written back sits in its own addon's directory", () => {
  expect(CONFIG.inventoryConfigPath).toBe("/game/AddOns/TemperInventory/TemperInventoryConfig.lua")
  expect(CONFIG.catalogConfigPath).toBe("/game/AddOns/TemperCatalog/TemperCatalogConfig.lua")
  expect(CONFIG.charactersConfigPath).toBe(
    "/game/AddOns/TemperCharacters/TemperCharactersConfig.lua"
  )
  expect(CONFIG.companionsConfigPath).toBe(
    "/game/AddOns/TemperCompanions/TemperCompanionsConfig.lua"
  )
})

test("every kind of file the watcher knows names the file that kind is read from", () => {
  for (const kind of FILE_TYPES) {
    const path = sourcePathFor(kind, CONFIG)
    expect(path).toStartWith("/game/SavedVariables/")
    expect(path).toEndWith(".lua")
  }
})

test("no two kinds are read from the same file", () => {
  const paths = FILE_TYPES.map((kind) => sourcePathFor(kind, CONFIG))
  expect(new Set(paths).size).toBe(FILE_TYPES.length)
})

test("each kind is read from the file its name says", () => {
  expect(sourcePathFor("catalog", CONFIG)).toBe(CONFIG.temperCatalogPath)
  expect(sourcePathFor("characters", CONFIG)).toBe(CONFIG.temperCharactersPath)
  expect(sourcePathFor("companions", CONFIG)).toBe(CONFIG.temperCompanionsPath)
  expect(sourcePathFor("data-mining", CONFIG)).toBe(CONFIG.dataMiningPath)
  expect(sourcePathFor("errors", CONFIG)).toBe(CONFIG.temperErrorsPath)
  expect(sourcePathFor("inventory", CONFIG)).toBe(CONFIG.inventoryPath)
  expect(sourcePathFor("sales", CONFIG)).toBe(CONFIG.temperSalesPath)
})

test("a saved-variables file is named for the addon that writes it", () => {
  expect(CONFIG.temperCharactersPath).toBe("/game/SavedVariables/TemperCharacters.lua")
  expect(CONFIG.temperCompanionsPath).toBe("/game/SavedVariables/TemperCompanions.lua")
  expect(CONFIG.temperCatalogPath).toBe("/game/SavedVariables/TemperCatalog.lua")
  expect(CONFIG.dataMiningPath).toBe("/game/SavedVariables/TemperDataMining.lua")
  expect(CONFIG.inventoryPath).toBe("/game/SavedVariables/TemperInventory.lua")
  expect(CONFIG.temperErrorsPath).toBe("/game/SavedVariables/TemperErrors.lua")
  expect(CONFIG.temperSalesPath).toBe("/game/SavedVariables/TemperSales.lua")
})

test("a config built for one game folder names nothing in another", () => {
  const other = buildConfig({ savedVarsDir: "/other/SavedVariables", addonsDir: "/other/AddOns" })
  for (const kind of FILE_TYPES) {
    expect(sourcePathFor(kind, other)).not.toBe(sourcePathFor(kind, CONFIG))
  }
})
