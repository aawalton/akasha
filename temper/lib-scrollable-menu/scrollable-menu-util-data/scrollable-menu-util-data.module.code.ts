import {
  asLsmCastControlLikeUndefined,
  asLsmCastGetDataSourceThisUnknownRecordStringUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastRecordStringString,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastStringUndefined,
  asLsmCastThisVoidArgsUnknownUndefinedUndefined,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidDataOrControlUnknownRecordStringUnknow,
  asLsmCastThisVoidHaystackStringNeedleStringBoolean,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asNumber,
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { constants } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined(libDebug.DebugLog)

const tos = tostring
const strsub = string.sub
const strlow = string.lower

const USERDATA_TYPE = "userdata"
const STRING_TYPE = "string"
const TABLE_TYPE = "table"

const DDS_EXTENSION_STR = ".dds"

const NIL_CHECK_TABLE = constants.NIL_CHECK_TABLE

let getControlName: (this: void, control: unknown, alternativeControl?: unknown) => string

libUtil.endsWith = function (this: void, haystack: string, needle: string): boolean {
  const suffix = strlow(strsub(haystack, -needle.length))
  return suffix === strlow(needle)
}
const endsWith = asLsmCastThisVoidHaystackStringNeedleStringBoolean(libUtil.endsWith)

libUtil.checkIfValidTexturePath = function (this: void, texturePath: unknown): boolean {
  if (type(texturePath) !== STRING_TYPE) {
    return false
  }
  const endsOnDDS = endsWith(asString(texturePath), DDS_EXTENSION_STR)
  return endsOnDDS
}

libUtil.checkAndUpdatePreventerVar = function (
  this: void,
  preventerVarName: string
): LuaMultiReturn<[boolean | undefined, number | undefined]> {
  const preventerVars = asLsmCastRecordStringUnknown(lib.preventerVars)
  const preventerVar = preventerVars[preventerVarName]
  if (preventerVar !== undefined) {
    if (preventerVar === true) {
      preventerVars[preventerVarName] = undefined
      return $multi(true, undefined)
    } else {
      let fixPreventerVarNow = false
      if (type(preventerVar) === "number") {
        if (asNumber(preventerVar) > 0) {
          const newPreventerVarNumber = asNumber(preventerVar) - 1
          preventerVars[preventerVarName] =
            newPreventerVarNumber > 0 ? newPreventerVarNumber : undefined
          return $multi(true, newPreventerVarNumber)
        } else {
          fixPreventerVarNow = true
        }
      } else {
        fixPreventerVarNow = true
      }
      if (fixPreventerVarNow) {
        preventerVars[preventerVarName] = undefined
      }
    }
  }
  return $multi(undefined, undefined)
}

const controlNameCache = asLsmCastRecordStringString(
  asLsmCastRecordStringUnknown(lib.Debug).controlNameCache
)

libUtil.getControlName = function (
  this: void,
  control: unknown,
  alternativeControl?: unknown
): string {
  const ctrl = asLsmCastControlLikeUndefined(control)
  const altCtrl = asLsmCastControlLikeUndefined(alternativeControl)
  const cachedControl = control !== undefined ? controlNameCache[asString(control)] : undefined
  if (control !== undefined && cachedControl !== undefined) {
    return cachedControl
  }
  const cachedAlt =
    alternativeControl !== undefined ? controlNameCache[asString(alternativeControl)] : undefined
  if (alternativeControl !== undefined && cachedAlt !== undefined) {
    return cachedAlt
  }

  let ctrlName: string | undefined =
    control !== undefined
      ? (asLsmCastStringUndefined(asLsmCastRecordStringUnknown(ctrl).name) ??
        (ctrl !== undefined && ctrl.GetName !== undefined ? asString(ctrl.GetName()) : undefined))
      : undefined
  if (ctrlName === undefined && alternativeControl !== undefined) {
    ctrlName =
      asLsmCastStringUndefined(asLsmCastRecordStringUnknown(altCtrl).name) ??
      (altCtrl !== undefined && altCtrl.GetName !== undefined
        ? asString(altCtrl.GetName())
        : undefined)
    if (ctrlName !== undefined) {
      controlNameCache[asString(alternativeControl)] = ctrlName
    }
  }
  if (control !== undefined && ctrlName !== undefined) {
    controlNameCache[asString(control)] = ctrlName
  }
  ctrlName = ctrlName ?? "n/a"
  return ctrlName
}
getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(libUtil.getControlName)

libUtil.getHeaderControl = function (
  this: void,
  selfVar: Record<string, unknown>
): LuaMultiReturn<[unknown, unknown]> {
  if (ZO_IsTableEmpty(asObject(selfVar.options))) {
    return $multi(undefined, undefined)
  }
  const dropdownControl = asLsmCastRecordStringUnknown(
    asLsmCastRecordStringUnknown(selfVar.m_dropdownObject).control
  )
  return $multi(dropdownControl.header, dropdownControl)
}

libUtil.updateSavedVariable = function (
  this: void,
  svOptionName: string | undefined,
  newValue: unknown,
  subTableName?: string
): undefined {
  if (svOptionName === undefined) {
    return
  }
  const sv = asLsmCastRecordStringUnknown(lib.SV)
  const svOptionData = sv[svOptionName]
  if (svOptionData === undefined) {
    return
  }
  if (subTableName !== undefined) {
    if (type(svOptionData) !== TABLE_TYPE) {
      return
    }
    asLsmCastRecordStringUnknown(sv[svOptionName])[subTableName] = newValue
  } else {
    sv[svOptionName] = newValue
  }
}

libUtil.getSavedVariable = function (
  this: void,
  svOptionName: string | undefined,
  subTableName?: string
): unknown {
  if (svOptionName === undefined) {
    return undefined
  }
  const sv = asLsmCastRecordStringUnknown(lib.SV)
  const svOptionData = sv[svOptionName]
  if (svOptionData === undefined) {
    return undefined
  }
  if (subTableName !== undefined) {
    if (type(svOptionData) !== TABLE_TYPE) {
      return undefined
    }
    return asLsmCastRecordStringUnknown(sv[svOptionName])[subTableName]
  } else {
    return sv[svOptionName]
  }
}

libUtil.getDataSource = function (this: void, dataOrControl: unknown): Record<string, unknown> {
  let retData: Record<string, unknown> | undefined
  if (dataOrControl !== undefined) {
    retData = asLsmCastRecordStringUnknown(dataOrControl)
    if (retData.dataSource === undefined && type(retData) === USERDATA_TYPE) {
      retData =
        asLsmCastRecordStringUnknownUndefined(asLsmCastRecordStringUnknown(dataOrControl).m_data) ??
        asLsmCastRecordStringUnknown(dataOrControl)
    }

    if (retData !== undefined && retData.dataSource !== undefined) {
      return asLsmCastGetDataSourceThisUnknownRecordStringUnknown(retData).GetDataSource()
    }
  }
  return retData ?? NIL_CHECK_TABLE
}
const getDataSource = asLsmCastThisVoidDataOrControlUnknownRecordStringUnknow(libUtil.getDataSource)

libUtil.getControlData = function (
  this: void,
  control: Record<string, unknown>
): Record<string, unknown> {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 28, tos(getControlName(control)))
  }
  const data =
    asLsmCastRecordStringUnknownUndefined(control.m_sortedItems) ??
    asLsmCastRecordStringUnknownUndefined(control.m_data) ??
    control

  return getDataSource(data)
}
