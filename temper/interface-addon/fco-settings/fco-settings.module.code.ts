import { SAVED_VARIABLES_NAME } from "../fco-constants/fco-constants.module.code.ts"
import {
  buildDefaults,
  buildDefaultsSettings,
} from "../fco-settings-defaults/fco-settings-defaults.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"
import type { AddonSettings } from "../fco-types/fco-types.module.code.ts"

interface SvTable {
  [key: string]: SvTable | undefined
}

declare const _G: Record<string, SvTable | undefined>

type SvLeafTable = Record<string, unknown>

function asSvLeafTable(value: SvTable): SvLeafTable {
  return value as SvLeafTable
}

function asSvTable(value: SvTable | undefined): SvTable {
  return value as SvTable
}

type MaybeSvTable = SvTable | undefined

function mixinNoOverride(this: void, object: SvTable, source: Record<string, unknown>): undefined {
  const target = asSvLeafTable(object)
  for (const k in source) {
    if (target[k] === undefined) {
      target[k] = source[k]
    }
  }
}

function getCharactersOfAccount(this: void): Record<string, string> | undefined {
  let charactersOfAccount: Record<string, string> | undefined
  for (let i = 1; i <= GetNumCharacters(); i += 1) {
    const [name, , , , , , characterId] = GetCharacterInfo(i)
    const charName = zo_strformat(SI_UNIT_NAME, name)
    if (characterId !== undefined && charName !== "") {
      if (charactersOfAccount === undefined) charactersOfAccount = {}
      charactersOfAccount[characterId] = charName
    }
  }
  return charactersOfAccount
}

export function getSettings(this: void): undefined {
  const defaultsSettings = buildDefaultsSettings()

  const featureDefaults = buildDefaults()
  const fullDefaults: AddonSettings = { ...defaultsSettings, ...featureDefaults }
  STATE.settingsVars.defaults = fullDefaults

  const svName = SAVED_VARIABLES_NAME
  const svVersion = STATE.addonVars.addonSavedVarsVersion

  const serverName = GetWorldName()
  const account = GetDisplayName()
  const svTab = asSvTable(_G[svName])
  const svTabExists = !ZO_IsTableEmpty(svTab) && true
  const svDefaultSubTab = "Default"
  const svAccountWideSubTab = "$AccountWide"
  const svSettingsForAllTab = "SettingsForAll"
  const svSettingsTab = "Settings"

  if (svTabExists === true) {
    let migrationDoneReloadUInow = false

    if (
      svTab[serverName] === undefined ||
      svTab[serverName]?.[account] === undefined ||
      svTab[serverName]?.[account]?.[svAccountWideSubTab] === undefined ||
      (svTab[serverName] !== undefined &&
        svTab[serverName]?.[account] !== undefined &&
        svTab[serverName]?.[account]?.[svAccountWideSubTab] !== undefined &&
        svTab[serverName]?.[account]?.[svAccountWideSubTab]?.[svSettingsForAllTab] === undefined)
    ) {
      const oldDefaultForAll =
        svTab[svDefaultSubTab]?.[account]?.[svAccountWideSubTab]?.[svSettingsForAllTab]
      const oldAccountWideDefaultSettings: MaybeSvTable =
        oldDefaultForAll !== undefined ? ZO_ShallowTableCopy(oldDefaultForAll) : undefined
      if (!ZO_IsTableEmpty(oldAccountWideDefaultSettings)) {
        const oldDefaults = asSvTable(oldAccountWideDefaultSettings)
        asSvLeafTable(oldDefaults).version = 999
        mixinNoOverride(oldDefaults, { ...defaultsSettings })
        svTab[serverName] = svTab[serverName] ?? {}
        const server = asSvTable(svTab[serverName])
        server[account] = server[account] ?? {}
        const acct = asSvTable(server[account])
        acct[svAccountWideSubTab] = acct[svAccountWideSubTab] ?? {}
        const accountWide = asSvTable(acct[svAccountWideSubTab])
        accountWide[svSettingsForAllTab] = oldDefaults
        migrationDoneReloadUInow = true

        const def = svTab[svDefaultSubTab]
        const defAcct = def?.[account]
        const defAcctAW = defAcct?.[svAccountWideSubTab]
        if (def !== undefined && defAcct !== undefined && defAcctAW !== undefined) {
          defAcctAW[svSettingsForAllTab] = undefined
          if (ZO_IsTableEmpty(defAcctAW)) {
            defAcct[svAccountWideSubTab] = undefined
            if (ZO_IsTableEmpty(defAcct)) {
              def[account] = undefined
            }
          }
        }
      }
    }

    if (
      svTab[serverName] === undefined ||
      svTab[serverName]?.[account] === undefined ||
      svTab[serverName]?.[account]?.[svAccountWideSubTab] === undefined ||
      (svTab[serverName] !== undefined &&
        svTab[serverName]?.[account] !== undefined &&
        svTab[serverName]?.[account]?.[svAccountWideSubTab] !== undefined &&
        svTab[serverName]?.[account]?.[svAccountWideSubTab]?.[svSettingsTab] === undefined)
    ) {
      const oldAccountWideSrc =
        svTab[svDefaultSubTab]?.[account]?.[svAccountWideSubTab]?.[svSettingsTab]
      const oldAccountWide: MaybeSvTable =
        oldAccountWideSrc !== undefined ? ZO_ShallowTableCopy(oldAccountWideSrc) : undefined
      if (!ZO_IsTableEmpty(oldAccountWide)) {
        const oldAW = asSvTable(oldAccountWide)
        mixinNoOverride(oldAW, { ...featureDefaults })
        svTab[serverName] = svTab[serverName] ?? {}
        const server = asSvTable(svTab[serverName])
        server[account] = server[account] ?? {}
        const acct = asSvTable(server[account])
        acct[svAccountWideSubTab] = acct[svAccountWideSubTab] ?? {}
        const accountWide = asSvTable(acct[svAccountWideSubTab])
        accountWide[svSettingsTab] = oldAW
        migrationDoneReloadUInow = true

        const def = svTab[svDefaultSubTab]
        const defAcct = def?.[account]
        const defAcctAW = defAcct?.[svAccountWideSubTab]
        if (def !== undefined && defAcct !== undefined && defAcctAW !== undefined) {
          defAcctAW[svSettingsTab] = undefined
          if (ZO_IsTableEmpty(defAcctAW)) {
            defAcct[svAccountWideSubTab] = undefined
            if (ZO_IsTableEmpty(defAcct)) {
              def[account] = undefined
            }
          }
        }
      }
    }

    const characterId2Name = getCharactersOfAccount()
    if (characterId2Name !== undefined) {
      for (const characterId in characterId2Name) {
        if (
          svTab[serverName] === undefined ||
          svTab[serverName]?.[account] === undefined ||
          svTab[serverName]?.[account]?.[characterId] === undefined ||
          (svTab[serverName] !== undefined &&
            svTab[serverName]?.[account] !== undefined &&
            svTab[serverName]?.[account]?.[characterId] !== undefined &&
            svTab[serverName]?.[account]?.[characterId]?.[svSettingsTab] === undefined)
        ) {
          const oldCharSrc = svTab[svDefaultSubTab]?.[account]?.[characterId]?.[svSettingsTab]
          const oldCharacterIDSettings: MaybeSvTable =
            oldCharSrc !== undefined ? ZO_ShallowTableCopy(oldCharSrc) : undefined
          if (!ZO_IsTableEmpty(oldCharacterIDSettings)) {
            const oldChar = asSvTable(oldCharacterIDSettings)
            mixinNoOverride(oldChar, { ...featureDefaults })
            svTab[serverName] = svTab[serverName] ?? {}
            const server = asSvTable(svTab[serverName])
            server[account] = server[account] ?? {}
            const acct = asSvTable(server[account])
            acct[characterId] = acct[characterId] ?? {}
            const charTab = asSvTable(acct[characterId])
            charTab[svSettingsTab] = oldChar
            migrationDoneReloadUInow = true

            const def = svTab[svDefaultSubTab]
            const defAcct = def?.[account]
            if (def !== undefined && defAcct !== undefined) {
              defAcct[characterId] = undefined
              if (ZO_IsTableEmpty(defAcct)) {
                def[account] = undefined
              }
            }
          }
        }
      }
    }
    if (migrationDoneReloadUInow === true) {
      ReloadUI("ingame")
    }
  }

  STATE.settingsVars.defaultSettings = ZO_SavedVars.NewAccountWide(
    svName,
    999,
    svSettingsForAllTab,
    defaultsSettings,
    serverName
  )
  if (STATE.settingsVars.defaultSettings.saveMode === 1) {
    STATE.settingsVars.settings = ZO_SavedVars.NewCharacterIdSettings(
      svName,
      svVersion,
      svSettingsTab,
      fullDefaults,
      serverName
    )
  } else {
    STATE.settingsVars.settings = ZO_SavedVars.NewAccountWide(
      svName,
      svVersion,
      svSettingsTab,
      fullDefaults,
      serverName
    )
  }
}
