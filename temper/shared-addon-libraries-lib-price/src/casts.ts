import type {
  ItemPriceRecord,
  LibPriceTable,
  NormalizedPrice,
  OptionalNumber,
  SourceSet,
} from "./types"

export function asLibPriceTable(value: unknown): LibPriceTable {
  return value as LibPriceTable
}

export function asNumber(value: unknown): number {
  return value as number
}

export function asString(value: unknown): string {
  return value as string
}

export function asOptionalNumber(value: unknown): OptionalNumber {
  return value as OptionalNumber
}

export function asSourceSet(value: SourceSet | string[]): SourceSet {
  return value as SourceSet
}

export function asItemPriceRecord(value: unknown): ItemPriceRecord {
  return value as ItemPriceRecord
}

export function asNormalizedPrice(value: unknown): NormalizedPrice {
  return value as NormalizedPrice
}
