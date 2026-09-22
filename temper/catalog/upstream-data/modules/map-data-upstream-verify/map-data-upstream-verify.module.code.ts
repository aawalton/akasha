import { join } from "node:path"
import { PSEUDO_MAP_INDICES } from "akasha/temper/addon/pages/world/map-data/modules/map-data-pseudo-indices/map-data-pseudo-indices.module.code.ts"
import { MAP_DATA } from "akasha/temper/addon/pages/world/map-data/modules/map-data-table/map-data-table.module.code.ts"
import { LUA_DUMP } from "akasha/temper/catalog/upstream-data/modules/leaf-dump/leaf-dump.module.code.ts"
import {
  gathered,
  leavesOf,
  ruledBetween,
  upstreamLeavesIn,
} from "akasha/temper/catalog/upstream-data/modules/upstream-leaf-reading/upstream-leaf-reading.module.code.ts"
import type { Ruling } from "akasha/temper/catalog/upstream-data/modules/upstream-libraries/upstream-libraries.module.code.ts"
import { makeLuaVm } from "akasha/temper/eso/lua-runner/modules/lua-vm/lua-vm.module.code.ts"

const DATA_FILE = "LibMapData/LibMapData_Data.lua"

const PSEUDO_PREFIX = "LIBMAPDATA_"

export async function verifyMapData(addons: string): Promise<Ruling> {
  const vm = await makeLuaVm({ stubs: LUA_DUMP })
  try {
    await vm.run(`
      _G.LibMapData = {}
      dofile(${JSON.stringify(join(addons, DATA_FILE))})
      _G.__pseudo = {}
      for k, val in pairs(_G) do
        if type(k) == "string" and k:find("^${PSEUDO_PREFIX}") then _G.__pseudo[k] = val end
      end
      return "ok"
    `)
    return gathered([
      ruledBetween("MAP_DATA", await upstreamLeavesIn(vm, "_G.LibMapData"), leavesOf(MAP_DATA)),
      ruledBetween(
        "PSEUDO_MAP_INDICES",
        await upstreamLeavesIn(vm, "_G.__pseudo"),
        leavesOf(PSEUDO_MAP_INDICES)
      ),
    ])
  } finally {
    await vm.close()
  }
}
