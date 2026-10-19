import { expect, test } from "bun:test"
import {
  parseSideFile,
  serializeSideFile,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"
import { runExportLandedCatalogs } from "akasha/temper/watcher/modules/watcher-export-landed-catalogs/watcher-export-landed-catalogs.module.code.ts"
import { held } from "akasha/temper/watcher/modules/watcher-export-mined-uploaded/watcher-export-mined-uploaded.module.test-fixtures.ts"

const PATH = "/addons/TemperCatalog/TemperCatalogConfig.lua"

const NOW = "eso.live.12.1.6.3309674"

const SETS = { itemSetCatalog: { apiVersion: NOW, invalidateVersion: 1790268342864 } }

const INVALIDATING = serializeSideFile({
  version: 1,
  invalidateVersion: 1790268342864,
  invalidateDomains: ["engineAnswerCatalog"],
  minedItemsUploaded: { apiVersion: NOW, throughItemId: 227382 },
})

test("the catalogs landed are named and the rest of the config is kept", async () => {
  const h = held(INVALIDATING)
  await runExportLandedCatalogs(PATH, SETS, h.disk)
  expect(parseSideFile(h.content() ?? "")).toEqual({
    version: 1,
    invalidateVersion: 1790268342864,
    invalidateDomains: ["engineAnswerCatalog"],
    minedItemsUploaded: { apiVersion: NOW, throughItemId: 227382 },
    landedCatalogs: SETS,
  })
})

test("a config already naming the catalogs landed is not written again", async () => {
  const h = held(INVALIDATING)
  await runExportLandedCatalogs(PATH, SETS, h.disk)
  await runExportLandedCatalogs(PATH, SETS, h.disk)
  expect(h.writes).toHaveLength(1)
})

test("an absent config is written new", async () => {
  const h = held(undefined)
  expect(await runExportLandedCatalogs(PATH, SETS, h.disk)).not.toBeNull()
  expect(parseSideFile(h.content() ?? "")?.landedCatalogs).toEqual(SETS)
})

test("a config this cannot read is refused rather than written over", async () => {
  const h = held("TemperCatalogConfig = { broken")
  await expect(runExportLandedCatalogs(PATH, SETS, h.disk)).rejects.toThrow(
    "holds a catalog config this cannot read"
  )
  expect(h.writes).toHaveLength(0)
})

test("no config path writes nothing and answers no hash", async () => {
  const h = held(INVALIDATING)
  expect(await runExportLandedCatalogs(undefined, SETS, h.disk)).toBeNull()
  expect(h.writes).toHaveLength(0)
})
