import {
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/world/map-pins/map-pins-declarations/map-pins-declarations.type-declaration.d.ts"
import "akasha/temper/catalog/world/skyshard/skyshards-string-ids/skyshards-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-07/eso-functions-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

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
