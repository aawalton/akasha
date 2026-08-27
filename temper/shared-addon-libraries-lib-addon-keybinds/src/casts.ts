import type { KeybindScrollData, LakTable } from "./types"

export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asLakTable(value: unknown): LakTable {
  return value as LakTable
}

export function asKeybindScrollData(value: unknown): KeybindScrollData {
  return value as KeybindScrollData
}

export function asControl(value: unknown): Control {
  return value as Control
}

export function asNumber(value: unknown): number {
  return value as number
}
