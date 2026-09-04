const sharedClass = ZO_InitializingObject.Subclass<LibSetsSearchUISharedClass>()

export function getSharedSearchUIClass(this: void): LibSetsSearchUISharedClass {
  return sharedClass
}

type SharedSearchUIClassGlobal = typeof LibSets_SearchUI_Shared
function asSharedSearchUIClassGlobal(value: unknown): SharedSearchUIClassGlobal {
  return value as SharedSearchUIClassGlobal
}
export function brandSharedSearchUIClassGlobal(
  this: void,
  value: LibSetsSearchUISharedClass
): SharedSearchUIClassGlobal {
  return asSharedSearchUIClassGlobal(value)
}

interface SharedSuperDispatch {
  Initialize: (this: void, self: LibSetsSearchUISharedObject, control: SearchUIControl) => void
  ShowUI: (this: void, self: LibSetsSearchUISharedObject) => void
  ResetUI: (this: void, self?: LibSetsSearchUISharedObject) => void
  ValidateSearchParams: (this: void, self: LibSetsSearchUISharedObject) => boolean | undefined
  StartSearch: (
    this: void,
    self: LibSetsSearchUISharedObject,
    doNotShowUI: boolean | undefined,
    wasReset?: boolean
  ) => boolean
  OnFilterChanged: (
    this: void,
    self: LibSetsSearchUISharedObject,
    dropdownControl?: SearchUIControl
  ) => void
}

function asSharedSuperDispatch(value: unknown): SharedSuperDispatch {
  return value as SharedSuperDispatch
}

export function getSharedSuper(this: void): SharedSuperDispatch {
  return asSharedSuperDispatch(sharedClass)
}
