import { join } from "node:path"
import { GEO_DATA_REFERENCE_TABLE } from "@akasha/temper-lib-zone/zone-geo-data"
import { PRELOADED_ZONE_NAMES } from "@akasha/temper-lib-zone/zone-names-data"
import { PUBLIC_DUNGEON_MAP_IDS } from "@akasha/temper-lib-zone/zone-public-dungeon-map-ids"
import { makeLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { LUA_DUMP } from "../leaf-dump/leaf-dump.module.code.ts"
import {
  gathered,
  leavesOf,
  ruledBetween,
  upstreamLeavesIn,
} from "../upstream-leaf-reading/upstream-leaf-reading.module.code.ts"
import type { Ruling } from "../upstream-libraries/upstream-libraries.module.code.ts"
import { ESO_STUBS } from "../zone-eso-stubs/zone-eso-stubs.module.code.ts"

const DATA_FILE = "LibZone/LibZone_Data.lua"

const GEO_FILE = "LibZone/LibZone_GeoData.lua"

export async function verifyZone(addons: string): Promise<Ruling> {
  const vm = await makeLuaVm({ stubs: `${ESO_STUBS}${LUA_DUMP}` })
  try {
    await vm.run(`
      _G.LibZone = {
        currentClientLanguage = "en",
        checkIfLanguageIsSupported = function() return false end,
      }
      dofile(${JSON.stringify(join(addons, DATA_FILE))})
      dofile(${JSON.stringify(join(addons, GEO_FILE))})
      return "ok"
    `)
    return gathered([
      ruledBetween(
        "PRELOADED_ZONE_NAMES",
        await upstreamLeavesIn(vm, "_G.LibZone.preloadedZoneNames"),
        leavesOf(PRELOADED_ZONE_NAMES)
      ),
      ruledBetween(
        "PUBLIC_DUNGEON_MAP_IDS",
        await upstreamLeavesIn(vm, "_G.LibZone.publicDungeonMapIds"),
        leavesOf(PUBLIC_DUNGEON_MAP_IDS)
      ),
      ruledBetween(
        "GEO_DATA_REFERENCE_TABLE",
        await upstreamLeavesIn(vm, "_G.LibZone.geoDataReferenceTable"),
        leavesOf(GEO_DATA_REFERENCE_TABLE)
      ),
    ])
  } finally {
    await vm.close()
  }
}
