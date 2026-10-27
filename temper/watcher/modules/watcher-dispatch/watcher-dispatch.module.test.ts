import { expect, test } from "bun:test"
import { holdCompanionCatalogFromCheckout } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.test-fixtures.ts"
import { holdSkillCatalogFromCheckout } from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.test-fixtures.ts"
import {
  COMPLETION_NOT_LANDED,
  type DispatchOptions,
  dispatch,
} from "akasha/temper/watcher/modules/watcher-dispatch/watcher-dispatch.module.code.ts"
import {
  harness,
  READER,
  READER_WITH_NO_USER,
  WROTE_NOTHING_BACK,
} from "akasha/temper/watcher/modules/watcher-dispatch/watcher-dispatch.module.test-fixtures.ts"
import { FILE_TYPES } from "akasha/temper/watcher/modules/watcher-file-type/watcher-file-type.module.code.ts"
import { TARGET_OPERATIONS } from "akasha/temper/watcher/modules/watcher-run-observing/watcher-run-observing.module.code.ts"
import type { SyncOperation } from "akasha/temper/watcher/modules/watcher-run-outcome/watcher-run-outcome.module.code.ts"

holdCompanionCatalogFromCheckout()
holdSkillCatalogFromCheckout()

const SCRATCH_AT = "/var/tmp"

const SOURCE_PATH = `${SCRATCH_AT}/watcher-dispatch-source.lua`

const PRESENT_ADDON_CONFIG = `${SCRATCH_AT}/TemperCharactersConfig.lua`

const ABSENT_ADDON_CONFIG = `${SCRATCH_AT}/no-such-addons/TemperCharacters/Config.lua`

const MTIME_MS = 1_700_000_000_000

const FAKE_TOKEN = "wt_unit"

const FAKE_URL = "https://example.test"

const CONTENT = "lua-content"

function optionsFor(
  at: ReturnType<typeof harness>,
  extra: Partial<DispatchOptions> = {}
): DispatchOptions {
  return {
    reader: READER,
    runners: at.runners,
    report: at.report,
    sourcePath: SOURCE_PATH,
    sourceMtimeMs: MTIME_MS,
    ...extra,
  }
}

function stateOf(operations: readonly SyncOperation[], name: string): string | undefined {
  return operations.find((o) => o.name === name)?.state
}

test("catalog reaches the catalog import alone and writes nothing back", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "catalog",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importCatalog"])
})

test("sales reaches the sales import alone and writes nothing back", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "sales",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importSales"])
})

test("errors reaches the errors import and then the HUD layout export", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "errors",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importErrors", "exportHudLayout"])
})

test("errors writes the HUD layout into the core add-on's config", async () => {
  const at = harness({ hudLayoutHash: "core-hash" })
  const options = optionsFor(at, { coreConfigPath: PRESENT_ADDON_CONFIG })
  const result = await dispatch("errors", CONTENT, FAKE_TOKEN, FAKE_URL, options)
  expect(stateOf(result.operations, "coreConfig")).toBe("synced")
  expect(result.coreConfigSideFileHash).toBe("core-hash")
})

test("combat reaches the fights import alone and writes nothing back", async () => {
  const at = harness()
  const { operations, ...envelope } = await dispatch(
    "combat",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at)
  )
  expect(envelope).toEqual(WROTE_NOTHING_BACK)
  expect(operations.every((o) => o.state === "synced")).toBe(true)
  expect(at.calls).toEqual(["importFights"])
})

test("characters runs the import chain and then the export", async () => {
  const at = harness()
  const result = await dispatch("characters", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toEqual(["importCharacters", "importCompletion", "importTasks", "exportTasks"])
  expect(at.calls).not.toContain("importCatalog")
  expect(at.tasksHanded).toEqual([{}])
})

test("characters holds back the saved-variables write even where the export changed the file", async () => {
  const at = harness({ exportTasksModified: true, exportTasksHash: "side-hash" })
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(result.ok).toBe(true)
  expect(result.writeBack).toBeNull()
  expect(result.charactersConfigSideFileHash).toBe("side-hash")
})

test("companions runs the companions import beside the companion-builds export", async () => {
  const at = harness()
  const result = await dispatch("companions", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toContain("importCompanions")
  expect(at.calls).toContain("exportCompanionBuilds")
  expect(at.calls).not.toContain("importCatalog")
})

test("inventory drains the verdicts, imports the inventory, then exports the settings", async () => {
  const at = harness()
  const result = await dispatch("inventory", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toContain("importItemRuleVerdicts")
  expect(at.calls).toContain("importInventory")
  expect(at.calls).toContain("exportSettings")
  expect(at.calls).not.toContain("importCatalog")
})

test("inventory finishes its import before the settings export starts", async () => {
  const at = harness()
  await dispatch("inventory", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(at.calls).toContain("importInventory:settled")
  expect(at.calls.indexOf("importInventory:settled")).toBeLessThan(
    at.calls.indexOf("exportSettings")
  )
})

test("data-mining reaches the data-mining import", async () => {
  const at = harness()
  const result = await dispatch("data-mining", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(true)
  expect(at.calls).toEqual(["importDataMining"])
  expect(result.writeBack).toBeNull()
})

test("data-mining writes back the content the import changed", async () => {
  const at = harness({ dataMiningModified: true })
  const result = await dispatch("data-mining", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.writeBack).toBe(CONTENT)
})

const UPLOADED = { apiVersion: "eso.live.12.1.6.3309674", throughItemId: 227382 }

test("a mining import answering no items uploaded writes no catalog config", async () => {
  const at = harness()
  const result = await dispatch(
    "data-mining",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { catalogConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(at.calls).toEqual(["importDataMining"])
  expect(result.catalogConfigSideFileHash).toBeNull()
})

test("a mining import answering items uploaded writes them into the catalog config", async () => {
  const at = harness({ minedItemsUploaded: UPLOADED, minedUploadedHash: "catalog-hash" })
  const result = await dispatch(
    "data-mining",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { catalogConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(at.calls).toEqual(["importDataMining", "exportMinedUploaded"])
  expect(stateOf(result.operations, "catalogConfig")).toBe("synced")
  expect(result.catalogConfigSideFileHash).toBe("catalog-hash")
  expect(result.ok).toBe(true)
})

test("an absent catalog addon leaves the mining import synced and the config skipped", async () => {
  const at = harness({ minedItemsUploaded: UPLOADED, minedUploadedHash: "catalog-hash" })
  const result = await dispatch(
    "data-mining",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { catalogConfigPath: ABSENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "dataMining")).toBe("synced")
  expect(stateOf(result.operations, "catalogConfig")).toBe("skipped")
  expect(result.catalogConfigSideFileHash).toBeNull()
})

const SETS_LANDED = {
  itemSetCatalog: { apiVersion: "eso.live.12.1.6.3309674", invalidateVersion: 4 },
}

test("a catalog import answering catalogs landed writes them into the catalog config", async () => {
  const at = harness({ catalogsLanded: SETS_LANDED, landedHash: "landed-hash" })
  const result = await dispatch(
    "catalog",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { catalogLandedPath: PRESENT_ADDON_CONFIG })
  )
  expect(at.calls).toEqual(["importCatalog", "exportLandedCatalogs"])
  expect(stateOf(result.operations, "catalogLanded")).toBe("synced")
  expect(result.catalogLandedSideFileHash).toBe("landed-hash")
})

test("an absent addon directory leaves the imports synced and the side file skipped", async () => {
  const at = harness()
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: ABSENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "characters")).toBe("synced")
  expect(stateOf(result.operations, "completion")).toBe("synced")
  expect(stateOf(result.operations, "tasks")).toBe("synced")
  expect(stateOf(result.operations, "charactersConfig")).toBe("skipped")
  expect(at.reported).toHaveLength(1)
  expect(stateOf(at.reported[0] ?? [], "charactersConfig")).toBe("skipped")
})

test("an export that throws does not retract the imports that already landed", async () => {
  const at = harness({ exportTasksError: new Error("ENOENT: no such file or directory") })
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { charactersConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "characters")).toBe("synced")
  expect(stateOf(result.operations, "completion")).toBe("synced")
  expect(stateOf(result.operations, "tasks")).toBe("synced")
  expect(stateOf(result.operations, "charactersConfig")).toBe("upload_failed")
  expect(result.ok).toBe(false)
})

async function statesAfter(at: ReturnType<typeof harness>) {
  const options = optionsFor(at, { charactersConfigPath: PRESENT_ADDON_CONFIG })
  const result = await dispatch("characters", CONTENT, FAKE_TOKEN, FAKE_URL, options)
  return result.operations.map((o) => o.state)
}

test("a failed completion import runs tasks and the export, recomputing no progress", async () => {
  const at = harness({ completionError: new Error("unparsed") })
  expect(await statesAfter(at)).toEqual(["synced", "upload_failed", "synced", "synced"])
  const refresh = at.tasksHanded[0]?.refreshProgress ?? (async () => 0)
  await expect(refresh("a", [])).rejects.toThrow(COMPLETION_NOT_LANDED)
})

test("a failed characters import holds the tasks import and the export back", async () => {
  const at = harness({ charactersError: new Error("unread") })
  expect(await statesAfter(at)).toEqual(["upload_failed", "skipped", "skipped", "skipped"])
  expect(at.calls).toEqual(["importCharacters"])
})

test("a settings export that refuses leaves the addon's config alone and the run alive", async () => {
  const refusal = "the inventory settings this account holds are no version 2 rule set"
  const at = harness({ exportSettingsError: new Error(refusal) })
  const result = await dispatch(
    "inventory",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { inventoryConfigPath: PRESENT_ADDON_CONFIG })
  )
  expect(stateOf(result.operations, "itemRuleVerdicts")).toBe("synced")
  expect(stateOf(result.operations, "inventory")).toBe("synced")
  expect(stateOf(result.operations, "inventoryConfig")).toBe("upload_failed")
  expect(result.operations.find((o) => o.name === "inventoryConfig")?.detail).toBe(refusal)
  expect(result.inventoryConfigSideFileHash).toBeNull()
  expect(result.writeBack).toBeNull()
  expect(result.ok).toBe(false)
  expect(result.error).toBeUndefined()
})

test("every kind of file reports the import operations its table names", async () => {
  expect(Object.keys(TARGET_OPERATIONS)).toHaveLength(FILE_TYPES.length)
  for (const fileType of FILE_TYPES) {
    const at = harness()
    const result = await dispatch(fileType, CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
    const importNames = result.operations.filter((o) => o.kind === "import").map((o) => o.name)
    expect(importNames).toEqual([...TARGET_OPERATIONS[fileType].imports])
    expect(result.operations.every((o) => o.path.length > 0)).toBe(true)
  }
})

test("every kind of file reaches a handler", async () => {
  for (const fileType of FILE_TYPES) {
    const at = harness()
    const result = await dispatch(fileType, CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
    expect(result.operations.length).toBeGreaterThan(0)
    expect(result.error).toBeUndefined()
  }
})

test("an import operation carries the modification time the caller stated", async () => {
  const at = harness()
  const result = await dispatch("catalog", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.operations[0]?.fileModifiedAt).toBe(new Date(MTIME_MS).toISOString())
  expect(result.operations[0]?.path).toBe(SOURCE_PATH)
})

test("a modification time of zero leaves the operation without one", async () => {
  const at = harness()
  const result = await dispatch(
    "catalog",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { sourceMtimeMs: 0 })
  )
  expect(result.operations[0]?.fileModifiedAt).toBeUndefined()
})

test("the completion import is handed the user the supabase reader signs in", async () => {
  const at = harness()
  await dispatch("characters", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(at.usersAsked).toEqual(["user-1"])
})

test("a reader signing in no user fails the completion import and names the work", async () => {
  const at = harness()
  const result = await dispatch(
    "characters",
    CONTENT,
    FAKE_TOKEN,
    FAKE_URL,
    optionsFor(at, { reader: READER_WITH_NO_USER })
  )
  const completion = result.operations.find((o) => o.name === "completion")
  expect(completion?.state).toBe("upload_failed")
  expect(completion?.detail).toBe(
    "no signed-in user to import this completion (the session carried no user)"
  )
  expect(result.ok).toBe(false)
})

test("a throw while reporting comes back as a result carrying the message", async () => {
  const at = harness({ reportError: new Error("enrolment unreachable") })
  const result = await dispatch("catalog", CONTENT, FAKE_TOKEN, FAKE_URL, optionsFor(at))
  expect(result.ok).toBe(false)
  expect(result.error).toBe("enrolment unreachable")
  expect(result.operations).toEqual([])
})
