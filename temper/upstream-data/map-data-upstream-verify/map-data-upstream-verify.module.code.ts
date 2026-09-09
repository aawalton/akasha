import { join } from "node:path"
import { PSEUDO_MAP_INDICES } from "@akasha/temper-lib-map-data/map-data-pseudo-indices"
import { MAP_DATA } from "@akasha/temper-lib-map-data/map-data-table"
import { makeLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { LUA_DUMP } from "../leaf-dump/leaf-dump.module.code.ts"
import {
  gathered,
  leavesOf,
  ruledBetween,
  upstreamLeavesIn,
} from "../upstream-leaf-reading/upstream-leaf-reading.module.code.ts"
import type { Ruling } from "../upstream-libraries/upstream-libraries.module.code.ts"

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
