import { afterAll, beforeEach, describe, expect, mock, test } from "bun:test"
import { calls, exportTasks, fns, reported, reset, track } from "./_dispatch-mocks-test-helpers"
import type { FileType } from "./dispatch"
import type { SyncOperation } from "./run-outcome"

const realSupabaseClient = await import("./supabase-client")
const realImportCompletion = await import("../watcher/import-completion")
const realImportSales = await import("../watcher/import-sales")
const realImportDataMining = await import("../watcher/import-data-mining")
const realImportItemRuleVerdicts = await import("../watcher/import-item-rule-verdicts")

const realRunImportCompletion = realImportCompletion.runImportCompletion
const realRunImportSales = realImportSales.runImportSales
const realRunImportDataMining = realImportDataMining.runImportDataMining

let runImportCompletionImpl = realRunImportCompletion
let runImportSalesImpl = realRunImportSales
let runImportDataMiningImpl = realRunImportDataMining

beforeEach(() => {
  runImportCompletionImpl = async () => {
    track("runImportCompletion")
  }
  runImportSalesImpl = async () => {
    track("runImportSales")
  }
  runImportDataMiningImpl = async (content) => {
    track("runImportDataMining")
    return { content, modified: false }
  }
})

await mock.module("./supabase-client", () => ({
  getSupabaseClient: () => {
    track("getSupabaseClient")
    return { __mock: true }
  },
  initSupabaseClient: async () => undefined,
  isValidSessionBlob: realSupabaseClient.isValidSessionBlob,
}))

await mock.module("../watcher/import-catalog", () => ({
  runImportCatalog: async (content: string) => {
    track("runImportCatalog", content)
  },
}))

await mock.module("../watcher/import-characters", () => ({
  runImportCharacters: async () => {
    track("runImportCharacters")
  },
  runImportCharactersWithUserId: async () => undefined,
}))

await mock.module("../watcher/import-completion", () => ({
  runImportCompletion: (...args: Parameters<typeof realRunImportCompletion>) =>
    runImportCompletionImpl(...args),
}))

await mock.module("../watcher/import-sales", () => ({
  runImportSales: (...args: Parameters<typeof realRunImportSales>) => runImportSalesImpl(...args),
  planSaleImport: realImportSales.planSaleImport,
}))

await mock.module("../watcher/import-data-mining", () => ({
  runImportDataMining: (...args: Parameters<typeof realRunImportDataMining>) =>
    runImportDataMiningImpl(...args),
}))

await mock.module("../watcher/import-tasks", () => ({
  runImportTasks: async () => {
    track("runImportTasks")
  },
  runImportTasksWithUserId: async () => undefined,
}))

await mock.module("../watcher/export-tasks", () => ({
  runExportTasks: async (content: string) => {
    track("runExportTasks")
    if (exportTasks.error !== null) throw exportTasks.error
    return {
      content,
      modified: exportTasks.modified,
      charactersConfigSideFileHash: exportTasks.sideHash,
    }
  },
  runExportTasksWithUserId: async () => undefined,
}))

await mock.module("../watcher/import-companions", () => ({
  runImportCompanions: async () => {
    track("runImportCompanions")
  },
  runImportCompanionsWithUserId: async () => undefined,
}))

await mock.module("../watcher/export-companion-builds", () => ({
  runExportCompanionBuilds: async (content: string) => {
    track("runExportCompanionBuilds")
    return { content, modified: false, companionsConfigSideFileHash: null }
  },
  runExportCompanionBuildsWithUserId: async () => undefined,
}))

await mock.module("../watcher/import-inventory", () => ({
  runImportInventory: async () => {
    track("runImportInventory")
    await Promise.resolve()
    track("runImportInventory:settled")
  },
  runImportInventoryWithUserId: async () => undefined,
}))

await mock.module("../watcher/export-settings", () => ({
  runExportSettings: async (content: string) => {
    track("runExportSettings")
    return { content, modified: false, inventoryConfigSideFileHash: null }
  },
  runExportSettingsWithUserId: async () => undefined,
}))

await mock.module("../watcher/import-item-rule-verdicts", () => ({
  runImportItemRuleVerdicts: async () => {
    track("runImportItemRuleVerdicts")
  },
  parsePendingSettingsMutations: realImportItemRuleVerdicts.parsePendingSettingsMutations,
}))

await mock.module("./report-run-outcome", () => ({
  reportRunOutcome: async (operations: readonly SyncOperation[]) => {
    reported.push([...operations])
  },
}))

const { dispatch } = await import("./dispatch")
const { TARGET_OPERATIONS } = await import("./run-outcome-observe")

afterAll(() => {
  runImportCompletionImpl = realRunImportCompletion
  runImportSalesImpl = realRunImportSales
  runImportDataMiningImpl = realRunImportDataMining
  mock.restore()
})

function stateOf(operations: readonly SyncOperation[], name: string): string | undefined {
  return operations.find((o) => o.name === name)?.state
}

const WROTE_NOTHING_BACK = {
  ok: true,
  writeBack: null,
  inventoryConfigSideFileHash: null,
  companionsConfigSideFileHash: null,
  charactersConfigSideFileHash: null,
}

const FILE_TYPES: readonly FileType[] = [
  "catalog",
  "characters",
  "companions",
  "data-mining",
  "errors",
  "inventory",
  "sales",
]

const FAKE_TOKEN = "wt_unit"
const FAKE_URL = "https://example.test"

describe("dispatch (file-watch source)", () => {
  test("catalog routes to runImportCatalog and writes nothing back", async () => {
    reset()
    const result = await dispatch("catalog", "lua-content", FAKE_TOKEN, FAKE_URL)
    const { operations, ...envelope } = result
    expect(envelope).toEqual(WROTE_NOTHING_BACK)
    expect(operations.every((o) => o.state === "synced")).toBe(true)
    expect(fns()).toContain("runImportCatalog")
    expect(fns()).not.toContain("runImportCharacters")
    expect(fns()).not.toContain("runImportCompanions")
    expect(fns()).not.toContain("runImportInventory")
    expect(fns()).not.toContain("runImportDataMining")
  })

  test("sales routes to runImportSales and writes nothing back", async () => {
    reset()
    const result = await dispatch("sales", "lua-content", FAKE_TOKEN, FAKE_URL)
    const { operations, ...envelope } = result
    expect(envelope).toEqual(WROTE_NOTHING_BACK)
    expect(operations.every((o) => o.state === "synced")).toBe(true)
    expect(fns()).toContain("runImportSales")
    expect(fns()).not.toContain("runImportCatalog")
    expect(fns()).not.toContain("runImportCharacters")
  })

  test("characters runs the import chain and the export", async () => {
    reset()
    const result = await dispatch("characters", "lua-content", FAKE_TOKEN, FAKE_URL)
    expect(result.ok).toBe(true)
    expect(fns()).toContain("runImportCharacters")
    expect(fns()).toContain("runImportCompletion")
    expect(fns()).toContain("runImportTasks")
    expect(fns()).toContain("runExportTasks")
    expect(fns()).not.toContain("runImportCatalog")
  })

  test("characters suppresses the SavedVariables write-back (side-file only) even when the export reports modified", async () => {
    reset()
    exportTasks.modified = true
    exportTasks.sideHash = "side-hash"
    try {
      const result = await dispatch("characters", "lua-content", FAKE_TOKEN, FAKE_URL)
      expect(result.ok).toBe(true)
      expect(result.writeBack).toBeNull()
      expect(result.charactersConfigSideFileHash).toBe("side-hash")
    } finally {
      exportTasks.modified = false
      exportTasks.sideHash = null
    }
  })

  test("companions runs the companions import + export pair", async () => {
    reset()
    const result = await dispatch("companions", "lua-content", FAKE_TOKEN, FAKE_URL)
    expect(result.ok).toBe(true)
    expect(fns()).toContain("runImportCompanions")
    expect(fns()).toContain("runExportCompanionBuilds")
    expect(fns()).not.toContain("runImportCatalog")
  })

  test("inventory drains the verdict outbox then runs inventory import + settings export", async () => {
    reset()
    const result = await dispatch("inventory", "lua-content", FAKE_TOKEN, FAKE_URL)
    expect(result.ok).toBe(true)
    expect(fns()).toContain("runImportItemRuleVerdicts")
    expect(fns()).toContain("runImportInventory")
    expect(fns()).toContain("runExportSettings")
    expect(fns()).not.toContain("runImportCatalog")
  })

  test("inventory completes the import before starting the export", async () => {
    reset()
    await dispatch("inventory", "lua-content", FAKE_TOKEN, FAKE_URL)
    const order = fns()
    expect(order).toContain("runImportInventory:settled")
    expect(order.indexOf("runImportInventory:settled")).toBeLessThan(
      order.indexOf("runExportSettings")
    )
  })

  test("data-mining routes to its HTTP handler", async () => {
    reset()
    const result = await dispatch("data-mining", "lua-content", FAKE_TOKEN, FAKE_URL)
    expect(result.ok).toBe(true)
    expect(calls.map((c) => c.fn)).toContain("runImportDataMining")
  })
})

describe("per-operation outcomes", () => {
  const ABSENT_ADDON_CONFIG = "/nonexistent-addons/TemperCharacters/TemperCharactersConfig.lua"

  test("an absent addon dir leaves the imports synced and the failure reaches the server", async () => {
    reset()
    const result = await dispatch("characters", "lua-content", FAKE_TOKEN, FAKE_URL, {
      charactersConfigPath: ABSENT_ADDON_CONFIG,
    })

    expect(stateOf(result.operations, "characters")).toBe("synced")
    expect(stateOf(result.operations, "completion")).toBe("synced")
    expect(stateOf(result.operations, "tasks")).toBe("synced")
    expect(stateOf(result.operations, "charactersConfig")).toBe("skipped")
    expect(reported).toHaveLength(1)
    expect(stateOf(reported[0] ?? [], "charactersConfig")).toBe("skipped")
  })

  test("an export failure does not retract imports that already committed", async () => {
    reset()
    exportTasks.error = new Error("ENOENT: no such file or directory")
    try {
      const result = await dispatch("characters", "lua-content", FAKE_TOKEN, FAKE_URL, {
        charactersConfigPath: "/tmp/TemperCharactersConfig.lua",
      })

      expect(stateOf(result.operations, "characters")).toBe("synced")
      expect(stateOf(result.operations, "completion")).toBe("synced")
      expect(stateOf(result.operations, "tasks")).toBe("synced")
      expect(stateOf(result.operations, "charactersConfig")).toBe("upload_failed")
      expect(result.ok).toBe(false)
    } finally {
      exportTasks.error = null
    }
  })

  test("an import failure holds the export back rather than exporting stale data", async () => {
    reset()
    runImportCompletionImpl = async () => {
      throw new Error("completion parse blew up")
    }
    try {
      const result = await dispatch("characters", "lua-content", FAKE_TOKEN, FAKE_URL, {
        charactersConfigPath: "/tmp/TemperCharactersConfig.lua",
      })

      expect(stateOf(result.operations, "characters")).toBe("synced")
      expect(stateOf(result.operations, "completion")).toBe("upload_failed")
      expect(stateOf(result.operations, "tasks")).toBe("skipped")
      expect(stateOf(result.operations, "charactersConfig")).toBe("skipped")
      expect(calls.map((c) => c.fn)).not.toContain("runExportTasks")
    } finally {
      runImportCompletionImpl = realRunImportCompletion
    }
  })

  test("every target reports exactly the operations its table declares", async () => {
    expect(Object.keys(TARGET_OPERATIONS)).toHaveLength(FILE_TYPES.length)
    for (const fileType of FILE_TYPES) {
      reset()
      const result = await dispatch(fileType, "lua-content", FAKE_TOKEN, FAKE_URL)
      const importNames = result.operations.filter((o) => o.kind === "import").map((o) => o.name)
      expect(importNames).toEqual([...TARGET_OPERATIONS[fileType].imports])
      expect(result.operations.every((o) => o.path.length > 0)).toBe(true)
    }
  })
})
