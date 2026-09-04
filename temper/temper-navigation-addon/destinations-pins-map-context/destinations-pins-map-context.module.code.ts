const ZONE_IDS_TO_FILE_NAMES: Record<number, string | undefined> = {
  [281]: "balfoyen_base_0",
  [280]: "bleakrock_base_0",
  [57]: "deshaan_base_0",
  [101]: "eastmarch_base_0",
  [117]: "shadowfen_base_0",
  [41]: "stonefalls_base_0",
  [103]: "therift_base_0",
  [104]: "alikr_base_0",
  [92]: "bangkorai_base_0",
  [535]: "betnihk_base_0",
  [3]: "glenumbra_base_0",
  [20]: "rivenspire_base_0",
  [19]: "stormhaven_base_0",
  [534]: "strosmkai_base_0",
  [381]: "auridon_base_0",
  [383]: "grahtwood_base_0",
  [108]: "greenshade_base_0",
  [537]: "khenarthisroost_base_0",
  [58]: "malabaltor_base_0",
  [382]: "reapersmarch_base_0",
  [1413]: "u38_apocrypha_base_0",
  [1027]: "artaeum_base_0",
  [1208]: "u28_blackreach_base_0",
  [1161]: "blackreach_base_0",
  [1261]: "blackwood_base_0",
  [980]: "clockwork_base_0",
  [982]: "clockworkoutlawsrefuge_base_0",
  [981]: "brassfortress_base_0",
  [347]: "coldharbour_base_0",
  [888]: "craglorn_base_0",
  [267]: "eyevea_base_0",
  [2119]: "u32_fargravezone_base_0",
  [1282]: "u32_fargrave_base_0",
  [2082]: "u32_theshambles_base_0",
  [1383]: "u36_galenisland_base_0",
  [823]: "goldcoast_base_0",
  [816]: "hewsbane_base_0",
  [1318]: "u34_systreszone_base_0",
  [726]: "murkmire_base_0",
  [1086]: "elsweyr_base_0",
  [1502]: "u48_overland_base_0",
  [1133]: "southernelsweyr_base_0",
  [1011]: "summerset_base_0",
  [2274]: "u38_telvannipeninsula_base_0",
  [2343]: "u38_necrom_base_0",
  [1286]: "u32deadlandszone_base_0",
  [1207]: "reach_base_0",
  [849]: "vvardenfell_base_0",
  [1443]: "westwealdoverland_base_0",
  [1160]: "westernskryim_base_0",
  [684]: "wrothgar_base_0",
  [181]: "ava_whole_0",
  [584]: "imperialcity_base_0",
}

export interface MapState {
  mapTextureName: string | undefined
  zoneTextureName: string | undefined
  mapId: number | undefined
  zoneId: number | undefined
  playerAlliance: number | undefined
}

export const MAP_STATE: MapState = {
  mapTextureName: undefined,
  zoneTextureName: undefined,
  mapId: undefined,
  zoneId: undefined,
  playerAlliance: undefined,
}

export function getMapTextureName(): undefined {
  MAP_STATE.zoneId = GetZoneId(GetCurrentMapZoneIndex())
  MAP_STATE.mapId = GetCurrentMapId()
  if (MAP_STATE.zoneId === 1283 || MAP_STATE.zoneId === 1414) {
    MAP_STATE.zoneTextureName = ZONE_IDS_TO_FILE_NAMES[MAP_STATE.mapId]
  } else {
    MAP_STATE.zoneTextureName = ZONE_IDS_TO_FILE_NAMES[MAP_STATE.zoneId]
  }
  const [, subzone] = LibMapPins.GetZoneAndSubzone(false, true, true)
  MAP_STATE.mapTextureName = subzone
  if (MAP_STATE.zoneTextureName == null) {
    MAP_STATE.zoneTextureName = MAP_STATE.mapTextureName
  }
}
