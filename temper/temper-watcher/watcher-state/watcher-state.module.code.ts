import { FILE_TYPES, type FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"

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
  const held = {} as Record<FileType, FileState>
  for (const fileType of FILE_TYPES) held[fileType] = initialFileState()
  return held
}
