import type {
  LcmControlBase,
  LcmLabel,
  LcmMenu,
  Valued,
} from "../custom-menu-types/custom-menu-types.module.code.ts"

export type GlobalFnTable = Record<
  string,
  ((this: void, ...args: unknown[]) => unknown) | undefined
>

export type SlotActionsTable = Record<string, unknown>

export type GlobalTable = Record<string, unknown>

export type ValuedString = Valued<string>

export type VoidSelfFn = (this: void) => void

export function asSlotActionsTable(value: unknown): SlotActionsTable {
  return value as SlotActionsTable
}

export function asValuedString(value: unknown): ValuedString {
  return value as ValuedString
}

export function asVoidSelfFn(value: unknown): VoidSelfFn {
  return value as VoidSelfFn
}

export function asLcmControlBase(value: unknown): LcmControlBase {
  return value as LcmControlBase
}

export function asLcmMenu(value: unknown): LcmMenu {
  return value as LcmMenu
}

export function asLcmLabel(value: unknown): LcmLabel {
  return value as LcmLabel
}

export function asMenuRegistry(value: unknown): ZoCallbackObject {
  return value as ZoCallbackObject
}

export function asZoColorDef(value: unknown): ZoColorDef {
  return value as ZoColorDef
}

export function asZoInventorySlotActions(value: unknown): ZoInventorySlotActions {
  return value as ZoInventorySlotActions
}
