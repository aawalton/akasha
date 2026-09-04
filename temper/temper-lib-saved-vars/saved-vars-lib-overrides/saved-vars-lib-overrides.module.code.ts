import {
  asSavedVarsAccountWideFn,
  asSavedVarsNewFn,
  asSavedVarsWritable,
  asZoSavedVars,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBNAME,
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
  LIBSAVEDVARS_CHARACTER_NAME_KEY,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import { LIB_STATE } from "../saved-vars-lib-state/saved-vars-lib-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  LsvTable,
  RegisteredSavedVarsInfo,
  SavedVarsWritable,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

function toCode(this: void, input: unknown): string {
  if (type(input) === "string") {
    return `'${tostring(input)}'`
  }
  return tostring(input)
}

function codeFormat(this: void, format: string, ...args: unknown[]): string {
  const params: string[] = []
  for (const i of $range(1, args.length)) {
    params.push(toCode(args[i - 1]))
  }
  return zo_strformat(format, ...params)
}

function registerSavedVars(
  this: void,
  savedVars: LsvTable,
  savedVariableTableName: string,
  version: number,
  namespace: string | undefined,
  defaults: LsvTable,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): undefined {
  const [rawSavedVarsTable, parent, key, savedVariableTable, path] =
    LSV.protected.GetSavedVarsTable(
      savedVariableTableName,
      namespace,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )

  let keyType: number
  if (characterName === undefined) {
    keyType = LIBSAVEDVARS_ACCOUNT_KEY
  } else if (characterKeyType !== undefined) {
    keyType = characterKeyType
  } else {
    keyType = LIBSAVEDVARS_CHARACTER_NAME_KEY
  }

  const info: RegisteredSavedVarsInfo = {
    addonName: LIB_STATE.currentAddonName,
    name: savedVariableTableName,
    table: savedVariableTable,
    keyType,
    defaults,
    version,
    namespace,
    profile,
    displayName,
    characterName,
    characterId,
    rawSavedVarsTable,
    rawSavedVarsTablePath: path,
    rawSavedVarsTableParent: parent,
    rawSavedVarsTableKey: key,
  }

  if (LSV.protected.debugMode) {
    let format: string
    if (key === LIBSAVEDVARS_ACCOUNT_KEY) {
      format = "ZO_SavedVars:New(<<1>>,<<2>>,<<3>>,<<4>>,<<5>>,<<6>>,<<7>>,<<8>>,<<9>>)"
    } else {
      format = "ZO_SavedVars:NewAccountWide(<<1>>,<<2>>,<<3>>,<<4>>,<<5>>,<<6>>)"
    }
    const message = codeFormat(
      format,
      savedVariableTableName,
      version,
      namespace,
      defaults,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )
    LSV.protected.Debug(message)
  }

  LIB_STATE.savedVarRegistry.set(savedVars, info)
}

function onAddonLoaded(this: void, _eventCode: number, name: string): undefined {
  LIB_STATE.currentAddonName = name
}

export function installLibOverrides(this: void): undefined {
  const sv = asSavedVarsWritable(ZO_SavedVars)
  const origSavedVarsNew = asSavedVarsNewFn(ZO_SavedVars.New)
  const origSavedVarsNewAccountWide = asSavedVarsAccountWideFn(ZO_SavedVars.NewAccountWide)

  function newOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string,
    displayName?: string,
    characterName?: string,
    characterId?: number | string,
    characterKeyType?: number
  ): LsvTable {
    const savedVars = origSavedVarsNew(
      asZoSavedVars(this),
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )
    registerSavedVars(
      savedVars,
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName,
      characterName,
      characterId,
      characterKeyType
    )
    return savedVars
  }

  function newCharacterNameSettingsOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string
  ): LsvTable {
    return this.New(
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      GetDisplayName(),
      GetUnitName("player"),
      GetCurrentCharacterId(),
      LIBSAVEDVARS_CHARACTER_NAME_KEY
    )
  }

  function newCharacterIdSettingsOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string
  ): LsvTable {
    return this.New(
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      GetDisplayName(),
      GetUnitName("player"),
      GetCurrentCharacterId(),
      LIBSAVEDVARS_CHARACTER_ID_KEY
    )
  }

  function newAccountWideOverride(
    this: SavedVarsWritable,
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: LsvTable,
    profile?: string,
    displayName?: string
  ): LsvTable {
    const savedVars = origSavedVarsNewAccountWide(
      asZoSavedVars(this),
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName
    )
    registerSavedVars(
      savedVars,
      savedVariableTable,
      version,
      namespace,
      defaults,
      profile,
      displayName
    )
    return savedVars
  }

  sv.New = newOverride
  sv.NewCharacterNameSettings = newCharacterNameSettingsOverride
  sv.NewCharacterIdSettings = newCharacterIdSettingsOverride
  sv.NewAccountWide = newAccountWideOverride

  EVENT_MANAGER.RegisterForEvent(LIBNAME, EVENT_ADD_ON_LOADED, onAddonLoaded)

  return undefined
}
