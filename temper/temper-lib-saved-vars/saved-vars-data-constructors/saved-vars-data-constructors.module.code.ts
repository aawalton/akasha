import {
  asDataInstance,
  asDataSource,
  asIndexable,
  asLsvTable,
  asManagerInstance,
  asSavedVarsInfo,
} from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import {
  LIBNAME,
  LIBSAVEDVARS_ACCOUNT_KEY,
  LIBSAVEDVARS_CHARACTER_ID_KEY,
} from "../saved-vars-constants/saved-vars-constants.module.code.ts"
import {
  shiftOptionalParams,
  tableDiffKeys,
  tableMerge,
} from "../saved-vars-data-helpers/saved-vars-data-helpers.module.code.ts"
import { DATA_STATE } from "../saved-vars-data-state/saved-vars-data-state.module.code.ts"
import { LSV } from "../saved-vars-registry/saved-vars-registry.module.code.ts"
import type {
  DataInstance,
  LsvDataClass,
  LsvTable,
} from "../saved-vars-types/saved-vars-types.module.code.ts"

export function newAccountWide(
  this: void,
  self: LsvDataClass,
  savedVariableTable: string,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: string,
  displayName?: string
): DataInstance {
  const [v, ns, def, , prof, disp] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName
  )

  LSV.protected.Debug(
    "LSV_Data:NewAccountWide(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>)",
    DATA_STATE.debugMode,
    savedVariableTable,
    v,
    ns,
    def,
    prof,
    disp
  )

  const data = asDataInstance({ __dataSource: asDataSource({ defaultToAccount: true }) })
  setmetatable(data, self)

  initAccountWide(data, savedVariableTable, v, ns, def, prof, disp)

  return data
}

export function newCharacterSettings(
  this: void,
  self: LsvDataClass,
  savedVariableTable: string,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: string,
  displayName?: string,
  characterName?: string,
  characterId?: number | string,
  characterKeyType?: number
): DataInstance {
  const [v, ns, def, , prof, disp, charName, charId, charKey] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )

  LSV.protected.Debug(
    "LSV_Data:NewCharacterSettings(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>, <<7>>, <<8>>, <<9>>)",
    DATA_STATE.debugMode,
    savedVariableTable,
    v,
    ns,
    def,
    prof,
    disp,
    charName,
    charId,
    charKey
  )

  const data = asDataInstance({ __dataSource: asDataSource({ defaultToAccount: false }) })
  setmetatable(data, self)

  initCharacterSettings(
    data,
    savedVariableTable,
    v,
    ns,
    def,
    def,
    prof,
    disp,
    charName,
    charId,
    charKey
  )

  return data
}

export function addAccountWideToggle(
  this: void,
  self: DataInstance | undefined,
  savedVariableTableName?: unknown,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: unknown,
  displayName?: unknown
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }

  LSV.protected.Debug(
    "LSV_Data:AddAccountWideToggle(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>)",
    DATA_STATE.debugMode,
    savedVariableTableName,
    version,
    namespace,
    defaults,
    profile,
    displayName
  )

  const [v, ns, def0, , prof0, disp0] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName
  )
  let defaultsVal: unknown = def0
  let profileVal: unknown = prof0
  let displayNameVal: unknown = disp0
  let nameVal: unknown = savedVariableTableName

  const ds = self.__dataSource

  if (nameVal === undefined) {
    nameVal = asManagerInstance(ds.character).name
  }

  const characterDefaults = asLsvTable(
    ZO_ShallowTableCopy(asManagerInstance(ds.character).defaults)
  )
  characterDefaults[LIBNAME] = undefined
  if (defaultsVal === undefined) {
    defaultsVal = characterDefaults
  } else {
    ds.pinnedAccountKeys = tableDiffKeys(asLsvTable(defaultsVal), characterDefaults)
    defaultsVal = tableMerge(asLsvTable(defaultsVal), characterDefaults)
  }

  if (profileVal === undefined) {
    profileVal = asManagerInstance(ds.character).profile
  }

  if (displayNameVal === undefined) {
    displayNameVal = asManagerInstance(ds.character).displayName
  }

  initAccountWide(self, nameVal, v, ns, defaultsVal, profileVal, displayNameVal)
  initToggle(self)

  return self
}

export function addCharacterSettingsToggle(
  this: void,
  self: DataInstance | undefined,
  savedVariableTableName?: unknown,
  version?: unknown,
  namespace?: unknown,
  defaults?: unknown,
  profile?: unknown,
  displayName?: unknown,
  characterName?: unknown,
  characterId?: unknown,
  characterKeyType?: unknown
): DataInstance | undefined {
  if (self === undefined) {
    return undefined
  }

  const [v, ns, def0, , prof0, disp0, charName0, charId0, charKey0] = shiftOptionalParams(
    version,
    namespace,
    defaults,
    undefined,
    profile,
    displayName,
    characterName,
    characterId,
    characterKeyType
  )

  LSV.protected.Debug(
    "LSV_Data:AddCharacterSettingsToggle(<<1>>, <<2>>, <<3>>, <<4>>, <<5>>, <<6>>, <<7>>, <<8>>, <<9>>)",
    DATA_STATE.debugMode,
    savedVariableTableName,
    v,
    ns,
    def0,
    prof0,
    disp0,
    charName0,
    charId0,
    charKey0
  )

  let defaultsVal: unknown = def0
  let profileVal: unknown = prof0
  let displayNameVal: unknown = disp0
  let nameVal: unknown = savedVariableTableName

  const ds = self.__dataSource

  if (nameVal === undefined) {
    nameVal = asManagerInstance(ds.account).name
  }

  let trimDefaults: LsvTable | undefined
  if (defaultsVal === undefined) {
    defaultsVal = {}
    trimDefaults = asLsvTable(ZO_ShallowTableCopy(asManagerInstance(ds.account).defaults))
  } else {
    ds.pinnedAccountKeys = tableDiffKeys(
      asManagerInstance(ds.account).defaults,
      asLsvTable(defaultsVal)
    )
    const defaultsNotOnAccount = tableDiffKeys(
      asLsvTable(defaultsVal),
      asManagerInstance(ds.account).defaults
    )
    const [firstNotOnAccount] = next(defaultsNotOnAccount)
    if (firstNotOnAccount !== undefined) {
      asManagerInstance(ds.account).defaults = tableMerge(
        asManagerInstance(ds.account).defaults,
        defaultsNotOnAccount
      )
    }
  }

  if (profileVal === undefined) {
    profileVal = asManagerInstance(ds.account).profile
  }

  if (displayNameVal === undefined) {
    displayNameVal = asManagerInstance(ds.account).displayName
  }

  initCharacterSettings(
    self,
    nameVal,
    v,
    ns,
    defaultsVal,
    trimDefaults,
    profileVal,
    displayNameVal,
    charName0,
    charId0,
    charKey0
  )
  initToggle(self)

  return self
}

function initAccountWide(
  this: void,
  self: DataInstance,
  savedVariableTable: unknown,
  version: unknown,
  namespace: unknown,
  defaults: unknown,
  profile: unknown,
  displayName: unknown
): undefined {
  self.__dataSource.account = LSV.manager.New(
    asSavedVarsInfo({
      keyType: LIBSAVEDVARS_ACCOUNT_KEY,
      name: savedVariableTable,
      version,
      namespace,
      defaults,
      profile: profile ?? GetWorldName(),
      displayName,
    })
  )
}

function initCharacterSettings(
  this: void,
  self: DataInstance,
  savedVariableTable: unknown,
  version: unknown,
  namespace: unknown,
  defaults: unknown,
  trimDefaults: unknown,
  profile: unknown,
  displayName: unknown,
  characterName: unknown,
  characterId: unknown,
  characterKeyType: unknown
): undefined {
  self.__dataSource.character = LSV.manager.New(
    asSavedVarsInfo({
      keyType: characterKeyType ?? LIBSAVEDVARS_CHARACTER_ID_KEY,
      name: savedVariableTable,
      version,
      namespace,
      defaults,
      trimDefaults,
      profile: profile ?? GetWorldName(),
      displayName,
      characterName,
      characterId,
    })
  )
}

function initToggle(this: void, self: DataInstance): undefined {
  const ds = self.__dataSource

  if (ds.character === undefined) {
    LSV.protected.Debug(
      "Trying to initialized toggle failed. No character-specific saved vars manager found.",
      DATA_STATE.debugMode
    )
    return
  }

  if (ds.account === undefined) {
    LSV.protected.Debug(
      "Trying to initialized toggle failed. No account-wide saved vars manager found.",
      DATA_STATE.debugMode
    )
    return
  }

  const [rawChar] = ds.character.LoadRawTableData()
  const characterRawDataTable = rawChar
  const marker =
    characterRawDataTable !== undefined ? asIndexable(characterRawDataTable)[LIBNAME] : undefined
  const markerActive = marker !== undefined ? asIndexable(marker).accountSavedVarsActive : undefined

  if (
    characterRawDataTable === undefined ||
    (marker !== undefined && markerActive !== undefined && markerActive !== false) ||
    (ds.defaultToAccount && (marker === undefined || markerActive !== false))
  ) {
    ds.active = ds.account
  } else {
    ds.active = ds.character

    const charDefaults = ds.character.defaults
    const accDefaults = ds.account.defaults
    const [firstCharDefault] = next(charDefaults)
    const [firstAccDefault] = next(accDefaults)
    if (
      (charDefaults === undefined || firstCharDefault === undefined) &&
      accDefaults !== undefined &&
      firstAccDefault !== undefined
    ) {
      ds.character.defaults = asLsvTable(ZO_ShallowTableCopy(accDefaults))
    }
  }

  ds.character.defaults[LIBNAME] = { accountSavedVarsActive: ds.defaultToAccount }
  ds.character.trimDefaults[LIBNAME] = { accountSavedVarsActive: ds.defaultToAccount }
}
