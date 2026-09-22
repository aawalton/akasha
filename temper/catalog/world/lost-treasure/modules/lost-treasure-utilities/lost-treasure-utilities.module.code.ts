import { MAP_PINS } from "akasha/temper/addon/pages/world/map-pins/modules/map-pins-public-api/map-pins-public-api.module.code.ts"
import {
  LOST_TREASURE_NO_PIN_TYPE,
  LOST_TREASURE_PIN_TYPE_DATA,
} from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-constants/lost-treasure-constants.module.code.ts"
import { createLogger } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-logger/lost-treasure-logger.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-10/eso-enums-10.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-03/eso-functions-03.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"

const logger = createLogger("utilities")

function parseCapturedString(this: void, captured: string | undefined): string | undefined {
  return captured
}

const TRACKED_SPECIALIZED_ITEM_TYPES: Record<number, true | undefined> = ZO_CreateSetFromArguments(
  SPECIALIZED_ITEMTYPE_TROPHY_TREASURE_MAP,
  SPECIALIZED_ITEMTYPE_TROPHY_SURVEY_REPORT,
  SPECIALIZED_ITEMTYPE_TROPHY_TRIBUTE_CLUE
)

export function isTreasureOrSurveyItemType(this: void, specializedItemType: number): boolean {
  return TRACKED_SPECIALIZED_ITEM_TYPES[specializedItemType] === true
}

export function secondsToMilliseconds(this: void, second: number): number {
  return second * ZO_ONE_SECOND_IN_MILLISECONDS
}

export function getItemLinkFromItemId(this: void, itemId: number): string {
  return string.format("|H0:item:%s:4:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h", tostring(itemId))
}

export function getTreasureMapTexturePathName(this: void, texturePath: string): string | undefined {
  const [capture] = string.match(texturePath, ".+/(.+)%.dds")
  return parseCapturedString(capture)
}

export function runCallbackAsync(
  this: void,
  callback: (this: void) => undefined,
  delay: number
): undefined {
  zo_callLater(function (this: void): undefined {
    callback()
    logger.Debug("async callback run successfully with a delay of %d ms", delay)
  }, delay)
}

export function addTooltip(
  this: void,
  text: string,
  itemName: string,
  itemQualityColor: ZoColorDef,
  itemStackCount: number,
  iconPath: string
): undefined {
  if (IsInGamepadPreferredMode()) {
    const informationTooltip = ZO_MapLocationTooltip_Gamepad
    const baseSection = informationTooltip.tooltip
    const fontLayout = {
      widthPercent: 100,
      fontFace: "$(GAMEPAD_BOLD_FONT)",
      fontSize: "$(GP_34)",
      uppercase: true,
      fontColor: itemQualityColor,
    }
    informationTooltip.LayoutIconStringLine(baseSection, undefined, itemName, fontLayout)

    const iconLayout = {
      fontSize: 27,
      fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3,
    }
    informationTooltip.LayoutIconStringLine(baseSection, iconPath, text, iconLayout)
    if (itemStackCount > 1) {
      informationTooltip.LayoutStringLine(
        baseSection,
        string.format("%s: %d", GetString(SI_CRAFTING_QUANTITY_HEADER), itemStackCount)
      )
    }
  } else {
    const [qr, qg, qb] = itemQualityColor.UnpackRGB()
    InformationTooltip.AddLine(itemName, "", qr, qg, qb)
    const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
    InformationTooltip.AddLine(
      string.format("%s %s", zo_iconFormat(iconPath, 32, 32), text),
      "",
      hr,
      hg,
      hb
    )
    if (itemStackCount > 1) {
      InformationTooltip.AddLine(
        string.format("%s: %d", GetString(SI_CRAFTING_QUANTITY_HEADER), itemStackCount),
        "",
        hr,
        hg,
        hb
      )
    }
  }
}

const ITEM_NAME_CACHE: Record<string, string> = {}

function loggerMessage(this: void, itemName: string): undefined {
  logger.Error("no pinType has been found for itemName: %s", itemName)
}

export function getPlayerPositionInfo(
  this: void
): LuaMultiReturn<[number, number, string, string, number]> {
  const [x, y] = GetMapPlayerPosition("player")
  const [zone, subZone] = MAP_PINS.GetZoneAndSubzone(false, false, false)
  return $multi(x, y, zone ?? "", subZone ?? "", GetCurrentMapId())
}

export function isValidMapType(this: void): boolean {
  return ZO_WorldMapQuestsData_Singleton.ShouldMapShowQuestsInList()
}

export function requestRefreshMap(this: void): undefined {
  if (SetMapToPlayerLocation() === SET_MAP_RESULT_MAP_CHANGED) {
    CALLBACK_MANAGER.FireCallbacks("OnWorldMapChanged")
  }
}

export function getPinTypeFromString(this: void, itemNameRaw: string): string {
  const itemName = zo_strlower(itemNameRaw)

  const itemNameCached = ITEM_NAME_CACHE[itemName]
  if (itemNameCached !== undefined) {
    if (itemNameCached === LOST_TREASURE_NO_PIN_TYPE) {
      loggerMessage(itemName)
      return LOST_TREASURE_NO_PIN_TYPE
    }
    return itemNameCached
  }

  for (const [pinType, pinData] of pairs(LOST_TREASURE_PIN_TYPE_DATA)) {
    const [found] = zo_strfind(itemName, pinData.compareString)
    if (found !== undefined) {
      ITEM_NAME_CACHE[itemName] = pinType
      logger.Verbose("new item has been added to ITEM_NAME_CACHE: %s", itemName)
      return pinType
    }
  }

  ITEM_NAME_CACHE[itemName] = LOST_TREASURE_NO_PIN_TYPE
  loggerMessage(itemName)
  return LOST_TREASURE_NO_PIN_TYPE
}

export function getFileNameFromPath(this: void, path: string): string | undefined {
  const [capture] = string.match(path, "[^/]+$")
  return parseCapturedString(capture)
}

export function doesPathContainsFileName(this: void, path: string, fileName: string): boolean {
  const lowerPath = string.lower(path)
  const lowerFile = string.lower(fileName)
  const [idx] = string.find(lowerPath, lowerFile)
  return idx !== undefined
}
