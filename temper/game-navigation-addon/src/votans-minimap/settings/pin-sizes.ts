import { registerPanel } from "@temper/shared-interface-lam/register-panel"
import {
  asAnyTable,
  asAnyTableMember,
  asMiniMapPin,
  asMiniMapPinManager,
  asNumber,
  asRecord,
} from "../casts"
import { createAsyncTask } from "../core/shared"
import { holder, type VotansMiniMap } from "../holder"

const em = EVENT_MANAGER
const G = asRecord(globalThis)

let pinScales: Record<string, number> = {}
let pinSizes: Record<string, number> = {}
const PERCENT_TO_SCALE = 0.01
const othersScaleRef = { value: 1 }

holder.InitPinSizes = function (this: VotansMiniMap): undefined {
  const self = this

  self.account.pinSizes = self.account.pinSizes ?? {}
  pinSizes = self.account.pinSizes
  pinScales = {}
  self.pinScales = pinScales

  othersScaleRef.value = 1

  const orgCalculateScale = asAnyTableMember(self.CalculateScale)
  holder.CalculateScale = function (this: VotansMiniMap, pinType: number): number {
    return asNumber(orgCalculateScale(self)) * (pinScales[pinType] ?? othersScaleRef.value)
  }

  const optionsTable: LamControlData[] = []

  const ZO_MapPinAny = asAnyTable(ZO_MapPin)
  const PIN_DATA = asAnyTable(ZO_MapPinAny.PIN_DATA)

  function UpdatePin(this: void, _pinType: number, pin: AnyTable): undefined {
    asMiniMapPin(pin).UpdateSize()
  }
  function UpdateDrawLevel(this: void, pinType: number): undefined {
    for (const [, pin] of pairs(
      asAnyTable(asMiniMapPinManager(self.pinManager).GetActiveObjects())
    )) {
      if (pinType === asNumber(asMiniMapPin(pin).GetPinType())) {
        UpdatePin(pinType, asAnyTable(pin))
      }
    }
  }
  function UpdateDrawLevels(this: void, pins: AnyTable): undefined {
    for (const [, pin] of pairs(
      asAnyTable(asMiniMapPinManager(self.pinManager).GetActiveObjects())
    )) {
      const pinType = asNumber(asMiniMapPin(pin).GetPinType())
      if (pins[pinType] != null) {
        UpdatePin(pinType, asAnyTable(pin))
      }
    }
  }

  function AddPin(this: void, pinType: number, caption: string, stringId: number): undefined {
    const pinData = PIN_DATA[pinType]
    if (pinData == null) {
      return
    }

    const task = createAsyncTask("VotanPinSize" + caption)
    function updatePinSize(this: void): undefined {
      UpdateDrawLevel(pinType)
    }
    optionsTable.push({
      type: "slider",
      name: GetString(stringId),
      min: 2,
      max: 200,
      step: 1,
      decimals: 0,
      default: 100,
      getFunc: () => pinSizes[caption] ?? 100,
      setFunc: (value) => {
        pinSizes[caption] = asNumber(value)
        pinScales[pinType] = asNumber(value) * PERCENT_TO_SCALE
        task.Cancel().Call(updatePinSize)
      },
    })
    pinScales[pinType] = (pinSizes[caption] ?? 100) * PERCENT_TO_SCALE
  }

  function AddPins(
    this: void,
    pinsArg: AnyTable | undefined,
    caption: string,
    stringId?: number
  ): undefined {
    if (pinsArg == null) {
      return
    }
    const pins: AnyTable = pinsArg
    const task = createAsyncTask("VotanPinSize" + caption)
    function updatePinSize(this: void): undefined {
      UpdateDrawLevels(pins)
    }
    optionsTable.push({
      type: "slider",
      name: stringId != null ? GetString(stringId) : caption,
      min: 2,
      max: 200,
      step: 1,
      decimals: 0,
      default: 100,
      getFunc: () => pinSizes[caption] ?? 100,
      setFunc: (value) => {
        pinSizes[caption] = asNumber(value)
        const scale = asNumber(value) * PERCENT_TO_SCALE
        for (const [pinType] of pairs(pins)) {
          pinScales[asNumber(pinType)] = scale
        }
        task.Cancel().Call(updatePinSize)
      },
    })
    const scale = (pinSizes[caption] ?? 100) * PERCENT_TO_SCALE
    for (const [pinType] of pairs(pins)) {
      pinScales[asNumber(pinType)] = scale
    }
  }
  function AddCustomPin(this: void, pinType: number | undefined, caption: string): undefined {
    if (pinType == null) {
      return
    }
    AddPin(pinType, caption, asNumber(G["SI_MAPFILTER" + tostring(pinType)]))
  }

  AddPin(MAP_PIN_TYPE_PLAYER, "Player", SI_BATTLEGROUND_YOU)
  AddPin(MAP_PIN_TYPE_GROUP, "Group Member", SI_MAPFILTER9)
  AddPin(MAP_PIN_TYPE_GROUP_LEADER, "Group Leader", SI_GROUP_LEADER_TOOLTIP)
  AddPin(MAP_PIN_TYPE_LOCATION, "Locations", SI_MAP_INFO_MODE_LOCATIONS)

  AddPins(asAnyTable(ZO_MapPinAny.FAST_TRAVEL_WAYSHRINE_PIN_TYPES), "Wayshrine", SI_MAPFILTER8)
  AddPins(asAnyTable(ZO_MapPinAny.POI_PIN_TYPES), "Objectives", SI_MAPFILTER1)

  AddPins(asAnyTable(ZO_MapPinAny.QUEST_PIN_TYPES), "Quest", SI_MAPFILTER4)
  AddPins(
    asAnyTable(ZO_MapPinAny.MAP_PING_PIN_TYPES),
    "Waypoints",
    SI_TOOLTIP_UNIT_MAP_PLAYER_WAYPOINT
  )
  AddPins(
    asAnyTable(ZO_MapPinAny.FAST_TRAVEL_KEEP_PIN_TYPES),
    "Keep Fast Travel",
    SI_VOTANSMINIMAP_PINSIZE_KEEP_FAST_TRAVEL
  )

  AddPins(asAnyTable(ZO_MapPinAny.OBJECTIVE_PIN_TYPES), "AvA Objectives", SI_MAPFILTER2)
  AddPins(asAnyTable(ZO_MapPinAny.KEEP_PIN_TYPES), "Keeps", SI_VOTANSMINIMAP_PINSIZE_KEEPS)
  AddPins(
    asAnyTable(ZO_MapPinAny.DISTRICT_PIN_TYPES),
    "Districts",
    SI_VOTANSMINIMAP_PINSIZE_DISTRICTS
  )
  AddPins(asAnyTable(ZO_MapPinAny.KILL_LOCATION_PIN_TYPES), "Kill Locations", SI_MAPFILTER3)
  AddPins(asAnyTable(ZO_MapPinAny.FORWARD_CAMP_PIN_TYPES), "Forward Camps", SI_TOOLTIP_FORWARD_CAMP)

  if (G.HarvensCustomMapPinsType != null) {
    AddCustomPin(asNumber(G.HarvensCustomMapPinsType), "Harvens Custom Map Pins")
  }

  function AddAddonPins(this: void, mapPins: string[], caption: string, strId?: number): undefined {
    const pins: AnyTable = asAnyTable({})
    for (const i of $range(1, mapPins.length)) {
      const name = mapPins[i - 1]
      if (name != null && G[name] != null) {
        pins[asNumber(G[name])] = asAnyTableMember(true)
      }
    }
    const [firstPinKey] = next(pins)
    if (firstPinKey != null) {
      AddPins(pins, caption, strId)
    }
  }

  if (G.LBooksMapPin_unknown != null || G.pinType_Lore_books != null) {
    const mapPins = [
      "LBooksMapPin_unknown",
      "LBooksMapPin_collected",
      "LBooksMapPin_eidetic",
      "LBooksMapPin_eideticCollected",
      "pinType_Lore_books",
    ]
    AddAddonPins(mapPins, "Lore Books", asNumber(G.LBOOKS_TITLE))
  }

  if (G.LostTreasureMapTreasurePin != null) {
    const mapPins = ["LostTreasureMapTreasurePin", "LostTreasureCompassSurveysPin"]
    AddAddonPins(mapPins, "Lost Treasure")
  }

  if (G.pinType_Chronic_Chronogler != null) {
    const mapPins = [
      "pinType_Dungeon_bosses",
      "pinType_Dungeon_bosses_done",
      "pinType_Treasure_Maps",
      "pinType_Treasure_Chests",
      "pinType_Unknown_POI",
      "pinType_This_One's_On_Me",
      "pinType_Undaunted_Rescuer",
      "pinType_I_like_M'aiq",
      "pinType_Lightbringer",
      "pinType_Peacemaker",
      "pinType_One_Last_Brawl",
      "pinType_Orsinium_world_event",
      "pinType_Wrothgar_Relic_Hunter",
      "pinType_A_Cutpurse_Above",
      "pinType_Breaking_And_Entering",
      "pinType_Vivec_Lessons",
      "pinType_Ancestral_Tombs",
      "pinType_Pilgrim's_Path",
      "pinType_Summerset_Relics",
      "pinType_Message_in_Bottle",
      "pinType_Summerset_world_event",
      "pinType_Time_Rifts",
      "pinType_Shrines",
      "pinType_Fishing_Nodes",
      "pinType_Precursor_Maker",
      "pinType_Chronic_Chronogler",
      "pinType_Poems_of_Nothing",
      "pinType_Achievement_quests",
      "pinType_Surreptitiously_Shadowed",
      "pinType_Swamp_Rescuer",
      "pinType_Vine-Tongue_Traveler",
    ]
    AddAddonPins(mapPins, "Map Pins")
  }

  if (G.SkySMapPin_unknown != null || G.pinType_Skyshards != null) {
    const mapPins = [
      "SkySMapPin_unknown",
      "SkySMapPin_collected",
      "pinType_Skyshards",
      "pinType_Skyshards_done",
    ]
    AddAddonPins(mapPins, "Sky Shards", asNumber(G.SKYS_TITLE))
  }

  AddCustomPin(asNumber(G.VotansFishermanPinType), "Votan's Fisherman Pins")

  const task = createAsyncTask("VotanPinSizeOthers")
  function updatePin(this: void, _key: unknown, pin: AnyTable): undefined {
    const pinType = asNumber(asMiniMapPin(pin).GetPinType())
    if (pinScales[pinType] == null) {
      UpdatePin(pinType, pin)
    }
  }
  function updatePinSize(this: void, asyncTask: AnyAsyncTask): undefined {
    asyncTask
      .For(pairs(asAnyTable(asMiniMapPinManager(self.pinManager).GetActiveObjects())))
      .Do(updatePin)
  }
  optionsTable.push({
    type: "slider",
    name: GetString(SI_FURNITURETHEMETYPE1),
    min: 2,
    max: 200,
    step: 1,
    decimals: 0,
    default: 100,
    getFunc: () => pinSizes["Others"] ?? 100,
    setFunc: (value) => {
      pinSizes["Others"] = asNumber(value)
      othersScaleRef.value = asNumber(value) * PERCENT_TO_SCALE
      task.Cancel().Call(updatePinSize)
    },
  })
  othersScaleRef.value = (pinSizes["Others"] ?? 100) * PERCENT_TO_SCALE

  const panelData: LamPanelData = {
    type: "panel",
    name: "Votan's Mini Map Pin Sizes",
    displayName: "Votan's Mini Map Pin Sizes",
    author: "votan",
    registerForRefresh: true,
    registerForDefaults: true,
  }
  registerPanel(LibAddonMenu2, "TemperVotansMiniMapPinSizes_OptionsPanel", panelData, optionsTable)
}

function PlayerActivated(this: void): undefined {
  em.UnregisterForEvent("VOTAN_MINI_MAP_PINSIZES", EVENT_PLAYER_ACTIVATED)
  if (holder.account.enableMap) {
    holder.InitPinSizes()
  }
}
em.RegisterForEvent("VOTAN_MINI_MAP_PINSIZES", EVENT_PLAYER_ACTIVATED, PlayerActivated)
