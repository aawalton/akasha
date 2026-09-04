import type {
  ChatProxy,
  HistoryEntry,
  Settings,
} from "../chat-message-types/chat-message-types.module.code.ts"

export type GlobalTable = Record<string, unknown>

export function asChatRouter(value: unknown): ChatRouter {
  return value as ChatRouter
}

export function asZoColorDef(value: string | ZoColorDef): ZoColorDef {
  return value as ZoColorDef
}

export function asChatProxy(value: object): ChatProxy {
  return value as ChatProxy
}

export type ChatEventKey = string | number
export function asChatEventKey(value: unknown): ChatEventKey {
  return value as ChatEventKey
}

export type StringChunks = string[]
export function asStringChunks(value: unknown): StringChunks {
  return value as StringChunks
}

export type StringRecord = Record<string, unknown>

export function asSettings(value: unknown): Settings {
  return value as Settings
}

export type HistoryArray = HistoryEntry[]
export function asHistoryArray(value: unknown): HistoryArray {
  return value as HistoryArray
}
