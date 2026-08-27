import { PINS_COLLECTED, PINS_COMPASS_KNOWN, PINS_COMPASS_UNKNOWN, PINS_UNKNOWN } from "./constants"
import { asChampionPin, getAchievementIDs, getLocalData } from "./local-data"
import { PIN_TEXTURES } from "./pin-textures"
import { getSavedVariables } from "./saved-variables"
import { getUiString } from "./ui-strings"
import { getZoneSubzone } from "./zone"

let updatePins: Record<string, boolean> = {}
let updating = false

export const pinTooltipCreator: MapPinTooltipCreator = {
  tooltip: 1,
  creator: function (this: void, pin: MapPin): undefined {
    const [, pinTag] = pin.GetPinTypeAndTag()
    const pinData = asChampionPin(pinTag)
    const [name] = GetAchievementInfo(pinData[2])
    const [description, numCompleted] = GetAchievementCriterion(pinData[2], pinData[3])
    const info: string[] = []

    if (pinData[4] !== undefined) {
      info.push(`[${getUiString(`DCS_MOREINFO${pinData[4]}`)}]`)
    }
    if (numCompleted === 1) {
      info.push(`[${getUiString("DCS_KNOWN")}]`)
    }

    if (IsInGamepadPreferredMode()) {
      const tip = ZO_MapLocationTooltip_Gamepad
      tip.LayoutIconStringLine(
        tip.tooltip,
        undefined,
        zo_strformat(name),
        tip.tooltip.GetStyle("mapTitle")
      )
      tip.LayoutIconStringLine(
        tip.tooltip,
        PIN_TEXTURES.unknown[1],
        zo_strformat("(<<1>>) <<2>>", pinData[3], description),
        { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
      )
      if (info[0] !== undefined) {
        tip.LayoutIconStringLine(
          tip.tooltip,
          undefined,
          info.join(" / "),
          tip.tooltip.GetStyle("worldMapTooltip")
        )
      }
    } else {
      const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
      InformationTooltip.AddLine(zo_strformat("<<1>>", name), "ZoFontGameOutline", sr, sg, sb)
      ZO_Tooltip_AddDivider(InformationTooltip)
      const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
      InformationTooltip.AddLine(
        zo_strformat("(<<1>>) <<2>>", pinData[3], description),
        "",
        hr,
        hg,
        hb
      )
      if (info[0] !== undefined) {
        const [dr, dg, db] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
        InformationTooltip.AddLine(info.join(" / "), "", dr, dg, db)
      }
    }
    return undefined
  },
}

function createPins(): undefined {
  const [zone, subzone] = getZoneSubzone()
  const mapid = GetCurrentMapId()
  const champions = getLocalData(zone, subzone, mapid)

  if (champions !== undefined) {
    const filters = getSavedVariables().filters
    for (const pinData of champions) {
      const [, numCompleted] = GetAchievementCriterion(pinData[2], pinData[3])
      if (numCompleted === 1) {
        if (updatePins[PINS_COLLECTED] === true && LibMapPins.IsEnabled(PINS_COLLECTED)) {
          LibMapPins.CreatePin(PINS_COLLECTED, pinData, pinData[0], pinData[1])
        }
        if (updatePins[PINS_COMPASS_KNOWN] === true && filters[PINS_COMPASS_KNOWN] === true) {
          COMPASS_PINS.pinManager.CreatePin(PINS_COMPASS_KNOWN, pinData, pinData[0], pinData[1])
        }
      } else if (numCompleted === 0) {
        if (updatePins[PINS_UNKNOWN] === true && LibMapPins.IsEnabled(PINS_UNKNOWN)) {
          LibMapPins.CreatePin(PINS_UNKNOWN, pinData, pinData[0], pinData[1])
        }
        if (updatePins[PINS_COMPASS_UNKNOWN] === true && filters[PINS_COMPASS_UNKNOWN] === true) {
          COMPASS_PINS.pinManager.CreatePin(PINS_COMPASS_UNKNOWN, pinData, pinData[0], pinData[1])
        }
      }
    }
  }

  updatePins = {}
  updating = false
  return undefined
}

function queueCreatePins(pinType: string): undefined {
  updatePins[pinType] = true
  if (!updating) {
    updating = true
    if (IsPlayerActivated()) {
      createPins()
    } else {
      EVENT_MANAGER.RegisterForEvent(
        "DungeonChampions_PinUpdate",
        EVENT_PLAYER_ACTIVATED,
        function (this: void, event: number): undefined {
          EVENT_MANAGER.UnregisterForEvent("DungeonChampions_PinUpdate", event)
          createPins()
          return undefined
        }
      )
    }
  }
  return undefined
}

export function mapCallbackUnknown(this: void): undefined {
  if (!LibMapPins.IsEnabled(PINS_UNKNOWN) || GetMapType() > MAPTYPE_ZONE) return undefined
  return queueCreatePins(PINS_UNKNOWN)
}

export function mapCallbackCollected(this: void): undefined {
  if (!LibMapPins.IsEnabled(PINS_COLLECTED) || GetMapType() > MAPTYPE_ZONE) return undefined
  return queueCreatePins(PINS_COLLECTED)
}

export function compassCallbackUnknown(this: void): undefined {
  if (getSavedVariables().filters[PINS_COMPASS_UNKNOWN] !== true || GetMapType() > MAPTYPE_ZONE) {
    return undefined
  }
  return queueCreatePins(PINS_COMPASS_UNKNOWN)
}

export function compassCallbackKnown(this: void): undefined {
  if (getSavedVariables().filters[PINS_COMPASS_KNOWN] !== true || GetMapType() > MAPTYPE_ZONE) {
    return undefined
  }
  return queueCreatePins(PINS_COMPASS_KNOWN)
}

function refreshAllPins(achievementId: number): undefined {
  const ids = getAchievementIDs()
  if (ids[achievementId] === true) {
    LibMapPins.RefreshPins(PINS_UNKNOWN)
    LibMapPins.RefreshPins(PINS_COLLECTED)
    COMPASS_PINS.RefreshPins(PINS_COMPASS_KNOWN)
    COMPASS_PINS.RefreshPins(PINS_COMPASS_UNKNOWN)
  }
  return undefined
}

export function onAchievementUpdate(
  this: void,
  _eventCode: number,
  achievementId: number
): undefined {
  return refreshAllPins(achievementId)
}

export function onAchievementAwarded(
  this: void,
  _eventCode: number,
  _name: string,
  _points: number,
  achievementId: number
): undefined {
  return refreshAllPins(achievementId)
}
