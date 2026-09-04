import {
  asDataSource,
  asIndexable,
  asString,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import { validateScope } from "../saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import { DATA_STATE } from "../saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  LsvTable,
  SavedVarsManagerInstance,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

function touchLazyLoad(this: void, _value: unknown): undefined {}

export function getActiveSavedVars(
  this: void,
  self: DataInstance | undefined,
  key?: unknown
): LsvTable | undefined {
  if (self === undefined) {
    return undefined
  }
  LSV.protected.Debug("LSV_Data:GetActiveSavedVars(<<1>>)", DATA_STATE.debugMode, key)

  const ds = asDataSource(rawget(self, "__dataSource"))

  if (
    key !== undefined &&
    ds.account !== undefined &&
    ds.pinnedAccountKeys !== undefined &&
    asIndexable(ds.pinnedAccountKeys)[asString(key)] !== undefined
  ) {
    return ds.account.savedVars
  }

  if (ds.active === undefined) {
    if (ds.account !== undefined) {
      ds.active = ds.account
    } else {
      ds.active = ds.character
    }
  }

  return ds.active !== undefined ? ds.active.savedVars : undefined
}

export function getAccountSavedVarsActive(
  this: void,
  self: DataInstance | undefined
): boolean | undefined {
  if (self === undefined) {
    return undefined
  }
  LSV.protected.Debug("LSV_Data:GetAccountSavedVarsActive()", DATA_STATE.debugMode)

  const ds = asDataSource(rawget(self, "__dataSource"))
  if (ds.active !== undefined) {
    return ds.active === ds.account
  }
  return ds.account !== undefined
}

export function loadAllSavedVars(
  this: void,
  self: DataInstance | undefined
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }
  LSV.protected.Debug("LSV_Data:LoadAllSavedVars()", DATA_STATE.debugMode)

  const ds = self.__dataSource
  if (ds.character !== undefined) {
    touchLazyLoad(ds.character.savedVars)
  }
  if (ds.account !== undefined) {
    touchLazyLoad(ds.account.savedVars)
  }

  return self
}

export function enableDefaultsTrimming(this: void, self: DataInstance): DataInstance | undefined {
  const ds = asDataSource(rawget(self, "__dataSource"))
  if (ds === undefined) {
    return undefined
  }
  if (ds.account !== undefined) {
    ds.account.EnableDefaultsTrimming()
  }
  if (ds.character !== undefined) {
    ds.character.EnableDefaultsTrimming()
  }
  return self
}

export function getSavedVarsManagers(
  this: void,
  self: DataInstance,
  scope?: unknown
): SavedVarsManagerInstance[] {
  LSV.protected.Debug("LSV_Data:GetSavedVarsManagers(<<1>>)", DATA_STATE.debugMode, scope)
  const wildcard = scope === undefined || scope === false || scope === "*"
  validateScope(scope)
  const ds = self.__dataSource
  const savedVarManagers: SavedVarsManagerInstance[] = []
  if ((wildcard || scope === "character") && ds.character !== undefined) {
    savedVarManagers.push(ds.character)
  }
  if ((wildcard || scope === "account") && ds.account !== undefined) {
    savedVarManagers.push(ds.account)
  }
  LSV.protected.Debug(
    "<<1>> saved var managers found",
    DATA_STATE.debugMode,
    savedVarManagers.length
  )
  return savedVarManagers
}

export function setDebugMode(this: void, _self: DataInstance, enable: boolean): undefined {
  DATA_STATE.debugMode = enable
}
