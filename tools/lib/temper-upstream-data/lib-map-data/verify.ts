import { join } from "node:path"
import {
  MAP_DATA,
  PSEUDO_MAP_INDICES,
} from "@temper/shared-addon-libraries-lib-map-data/src/generated/map-data.generated.ts"
import { makeLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { addonsDir } from "@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve"
import { diff, dumpJsWalk, LUA_DUMP } from "../leaf-dump.ts"
import { PortMismatch } from "../libraries.ts"

const SOURCE = join(addonsDir(), "LibMapData", "LibMapData_Data.lua")

export async function verify(): Promise<void> {
  const vm = await makeLuaVm({ stubs: LUA_DUMP })
  let failures = 0
  try {
    const luaRaw = await vm.run(`
      _G.LibMapData = {}
      dofile(${JSON.stringify(SOURCE)})
      local mapOut = {}
      dump_walk(_G.LibMapData, "", mapOut)
      table.sort(mapOut)
      local pseudo = {}
      for k, val in pairs(_G) do
        if type(k) == "string" and k:find("^LIBMAPDATA_") then pseudo[k] = val end
      end
      local pseudoOut = {}
      dump_walk(pseudo, "", pseudoOut)
      table.sort(pseudoOut)
      return table.concat(mapOut, "\\n") .. "\\n====PSEUDO====\\n" .. table.concat(pseudoOut, "\\n")
    `)
    if (typeof luaRaw !== "string") throw new Error(`lua dump returned ${typeof luaRaw}`)
    const [luaMap, luaPseudo] = luaRaw.split("\n====PSEUDO====\n")
    if (luaMap === undefined || luaPseudo === undefined) throw new Error("missing PSEUDO marker")

    const mapJs: string[] = []
    dumpJsWalk(MAP_DATA, "", mapJs)
    mapJs.sort()
    if (!diff("MAP_DATA", luaMap, mapJs.join("\n"))) failures++

    const pseudoJs: string[] = []
    dumpJsWalk(PSEUDO_MAP_INDICES, "", pseudoJs)
    pseudoJs.sort()
    if (!diff("PSEUDO_MAP_INDICES", luaPseudo, pseudoJs.join("\n"))) failures++
  } finally {
    await vm.close()
  }
  if (failures > 0) {
    throw new PortMismatch(`${failures} table(s) failed verification`)
  }
  console.log("all data leaf-exact")
}
