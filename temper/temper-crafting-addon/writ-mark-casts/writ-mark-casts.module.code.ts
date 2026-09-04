export type GlobalTable = Record<string, unknown>

export type MaybeControl = Control | undefined

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asMaybeControl(value: unknown): MaybeControl {
  return value as MaybeControl
}
