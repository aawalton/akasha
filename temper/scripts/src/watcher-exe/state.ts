import type { FileType } from "./dispatch"

export interface FileState {
  running: boolean
  lastRunTime: number
  lastWriteBackContentHash: string | null
  lastInventoryConfigWriteBackHash: string | null
  lastCatalogConfigWriteBackHash: string | null
  lastCharactersConfigWriteBackHash: string | null
  lastCompanionsConfigWriteBackHash: string | null
}

export type WatcherState = Record<FileType, FileState>

export function initialFileState(): FileState {
  return {
    running: false,
    lastRunTime: 0,
    lastWriteBackContentHash: null,
    lastInventoryConfigWriteBackHash: null,
    lastCatalogConfigWriteBackHash: null,
    lastCharactersConfigWriteBackHash: null,
    lastCompanionsConfigWriteBackHash: null,
  }
}

export function initialWatcherState(): WatcherState {
  return {
    catalog: initialFileState(),
    characters: initialFileState(),
    companions: initialFileState(),
    "data-mining": initialFileState(),
    errors: initialFileState(),
    inventory: initialFileState(),
    sales: initialFileState(),
  }
}
