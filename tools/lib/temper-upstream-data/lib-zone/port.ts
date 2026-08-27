import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { makeLuaVm } from "@temper/shared-build-deploy-lua-runner/lua-vm"
import { addonsDir } from "@temper/shared-foundation-misc-eso-paths-resolve/eso-paths-resolve"
import { PACKAGE_OF } from "../libraries.ts"
import { SERIALIZE_TS_LUA } from "../serialize-ts-lua.ts"
import { ESO_STUBS } from "./eso-stubs.ts"

const DATA_SOURCE = join(addonsDir(), "LibZone", "LibZone_Data.lua")
const GEO_SOURCE = join(addonsDir(), "LibZone", "LibZone_GeoData.lua")

const ZONE_REL = "src/generated/zone-data.generated.ts"
const GEO_REL = "src/generated/geo-data.generated.ts"

export const ZONE_HEADER =
  "// Ported 1:1 from LibZone v8.98 (AddOnVersion 898) LibZone_Data.lua via `ops temper upstream-data port lib-zone`.\n" +
  "// Regenerate with: ops temper upstream-data port lib-zone --code-root <code-checkout>\n" +
  "// Verify with:     ops temper upstream-data verify lib-zone\n" +
  "//\n" +
  "// PRELOADED_ZONE_NAMES holds each language's OWN keys only — the jp/pl metatable\n" +
  "// fallback to en is rebuilt at load in data-init.ts, not baked here.\n"

export const GEO_HEADER =
  "// Ported 1:1 from LibZone v8.98 (AddOnVersion 898) LibZone_GeoData.lua via `ops temper upstream-data port lib-zone`.\n" +
  "// Regenerate with: ops temper upstream-data port lib-zone --code-root <code-checkout>\n" +
  "// Verify with:     ops temper upstream-data verify lib-zone\n"

export async function port(codeRoot: string): Promise<void> {
  const pkgDir = join(codeRoot, PACKAGE_OF["lib-zone"])
  const zoneOut = join(pkgDir, ZONE_REL)
  const geoOut = join(pkgDir, GEO_REL)
  const vm = await makeLuaVm({ stubs: `${ESO_STUBS}${SERIALIZE_TS_LUA}` })
  try {
    await mkdir(join(pkgDir, "src/generated"), { recursive: true })
    const script = `
      _G.LibZone = {
        currentClientLanguage = "en",
        checkIfLanguageIsSupported = function() return false end,
      }
      dofile(${JSON.stringify(DATA_SOURCE)})
      local lib = _G.LibZone

      if type(lib.preloadedZoneNames) ~= "table" then error("preloadedZoneNames missing") end
      if type(lib.publicDungeonMapIds) ~= "table" then error("publicDungeonMapIds missing") end

      local zoneBody =
        "export const PRELOADED_ZONE_NAMES: Record<string, Record<number, string>> = " ..
          serialize_ts(lib.preloadedZoneNames, 0) .. "\\n\\n" ..
        "export const PUBLIC_DUNGEON_MAP_IDS: Record<number, boolean> = " ..
          serialize_ts(lib.publicDungeonMapIds, 0) .. "\\n"
      write_file(${JSON.stringify(zoneOut)}, ${JSON.stringify(ZONE_HEADER)} .. zoneBody)

      dofile(${JSON.stringify(GEO_SOURCE)})
      if type(lib.geoDataReferenceTable) ~= "table" then error("geoDataReferenceTable missing") end

      local geoBody =
        "export const GEO_DATA_REFERENCE_TABLE: Record<number, Record<number, number>> = " ..
          serialize_ts(lib.geoDataReferenceTable, 0) .. "\\n"
      write_file(${JSON.stringify(geoOut)}, ${JSON.stringify(GEO_HEADER)} .. geoBody)
      return "ok"
    `
    const result = await vm.run(script)
    if (result !== "ok") {
      throw new Error(`port-data returned ${typeof result}: ${String(result)}`)
    }
    console.log(`ported ${DATA_SOURCE} -> ${zoneOut}`)
    console.log(`ported ${GEO_SOURCE} -> ${geoOut}`)
  } finally {
    await vm.close()
  }
}
