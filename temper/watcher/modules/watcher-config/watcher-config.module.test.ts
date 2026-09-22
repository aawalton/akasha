import { expect, test } from "bun:test"
import {
  buildConfig,
  sourcePathFor,
} from "akasha/temper/watcher/modules/watcher-config/watcher-config.module.code.ts"
import { FILE_TYPES } from "akasha/temper/watcher/modules/watcher-file-type/watcher-file-type.module.code.ts"

const DIRS = { savedVarsDir: "/game/SavedVariables", addonsDir: "/game/AddOns" }

const CONFIG = buildConfig(DIRS)

test("the directories the caller names are the directories used", () => {
  expect(CONFIG.savedVarsDir).toBe("/game/SavedVariables")
  expect(CONFIG.addonsDir).toBe("/game/AddOns")
})

test("a saved-variables file sits in the saved-variables directory", () => {
  for (const path of [
    CONFIG.temperCharactersPath,
    CONFIG.companionsPath,
    CONFIG.temperCatalogPath,
    CONFIG.dataMiningPath,
    CONFIG.inventoryPath,
    CONFIG.temperErrorsPath,
    CONFIG.salesPath,
  ]) {
    expect(path).toStartWith("/game/SavedVariables/")
    expect(path).toEndWith(".lua")
  }
})

test("a config file written back sits in its own addon's directory", () => {
  expect(CONFIG.inventoryConfigPath).toBe("/game/AddOns/TemperItems/TemperItemsConfig.lua")
  expect(CONFIG.catalogConfigPath).toBe("/game/AddOns/TemperCatalog/TemperCatalogConfig.lua")
  expect(CONFIG.charactersConfigPath).toBe(
    "/game/AddOns/TemperCharacters/TemperCharactersConfig.lua"
  )
  expect(CONFIG.companionsConfigPath).toBe(
    "/game/AddOns/TemperCharacters/TemperCharactersCompanionsConfig.lua"
  )
})

test("every kind of file the watcher knows names the file that kind is read from", () => {
  for (const kind of FILE_TYPES) {
    const path = sourcePathFor(kind, CONFIG)
    expect(path).toStartWith("/game/SavedVariables/")
    expect(path).toEndWith(".lua")
  }
})

test("the catalog kind and the data-mining kind are read from the one file the catalog add-on writes", () => {
  expect(sourcePathFor("data-mining", CONFIG)).toBe(sourcePathFor("catalog", CONFIG))
  const others = FILE_TYPES.filter(
    (kind) => kind !== "data-mining" && kind !== "companions" && kind !== "sales"
  ).map((kind) => sourcePathFor(kind, CONFIG))
  expect(new Set(others).size).toBe(others.length)
})

test("the characters kind and the companions kind are read from the one file the characters add-on writes", () => {
  expect(sourcePathFor("companions", CONFIG)).toBe(sourcePathFor("characters", CONFIG))
})

test("the inventory kind and the sales kind are read from the one file the items add-on writes", () => {
  expect(sourcePathFor("sales", CONFIG)).toBe(sourcePathFor("inventory", CONFIG))
})

test("each kind is read from the file its name says", () => {
  expect(sourcePathFor("catalog", CONFIG)).toBe(CONFIG.temperCatalogPath)
  expect(sourcePathFor("characters", CONFIG)).toBe(CONFIG.temperCharactersPath)
  expect(sourcePathFor("companions", CONFIG)).toBe(CONFIG.companionsPath)
  expect(sourcePathFor("data-mining", CONFIG)).toBe(CONFIG.dataMiningPath)
  expect(sourcePathFor("errors", CONFIG)).toBe(CONFIG.temperErrorsPath)
  expect(sourcePathFor("inventory", CONFIG)).toBe(CONFIG.inventoryPath)
  expect(sourcePathFor("sales", CONFIG)).toBe(CONFIG.salesPath)
})

test("a saved-variables file is named for the addon that writes it", () => {
  expect(CONFIG.temperCharactersPath).toBe("/game/SavedVariables/TemperCharacters.lua")
  expect(CONFIG.companionsPath).toBe("/game/SavedVariables/TemperCharacters.lua")
  expect(CONFIG.temperCatalogPath).toBe("/game/SavedVariables/TemperCatalog.lua")
  expect(CONFIG.dataMiningPath).toBe("/game/SavedVariables/TemperCatalog.lua")
  expect(CONFIG.inventoryPath).toBe("/game/SavedVariables/TemperItems.lua")
  expect(CONFIG.temperErrorsPath).toBe("/game/SavedVariables/TemperHud.lua")
  expect(CONFIG.salesPath).toBe("/game/SavedVariables/TemperItems.lua")
})

test("a config built for one game folder names nothing in another", () => {
  const other = buildConfig({ savedVarsDir: "/other/SavedVariables", addonsDir: "/other/AddOns" })
  for (const kind of FILE_TYPES) {
    expect(sourcePathFor(kind, other)).not.toBe(sourcePathFor(kind, CONFIG))
  }
})
