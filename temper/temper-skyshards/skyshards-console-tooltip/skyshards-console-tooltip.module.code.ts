import {
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "../skyshards-constants/skyshards-constants.module.code.ts"
import type { SkyshardPin } from "../skyshards-types/skyshards-types.module.code.ts"

function creator(this: void, pin: MapPin): undefined {
  const [, rawTag] = pin.GetPinTypeAndTag()
  const pinTag = rawTag as SkyshardPin

  const [name] = GetAchievementInfo(pinTag[SKYSHARDS_PINDATA_ACHIEVEMENTID])
  const zoneId = GetSkyshardAchievementZoneId(pinTag[SKYSHARDS_PINDATA_ACHIEVEMENTID])
  const shardId = GetZoneSkyshardId(zoneId, pinTag[SKYSHARDS_PINDATA_ZONEGUIDEINDEX])
  const description = GetSkyshardHint(shardId)
  const shardStatus = GetSkyshardDiscoveryStatus(shardId)
  const info: string[] = []

  const moreInfo = pinTag[SKYSHARDS_PINDATA_MOREINFO]
  if (moreInfo != null) {
    info.push("[" + GetString("SKYS_MOREINFO", moreInfo) + "]")
  }
  if (shardStatus === SKYSHARD_DISCOVERY_STATUS_ACQUIRED) {
    info.push("[" + GetString(SKYS_KNOWN) + "]")
  }

  if (IsInGamepadPreferredMode()) {
    const informationTooltip = ZO_MapLocationTooltip_Gamepad
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
      zo_strformat("(<<1>>) <<2>>", pinTag[SKYSHARDS_PINDATA_ZONEGUIDEINDEX], description),
      { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
    )
    if (info.length > 0) {
      informationTooltip.LayoutIconStringLine(
        tooltip,
        undefined,
        table.concat(info, " / "),
        tooltip.GetStyle("worldMapTooltip")
      )
    }
  } else {
    const informationTooltip = InformationTooltip
    const [sr, sg, sb] = ZO_SELECTED_TEXT.UnpackRGB()
    informationTooltip.AddLine(zo_strformat("<<1>>", name), "ZoFontGameOutline", sr, sg, sb)
    ZO_Tooltip_AddDivider(informationTooltip)
    const [hr, hg, hb] = ZO_HIGHLIGHT_TEXT.UnpackRGB()
    informationTooltip.AddLine(
      zo_strformat("(<<1>>) <<2>>", pinTag[SKYSHARDS_PINDATA_ZONEGUIDEINDEX], description),
      "",
      hr,
      hg,
      hb
    )
    if (info.length > 0) {
      const [dr, dg, db] = ZO_TOOLTIP_DEFAULT_COLOR.UnpackRGB()
      informationTooltip.AddLine(table.concat(info, " / "), "", dr, dg, db)
    }
  }
}

export const PIN_TOOLTIP_CREATOR: MapPinTooltipCreator = {
  tooltip: 1,
  creator,
}
