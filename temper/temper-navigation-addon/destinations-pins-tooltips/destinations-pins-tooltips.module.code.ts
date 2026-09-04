import { ADDON_NAME } from "../destinations-names/destinations-names.module.code.ts"
import {
  DESTINATIONS_PIN_TYPE_CRAFTING,
  DESTINATIONS_PIN_TYPE_MUNDUS,
} from "../destinations-pins-poi-types/destinations-pins-poi-types.module.code.ts"
import type { SetDescription } from "../destinations-pins-sets/destinations-pins-sets.module.code.ts"
import type { QolPinData } from "../destinations-pins-stores/destinations-pins-stores.module.code.ts"
import type { UnknownPinTag } from "../destinations-pins-unknown-pois/destinations-pins-unknown-pois.module.code.ts"
import { getSavedVariables } from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"

let INFORMATION_TOOLTIP: TooltipControl | GamepadMapLocationTooltip = InformationTooltip

export function onGamepadPreferredModeChanged(this: void): undefined {
  if (IsInGamepadPreferredMode()) {
    INFORMATION_TOOLTIP = ZO_MapLocationTooltip_Gamepad
  } else {
    INFORMATION_TOOLTIP = InformationTooltip
  }
}

function asTooltipControl(tooltip: TooltipControl | GamepadMapLocationTooltip): TooltipControl {
  return tooltip as TooltipControl
}

function asGamepadMapLocationTooltip(
  tooltip: TooltipControl | GamepadMapLocationTooltip
): GamepadMapLocationTooltip {
  return tooltip as GamepadMapLocationTooltip
}

function asUnknownPinTag(pinTag: unknown): UnknownPinTag {
  return pinTag as UnknownPinTag
}

type LegacyPinLines = string[]

function asLegacyPinLines(pinTag: unknown): LegacyPinLines {
  return pinTag as LegacyPinLines
}

function asQolPinData(pinTag: unknown): QolPinData {
  return pinTag as QolPinData
}

function asSetDescription(special: string | SetDescription): SetDescription {
  return special as SetDescription
}

function asString(special: string | SetDescription): string {
  return special as string
}

function keyboardTooltip(): TooltipControl {
  return asTooltipControl(INFORMATION_TOOLTIP)
}

function gamepadTooltip(): GamepadMapLocationTooltip {
  return asGamepadMapLocationTooltip(INFORMATION_TOOLTIP)
}

function gamepadBodyStyle(): { fontSize: number; fontColorField: number } {
  return { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
}

export function getPinTextureUnknown(this: void, pin: MapPin): string {
  return asUnknownPinTag(pin.m_PinTag).texture ?? ""
}

export function getFakedPinTexture(this: void, pin: MapPin): string {
  return asUnknownPinTag(pin.m_PinTag).texture ?? ""
}

function createNewFormatGamepadLines(pinTag: UnknownPinTag): undefined {
  const gp = gamepadTooltip()
  gp.LayoutIconStringLine(
    gp.tooltip,
    undefined,
    pinTag.objectiveName,
    gp.tooltip.GetStyle("mapTitle")
  )

  const sv = getSavedVariables()
  if (sv.settings.AddEnglishOnUnknwon) {
    gp.LayoutIconStringLine(gp.tooltip, undefined, pinTag.englishName, gamepadBodyStyle())
  }

  if (pinTag.special != null) {
    if (
      pinTag.multipleFormat !== undefined &&
      pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_CRAFTING &&
      sv.settings.ImproveCrafting
    ) {
      const lines = asSetDescription(pinTag.special)
      let lineIndex = 0
      for (const lineData of lines) {
        const style = pinTag.multipleFormat.g[lineIndex]
        lineIndex = lineIndex + 1
        gp.LayoutIconStringLine(gp.tooltip, undefined, lineData, style)
      }
    } else if (
      pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_MUNDUS &&
      sv.settings.ImproveMundus
    ) {
      gp.LayoutIconStringLine(gp.tooltip, undefined, asString(pinTag.special), gamepadBodyStyle())
    }
  }
}

function createNewFormatKeyboardLines(pinTag: UnknownPinTag): undefined {
  const kb = keyboardTooltip()
  const sv = getSavedVariables()

  const [tr, tg, tb] = sv.pins.pinTextureUnknown.textcolor
  kb.AddLine(pinTag.objectiveName, "ZoFontGameOutline", tr, tg, tb)
  const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
  kb.AddLine(pinTag.poiTypeName ?? "", "", hr, hg, hb)

  if (sv.settings.AddEnglishOnUnknwon) {
    const [er, eg, eb] = sv.pins.pinTextureUnknown.textcolorEN
    kb.AddLine(pinTag.englishName, "", er, eg, eb)
  }

  if (pinTag.special != null) {
    ZO_Tooltip_AddDivider(kb)
    if (
      pinTag.multipleFormat !== undefined &&
      pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_CRAFTING &&
      sv.settings.ImproveCrafting
    ) {
      const lines = asSetDescription(pinTag.special)
      let lineIndex = 0
      for (const lineData of lines) {
        const kLine = pinTag.multipleFormat.k[lineIndex]
        lineIndex = lineIndex + 1
        if (kLine !== undefined) {
          kb.AddLine(lineData, ...kLine)
        }
      }
    } else if (
      pinTag.destinationsPinType === DESTINATIONS_PIN_TYPE_MUNDUS &&
      sv.settings.ImproveMundus
    ) {
      const [sr, sg, sb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
      kb.AddLine(asString(pinTag.special), "", sr, sg, sb)
    }
  }
}

function createLegacyLines(pinTag: string[]): undefined {
  for (const lineData of pinTag) {
    if (IsInGamepadPreferredMode()) {
      const gp = gamepadTooltip()
      if (pinTag[0] === lineData) {
        gp.LayoutIconStringLine(gp.tooltip, undefined, zo_strformat(lineData), gamepadBodyStyle())
      } else {
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          zo_strformat(lineData),
          gp.tooltip.GetStyle("worldMapTooltip")
        )
      }
    } else {
      keyboardTooltip().AddLine(lineData)
    }
  }
}

export const PIN_TOOLTIP_CREATOR: MapPinTooltipCreator = {
  creator: function (this: void, pin: MapPin): undefined {
    const [, pinTagRaw] = pin.GetPinTypeAndTag()
    if (asUnknownPinTag(pinTagRaw).newFormat === true) {
      const newFormatTag = asUnknownPinTag(pinTagRaw)
      if (IsInGamepadPreferredMode()) {
        createNewFormatGamepadLines(newFormatTag)
      } else {
        createNewFormatKeyboardLines(newFormatTag)
      }
    } else {
      createLegacyLines(asLegacyPinLines(pinTagRaw))
    }
  },
  tooltip: 1,
}

export const QOL_PIN_TOOLTIP_CREATOR: MapPinTooltipCreator = {
  creator: function (this: void, pin: MapPin): undefined {
    const [, pinTagRaw] = pin.GetPinTypeAndTag()
    const pinTag = asQolPinData(pinTagRaw)
    if (IsInGamepadPreferredMode()) {
      const informationTooltip = ZO_MapLocationTooltip_Gamepad
      const baseSection = informationTooltip.tooltip
      informationTooltip.LayoutIconStringLine(
        baseSection,
        undefined,
        ADDON_NAME,
        baseSection.GetStyle("mapLocationTooltipContentHeader")
      )
      informationTooltip.LayoutIconStringLine(
        baseSection,
        undefined,
        pinTag.pinName,
        baseSection.GetStyle("mapLocationTooltipContentName")
      )
    } else {
      const kb = keyboardTooltip()
      if (pinTag.pinTitle != null && pinTag.pinTitle !== "") {
        const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
        kb.AddLine(pinTag.pinTitle, "ZoFontGameOutline", sr, sg, sb)
        ZO_Tooltip_AddDivider(kb)
      }
      const [dr, dg, db] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
      kb.AddLine(pinTag.pinName, "ZoFontGameOutline", dr, dg, db)
    }
  },
}
