import type { DestinationsDefaults } from "../defaults"
import { DEFAULTS } from "../defaults"
import { getSettingsString } from "../lang/register-strings"
import { pinTexturePaths } from "../pin-texture-paths-data"
import { pinTextureLists } from "../pin-textures"
import { PIN_TYPES } from "../pin-type-constants"
import { TogglePins } from "../pins/filters"
import { getCharacterSavedVariables, getSavedVariables } from "../saved-variables"
import type { IconPreviews } from "./icon-previews"
import { getIconPreviews } from "./icon-previews"
import {
  achHeaderName,
  choiceAt,
  DESTINATIONS_PIN_PRIORITY_OFFSET,
  isFilterEnabled,
  perCharName,
  redrawAllPins,
  texturePathAt,
} from "./settings-helpers"

const LMP = LibMapPins

interface AchPinEntry {
  type: number
  size: number
}

interface AchievementSectionSpec {
  headerKey: string
  pinType: string
  pinTypeDone: string
  choices: readonly string[]
  paths: readonly string[]
  pathsDone: readonly string[]
  pinSettings: (this: void, pins: DestinationsDefaults["pins"]) => AchPinEntry
  pinSettingsDone: (this: void, pins: DestinationsDefaults["pins"]) => AchPinEntry
  preview: (this: void, previews: IconPreviews) => TextureControl
  previewDone: (this: void, previews: IconPreviews) => TextureControl
  reference: string
  defaultChoice: string
  sizeDefault: number
}

function bothFiltersDisabled(pinType: string, pinTypeDone: string): (this: void) => boolean {
  return () => {
    const filters = getCharacterSavedVariables().filters
    return !isFilterEnabled(filters, pinType) && !isFilterEnabled(filters, pinTypeDone)
  }
}

function toggleControl(pinType: string, stringKey: string): LamCheckboxData {
  return {
    type: "checkbox",
    name: perCharName(stringKey),
    getFunc: () => isFilterEnabled(getCharacterSavedVariables().filters, pinType),
    setFunc: (state) => {
      TogglePins(pinType, state)
      redrawAllPins(pinType)
    },
    default: DEFAULTS.filters[pinType] ?? false,
  }
}

function styleControl(spec: AchievementSectionSpec): LamDropdownData {
  const sv = getSavedVariables()
  return {
    type: "dropdown",
    name: getSettingsString("DEST_SETTINGS_ACH_PIN_STYLE"),
    reference: spec.reference,
    choices: spec.choices,
    getFunc: () => choiceAt(spec.choices, spec.pinSettings(sv.pins).type),
    setFunc: (selected) => {
      for (let i = 0; i < spec.choices.length; i++) {
        if (spec.choices[i] === selected) {
          const index = i + 1
          spec.pinSettings(sv.pins).type = index
          spec.pinSettingsDone(sv.pins).type = index
          LMP.SetLayoutKey(spec.pinType, "texture", texturePathAt(spec.paths, index))
          LMP.SetLayoutKey(spec.pinTypeDone, "texture", texturePathAt(spec.pathsDone, index))
          spec.preview(getIconPreviews()).SetTexture(texturePathAt(spec.paths, index))
          spec.previewDone(getIconPreviews()).SetTexture(texturePathAt(spec.pathsDone, index))
          redrawAllPins(spec.pinType)
          redrawAllPins(spec.pinTypeDone)
          break
        }
      }
    },
    disabled: bothFiltersDisabled(spec.pinType, spec.pinTypeDone),
    default: spec.defaultChoice,
  }
}

function sizeControl(spec: AchievementSectionSpec): LamSliderData {
  const sv = getSavedVariables()
  return {
    type: "slider",
    name: getSettingsString("DEST_SETTINGS_ACH_PIN_SIZE"),
    min: 20,
    max: 70,
    getFunc: () => spec.pinSettings(sv.pins).size,
    setFunc: (size) => {
      spec.pinSettings(sv.pins).size = size
      LMP.SetLayoutKey(spec.pinType, "size", size)
      spec.preview(getIconPreviews()).SetDimensions(size, size)
      spec.pinSettingsDone(sv.pins).size = size
      LMP.SetLayoutKey(spec.pinTypeDone, "size", size)
      spec.previewDone(getIconPreviews()).SetDimensions(size, size)
      redrawAllPins(spec.pinType)
      redrawAllPins(spec.pinTypeDone)
    },
    disabled: bothFiltersDisabled(spec.pinType, spec.pinTypeDone),
    default: spec.sizeDefault,
  }
}

function appendAchievementSection(
  controls: LamControlData[],
  spec: AchievementSectionSpec,
  extraControlsAfterToggles?: LamControlData[]
): undefined {
  controls.push({ type: "header", name: achHeaderName(spec.headerKey) })
  controls.push(toggleControl(spec.pinType, "DEST_SETTINGS_ACH_PIN_TOGGLE"))
  controls.push(toggleControl(spec.pinTypeDone, "DEST_SETTINGS_ACH_PIN_TOGGLE_DONE"))
  if (extraControlsAfterToggles !== undefined) {
    for (const control of extraControlsAfterToggles) {
      controls.push(control)
    }
  }
  controls.push(styleControl(spec))
  controls.push(sizeControl(spec))
}

function championZoneToggle(): LamCheckboxData {
  const sv = getSavedVariables()
  return {
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_ACH_CHAMPION_ZONE_PIN_TOGGLE"),
    getFunc: () => sv.settings.ShowDungeonBossesInZones,
    setFunc: (state) => {
      sv.settings.ShowDungeonBossesInZones = state
      redrawAllPins(PIN_TYPES.CHAMPION)
      redrawAllPins(PIN_TYPES.CHAMPION_DONE)
    },
    disabled: bothFiltersDisabled(PIN_TYPES.CHAMPION, PIN_TYPES.CHAMPION_DONE),
    default: DEFAULTS.settings.ShowDungeonBossesInZones,
  }
}

function championFrontToggle(): LamCheckboxData {
  const sv = getSavedVariables()
  return {
    type: "checkbox",
    name: getSettingsString("DEST_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE"),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_CHAMPION_FRONT_PIN_TOGGLE_TT"),
    getFunc: () => sv.settings.ShowDungeonBossesOnTop,
    setFunc: (state) => {
      const pinLevel = sv.pins.pinTextureOther.level
      if (state) {
        sv.pins.pinTextureChampion.level = pinLevel + DESTINATIONS_PIN_PRIORITY_OFFSET
        sv.pins.pinTextureChampionDone.level = pinLevel
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION, "level", pinLevel + DESTINATIONS_PIN_PRIORITY_OFFSET)
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION_DONE, "level", pinLevel)
      } else {
        sv.pins.pinTextureChampion.level = 30 + DESTINATIONS_PIN_PRIORITY_OFFSET
        sv.pins.pinTextureChampionDone.level = 30
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION, "level", 30 + DESTINATIONS_PIN_PRIORITY_OFFSET)
        LMP.SetLayoutKey(PIN_TYPES.CHAMPION_DONE, "level", 30)
      }
      sv.settings.ShowDungeonBossesOnTop = state
      redrawAllPins(PIN_TYPES.CHAMPION)
      redrawAllPins(PIN_TYPES.CHAMPION_DONE)
    },
    disabled: () => {
      const filters = getCharacterSavedVariables().filters
      return (
        (!isFilterEnabled(filters, PIN_TYPES.CHAMPION) &&
          !isFilterEnabled(filters, PIN_TYPES.CHAMPION_DONE)) ||
        !getSavedVariables().settings.ShowDungeonBossesInZones
      )
    },
    default: DEFAULTS.settings.ShowDungeonBossesOnTop,
  }
}

function standardSpec(
  headerKey: string,
  pinType: string,
  pinTypeDone: string,
  choices: readonly string[],
  paths: readonly string[],
  pathsDone: readonly string[],
  pinSettings: (pins: DestinationsDefaults["pins"]) => AchPinEntry,
  pinSettingsDone: (pins: DestinationsDefaults["pins"]) => AchPinEntry,
  preview: (previews: IconPreviews) => TextureControl,
  previewDone: (previews: IconPreviews) => TextureControl,
  reference: string,
  defaultChoice: string,
  sizeDefault: number
): AchievementSectionSpec {
  return {
    headerKey,
    pinType,
    pinTypeDone,
    choices,
    paths,
    pathsDone,
    pinSettings,
    pinSettingsDone,
    preview,
    previewDone,
    reference,
    defaultChoice,
    sizeDefault,
  }
}

export function buildAchievementsSubmenu(): LamSubmenuData {
  const controls: LamControlData[] = []
  const lists = pinTextureLists
  const paths = pinTexturePaths
  const dp = DEFAULTS.pins

  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_CHAMPION_PIN_HEADER",
      PIN_TYPES.CHAMPION,
      PIN_TYPES.CHAMPION_DONE,
      lists.Champion,
      paths.Champion,
      paths.ChampionDone,
      (pins) => pins.pinTextureChampion,
      (pins) => pins.pinTextureChampionDone,
      (previews) => previews.champion,
      (previews) => previews.championDone,
      "previewpinTextureChampion",
      choiceAt(lists.Champion, dp.pinTextureChampion.type),
      dp.pinTextureChampion.size
    ),
    [championZoneToggle(), championFrontToggle()]
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_OTHER_HEADER",
      PIN_TYPES.LB_GTTP_CP,
      PIN_TYPES.LB_GTTP_CP_DONE,
      lists.Other,
      paths.Other,
      paths.OtherDone,
      (pins) => pins.pinTextureOther,
      (pins) => pins.pinTextureOtherDone,
      (previews) => previews.other,
      (previews) => previews.otherDone,
      "previewpinTextureOther",
      choiceAt(lists.Other, dp.pinTextureOther.type),
      dp.pinTextureOther.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_MAIQ_HEADER",
      PIN_TYPES.MAIQ,
      PIN_TYPES.MAIQ_DONE,
      lists.Maiq,
      paths.Maiq,
      paths.MaiqDone,
      (pins) => pins.pinTextureMaiq,
      (pins) => pins.pinTextureMaiqDone,
      (previews) => previews.maiq,
      (previews) => previews.maiqDone,
      "previewpinTextureMaiq",
      choiceAt(lists.Maiq, dp.pinTextureMaiq.type),
      dp.pinTextureMaiq.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_PEACEMAKER_HEADER",
      PIN_TYPES.PEACEMAKER,
      PIN_TYPES.PEACEMAKER_DONE,
      lists.Peacemaker,
      paths.Peacemaker,
      paths.PeacemakerDone,
      (pins) => pins.pinTexturePeacemaker,
      (pins) => pins.pinTexturePeacemakerDone,
      (previews) => previews.peacemaker,
      (previews) => previews.peacemakerDone,
      "previewpinTexturePeacemaker",
      choiceAt(lists.Peacemaker, dp.pinTexturePeacemaker.type),
      dp.pinTexturePeacemaker.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_NOSEDIVER_HEADER",
      PIN_TYPES.NOSEDIVER,
      PIN_TYPES.NOSEDIVER_DONE,
      lists.Nosediver,
      paths.Nosediver,
      paths.NosediverDone,
      (pins) => pins.pinTextureNosediver,
      (pins) => pins.pinTextureNosediverDone,
      (previews) => previews.nosediver,
      (previews) => previews.nosediverDone,
      "previewpinTextureNosediver",
      choiceAt(lists.Nosediver, dp.pinTextureNosediver.type),
      dp.pinTextureNosediver.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_EARTHLYPOS_HEADER",
      PIN_TYPES.EARTHLYPOS,
      PIN_TYPES.EARTHLYPOS_DONE,
      lists.EarthlyPos,
      paths.Earthlypos,
      paths.EarthlyposDone,
      (pins) => pins.pinTextureEarthlyPos,
      (pins) => pins.pinTextureEarthlyPosDone,
      (previews) => previews.earthlyPos,
      (previews) => previews.earthlyPosDone,
      "previewpinTextureEarthlyPos",
      choiceAt(lists.Nosediver, dp.pinTextureNosediver.type),
      dp.pinTextureEarthlyPos.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_ON_ME_HEADER",
      PIN_TYPES.ON_ME,
      PIN_TYPES.ON_ME_DONE,
      lists.OnMe,
      paths.OnMe,
      paths.OnMeDone,
      (pins) => pins.pinTextureOnMe,
      (pins) => pins.pinTextureOnMeDone,
      (previews) => previews.onMe,
      (previews) => previews.onMeDone,
      "previewpinTextureOnMe",
      choiceAt(lists.OnMe, dp.pinTextureOnMe.type),
      dp.pinTextureOnMe.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_BRAWL_HEADER",
      PIN_TYPES.BRAWL,
      PIN_TYPES.BRAWL_DONE,
      lists.Brawl,
      paths.Brawl,
      paths.BrawlDone,
      (pins) => pins.pinTextureBrawl,
      (pins) => pins.pinTextureBrawlDone,
      (previews) => previews.brawl,
      (previews) => previews.brawlDone,
      "previewpinTextureBrawl",
      choiceAt(lists.Brawl, dp.pinTextureBrawl.type),
      dp.pinTextureBrawl.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_PATRON_HEADER",
      PIN_TYPES.PATRON,
      PIN_TYPES.PATRON_DONE,
      lists.Patron,
      paths.Patron,
      paths.PatronDone,
      (pins) => pins.pinTexturePatron,
      (pins) => pins.pinTexturePatronDone,
      (previews) => previews.patron,
      (previews) => previews.patronDone,
      "previewpinTexturePatron",
      choiceAt(lists.Patron, dp.pinTexturePatron.type),
      dp.pinTexturePatron.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_WROTHGAR_JUMPER_HEADER",
      PIN_TYPES.WROTHGAR_JUMPER,
      PIN_TYPES.WROTHGAR_JUMPER_DONE,
      lists.WrothgarJumper,
      paths.WrothgarJumper,
      paths.WrothgarJumperDone,
      (pins) => pins.pinTextureWrothgarJumper,
      (pins) => pins.pinTextureWrothgarJumperDone,
      (previews) => previews.wrothgarJumper,
      (previews) => previews.wrothgarJumperDone,
      "previewpinTextureWrothgarJumper",
      choiceAt(lists.WrothgarJumper, dp.pinTextureWrothgarJumper.type),
      dp.pinTextureWrothgarJumper.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_RELIC_HUNTER_HEADER",
      PIN_TYPES.RELIC_HUNTER,
      PIN_TYPES.RELIC_HUNTER_DONE,
      lists.RelicHunter,
      paths.RelicHunter,
      paths.RelicHunterDone,
      (pins) => pins.pinTextureRelicHunter,
      (pins) => pins.pinTextureRelicHunterDone,
      (previews) => previews.relicHunter,
      (previews) => previews.relicHunterDone,
      "previewpinTextureRelicHunter",
      choiceAt(lists.RelicHunter, dp.pinTextureRelicHunter.type),
      dp.pinTextureRelicHunter.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_BREAKING_HEADER",
      PIN_TYPES.BREAKING,
      PIN_TYPES.BREAKING_DONE,
      lists.Breaking,
      paths.Breaking,
      paths.BreakingDone,
      (pins) => pins.pinTextureBreaking,
      (pins) => pins.pinTextureBreakingDone,
      (previews) => previews.breaking,
      (previews) => previews.breakingDone,
      "previewpinTextureBreaking",
      choiceAt(lists.Breaking, dp.pinTextureBreaking.type),
      dp.pinTextureBreaking.size
    )
  )
  appendAchievementSection(
    controls,
    standardSpec(
      "DEST_SETTINGS_ACH_CUTPURSE_HEADER",
      PIN_TYPES.CUTPURSE,
      PIN_TYPES.CUTPURSE_DONE,
      lists.Cutpurse,
      paths.Cutpurse,
      paths.CutpurseDone,
      (pins) => pins.pinTextureCutpurse,
      (pins) => pins.pinTextureCutpurseDone,
      (previews) => previews.cutpurse,
      (previews) => previews.cutpurseDone,
      "previewpinTextureCutpurse",
      choiceAt(lists.Cutpurse, dp.pinTextureCutpurse.type),
      dp.pinTextureCutpurse.size
    )
  )

  return {
    type: "submenu",
    name: DEFAULTS.miscColorCodes.settingsTextAchievements.Colorize(
      getSettingsString("DEST_SETTINGS_ACH_HEADER")
    ),
    tooltip: getSettingsString("DEST_SETTINGS_ACH_HEADER_TT"),
    controls,
  }
}
