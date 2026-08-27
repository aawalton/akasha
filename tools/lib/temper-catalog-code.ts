
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
import {
  type AccountSummary,
  readAccountSummaries,
} from "@temper/catalog-host/saved-variables-reader"
import { codeModule } from "./code-import.ts"

export type { AccountSummary, SideFile }

const DOMAIN_KEYS = "@temper/catalog-core/domain-keys"

interface DomainKeys {
  readonly CATALOG_DOMAIN_KEYS: readonly string[]
}

interface SavedVariablesReader {
  readonly readAccountSummaries: (content: string) => readonly AccountSummary[]
}

interface Paths {
  readonly resolveSavedVariablesPath: (override: string | undefined) => string
  readonly resolveSideFilePath: (override: string | undefined) => string
}

interface SideFileModule {
  readonly parseSideFile: (content: string) => SideFile | undefined
  readonly serializeSideFile: (sf: SideFile) => string
  readonly computeNextSideFile: (
    prev: SideFile | undefined,
    request: readonly string[]
  ) => SideFile
}

export function catalogDomainKeys(): Promise<DomainKeys> {
  return codeModule<DomainKeys>(DOMAIN_KEYS)
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
