import { CUSTOM_PINS } from "../map-pins-config/map-pins-config.module.code.ts"
import { asNumber, asNumberMap, asPinTag } from "../map-pins-narrow/map-pins-narrow.module.code.ts"
import type { PinDef } from "../map-pins-pin-types/map-pins-pin-types.module.code.ts"

export const PIN_TOOLTIP_SUPRES: Record<number, true> = {
  [7]: true,
  [16]: true,
  [17]: true,
  [77]: true,
}

function texture(this: void, idx: number): string | undefined {
  const def: PinDef | undefined = CUSTOM_PINS[idx]
  if (def === undefined) {
    return undefined
  }
  const tex = def.texture
  return typeof tex === "string" ? tex : undefined
}

function achLine(this: void, id: number, trailingNewline: boolean): string {
  const [name, , , icon] = GetAchievementInfo(id)
  return zo_strformat("|t24:24:<<2>>|t <<1>>" + (trailingNewline ? "\n" : ""), name, icon)
}

export const PIN_TOOLTIP_CREATOR: {
  tooltip: number
  creator: (this: void, pin: MapPin) => void
} = {
  tooltip: 1,
  creator: (pin: MapPin): undefined => {
    const [, rawPinTag] = pin.GetPinTypeAndTag()
    const pinTag = asPinTag(rawPinTag)
    let name: string | undefined
    let desc: string | undefined
    let desc1: string | undefined
    let icon: string | undefined
    const slot1 = pinTag[1]
    if (slot1 === 15) {
      icon = texture(15)
      name = "Time Rift"
    } else if ((slot1 === 1 || slot1 === 2) && pinTag[4] !== undefined) {
      const [aName, aDesc, , aIcon] = GetAchievementInfo(asNumber(pinTag[2]))
      name = aName
      desc = aDesc
      icon = aIcon
      desc1 = "  Set items:"
      for (const [, id] of pairs(asNumberMap(pinTag[4]))) {
        desc1 =
          desc1 +
          ("\n|H1:item:" + tostring(id) + ":359:50:0:0:0:0:0:0:0:0:0:0:0:0:1:0:0:0:10000:0|h|h")
      }
    } else if (slot1 === 43) {
      icon = texture(43)
      name = GetString(SI_JOURNAL_MENU_ACHIEVEMENTS)
      if (name === "") {
        name = "Achievements"
      }
      desc = achLine(873, true) + achLine(871, true) + achLine(869, false)
    } else if (slot1 === 70) {
      icon = texture(70)
      name = pinTag.name
    } else if (slot1 === 26) {
      icon = texture(slot1)
      name = pinTag.name
    } else if (slot1 === 74) {
      icon = texture(slot1)
      name = pinTag.name
    } else if (slot1 === 76) {
      icon = texture(76)
      name = pinTag.name
    } else if (asNumber(slot1) <= 4 || asNumber(slot1) >= 30) {
      const [aName, aDesc, , aIcon] = GetAchievementInfo(asNumber(pinTag[2]))
      name = aName
      desc = aDesc
      icon = aIcon
      if (pinTag[3] !== undefined) {
        const [critDesc] = GetAchievementCriterion(asNumber(pinTag[2]), asNumber(pinTag[3]))
        desc = critDesc
      }
    } else if (slot1 === 5) {
      const [lName, lIcon] = GetLoreBookInfo(1, asNumber(pinTag[2]), asNumber(pinTag[3]))
      name = lName
      icon = lIcon
    } else if (slot1 === 8) {
      icon = pinTag.texture
      name = pinTag.name
      desc = pinTag.desc
    } else if (slot1 === 21) {
      icon = texture(21)
      name = "Volendrung spawn location"
    }
    name = (pinTag[3] !== undefined ? "[" + tostring(pinTag[3]) + "] " : "") + tostring(name)
    if (IsInGamepadPreferredMode()) {
      const gp = ZO_MapLocationTooltip_Gamepad
      gp.LayoutIconStringLine(
        gp.tooltip,
        icon,
        zo_strformat("<<1>>", name),
        gp.tooltip.GetStyle("mapLocationTooltipWayshrineHeader")
      )
      if (desc !== undefined) {
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          zo_strformat("<<1>>", desc),
          gp.tooltip.GetStyle("mapRecallCost")
        )
      }
      if (desc1 !== undefined) {
        gp.LayoutIconStringLine(
          gp.tooltip,
          undefined,
          zo_strformat("<<1>>", desc1),
          gp.tooltip.GetStyle("mapRecallCost")
        )
      }
    } else {
      const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
      InformationTooltip.AddLine(
        zo_strformat("<<1>> <<2>>", zo_iconFormat(icon ?? "", 24, 24), name),
        "ZoFontGameOutline",
        sr,
        sg,
        sb
      )
      if (desc !== undefined) {
        ZO_Tooltip_AddDivider(InformationTooltip)
        const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
        InformationTooltip.AddLine(zo_strformat("<<1>>", desc), "", hr, hg, hb)
      }
      if (desc1 !== undefined) {
        ZO_Tooltip_AddDivider(InformationTooltip)
        const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
        InformationTooltip.AddLine(zo_strformat("<<1>>", desc1), "", hr, hg, hb)
      }
    }
  },
}
