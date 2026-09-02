
import {
  resolveSavedVariablesPath,
  resolveSideFilePath,
} from "@temper/catalog-cli/temper/catalog/paths"
import {
  computeNextSideFile,
  parseSideFile,
  type SideFile,
  serializeSideFile,
} from "@temper/catalog-cli/temper/catalog/side-file"
import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"
import {
  type AccountSummary,
  readAccountSummaries,
} from "@temper/catalog-host/saved-variables-reader"

export type { AccountSummary, SideFile }

interface DomainKeys {
  readonly CATALOG_DOMAIN_KEYS: typeof CATALOG_DOMAIN_KEYS
}

interface SavedVariablesReader {
  readonly readAccountSummaries: typeof readAccountSummaries
}

interface Paths {
  readonly resolveSavedVariablesPath: typeof resolveSavedVariablesPath
  readonly resolveSideFilePath: typeof resolveSideFilePath
}

interface SideFileModule {
  readonly parseSideFile: typeof parseSideFile
  readonly serializeSideFile: typeof serializeSideFile
  readonly computeNextSideFile: typeof computeNextSideFile
}

export function catalogDomainKeys(): Promise<DomainKeys> {
  return Promise.resolve({ CATALOG_DOMAIN_KEYS })
}

export function catalogSavedVariables(): Promise<SavedVariablesReader> {
  return Promise.resolve({ readAccountSummaries })
}

export function catalogPaths(): Promise<Paths> {
  return Promise.resolve({ resolveSavedVariablesPath, resolveSideFilePath })
}

export function catalogSideFile(): Promise<SideFileModule> {
  return Promise.resolve({ parseSideFile, serializeSideFile, computeNextSideFile })
}
