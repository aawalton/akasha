import {
  DEST_PIN_TEXT_COLOR_AYLEID,
  DEST_PIN_TEXT_COLOR_BRAWL,
  DEST_PIN_TEXT_COLOR_BRAWL_DONE,
  DEST_PIN_TEXT_COLOR_BREAKING,
  DEST_PIN_TEXT_COLOR_BREAKING_DONE,
  DEST_PIN_TEXT_COLOR_CHAMPION,
  DEST_PIN_TEXT_COLOR_CHAMPION_DONE,
  DEST_PIN_TEXT_COLOR_COLLECTIBLE,
  DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE,
  DEST_PIN_TEXT_COLOR_CUTPURSE,
  DEST_PIN_TEXT_COLOR_CUTPURSE_DONE,
  DEST_PIN_TEXT_COLOR_DEADLANDS,
  DEST_PIN_TEXT_COLOR_DWEMER,
  DEST_PIN_TEXT_COLOR_EARTHLYPOS,
  DEST_PIN_TEXT_COLOR_EARTHLYPOS_DONE,
  DEST_PIN_TEXT_COLOR_FISH,
  DEST_PIN_TEXT_COLOR_FISH_DONE,
  DEST_PIN_TEXT_COLOR_HIGHISLE,
  DEST_PIN_TEXT_COLOR_MAIQ,
  DEST_PIN_TEXT_COLOR_MAIQ_DONE,
  DEST_PIN_TEXT_COLOR_NOSEDIVER,
  DEST_PIN_TEXT_COLOR_NOSEDIVER_DONE,
  DEST_PIN_TEXT_COLOR_ONME,
  DEST_PIN_TEXT_COLOR_ONME_DONE,
  DEST_PIN_TEXT_COLOR_OTHER,
  DEST_PIN_TEXT_COLOR_OTHER_DONE,
  DEST_PIN_TEXT_COLOR_PATRON,
  DEST_PIN_TEXT_COLOR_PATRON_DONE,
  DEST_PIN_TEXT_COLOR_PEACEMAKER,
  DEST_PIN_TEXT_COLOR_PEACEMAKER_DONE,
  DEST_PIN_TEXT_COLOR_QOLPIN,
  DEST_PIN_TEXT_COLOR_RELICHUNTER,
  DEST_PIN_TEXT_COLOR_RELICHUNTER_DONE,
  DEST_PIN_TEXT_COLOR_VAMPALTAR,
  DEST_PIN_TEXT_COLOR_WROTHGARJUMPER,
  DEST_PIN_TEXT_COLOR_WROTHGARJUMPER_DONE,
  DEST_PIN_TEXT_COLOR_WWSHRINE,
  DEST_PIN_TEXT_COLOR_WWVAMP,
  DEST_PIN_TEXT_COLORBAIT_FISH,
  DEST_PIN_TEXT_COLORBAIT_FISH_DONE,
  DEST_PIN_TEXT_COLORTITLE_COLLECTIBLE,
  DEST_PIN_TEXT_COLORTITLE_FISH,
  DEST_PIN_TEXT_COLORTITLE_FISH_DONE,
  DEST_PIN_TEXT_COLORWATER_FISH,
  DEST_PIN_TEXT_COLORWATER_FISH_DONE,
  DEST_PIN_TINT_AYLEID,
  DEST_PIN_TINT_COLLECTIBLE,
  DEST_PIN_TINT_COLLECTIBLE_DONE,
  DEST_PIN_TINT_DEADLANDS,
  DEST_PIN_TINT_DWEMER,
  DEST_PIN_TINT_FISH,
  DEST_PIN_TINT_FISH_DONE,
  DEST_PIN_TINT_HIGHISLE,
  DEST_PIN_TINT_OTHER,
  DEST_PIN_TINT_OTHER_DONE,
  DEST_PIN_TINT_QOLPIN,
  DEST_PIN_TINT_UNKNOWN,
  DEST_PIN_TINT_VAMPALTAR,
  DEST_PIN_TINT_WWSHRINE,
  DEST_PIN_TINT_WWVAMP,
} from "../colors"
import { getSavedVariables } from "../saved-variables"

type SavedColorTable = number[]

function asSavedColorTable(table: object): SavedColorTable {
  return table as SavedColorTable
}

function Destinations_SetTextColor(colorDef: ZoColorDef, savedVarColorTable: unknown): undefined {
  const colorTable =
    typeof savedVarColorTable === "object" && savedVarColorTable !== null
      ? asSavedColorTable(savedVarColorTable)
      : [1, 1, 1]
  const [r, g, b] = colorTable
  colorDef.SetRGB(r ?? 1, g ?? 1, b ?? 1)
}

function Destinations_SetTintColor(colorDef: ZoColorDef, savedVarColorTable: unknown): undefined {
  const colorTable =
    typeof savedVarColorTable === "object" && savedVarColorTable !== null
      ? asSavedColorTable(savedVarColorTable)
      : [1, 1, 1, 1]
  const [r, g, b, a] = colorTable
  colorDef.SetRGBA(r ?? 1, g ?? 1, b ?? 1, a ?? 1)
}

export function InitializePinTextColorDefs(): undefined {
  const pins = getSavedVariables().pins
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_OTHER, pins.pinTextureOther.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_OTHER_DONE, pins.pinTextureOtherDone.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_MAIQ, pins.pinTextureMaiq.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_MAIQ_DONE, pins.pinTextureMaiqDone.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_PEACEMAKER, pins.pinTexturePeacemaker.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_PEACEMAKER_DONE,
    pins.pinTexturePeacemakerDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_NOSEDIVER, pins.pinTextureNosediver.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_NOSEDIVER_DONE,
    pins.pinTextureNosediverDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_EARTHLYPOS, pins.pinTextureEarthlyPos.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_EARTHLYPOS_DONE,
    pins.pinTextureEarthlyPosDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_ONME, pins.pinTextureOnMe.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_ONME_DONE, pins.pinTextureOnMeDone.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_BRAWL, pins.pinTextureBrawl.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_BRAWL_DONE, pins.pinTextureBrawlDone.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_PATRON, pins.pinTexturePatron.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_PATRON_DONE, pins.pinTexturePatronDone.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_WROTHGARJUMPER,
    pins.pinTextureWrothgarJumper.textcolor
  )
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_WROTHGARJUMPER_DONE,
    pins.pinTextureWrothgarJumperDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_RELICHUNTER, pins.pinTextureRelicHunter.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_RELICHUNTER_DONE,
    pins.pinTextureRelicHunterDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_BREAKING, pins.pinTextureBreaking.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_BREAKING_DONE,
    pins.pinTextureBreakingDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_CUTPURSE, pins.pinTextureCutpurse.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_CUTPURSE_DONE,
    pins.pinTextureCutpurseDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_CHAMPION, pins.pinTextureChampion.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_CHAMPION_DONE,
    pins.pinTextureChampionDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_AYLEID, pins.pinTextureAyleid.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_DEADLANDS, pins.pinTextureDeadlands.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_HIGHISLE, pins.pinTextureHighIsle.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_DWEMER, pins.pinTextureDwemer.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_WWVAMP, pins.pinTextureWWVamp.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_VAMPALTAR, pins.pinTextureVampAltar.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_WWSHRINE, pins.pinTextureWWShrine.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_COLLECTIBLE, pins.pinTextureCollectible.textcolor)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLOR_COLLECTIBLE_DONE,
    pins.pinTextureCollectibleDone.textcolor
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_FISH, pins.pinTextureFish.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_FISH_DONE, pins.pinTextureFishDone.textcolor)
  Destinations_SetTextColor(DEST_PIN_TEXT_COLOR_QOLPIN, pins.pinTextureQolPin.textcolor)
}

export function InitializePinTextColorCollectibleDefs(): undefined {
  const pins = getSavedVariables().pins
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLORTITLE_COLLECTIBLE,
    pins.pinTextureCollectible.textcolortitle
  )
}

export function InitializePinTextColorFishingDefs(): undefined {
  const pins = getSavedVariables().pins
  Destinations_SetTextColor(DEST_PIN_TEXT_COLORTITLE_FISH, pins.pinTextureFish.textcolortitle)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLORTITLE_FISH_DONE,
    pins.pinTextureFishDone.textcolortitle
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLORBAIT_FISH, pins.pinTextureFish.textcolorBait)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLORBAIT_FISH_DONE,
    pins.pinTextureFishDone.textcolorBait
  )
  Destinations_SetTextColor(DEST_PIN_TEXT_COLORWATER_FISH, pins.pinTextureFish.textcolorWater)
  Destinations_SetTextColor(
    DEST_PIN_TEXT_COLORWATER_FISH_DONE,
    pins.pinTextureFishDone.textcolorWater
  )
}

export function InitializePinTintColorDefs(): undefined {
  const pins = getSavedVariables().pins
  Destinations_SetTintColor(DEST_PIN_TINT_UNKNOWN, pins.pinTextureUnknown.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_OTHER, pins.pinTextureOther.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_OTHER_DONE, pins.pinTextureOtherDone.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_COLLECTIBLE, pins.pinTextureCollectible.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_COLLECTIBLE_DONE, pins.pinTextureCollectibleDone.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_FISH, pins.pinTextureFish.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_FISH_DONE, pins.pinTextureFishDone.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_AYLEID, pins.pinTextureAyleid.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_DEADLANDS, pins.pinTextureDeadlands.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_HIGHISLE, pins.pinTextureHighIsle.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_DWEMER, pins.pinTextureDwemer.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_WWVAMP, pins.pinTextureWWVamp.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_VAMPALTAR, pins.pinTextureVampAltar.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_WWSHRINE, pins.pinTextureWWShrine.tint)
  Destinations_SetTintColor(DEST_PIN_TINT_QOLPIN, pins.pinTextureQolPin.tint)
}
