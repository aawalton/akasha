function labelSuffix(label: string | undefined): string {
  return label !== undefined ? ` in ${label}` : ""
}

export function requireAt<T>(array: readonly T[], index: number, label?: string): T {
  const value = array[index]
  if (value === undefined) {
    throw new Error(
      `requireAt: index ${index} out of range (length ${array.length})${labelSuffix(label)}`
    )
  }
  return value
}

export function requireFirst<T>(array: readonly T[], label?: string): T {
  const value = array[0]
  if (value === undefined) {
    throw new Error(`requireFirst: array is empty${labelSuffix(label)}`)
  }
  return value
}

export function requireLuaMapGet<K extends AnyNotNil, V>(
  map: LuaMap<K, V>,
  key: K,
  label?: string
): V {
  const value = map.get(key)
  if (value === undefined) {
    throw new Error(`requireLuaMapGet: missing key${labelSuffix(label)}`)
  }
  return value
}

export function requireNumericKey(s: string, label?: string): number {
  const n = tonumber(s)
  if (n === undefined) {
    throw new Error(`requireNumericKey: ${s} is not a number${labelSuffix(label)}`)
  }
  return n
}

export function requireDefined<T>(value: T | undefined, label?: string): T {
  if (value === undefined) {
    throw new Error(`requireDefined: value is undefined${labelSuffix(label)}`)
  }
  return value
}

export function deleteRecordKey<K extends string, V>(
  record: Record<K, V | undefined>,
  key: K
): undefined {
  record[key] = undefined
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export function asRecord(value: unknown): Record<string, unknown> | undefined {
  return isRecord(value) ? value : undefined
}

export function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function asObjectRecord(value: unknown): Record<string, unknown> | undefined {
  return isObjectRecord(value) ? value : undefined
}

export function assertNever(value: never): never {
  throw new Error(`assertNever: unhandled variant ${String(value)}`)
}
