export type { InstallByNameOpts, InstallByNameOutcome } from "./install-by-name"
export { installNamedAddon } from "./install-by-name"
export type {
  AddonStatus,
  CatalogEntry,
  InstalledAddon,
  PlannedAddon,
  SelectOpts,
  UpdatePlan,
} from "./plan"
export {
  buildDirIndex,
  distinctUids,
  findCatalogEntryByName,
  planUpdates,
  selectTargets,
  unknownOnlyDirs,
  versionsMatch,
} from "./plan"
