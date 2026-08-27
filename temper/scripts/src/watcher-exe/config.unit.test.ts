import { afterEach, beforeEach, expect, test } from "bun:test"
import { z } from "zod"
import { buildConfig } from "./config"

const PREV = z.string().optional().parse(process.env.ESO_LIVE_DIR)
const LIVE = "/tmp/eso-live-config-test"

beforeEach(() => {
  process.env.ESO_LIVE_DIR = LIVE
})

afterEach(() => {
  if (PREV === undefined) delete process.env.ESO_LIVE_DIR
  else process.env.ESO_LIVE_DIR = PREV
})

test("characters target reads the standalone TemperCharacters.lua, not the frozen legacy Temper.lua", () => {
  const config = buildConfig()
  expect(config.temperCharactersPath).toBe(`${LIVE}/SavedVariables/TemperCharacters.lua`)
  expect(config.temperCharactersPath).not.toContain("/Temper.lua")
})

test("characters side-file lives under the standalone TemperCharacters AddOns directory", () => {
  const config = buildConfig()
  expect(config.charactersConfigPath).toBe(
    `${LIVE}/AddOns/TemperCharacters/TemperCharactersConfig.lua`
  )
  expect(config.charactersConfigPath).not.toContain("/AddOns/Temper/")
})

test("standalone targets keep their per-member SavedVariables files", () => {
  const config = buildConfig()
  expect(config.temperCompanionsPath).toBe(`${LIVE}/SavedVariables/TemperCompanions.lua`)
  expect(config.inventoryPath).toBe(`${LIVE}/SavedVariables/TemperInventory.lua`)
  expect(config.temperCatalogPath).toBe(`${LIVE}/SavedVariables/TemperCatalog.lua`)
})
