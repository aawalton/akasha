import type { RunReport } from "akasha/temper/watcher/modules/watcher-dispatch/watcher-dispatch.module.code.ts"
import type { DispatchRunners } from "akasha/temper/watcher/modules/watcher-dispatch-runners/watcher-dispatch-runners.module.code.ts"
import type { ImportTasksOptions } from "akasha/temper/watcher/modules/watcher-import-tasks/watcher-import-tasks.module.code.ts"
import type { SyncOperation } from "akasha/temper/watcher/modules/watcher-run-outcome/watcher-run-outcome.module.code.ts"
import type { SignedInReader } from "akasha/temper/watcher/modules/watcher-signed-in-user/watcher-signed-in-user.module.code.ts"

export const READER: SignedInReader = {
  auth: { getUser: async () => ({ data: { user: { id: "user-1" } }, error: null }) },
}

export const READER_WITH_NO_USER: SignedInReader = {
  auth: { getUser: async () => ({ data: { user: null }, error: null }) },
}

export const WROTE_NOTHING_BACK = {
  ok: true,
  writeBack: null,
  inventoryConfigSideFileHash: null,
  companionsConfigSideFileHash: null,
  charactersConfigSideFileHash: null,
  catalogConfigSideFileHash: null,
  catalogLandedSideFileHash: null,
  coreConfigSideFileHash: null,
}

interface Tweaks {
  exportTasksModified: boolean
  exportTasksHash: string | null
  exportTasksError: Error | null
  exportSettingsError: Error | null
  completionError: Error | null
  charactersError: Error | null
  dataMiningModified: boolean
  minedItemsUploaded: { readonly apiVersion: string; readonly throughItemId: number } | null
  minedUploadedHash: string | null
  catalogsLanded: Readonly<Record<string, { apiVersion: string; invalidateVersion: number }>>
  landedHash: string | null
  hudLayoutHash: string | null
  reportError: Error | null
}

const CALM: Tweaks = {
  exportTasksModified: false,
  exportTasksHash: null,
  exportTasksError: null,
  exportSettingsError: null,
  completionError: null,
  charactersError: null,
  dataMiningModified: false,
  minedItemsUploaded: null,
  minedUploadedHash: null,
  catalogsLanded: {},
  landedHash: null,
  hudLayoutHash: null,
  reportError: null,
}

interface Harness {
  readonly calls: string[]
  readonly tasksHanded: (ImportTasksOptions | undefined)[]
  readonly reported: (readonly SyncOperation[])[]
  readonly usersAsked: (string | undefined)[]
  readonly runners: DispatchRunners
  readonly report: RunReport
}

export function harness(tweaks: Partial<Tweaks> = {}): Harness {
  const t: Tweaks = { ...CALM, ...tweaks }
  const calls: string[] = []
  const tasksHanded: (ImportTasksOptions | undefined)[] = []
  const reported: (readonly SyncOperation[])[] = []
  const usersAsked: (string | undefined)[] = []
  const runners: DispatchRunners = {
    importCatalog: async () => {
      calls.push("importCatalog")
      return { changedSlugs: [], absentSlugs: [], landed: t.catalogsLanded, skipped: undefined }
    },
    importCharacters: async () => {
      calls.push("importCharacters")
      if (t.charactersError !== null) throw t.charactersError
    },
    importCompanions: async () => {
      calls.push("importCompanions")
    },
    importCompletion: async (_content, deps) => {
      calls.push("importCompletion")
      if (t.completionError !== null) throw t.completionError
      const askUser = deps?.signedInUserId
      if (askUser !== undefined) usersAsked.push(await askUser())
      return {
        accountPageId: "account-1",
        accountCompletionWritten: false,
        characterCount: 0,
        companionCount: 0,
        preservedLabels: [],
      }
    },
    importDataMining: async (content) => {
      calls.push("importDataMining")
      return {
        content,
        modified: t.dataMiningModified,
        notes: [],
        minedItemsUploaded: t.minedItemsUploaded,
      }
    },
    importErrors: async () => {
      calls.push("importErrors")
    },
    importFights: async () => {
      calls.push("importFights")
      return { landed: 0, unplaced: [] }
    },
    importInventory: async () => {
      calls.push("importInventory")
      await Promise.resolve()
      calls.push("importInventory:settled")
    },
    importItemRuleVerdicts: async () => {
      calls.push("importItemRuleVerdicts")
    },
    importSales: async () => {
      calls.push("importSales")
    },
    importTasks: async (_content, _reader, options) => {
      calls.push("importTasks")
      tasksHanded.push(options)
    },
    exportCompanionBuilds: async (content) => {
      calls.push("exportCompanionBuilds")
      return { content, modified: false, companionsConfigSideFileHash: null }
    },
    exportHudLayout: async (path) => {
      calls.push("exportHudLayout")
      return path === undefined ? null : t.hudLayoutHash
    },
    exportLandedCatalogs: async (path) => {
      calls.push("exportLandedCatalogs")
      return path === undefined ? null : t.landedHash
    },
    exportMinedUploaded: async (path) => {
      calls.push("exportMinedUploaded")
      return path === undefined ? null : t.minedUploadedHash
    },
    exportSettings: async (content) => {
      calls.push("exportSettings")
      if (t.exportSettingsError !== null) throw t.exportSettingsError
      return { content, modified: false, inventoryConfigSideFileHash: null }
    },
    exportTasks: async (content) => {
      calls.push("exportTasks")
      if (t.exportTasksError !== null) throw t.exportTasksError
      return {
        content,
        modified: t.exportTasksModified,
        charactersConfigSideFileHash: t.exportTasksHash,
      }
    },
  }
  const report: RunReport = async (operations) => {
    if (t.reportError !== null) throw t.reportError
    reported.push([...operations])
  }
  return { calls, tasksHanded, reported, usersAsked, runners, report }
}
