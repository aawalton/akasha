import { expect, test } from "bun:test"
import {
  parseSideFile,
  serializeSideFile,
} from "akasha/temper/catalog/side-file/modules/catalog-side-file/catalog-side-file.module.code.ts"
import { runExportMinedUploaded } from "akasha/temper/watcher/modules/watcher-export-mined-uploaded/watcher-export-mined-uploaded.module.code.ts"
import { held } from "akasha/temper/watcher/modules/watcher-export-mined-uploaded/watcher-export-mined-uploaded.module.test-fixtures.ts"

const PATH = "/addons/TemperCatalog/TemperCatalogConfig.lua"

const NOW = "eso.live.12.1.6.3309674"

const BEFORE = "eso.live.12.1.5.3303624"

const INVALIDATING = serializeSideFile({
  version: 1,
  invalidateVersion: 1790268342864,
  invalidateDomains: ["engineAnswerCatalog"],
  minedItemsUploaded: { apiVersion: BEFORE, throughItemId: 227382 },
})

test("the marker for a new game version replaces the old and keeps the invalidations", async () => {
  const h = held(INVALIDATING)
  await runExportMinedUploaded(PATH, { apiVersion: NOW, throughItemId: 227382 }, h.disk)
  expect(parseSideFile(h.content() ?? "")).toEqual({
    version: 1,
    invalidateVersion: 1790268342864,
    invalidateDomains: ["engineAnswerCatalog"],
    minedItemsUploaded: { apiVersion: NOW, throughItemId: 227382 },
  })
})

test("a higher item already named for the same game version is kept", async () => {
  const h = held(
    serializeSideFile({
      version: 1,
      invalidateVersion: 0,
      invalidateDomains: [],
      minedItemsUploaded: { apiVersion: NOW, throughItemId: 300 },
    })
  )
  await runExportMinedUploaded(PATH, { apiVersion: NOW, throughItemId: 200 }, h.disk)
  expect(parseSideFile(h.content() ?? "")?.minedItemsUploaded).toEqual({
    apiVersion: NOW,
    throughItemId: 300,
  })
})

test("a config already holding the marker is not written again", async () => {
  const h = held(INVALIDATING)
  await runExportMinedUploaded(PATH, { apiVersion: BEFORE, throughItemId: 227382 }, h.disk)
  expect(h.writes).toHaveLength(0)
})

test("an absent config is written new", async () => {
  const h = held(undefined)
  const hash = await runExportMinedUploaded(PATH, { apiVersion: NOW, throughItemId: 9 }, h.disk)
  expect(hash).not.toBeNull()
  expect(parseSideFile(h.content() ?? "")?.minedItemsUploaded).toEqual({
    apiVersion: NOW,
    throughItemId: 9,
  })
})

test("a config this cannot read is refused rather than written over", async () => {
  const h = held("TemperCatalogConfig = { broken")
  await expect(
    runExportMinedUploaded(PATH, { apiVersion: NOW, throughItemId: 9 }, h.disk)
  ).rejects.toThrow("holds a catalog config this cannot read")
  expect(h.writes).toHaveLength(0)
})

test("no config path writes nothing and answers no hash", async () => {
  const h = held(INVALIDATING)
  const hash = await runExportMinedUploaded(
    undefined,
    { apiVersion: NOW, throughItemId: 9 },
    h.disk
  )
  expect(hash).toBeNull()
  expect(h.writes).toHaveLength(0)
})
