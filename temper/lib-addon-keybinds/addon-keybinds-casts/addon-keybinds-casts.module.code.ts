import type {
  KeybindScrollData,
  LakTable,
} from "../addon-keybinds-types/addon-keybinds-types.module.code.ts"

export type GlobalTable = Record<string, unknown>

export function asLakTable(value: unknown): LakTable {
  return value as LakTable
}

export function asKeybindScrollData(value: unknown): KeybindScrollData {
  return value as KeybindScrollData
}
