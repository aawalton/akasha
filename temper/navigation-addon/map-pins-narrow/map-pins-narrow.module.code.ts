import type {
  DescMap,
  FishingBugFixTable,
  IconMap,
  IdSet,
  NestedPinTable,
  NumberMap,
  PinList,
  PinTuple,
  PoiNameTable,
  StringNumberMap,
  SubzonePinTable,
} from "../map-pins-data-types/map-pins-data-types.module.code.ts"
import type { PinDef, PinTag } from "../map-pins-pin-types/map-pins-pin-types.module.code.ts"

type OptNumber = number | undefined
type OptString = string | undefined
type OptPinList = PinList | undefined
type GlobalTable = Record<string, unknown>
type NestedPinSubtable = Record<number, PinList>
type AchievementItemTable = Record<number, IdSet | undefined>
type StringList = readonly string[]

export function asNumber(value: unknown): number {
  return value as number
}
export function asString(value: unknown): string {
  return value as string
}
export function asOptNumber(value: unknown): OptNumber {
  return value as OptNumber
}
export function asOptString(value: unknown): OptString {
  return value as OptString
}

export function asPinTag(value: unknown): PinTag {
  return value as PinTag
}
export function asPinDef(value: unknown): PinDef {
  return value as PinDef
}
export function asPinTuple(value: unknown): PinTuple {
  return value as PinTuple
}
export function asOptPinList(value: unknown): OptPinList {
  return value as OptPinList
}

export function asSubzonePinTable(value: unknown): SubzonePinTable {
  return value as SubzonePinTable
}
export function asNestedPinTable(value: unknown): NestedPinTable {
  return value as NestedPinTable
}
export function asNestedPinSubtable(value: unknown): NestedPinSubtable {
  return value as NestedPinSubtable
}
export function asPoiNameTable(value: unknown): PoiNameTable {
  return value as PoiNameTable
}
export function asIconMap(value: unknown): IconMap {
  return value as IconMap
}
export function asDescMap(value: unknown): DescMap {
  return value as DescMap
}
export function asStringNumberMap(value: unknown): StringNumberMap {
  return value as StringNumberMap
}
export function asNumberMap(value: unknown): NumberMap {
  return value as NumberMap
}
export function asFishingBugFixTable(value: unknown): FishingBugFixTable {
  return value as FishingBugFixTable
}
export function asAchievementItemTable(value: unknown): AchievementItemTable {
  return value as AchievementItemTable
}
export function asStringList(value: unknown): StringList {
  return value as StringList
}
export function asGlobalTable(value: unknown): GlobalTable {
  return value as GlobalTable
}

export function asControl(value: unknown): Control {
  return value as Control
}
