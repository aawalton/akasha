import { registerPanel } from "@akasha/temper-settings-panel/register-panel"
import {
  noEnlightenedSound,
  noShopAdvertisement,
} from "../fco-after-login/fco-after-login.module.code.ts"
import { updateExcludedMountIdsLibShifterBox } from "../fco-collectibles/fco-collectibles.module.code.ts"
import {
  buildActionBarsControls,
  type PreventEndlessLoopHolder,
} from "../fco-panel-action-bars/fco-panel-action-bars.module.code.ts"
import { buildBattlegroundControls } from "../fco-panel-battleground/fco-panel-battleground.module.code.ts"
import { buildChatControls } from "../fco-panel-chat/fco-panel-chat.module.code.ts"
import {
  buildCollectiblesControls,
  buildDialogsControls,
  buildMailControls,
  buildMountsControls,
  buildQuestsControls,
  buildSoundsControls,
  buildUIControls,
} from "../fco-panel-features/fco-panel-features.module.code.ts"
import { buildLoginReloaduiControls } from "../fco-panel-login/fco-panel-login.module.code.ts"
import { buildLootControls } from "../fco-panel-loot/fco-panel-loot.module.code.ts"
import {
  buildKeybindControls,
  buildMainMenuControls,
  buildMapControls,
  buildNotificationsControls,
  buildOverallControls,
} from "../fco-panel-main/fco-panel-main.module.code.ts"
import {
  buildCraftingControls,
  buildGroupControls,
  buildStableControls,
} from "../fco-panel-progression/fco-panel-progression.module.code.ts"
import { buildSkillsControls } from "../fco-panel-skills/fco-panel-skills.module.code.ts"
import {
  buildBankControls,
  buildGuildBankControls,
  buildGuildHistoryControls,
  buildInventoryControls,
} from "../fco-panel-storage/fco-panel-storage.module.code.ts"
import { buildTooltipsControls } from "../fco-panel-tooltips/fco-panel-tooltips.module.code.ts"
import { STATE } from "../fco-state/fco-state.module.code.ts"

const FAVORITES_EXCLUDED_LIST_STATUS_ICON = "/esoui/art/buttons/cancel_down.dds"
const favoritesExcludedListStatusIconText = zo_iconTextFormatNoSpace(
  FAVORITES_EXCLUDED_LIST_STATUS_ICON,
  24,
  24,
  "excluded list",
  true
)

export const QUALITY_CHOICES: { current: Record<number, string> } = { current: {} }

let fcoSettingsPanel: Control | undefined

const PREVENT_ENDLESS_LOOP_HOLDER: PreventEndlessLoopHolder = { current: false }

let IS_FIRST_OPEN = true

function isLibAddonMenu2(this: void, value: unknown): value is LibAddonMenu2 {
  return type(value) === "table"
}

export function buildAddonMenu(this: void): undefined {
  const settings = STATE.settingsVars.settings
  const lam = STATE.LAM
  if (settings === undefined || !isLibAddonMenu2(lam)) {
    return
  }
  const defaults = STATE.settingsVars.defaults
  const defaultSettings = STATE.settingsVars.defaultSettings
  const addonVars = STATE.addonVars
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
    const globalNames = _G as Record<string, unknown>
    const stringId = globalNames["SI_ITEMQUALITY" + tostring(quality)] as number | undefined
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
  QUALITY_CHOICES.current = qualityDropDownChoices
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
    buildActionBarsControls(settings, defaults, PREVENT_ENDLESS_LOOP_HOLDER),
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
    if (IS_FIRST_OPEN) {
      IS_FIRST_OPEN = false
      return
    }
    updateExcludedMountIdsLibShifterBox(FCOCHANGESTUFF_LAM_MOUNT_FAVORITES_EXCLUDE_PARENT)
  }
  CALLBACK_MANAGER.RegisterCallback("LAM-PanelOpened", lamPanelOpenedCallbackFunc)

  fcoSettingsPanel = registerPanel(lam, addonName + "_LAM", panelData, optionsTable)
}
