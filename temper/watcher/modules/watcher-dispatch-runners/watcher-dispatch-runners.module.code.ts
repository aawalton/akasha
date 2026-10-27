import { loadCompanionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog-loading/companion-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { runExportCompanionBuilds } from "akasha/temper/watcher/modules/watcher-export-companion-builds/watcher-export-companion-builds.module.code.ts"
import { runExportHudLayout } from "akasha/temper/watcher/modules/watcher-export-hud-layout/watcher-export-hud-layout.module.code.ts"
import { runExportLandedCatalogs } from "akasha/temper/watcher/modules/watcher-export-landed-catalogs/watcher-export-landed-catalogs.module.code.ts"
import { runExportMinedUploaded } from "akasha/temper/watcher/modules/watcher-export-mined-uploaded/watcher-export-mined-uploaded.module.code.ts"
import { runExportSettings } from "akasha/temper/watcher/modules/watcher-export-settings/watcher-export-settings.module.code.ts"
import { runExportTasks } from "akasha/temper/watcher/modules/watcher-export-tasks/watcher-export-tasks.module.code.ts"
import { runImportCatalog } from "akasha/temper/watcher/modules/watcher-import-catalog/watcher-import-catalog.module.code.ts"
import { runImportCharacters } from "akasha/temper/watcher/modules/watcher-import-characters/watcher-import-characters.module.code.ts"
import { runImportCompanions } from "akasha/temper/watcher/modules/watcher-import-companions/watcher-import-companions.module.code.ts"
import { runImportCompletion } from "akasha/temper/watcher/modules/watcher-import-completion/watcher-import-completion.module.code.ts"
import { runImportDataMining } from "akasha/temper/watcher/modules/watcher-import-data-mining/watcher-import-data-mining.module.code.ts"
import { runImportErrors } from "akasha/temper/watcher/modules/watcher-import-errors/watcher-import-errors.module.code.ts"
import { runImportFights } from "akasha/temper/watcher/modules/watcher-import-fights/watcher-import-fights.module.code.ts"
import { runImportInventory } from "akasha/temper/watcher/modules/watcher-import-inventory/watcher-import-inventory.module.code.ts"
import { runImportItemRuleVerdicts } from "akasha/temper/watcher/modules/watcher-import-item-rule-verdicts/watcher-import-item-rule-verdicts.module.code.ts"
import { runImportSales } from "akasha/temper/watcher/modules/watcher-import-sales/watcher-import-sales.module.code.ts"
import { runImportTasks } from "akasha/temper/watcher/modules/watcher-import-tasks/watcher-import-tasks.module.code.ts"

export interface DispatchRunners {
  readonly importCatalog: typeof runImportCatalog
  readonly importCharacters: typeof runImportCharacters
  readonly importCompanions: typeof runImportCompanions
  readonly importCompletion: typeof runImportCompletion
  readonly importDataMining: typeof runImportDataMining
  readonly importErrors: typeof runImportErrors
  readonly importFights: typeof runImportFights
  readonly importInventory: typeof runImportInventory
  readonly importItemRuleVerdicts: typeof runImportItemRuleVerdicts
  readonly importSales: typeof runImportSales
  readonly importTasks: typeof runImportTasks
  readonly exportCompanionBuilds: typeof runExportCompanionBuilds
  readonly exportHudLayout: typeof runExportHudLayout
  readonly exportLandedCatalogs: typeof runExportLandedCatalogs
  readonly exportMinedUploaded: typeof runExportMinedUploaded
  readonly exportSettings: typeof runExportSettings
  readonly exportTasks: typeof runExportTasks
}

async function importCompletionOnceRead(
  ...args: Parameters<typeof runImportCompletion>
): ReturnType<typeof runImportCompletion> {
  await Promise.all([loadCompanionCatalog(), loadSkillCatalog()])
  return runImportCompletion(...args)
}

async function exportSettingsOnceRead(
  ...args: Parameters<typeof runExportSettings>
): ReturnType<typeof runExportSettings> {
  await loadCompanionCatalog()
  return runExportSettings(...args)
}

export const WATCHER_RUNNERS: DispatchRunners = {
  importCatalog: runImportCatalog,
  importCharacters: runImportCharacters,
  importCompanions: runImportCompanions,
  importCompletion: importCompletionOnceRead,
  importDataMining: runImportDataMining,
  importErrors: runImportErrors,
  importFights: runImportFights,
  importInventory: runImportInventory,
  importItemRuleVerdicts: runImportItemRuleVerdicts,
  importSales: runImportSales,
  importTasks: runImportTasks,
  exportCompanionBuilds: runExportCompanionBuilds,
  exportHudLayout: runExportHudLayout,
  exportLandedCatalogs: runExportLandedCatalogs,
  exportMinedUploaded: runExportMinedUploaded,
  exportSettings: exportSettingsOnceRead,
  exportTasks: runExportTasks,
}
