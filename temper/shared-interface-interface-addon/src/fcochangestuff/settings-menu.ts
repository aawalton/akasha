import { registerPanel } from "@temper/shared-interface-lam/register-panel"
import { noEnlightenedSound, noShopAdvertisement } from "./after-login"
import { updateExcludedMountIdsLibShifterBox } from "./collectibles"
import {
  buildCollectiblesControls,
  buildDialogsControls,
  buildMailControls,
  buildMountsControls,
  buildQuestsControls,
  buildSoundsControls,
  buildUIControls,
} from "./settings-menu-panels-features"
import { buildActionBarsControls, type PreventEndlessLoopHolder } from "./settings-menu-panels-interface/action-bars"
import { buildBattlegroundControls } from "./settings-menu-panels-interface/battleground"
import { buildChatControls } from "./settings-menu-panels-interface/chat"
import { buildLoginReloaduiControls } from "./settings-menu-panels-interface/login-reloadui"
import { buildLootControls } from "./settings-menu-panels-interface/loot"
import { buildSkillsControls } from "./settings-menu-panels-interface/skills"
import { buildTooltipsControls } from "./settings-menu-panels-interface/tooltips"
import {
  buildKeybindControls,
  buildMainMenuControls,
  buildMapControls,
  buildNotificationsControls,
  buildOverallControls,
} from "./settings-menu-panels-main"
import {
  buildCraftingControls,
  buildGroupControls,
  buildStableControls,
} from "./settings-menu-panels-progression"
import {
  buildBankControls,
  buildGuildBankControls,
  buildGuildHistoryControls,
  buildInventoryControls,
} from "./settings-menu-panels-storage"
import { state } from "./state"

const favoritesExcludedListStatusIcon = "/esoui/art/buttons/cancel_down.dds"
const favoritesExcludedListStatusIconText = zo_iconTextFormatNoSpace(
  favoritesExcludedListStatusIcon,
  24,
  24,
  "excluded list",
  true
)

export const qualityChoices: { current: Record<number, string> } = { current: {} }

let fcoSettingsPanel: Control | undefined

const preventEndlessLoop: PreventEndlessLoopHolder = { current: false }

let isFirstOpen = true

function isLibAddonMenu2(this: void, value: unknown): value is LibAddonMenu2 {
  return type(value) === "table"
}

export function buildAddonMenu(this: void): undefined {
  const settings = state.settingsVars.settings
  const lam = state.LAM
  if (settings === undefined || !isLibAddonMenu2(lam)) {
    return
  }
  const defaults = state.settingsVars.defaults
  const defaultSettings = state.settingsVars.defaultSettings
  const addonVars = state.addonVars
  const addonName = addonVars.addonName

  const panelData: LamPanelData = {
    type: "panel",
    name: addonVars.addonNameMenu,
    displayName: addonVars.addonNameMenuDisplay,
    author: addonVars.addonAuthor,
    version: tostring(addonVars.addonVersion),
    registerForRefresh: true,
    registerForDefaults: true,
    slashCommand: "/fcocss",
    website: addonVars.addonWebsite,
    feedback: addonVars.addonFeedback,
    donation: addonVars.addonDonation,
  }

  const saveTypeEachCharacter = "Each character"
  const saveTypeAccountWide = "Account wide"
  const savedVariablesOptions: Record<number, string> = {
    1: saveTypeEachCharacter,
    2: saveTypeAccountWide,
  }

  const colorMagic = GetItemQualityColor(ITEM_QUALITY_MAGIC)
  const colorArcane = GetItemQualityColor(ITEM_QUALITY_ARCANE)
  const colorArtifact = GetItemQualityColor(ITEM_QUALITY_ARTIFACT)
  const colorLegendary = GetItemQualityColor(ITEM_QUALITY_LEGENDARY)
  const siQuality = (quality: number): string => {
    const stringId = _G["SI_ITEMQUALITY" + tostring(quality)]
    return stringId === undefined ? "" : GetString(stringId)
  }
  const offString = "Off"
  const magicString = colorMagic.Colorize(siQuality(ITEM_QUALITY_MAGIC))
  const arcaneString = colorArcane.Colorize(siQuality(ITEM_QUALITY_ARCANE))
  const artifactString = colorArtifact.Colorize(siQuality(ITEM_QUALITY_ARTIFACT))
  const legendaryString = colorLegendary.Colorize(siQuality(ITEM_QUALITY_LEGENDARY))
  const qualityDropDownChoices: Record<number, string> = {
    1: offString,
    [ITEM_QUALITY_MAGIC]: magicString,
    [ITEM_QUALITY_ARCANE]: arcaneString,
    [ITEM_QUALITY_ARTIFACT]: artifactString,
    [ITEM_QUALITY_LEGENDARY]: legendaryString,
  }
  qualityChoices.current = qualityDropDownChoices
  const qualityDropDownChoicesValues: number[] = [
    -1,
    ITEM_QUALITY_MAGIC,
    ITEM_QUALITY_ARCANE,
    ITEM_QUALITY_ARTIFACT,
    ITEM_QUALITY_LEGENDARY,
  ]
  const qualityChoiceStrings: string[] = [
    offString,
    magicString,
    arcaneString,
    artifactString,
    legendaryString,
  ]

  const optionsTable: LamControlData[] = [
    {
      type: "description",
      text: "Change some UI stuff to be hidden or shown in other ways",
    },
    {
      type: "dropdown",
      reference: "FCOCS_LAM_SETTINGS_SV_SAVETYPE_COMBOBOX",
      name: "Settings save type",
      tooltip:
        "Use account wide settings for all your characters, or save them seperatley for each character?",
      choices: [saveTypeEachCharacter, saveTypeAccountWide],
      getFunc: () => savedVariablesOptions[defaultSettings.saveMode] ?? "",
      setFunc: (value) => {
        for (const i in savedVariablesOptions) {
          const optionKey = tonumber(i)
          if (optionKey !== undefined && savedVariablesOptions[optionKey] === value) {
            defaultSettings.saveMode = optionKey
          }
        }
      },
      requiresReload: true,
    },
  ]

  const sections: LamControlData[][] = [
    buildKeybindControls(settings, defaults),
    buildOverallControls(settings, defaults),
    buildMainMenuControls(settings, defaults),
    buildNotificationsControls(settings, defaults),
    buildMapControls(settings, defaults),
    buildGroupControls(settings, defaults),
    buildStableControls(settings, defaults),
    buildCraftingControls(settings, defaults, qualityChoiceStrings, qualityDropDownChoicesValues),
    buildInventoryControls(settings, defaults),
    buildBankControls(settings, defaults),
    buildGuildBankControls(settings, defaults),
    buildGuildHistoryControls(settings, defaults),
    buildChatControls(settings, defaults),
    buildSkillsControls(settings, defaults),
    buildActionBarsControls(settings, defaults, preventEndlessLoop),
    buildLoginReloaduiControls(settings, defaults, noEnlightenedSound, noShopAdvertisement),
    buildBattlegroundControls(settings, defaults),
    buildTooltipsControls(settings, defaults),
    buildLootControls(settings, defaults),
    buildCollectiblesControls(settings, defaults),
    buildDialogsControls(settings, defaults),
    buildMailControls(settings, defaults),
    buildUIControls(settings, defaults),
    buildQuestsControls(settings, defaults),
    buildSoundsControls(settings, defaults),
    buildMountsControls(settings, defaults, favoritesExcludedListStatusIconText),
  ]
  for (const section of sections) {
    for (const control of section) {
      optionsTable[optionsTable.length] = control
    }
  }

  function lamPanelOpenedCallbackFunc(this: void, pPanel: unknown): undefined {
    if (pPanel !== fcoSettingsPanel) {
      return
    }
    if (isFirstOpen) {
      isFirstOpen = false
      return
    }
    updateExcludedMountIdsLibShifterBox(FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT)
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelOpened", lamPanelOpenedCallbackFunc)

  fcoSettingsPanel = registerPanel(lam, addonName + "_LAM", panelData, optionsTable)
}
