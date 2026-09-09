import {
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import {
  field,
  getSkyshardIdByCriteria,
  optionalField,
} from "../skyshards-pc-pin-data/skyshards-pc-pin-data.module.code.ts"
import type { SkyshardPin } from "../skyshards-types/skyshards-types.module.code.ts"

function keyboardTooltip(this: void): TooltipControl {
  return InformationTooltip
}

function gamepadTooltip(this: void): GamepadMapLocationTooltip {
  return ZO_MapLocationTooltip_Gamepad
}

export const PIN_TOOLTIP_CREATOR: MapPinTooltipCreator = {
  tooltip: 1,
  creator: function (this: void, pin: MapPin): undefined {
    const [, pinTagRaw] = pin.GetPinTypeAndTag()
    const pinTag = pinTagRaw as SkyshardPin
    const [name] = GetAchievementInfo(field(pinTag, SKYSHARDS_PINDATA_ACHIEVEMENTID))
    const zoneId = GetSkyshardAchievementZoneId(field(pinTag, SKYSHARDS_PINDATA_ACHIEVEMENTID))
    const shardId = getSkyshardIdByCriteria(
      zoneId,
      field(pinTag, SKYSHARDS_PINDATA_ACHIEVEMENTID),
      field(pinTag, SKYSHARDS_PINDATA_ZONEGUIDEINDEX),
      field(pinTag, SKYSHARDS_PINDATA_LOCX),
      field(pinTag, SKYSHARDS_PINDATA_LOCY)
    )
    if (shardId == null) return
    const description = GetSkyshardHint(shardId)
    const shardStatus = GetSkyshardDiscoveryStatus(shardId)
    const info: string[] = []

    const moreInfo = optionalField(pinTag, SKYSHARDS_PINDATA_MOREINFO)
    if (moreInfo != null) {
      info.push("[" + GetString("SKYS_MOREINFO", moreInfo) + "]")
    }
    if (shardStatus === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
      info.push("[" + GetString(SKYS_KNOWN) + "]")
    }

    const zoneGuideIndex = field(pinTag, SKYSHARDS_PINDATA_ZONEGUIDEINDEX)

    if (IsInGamepadPreferredMode()) {
      const informationTooltip = gamepadTooltip()
      const tooltip = informationTooltip.tooltip
      const mapTitleStyle = tooltip.GetStyle("mapTitle")
      informationTooltip.LayoutIconStringLine(
        tooltip,
        undefined,
        zo_strformat("<<1>>", name),
        mapTitleStyle
      )
      informationTooltip.LayoutIconStringLine(
        tooltip,
        undefined,
        zo_strformat("(<<1>>) <<2>>", zoneGuideIndex, description),
        { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
      )
      if (info[0] != null) {
        informationTooltip.LayoutIconStringLine(
          tooltip,
          undefined,
          table.concat(info, " / "),
          tooltip.GetStyle("worldMapTooltip")
        )
      }
    } else {
      const informationTooltip = keyboardTooltip()
      const [nr, ng, nb] = ZO_SELECTED_TEXT.UnpackRGB()
      informationTooltip.AddLine(zo_strformat("<<1>>", name), "ZoFontGameOutline", nr, ng, nb)
      ZO_Tooltip_AddDivider(informationTooltip)
      const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
      informationTooltip.AddLine(
        zo_strformat("(<<1>>) <<2>>", zoneGuideIndex, description),
        "",
        hr,
        hg,
        hb
      )
      if (info[0] != null) {
        const [dr, dg, db] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
        informationTooltip.AddLine(table.concat(info, " / "), "", dr, dg, db)
      }
    }
  },
}
