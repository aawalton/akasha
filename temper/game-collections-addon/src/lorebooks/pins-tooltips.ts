import {
  LORE_LIBRARY_EIDETIC,
  LORE_LIBRARY_SHALIDOR,
  MISSING_TEXTURE,
  PLACEHOLDER_TEXTURE,
  SHALIDOR_BOOKINDEX,
  SHALIDOR_COLLECTIONINDEX,
  SHALIDOR_MOREINFO_BREADCRUMB,
  SHALIDOR_ZONEID,
} from "./constants"
import { LoreBooks_GetNewLoreBookInfo, LoreBooks_GetNewLoreCollectionInfo } from "./data-accessors"
import { locationDetails } from "./location-details"
import { dm } from "./logger"
import {
  asBookshelfPinTag,
  asEideticPinTag,
  asShalidorPinTag,
  getPinTextureBookshelf,
  isTableValue,
} from "./pins"
import { getQuestLocation } from "./quest-location"
import { getSavedVariables } from "./saved-variables"

export const pinTooltipState: { informationTooltip: unknown } = {
  informationTooltip: undefined,
}

function asTooltipControl(value: unknown): TooltipControl {
  return value as TooltipControl
}

function asGamepadMapLocationTooltip(value: unknown): GamepadMapLocationTooltip {
  return value as GamepadMapLocationTooltip
}

function keyboardTooltip(): TooltipControl {
  return asTooltipControl(pinTooltipState.informationTooltip)
}

function gamepadTooltip(): GamepadMapLocationTooltip {
  return asGamepadMapLocationTooltip(pinTooltipState.informationTooltip)
}

function gamepadBodyStyle(): { fontSize: number; fontColorField: number } {
  return { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
}

function gamepadColor2Style(): { fontSize: number; fontColorField: number } {
  return { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_2 }
}

export const pinTooltipCreator: MapPinTooltipCreator = {
  tooltip: ZO_MAP_TOOLTIP_MODE.INFORMATION,
  creator: function (this: void, mapPinObject: MapPin): undefined {
    if (!isTableValue(mapPinObject) || !isTableValue(mapPinObject.m_PinTag)) {
      dm("Warn", "Invalid Shalidor mapPinObject or missing m_PinTag in tooltip")
      return
    }

    const pinTag = asShalidorPinTag(mapPinObject.m_PinTag)
    const [title, iconFromInfo, known] = LoreBooks_GetNewLoreBookInfo(
      LORE_LIBRARY_SHALIDOR,
      pinTag[SHALIDOR_COLLECTIONINDEX],
      pinTag[SHALIDOR_BOOKINDEX]
    )
    const [collectionName] = LoreBooks_GetNewLoreCollectionInfo(
      LORE_LIBRARY_SHALIDOR,
      pinTag[SHALIDOR_COLLECTIONINDEX]
    )
    const moreinfo: string[] = []

    let icon = iconFromInfo
    if (icon === MISSING_TEXTURE) icon = PLACEHOLDER_TEXTURE

    let fakePin = false
    const ld = pinTag.ld
    if (ld !== undefined) {
      for (const [, details] of ipairs(ld)) {
        if (details === SHALIDOR_MOREINFO_BREADCRUMB) {
          fakePin = true
        }
        if (details !== undefined && !fakePin) {
          moreinfo.push(`[${zo_strformat(locationDetails[details] ?? "")}]`)
        }
      }
    }

    const zoneIdField = pinTag[SHALIDOR_ZONEID]
    if (zoneIdField !== undefined) {
      moreinfo.push(`[${zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameById(zoneIdField))}]`)
    }

    const bookColor = known ? ZO_SUCCEEDED_TEXT : ZO_HIGHLIGHT_TEXT

    if (IsInGamepadPreferredMode()) {
      const gp = gamepadTooltip()
      gp.LayoutIconStringLine(
        gp.tooltip,
        undefined,
        zo_strformat(collectionName),
        gp.tooltip.GetStyle("mapTitle")
      )
      gp.LayoutIconStringLine(gp.tooltip, icon, bookColor.Colorize(title), gamepadBodyStyle())
      if (moreinfo.length > 0) {
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          table.concat(moreinfo, " / "),
          gp.tooltip.GetStyle("worldMapTooltip")
        )
      }
    } else {
      const kb = keyboardTooltip()
      const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
      kb.AddLine(zo_strformat(collectionName), "ZoFontGameOutline", sr, sg, sb)
      ZO_Tooltip_AddDivider(kb)
      const [br, bg, bb] = bookColor.UnpackRGB()
      kb.AddLine(zo_iconTextFormat(icon, 32, 32, title), "", br, bg, bb)
      if (moreinfo.length > 0) {
        const [dr, dg, db_] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
        kb.AddLine(table.concat(moreinfo, " / "), "", dr, dg, db_)
      }
    }
  },
}

export const pinTooltipCreatorBookshelf: MapPinTooltipCreator = {
  tooltip: ZO_MAP_TOOLTIP_MODE.INFORMATION,
  creator: function (this: void, mapPinObject: MapPin): undefined {
    if (!isTableValue(mapPinObject) || !isTableValue(mapPinObject.m_PinTag)) {
      dm("Warn", "Invalid Bookshelf mapPinObject or missing m_PinTag in tooltip")
      return
    }

    const pinTag = asBookshelfPinTag(mapPinObject.m_PinTag)
    const title = pinTag.pinName ?? GetString(LBOOKS_BOOKSHELF)
    const icon = getPinTextureBookshelf(mapPinObject)
    const moreinfo: string[] = []

    if (IsInGamepadPreferredMode()) {
      const gp = gamepadTooltip()
      gp.LayoutIconStringLine(gp.tooltip, icon, title, gamepadBodyStyle())
      if (moreinfo.length > 0) {
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          table.concat(moreinfo, " / "),
          gp.tooltip.GetStyle("worldMapTooltip")
        )
      }
    } else {
      const kb = keyboardTooltip()
      const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
      kb.AddLine(zo_iconTextFormat(icon, 32, 32, title), "", hr, hg, hb)
      if (moreinfo.length > 0) {
        const [dr, dg, db_] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
        kb.AddLine(table.concat(moreinfo, " / "), "", dr, dg, db_)
      }
    }
  },
}

export const pinTooltipCreatorEidetic: MapPinTooltipCreator = {
  tooltip: 1,
  creator: function (this: void, mapPinObject: MapPin): undefined {
    if (!isTableValue(mapPinObject) || !isTableValue(mapPinObject.m_PinTag)) {
      dm("Warn", "Invalid Eidetic mapPinObject or missing m_PinTag in tooltip")
      return
    }

    const pinTag = asEideticPinTag(mapPinObject.m_PinTag)

    const [title, iconFromInfo, known] = LoreBooks_GetNewLoreBookInfo(
      LORE_LIBRARY_EIDETIC,
      pinTag.c ?? 0,
      pinTag.b ?? 0
    )
    const [collectionName] = LoreBooks_GetNewLoreCollectionInfo(LORE_LIBRARY_EIDETIC, pinTag.c ?? 0)
    let icon = iconFromInfo
    if (icon === MISSING_TEXTURE) icon = PLACEHOLDER_TEXTURE
    const dungeonMapId = pinTag.pm
    const mapName = zo_strformat(SI_WINDOW_TITLE_WORLD_MAP, GetMapNameById(dungeonMapId ?? 0))

    let bookColor = ZO_HIGHLIGHT_TEXT
    if (known) {
      bookColor = ZO_SUCCEEDED_TEXT
    }

    const db = getSavedVariables()

    if (IsInGamepadPreferredMode()) {
      const gp = gamepadTooltip()
      gp.LayoutIconStringLine(
        gp.tooltip,
        undefined,
        zo_strformat(collectionName),
        gp.tooltip.GetStyle("mapTitle")
      )
      gp.LayoutIconStringLine(gp.tooltip, undefined, bookColor.Colorize(title), gamepadBodyStyle())

      if (pinTag.q !== undefined && db.showQuestName) {
        const questName = GetQuestName(pinTag.q)
        const questDetails = getQuestLocation(pinTag.q)
        let questInfo: string
        if (questDetails !== "") {
          questInfo = string.format(GetString(LBOOKS_QUEST_BOOK_ZONENAME), questDetails, questName)
        } else {
          questInfo = string.format(GetString(LBOOKS_QUEST_BOOK), questDetails, questName)
        }
        if (questName !== undefined) {
          gp.LayoutIconStringLine(gp.tooltip, undefined, questInfo, gamepadColor2Style())
        }
      }

      if (pinTag.d !== undefined && db.showDungeonTag && mapName !== undefined) {
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          string.format("[%s]", mapName),
          gamepadColor2Style()
        )
      }

      if (pinTag.ld !== undefined) {
        const pinNote = `[${zo_strformat(locationDetails[pinTag.ld] ?? "")}]`
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          pinNote,
          gp.tooltip.GetStyle("worldMapTooltip")
        )
      }
    } else {
      const kb = keyboardTooltip()
      const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
      kb.AddLine(zo_strformat(collectionName), "ZoFontGameOutline", sr, sg, sb)
      ZO_Tooltip_AddDivider(kb)
      const [br, bg, bb] = bookColor.UnpackRGB()
      kb.AddLine(zo_iconTextFormat(icon, 32, 32, title), "", br, bg, bb)

      if (pinTag.q !== undefined && db.showQuestName) {
        const questName = GetQuestName(pinTag.q)
        const questDetails = getQuestLocation(pinTag.q)
        let questInfo: string
        if (questDetails !== "") {
          questInfo = string.format(GetString(LBOOKS_QUEST_BOOK_ZONENAME), questDetails, questName)
        } else {
          questInfo = string.format(GetString(LBOOKS_QUEST_BOOK), questDetails, questName)
        }
        if (questName !== undefined) {
          kb.AddLine(questInfo, "", sr, sg, sb)
        }
      }

      if (pinTag.d !== undefined && db.showDungeonTag && mapName !== undefined) {
        kb.AddLine(string.format("[%s]", mapName), "", sr, sg, sb)
      }

      if (pinTag.ld !== undefined) {
        const pinNote = `[${zo_strformat(locationDetails[pinTag.ld] ?? "")}]`
        const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
        kb.AddLine(pinNote, "", hr, hg, hb)
      }
    }
  },
}
