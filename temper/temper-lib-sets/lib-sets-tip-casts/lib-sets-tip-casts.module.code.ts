export type Never = never
export function asNever(value: unknown): Never {
  return value as Never
}

export type AnyNotNilTable = { [k: number]: AnyNotNil }
export function asAnyNotNilTable(value: unknown): AnyNotNilTable {
  return value as AnyNotNilTable
}

export type StrTab = { [idx: number]: unknown }
export function asStrTab(value: unknown): StrTab {
  return value as StrTab
}

export type NumIndexTable = { [idx: number]: number }
export function asNumIndexTable(value: unknown): NumIndexTable {
  return value as NumIndexTable
}

export type NumIndexTableOpt = NumIndexTable | undefined
export function asNumIndexTableOpt(value: unknown): NumIndexTableOpt {
  return value as NumIndexTableOpt
}

export type LangNameIndexTable = { [idx: number]: { [lang: string]: string } }
export type LangNameIndexTableOpt = LangNameIndexTable | undefined
export function asLangNameIndexTableOpt(value: unknown): LangNameIndexTableOpt {
  return value as LangNameIndexTableOpt
}

export type ZoneIdGroups = { [zoneId: number]: number[] }
export type ZoneIdGroupsOpt = ZoneIdGroups | undefined
export function asZoneIdGroupsOpt(value: unknown): ZoneIdGroupsOpt {
  return value as ZoneIdGroupsOpt
}

export type ZoneMechanicGroups = { [zoneId: number]: { [idx: number]: number } }
export type ZoneMechanicGroupsOpt = ZoneMechanicGroups | undefined
export function asZoneMechanicGroupsOpt(value: unknown): ZoneMechanicGroupsOpt {
  return value as ZoneMechanicGroupsOpt
}

export type UnknownRecordArray = { [n: number]: unknown }[]
export function asUnknownRecordArray(value: unknown): UnknownRecordArray {
  return value as UnknownRecordArray
}

export type NumKeyTable = { [k: number]: unknown }
export function asNumKeyTable(value: unknown): NumKeyTable {
  return value as NumKeyTable
}

export type ChestNameTable = { [chestIndex: number]: string }
export function asChestNameTable(value: unknown): ChestNameTable {
  return value as ChestNameTable
}

export type NumStrOpt = number | string | undefined
export function asNumStrOpt(value: unknown): NumStrOpt {
  return value as NumStrOpt
}

export type EquipBoolTable = { [equipType: number]: boolean }
export function asEquipBoolTable(value: unknown): EquipBoolTable {
  return value as EquipBoolTable
}

export type SetLangNames = { [setId: number]: { [lang: string]: string } }
export type SetLangNamesOpt = SetLangNames | undefined
export function asSetLangNamesOpt(value: unknown): SetLangNamesOpt {
  return value as SetLangNamesOpt
}

export type SetInfoPartMap = { [part: string]: LibSetsSetInfoPart }
export function asSetInfoPartMap(value: unknown): SetInfoPartMap {
  return value as SetInfoPartMap
}

export type IifaProbe = { IIfA?: unknown }
export function asIifaProbe(value: unknown): IifaProbe {
  return value as IifaProbe
}

export type FcoisProbe = { FCOIS?: { IIfAclicked?: { bagId: Bag; slotIndex: number } } }
export function asFcoisProbe(value: unknown): FcoisProbe {
  return value as FcoisProbe
}

export type MasterMerchantProbe = { MasterMerchant?: unknown }
export function asMasterMerchantProbe(value: unknown): MasterMerchantProbe {
  return value as MasterMerchantProbe
}

export type SlotTable = { [slot: string]: unknown }
export function asSlotTable(value: unknown): SlotTable {
  return value as SlotTable
}

export type SvFetchThunk = (this: void) => { [key: string]: unknown } | undefined
export function asSvFetchThunk(value: unknown): SvFetchThunk {
  return value as SvFetchThunk
}

export type VoidThunk = (this: void) => void
export function asVoidThunk(value: unknown): VoidThunk {
  return value as VoidThunk
}

export type BoolThunkOpt = (this: void) => boolean | undefined
export function asBoolThunkOpt(value: unknown): BoolThunkOpt {
  return value as BoolThunkOpt
}

export type VariadicThunk = (this: void, ...args: unknown[]) => unknown
export function asVariadicThunk(value: unknown): VariadicThunk {
  return value as VariadicThunk
}

export type TooltipCtrlProbe =
  | { GetName?: (this: unknown) => string; GetType?: (this: unknown) => number }
  | undefined
export function asTooltipCtrlProbe(value: unknown): TooltipCtrlProbe {
  return value as TooltipCtrlProbe
}

export type GetNameCtrl = { GetName?: (this: unknown) => string }
export function asGetNameCtrl(value: unknown): GetNameCtrl {
  return value as GetNameCtrl
}

export type NeededHookArray = { tooltipCtrlName?: string }[]
export function asNeededHookArray(value: unknown): NeededHookArray {
  return value as NeededHookArray
}

export type HooksCountView = { hooksCount?: number }
export function asHooksCountView(value: unknown): HooksCountView {
  return value as HooksCountView
}

export type ActivatedFlagView = { eventPlayerActivatedCalled?: boolean }
export function asActivatedFlagView(value: unknown): ActivatedFlagView {
  return value as ActivatedFlagView
}

export type LibAddonMenu2SurfaceOpt = LibAddonMenu2Surface | undefined
export function asLibAddonMenu2SurfaceOpt(value: unknown): LibAddonMenu2SurfaceOpt {
  return value as LibAddonMenu2SurfaceOpt
}

export type HiddenProbeCtrl = { IsControlHidden: (this: void) => boolean }
export function asHiddenProbeCtrl(value: unknown): HiddenProbeCtrl {
  return value as HiddenProbeCtrl
}

export type FavoritesAccessor = {
  GetAllFavoritesCategories: (this: void, self: unknown, setId: number) => unknown
}
export function asFavoritesAccessor(value: unknown): FavoritesAccessor {
  return value as FavoritesAccessor
}

export type SetIdNodeProbe = { GetItemSetId?: (this: unknown) => number | undefined } | undefined
export function asSetIdNodeProbe(value: unknown): SetIdNodeProbe {
  return value as SetIdNodeProbe
}

export type BagValue = Bag
export function asBagValue(value: unknown): BagValue {
  return value as BagValue
}
