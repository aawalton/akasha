import { CustomPins } from "./custom-pins-config"
import type { PinList, PinTuple } from "./data/data-types"
import { ChestData } from "./data/generated/chest-data.generated"
import { Lorebooks } from "./data/generated/lorebooks-data.generated"
import { MundusDescription } from "./data/generated/mundus-description-data.generated"
import { UnknownPOI } from "./data/generated/unknown-poi-data.generated"
import { UnknownPOItexture } from "./data/generated/unknown-poi-texture-data.generated"
import {
  asDescMap,
  asIconMap,
  asNestedPinSubtable,
  asNumber,
  asOptPinList,
  asPinTag,
  asPinTuple,
  asPoiNameTable,
  asString,
  asSubzonePinTable,
} from "./narrow"
import type { MapPinCallbackFn, PinTag } from "./pin-types"
import { getChestData } from "./saved-variables"
import { getPinManager, getPinTypeId, state } from "./state"

const lorebooks = asSubzonePinTable(Lorebooks)
const chestDataTable = asSubzonePinTable(ChestData)
const unknownPoi = asPoiNameTable(UnknownPOI)
const unknownPoiTexture = asIconMap(UnknownPOItexture)
const mundusDescription = asDescMap(MundusDescription)

function GetSetDescription(
  this: void,
  setData: PinTuple | undefined
): LuaMultiReturn<[string, string]> {
  if (setData !== undefined) {
    const itemLink =
      "|H1:item:" + tostring(setData[0]) + ":370:50:0:0:0:0:0:0:0:0:0:0:0:0:1:0:0:0:10000:0|h|h"
    const [, setName, numBonuses] = GetItemLinkSetInfo(itemLink, false)
    let setBonuses = zo_strformat("|cEEEEEE<<1>> traits required|r\n", setData[1])
    let numRequired = 0
    for (let i = 1; i <= numBonuses; i++) {
      const [required, descRaw] = GetItemLinkSetBonusInfo(itemLink, false, i)
      numRequired = required
      let description = descRaw
      ;[description] = string.gsub(description, "%d+ %w+ Health", "|cFF2222%1|r")
      ;[description] = string.gsub(description, "%d+ %w+ Stamina", "|c22FF22%1|r")
      ;[description] = string.gsub(description, "%d+ %w+ Magicka", "|c5555EE%1|r")
      ;[description] = string.gsub(description, "%d+ Health %w+", "|cFF2222%1|r")
      ;[description] = string.gsub(description, "%d+ Stamina %w+", "|c22FF22%1|r")
      ;[description] = string.gsub(description, "%d+ Magicka %w+", "|c5555EE%1|r")
      ;[description] = string.gsub(description, "%d+ Spell Damage", "|c5555EE%1|r")
      ;[description] = string.gsub(description, "%d+ Weapon Damage", "|cBBBBBB%1|r")
      ;[description] = string.gsub(description, "%d+ %w+ Critical", "|cBB33BB%1|r")
      setBonuses = setBonuses + description + (i < numBonuses ? "\n" : "")
    }
    return $multi(zo_strformat("<<1>> set (<<2>> items)", setName, numRequired), setBonuses)
  }
  return $multi("", "")
}

export const lootMapPinCallbacks: Record<number, MapPinCallbackFn | undefined> = {
  [5]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const mapData = lorebooks[subzone]
    if (mapData !== undefined) {
      for (const [, pinData] of ipairs(mapData)) {
        const [, , done] = GetLoreBookInfo(1, asNumber(pinData[2]), asNumber(pinData[3]))
        if (done === def.done) {
          getPinManager().CreatePin(
            getPinTypeId(i),
            asPinTag({ [1]: i, [2]: pinData[2], [3]: pinData[3] }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
    }
  },
  [7]: (i: number, subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const id = getPinTypeId(i)
    let mapData: PinList | undefined = chestDataTable[subzone]
    const [x, y] = GetMapPlayerPosition("player")
    const mult = GetMapContentType() === MAP_CONTENT_DUNGEON ? 4 : 1
    if (mapData !== undefined) {
      const findersKeepers = GetSkillAbilityInfo(5, 5, 1)[5]
      for (const [chType, chData] of pairs(asNestedPinSubtable(mapData))) {
        for (const [, pinData] of ipairs(chData)) {
          if (
            math.abs(asNumber(pinData[0]) - x) < state.chestsRange * mult &&
            math.abs(asNumber(pinData[1]) - y) < state.chestsRange * mult
          ) {
            if (chType === 2 && findersKeepers) {
              def.tint = ZO_ColorDef.New(0.6, 0.6, 1, 0.8)
              getPinManager().CreatePin(
                id,
                asPinTag({ [1]: i, [2]: pinData[0], [3]: pinData[1] }),
                asNumber(pinData[0]),
                asNumber(pinData[1])
              )
            } else if (chType === 1) {
              def.tint = ZO_ColorDef.New(1, 1, 1, 0.8)
              getPinManager().CreatePin(
                id,
                asPinTag({ [1]: i, [2]: pinData[0], [3]: pinData[1] }),
                asNumber(pinData[0]),
                asNumber(pinData[1])
              )
            }
          }
        }
      }
      def.tint = ZO_ColorDef.New(1, 1, 1, 0.8)
    }
    mapData = asOptPinList(getChestData()[subzone])
    if (mapData !== undefined) {
      def.tint = ZO_ColorDef.New(0.4, 1, 0.4, 0.8)
      for (const [, pinData] of ipairs(mapData)) {
        if (
          math.abs(asNumber(pinData[0]) - x) < state.chestsRange * mult &&
          math.abs(asNumber(pinData[1]) - y) < state.chestsRange * mult
        ) {
          getPinManager().CreatePin(
            id,
            asPinTag({ [1]: i, [2]: pinData[0], [3]: pinData[1] }),
            asNumber(pinData[0]),
            asNumber(pinData[1])
          )
        }
      }
      def.tint = ZO_ColorDef.New(1, 1, 1, 0.8)
    }
  },
  [8]: (i: number, _subzone: string): undefined => {
    const def = CustomPins[i]
    if (def === undefined) return
    const zoneIndex = GetCurrentMapZoneIndex()
    const mapData = unknownPoi[GetZoneId(zoneIndex)]
    if (mapData !== undefined) {
      for (const [poiIndex, data] of pairs(mapData)) {
        const [normalizedX, normalizedY, , , , , known] = GetPOIMapInfo(zoneIndex, poiIndex)
        const dataType = asNumber(data[1])
        if (!known && (normalizedX > 0 || normalizedY > 0)) {
          const pinTag: PinTag = {
            [1]: i,
            name: asString(data[0]),
            texture: unknownPoiTexture[dataType],
          }
          if (dataType === 25) {
            pinTag.desc = mundusDescription[asNumber(data[2])]
          } else if (dataType === 8) {
            if (data[2] !== undefined) {
              ;[pinTag.name, pinTag.desc] = GetSetDescription(asPinTuple(data[2]))
            } else {
              pinTag.name = asString(data[0])
            }
          }
          const id = getPinTypeId(i)
          getPinManager().CreatePin(id, pinTag, normalizedX, normalizedY)
          const size =
            BUI !== undefined && BUI.name === "BanditsUserInterface" && BUI.init.MiniMap === true
              ? (40 * BUI.Vars.PinScale) / 100
              : 40
          const pd = ZO_MapPin.PIN_DATA[id]
          if (pd !== undefined) pd.size = size
        } else if (dataType === 25) {
          const pinTag: PinTag = {
            [1]: i,
            name: ZO_CachedStrFormat("<<C:1>>", GetAbilityName(asNumber(data[2]))),
            texture: "/esoui/art/icons/poi/poi_mundus_complete.dds",
          }
          pinTag.desc = mundusDescription[asNumber(data[2])]
          const id = getPinTypeId(i)
          getPinManager().CreatePin(id, pinTag, normalizedX, normalizedY)
          const size =
            BUI !== undefined && BUI.name === "BanditsUserInterface" && BUI.init.MiniMap === true
              ? (40 * BUI.Vars.PinScale) / 100
              : 40
          const pd = ZO_MapPin.PIN_DATA[id]
          if (pd !== undefined) pd.size = size
        } else if (dataType === 8 && data[2] !== undefined) {
          const pinTag: PinTag = {
            [1]: i,
            texture: "/esoui/art/icons/mapkey/mapkey_crafting.dds",
          }
          ;[pinTag.name, pinTag.desc] = GetSetDescription(asPinTuple(data[2]))
          const id = getPinTypeId(i)
          getPinManager().CreatePin(id, pinTag, normalizedX, normalizedY)
          const size =
            BUI !== undefined && BUI.name === "BanditsUserInterface" && BUI.init.MiniMap === true
              ? (40 * BUI.Vars.PinScale) / 100
              : 40
          const pd = ZO_MapPin.PIN_DATA[id]
          if (pd !== undefined) pd.size = size
        }
      }
    }
  },
}
