import { join } from "node:path"
import { makeLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { addonsDir } from "@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve"
import { codeModule } from "../../code-import.ts"
import { diff, dumpJsWalk, isRecord, LUA_DUMP } from "../leaf-dump.ts"
import { PACKAGE_OF, PortMismatch } from "../libraries.ts"
import { ESO_STUBS } from "./eso-stubs.ts"

const DATA_SOURCE = join(addonsDir(), "LibZone", "LibZone_Data.lua")
const GEO_SOURCE = join(addonsDir(), "LibZone", "LibZone_GeoData.lua")

const ZONE_REL = "src/generated/zone-data.generated.ts"
const GEO_REL = "src/generated/geo-data.generated.ts"

export async function verify(codeRoot: string): Promise<void> {
  const vm = await makeLuaVm({ stubs: `${ESO_STUBS}${LUA_DUMP}` })
  let failures = 0
  try {
    const luaRaw = await vm.run(`
      _G.LibZone = {
        currentClientLanguage = "en",
        checkIfLanguageIsSupported = function() return false end,
      }
      dofile(${JSON.stringify(DATA_SOURCE)})
      dofile(${JSON.stringify(GEO_SOURCE)})
      local lib = _G.LibZone

      local zoneOut = {}
      dump_walk(lib.preloadedZoneNames, "", zoneOut)
      table.sort(zoneOut)
      local pubOut = {}
      dump_walk(lib.publicDungeonMapIds, "", pubOut)
      table.sort(pubOut)
      local geoOut = {}
      dump_walk(lib.geoDataReferenceTable, "", geoOut)
      table.sort(geoOut)
      return table.concat(zoneOut, "\\n") .. "\\n====PUB====\\n" .. table.concat(pubOut, "\\n") ..
        "\\n====GEO====\\n" .. table.concat(geoOut, "\\n")
    `)
    if (typeof luaRaw !== "string") throw new Error(`lua dump returned ${typeof luaRaw}`)
    const [luaZone, rest] = luaRaw.split("\n====PUB====\n")
    if (luaZone === undefined || rest === undefined) throw new Error("missing PUB marker")
    const [luaPub, luaGeo] = rest.split("\n====GEO====\n")
    if (luaPub === undefined || luaGeo === undefined) throw new Error("missing GEO marker")

    const pkgRel = PACKAGE_OF["lib-zone"]
    const zoneMod = await codeModule<unknown>(`${pkgRel}/${ZONE_REL}`, codeRoot)
    const geoMod = await codeModule<unknown>(`${pkgRel}/${GEO_REL}`, codeRoot)
    if (!isRecord(zoneMod) || !isRecord(geoMod))
      throw new Error("data modules did not import as objects")

    const zoneJs: string[] = []
    dumpJsWalk(zoneMod.PRELOADED_ZONE_NAMES, "", zoneJs)
    zoneJs.sort()
    if (!diff("PRELOADED_ZONE_NAMES", luaZone, zoneJs.join("\n"))) failures++

    const pubJs: string[] = []
    dumpJsWalk(zoneMod.PUBLIC_DUNGEON_MAP_IDS, "", pubJs)
    pubJs.sort()
    if (!diff("PUBLIC_DUNGEON_MAP_IDS", luaPub, pubJs.join("\n"))) failures++

    const geoJs: string[] = []
    dumpJsWalk(geoMod.GEO_DATA_REFERENCE_TABLE, "", geoJs)
    geoJs.sort()
    if (!diff("GEO_DATA_REFERENCE_TABLE", luaGeo, geoJs.join("\n"))) failures++
  } finally {
    await vm.close()
  }
  if (failures > 0) {
    throw new PortMismatch(`${failures} table(s) failed verification`)
  }
  console.log("all data leaf-exact")
}
