export type GlobalTable = Record<string, unknown>

export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export type Typed<T> = T
export function asTyped<T>(value: object): Typed<T> {
  return value as Typed<T>
}

export type Present<T> = T
export function asPresent<T>(value: T | undefined): Present<T> {
  return value as Present<T>
}

export function asNumber(value: unknown): number {
  return value as number
}
export function asString(value: unknown): string {
  return value as string
}
export function asBoolean(value: unknown): boolean {
  return value as boolean
}

export type NumberOpt = number | undefined
export function asNumberOpt(value: unknown): NumberOpt {
  return value as NumberOpt
}

export type StringOpt = string | undefined
export function asStringOpt(value: unknown): StringOpt {
  return value as StringOpt
}

export type BooleanOpt = boolean | undefined
export function asBooleanOpt(value: unknown): BooleanOpt {
  return value as BooleanOpt
}

export type StrRecord = { [key: string]: unknown }
export function asStrRecord(value: unknown): StrRecord {
  return value as StrRecord
}

export type StrRecordOpt = StrRecord | undefined
export function asStrRecordOpt(value: unknown): StrRecordOpt {
  return value as StrRecordOpt
}

export type NumRecord = { [setId: number]: unknown }
export function asNumRecord(value: unknown): NumRecord {
  return value as NumRecord
}

export type NumRecordOpt = NumRecord | undefined
export function asNumRecordOpt(value: unknown): NumRecordOpt {
  return value as NumRecordOpt
}

export type LangRecord = { [lang: string]: unknown }
export function asLangRecord(value: unknown): LangRecord {
  return value as LangRecord
}

export type SetIdBoolMap = { [setId: number]: boolean }
export function asSetIdBoolMap(value: unknown): SetIdBoolMap {
  return value as SetIdBoolMap
}

export type UnknownArray = unknown[]
export function asUnknownArray(value: unknown): UnknownArray {
  return value as UnknownArray
}

export type StringArray = string[]
export function asStringArray(value: unknown): StringArray {
  return value as StringArray
}

export type NumberArray = number[]
export function asNumberArray(value: unknown): NumberArray {
  return value as NumberArray
}

export type NumberArrayOpt = number[] | undefined
export function asNumberArrayOpt(value: unknown): NumberArrayOpt {
  return value as NumberArrayOpt
}

export type AnyObject = object
export function asAnyObject(value: unknown): AnyObject {
  return value as AnyObject
}
