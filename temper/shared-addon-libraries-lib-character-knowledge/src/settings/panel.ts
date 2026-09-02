import { type LamRegistrar, registerPanel } from "@akasha/temper-settings-panel/register-panel"
import { asString } from "../casts"
import { Internal } from "../internal/state"
import { LCCC } from "../lccc"
import type { SavedVars } from "../types"

function asLamRegistrar(value: unknown): LamRegistrar<object, unknown, unknown[]> {
  return value as LamRegistrar<object, unknown, unknown[]>
}

Internal.RegisterSettingsPanel = function (this: void): undefined {
  const LAM = LCCC.GetLibAddonMenu()

  if (LAM !== undefined) {
    const panelId = "LCKSettings"

    Internal.shareText = ""

    const panelData = {
      type: "panel",
      name: Internal.name,
      version: LCCC.FormatVersion(LCCC.GetAddOnVersion(Internal.name)),
      author: "@code65536",
      website: "https://www.esoui.com/downloads/info3317.html",
      donation: "https://www.esoui.com/downloads/info3317.html#donate",
      slashCommand: "/lck",
      registerForRefresh: true,
    }

    const controls: unknown[] = [
      {
        type: "description",
        text: SI_LCK_SETTINGS_CHATCOMMAND,
      },
      ...Internal.SettingsBuildMainSection(),
    ]

    if (!ZO_IsConsoleOrGameCoreUI()) {
      LCCC.ConcatTables(controls, [
        {
          type: "header",
          name: SI_LCK_SETTINGS_SHARE_SECTION,
        },
        {
          type: "editbox",
          name: SI_LCK_SETTINGS_SHARE_CAPTION,
          getFunc: function (this: void): string {
            return asShareText(Internal.shareText)
          },
          setFunc: function (this: void, text: string): undefined {
            Internal.shareText = text
          },
          isMultiline: true,
          isExtraWide: true,
          maxChars: 0xffff,
          textType: TEXT_TYPE_ALL,
          reference: "LCK_ExportBox",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_EXPORTC,
          func: Internal.ExportCurrent,
          tooltip: SI_LCK_SETTINGS_SHARE_EXPORTCT,
          width: "half",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_IMPORT,
          func: Internal.Import,
          width: "half",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_EXPORTA,
          func: function (this: void): undefined {
            Internal.ExportMultiple(true)
          },
          tooltip: SI_LCK_SETTINGS_SHARE_EXPORTAT,
          width: "half",
        },
        {
          type: "button",
          name: SI_LCK_SETTINGS_SHARE_CLEAR,
          func: function (this: void): undefined {
            Internal.shareText = ""
          },
          width: "half",
        },
        {
          type: "button",
          name: Internal.GetExportSelectedText,
          func: function (this: void): undefined {
            Internal.ExportMultiple(false)
          },
          tooltip: SI_LCK_SETTINGS_SHARE_EXPORTST,
          width: "half",
          disabled: function (this: void): boolean {
            return Internal.CountExportSelection() === 0
          },
          reference: "LCK_ExportSelected",
        },

        {
          type: "header",
          name: SI_LCK_SETTINGS_RESET_SECTION,
        },
        {
          type: "custom",
          width: "half",
        },
        {
          type: "button",
          name: SI_OPTIONS_RESET,
          func: function (this: void): undefined {
            globalThis.LibCharacterKnowledgeData = asResetVars({})
            ReloadUI()
          },
          tooltip: SI_LCK_SETTINGS_RESET_WARNING,
          width: "half",
          isDangerous: true,
          warning: SI_LCK_SETTINGS_RESET_WARNING,
        },

        {
          type: "header",
          name: SI_LCK_SETTINGS_NOSAVE_SECTION,
        },
        {
          type: "editbox",
          name: SI_LCK_SETTINGS_NOSAVE_CAPTION,
          getFunc: function (this: void): string {
            const accounts: string[] = []
            if (Internal.vars.noSave !== undefined) {
              for (const [account] of pairs(Internal.vars.noSave)) {
                accounts.push(account)
              }
              table.sort(accounts)
            }
            return table.concat(accounts, ", ")
          },
          setFunc: function (this: void, text: string): undefined {
            const accounts = [...zo_strsplit(", ", zo_strlower(text))]
            if (accounts.length > 0) {
              Internal.vars.noSave = {}
              for (const [_index, account] of ipairs(accounts)) {
                asNoSaveSet(Internal.vars.noSave)[DecorateDisplayName(asString(account))] = true
              }
            } else {
              Internal.vars.noSave = undefined
            }
          },
          isMultiline: true,
          isExtraWide: true,
          maxChars: 0xfff,
          textType: TEXT_TYPE_ALL,
        },
      ])
    }

    Internal.settingsPanel = registerPanel(asLamRegistrar(LAM), panelId, panelData, controls)
  }
}

type ShareText = string
function asShareText(value: string | undefined): ShareText {
  return value as ShareText
}

type NoSaveSet = Record<string, boolean>
function asNoSaveSet(value: NoSaveSet | undefined): NoSaveSet {
  return value as NoSaveSet
}

type ResetVars = SavedVars
function asResetVars(value: object): ResetVars {
  return value as ResetVars
}
