type Callback = (this: void, ...args: unknown[]) => void
export function asCallback(value: unknown): Callback {
  return value as Callback
}

export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

type Lua1Based = Record<number, string>
export function asLua1Based(value: unknown): Lua1Based {
  return value as Lua1Based
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asRecord(value: unknown): Record<string, unknown> {
  return value as Record<string, unknown>
}

export function asString(value: unknown): string {
  return value as string
}

type StringArray = string[]
export function asStringArray(value: unknown): StringArray {
  return value as StringArray
}

type Table = Record<string | number, unknown>
export function asTable(value: unknown): Table {
  return value as Table
}
