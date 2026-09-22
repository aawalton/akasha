import {
  SKYSHARDS_PINDATA_ACHIEVEMENTID,
  SKYSHARDS_PINDATA_LOCX,
  SKYSHARDS_PINDATA_LOCY,
  SKYSHARDS_PINDATA_MOREINFO,
  SKYSHARDS_PINDATA_ZONEGUIDEINDEX,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import {
  field,
  getSkyshardIdByCriteria,
  optionalField,
} from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-pin-data/skyshards-pc-pin-data.module.code.ts"
import type { SkyshardPin } from "akasha/temper/catalog/world/skyshard/modules/skyshards-types/skyshards-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/pages/items/craft-decl-controls/craft-decl-controls.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-map-pins/lib-map-pins.type-declaration.d.ts"
import "akasha/temper/catalog/world/skyshard/skyshards-string-ids/skyshards-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-13/eso-enums-13.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-09/eso-functions-09.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-interface-extra-4/eso-interface-extra-4.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-map-ui/eso-map-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"

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
