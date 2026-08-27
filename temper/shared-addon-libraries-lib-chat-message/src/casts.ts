import type { ChatProxy, HistoryEntry, Settings } from "./types"

export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asChatRouter(value: unknown): ChatRouter {
  return value as ChatRouter
}

export function asZoColorDef(value: string | ZoColorDef): ZoColorDef {
  return value as ZoColorDef
}

export function asChatProxy(value: object): ChatProxy {
  return value as ChatProxy
}

export function asString(value: unknown): string {
  return value as string
}

export type StringChunks = string[]
export function asStringChunks(value: unknown): StringChunks {
  return value as StringChunks
}

export type StringRecord = Record<string, unknown>
export function asStringRecord(value: unknown): StringRecord {
  return value as StringRecord
}

export function asSettings(value: unknown): Settings {
  return value as Settings
}

export type HistoryArray = HistoryEntry[]
export function asHistoryArray(value: unknown): HistoryArray {
  return value as HistoryArray
}

export function asNumber(value: unknown): number {
  return value as number
}
