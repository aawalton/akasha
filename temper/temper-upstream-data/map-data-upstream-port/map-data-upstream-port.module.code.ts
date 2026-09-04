import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { makeLuaVm } from "@akasha/temper-lua-runner/lua-vm"
import { SERIALIZE_TS_LUA } from "../ts-lua-serializer/ts-lua-serializer.module.code.ts"
import { PACKAGE_OF } from "../upstream-libraries/upstream-libraries.module.code.ts"

const SOURCE = join(addonsDir(), "LibMapData", "LibMapData_Data.lua")

const OUT_REL = "src/generated/map-data.generated.ts"

const HEADER =
  "// Ported 1:1 from LibMapData v1.21 (AddOnVersion 121) LibMapData_Data.lua via `ops temper upstream-data port lib-map-data`.\n" +
  "// Regenerate with: ops temper upstream-data port lib-map-data --code-root <code-checkout>\n" +
  "// Verify with:     ops temper upstream-data verify lib-map-data\n"

export async function port(codeRoot: string): Promise<void> {
  const pkgDir = join(codeRoot, PACKAGE_OF["lib-map-data"])
  const out = join(pkgDir, OUT_REL)
  const vm = await makeLuaVm({ stubs: SERIALIZE_TS_LUA })
  try {
    await mkdir(join(pkgDir, "src/generated"), { recursive: true })
    const script = `
      _G.LibMapData = {}
      dofile(${JSON.stringify(SOURCE)})

      local mapData = _G.LibMapData
      local mapKeys = {}
      for k in pairs(mapData) do mapKeys[#mapKeys + 1] = k end
      if #mapKeys == 0 then error("LibMapData_Data.lua defined no fields on _G.LibMapData") end

      local pseudo = {}
      local pseudoCount = 0
      for k, val in pairs(_G) do
        if type(k) == "string" and k:find("^LIBMAPDATA_") then
          pseudo[k] = val
          pseudoCount = pseudoCount + 1
        end
      end
      if pseudoCount == 0 then error("no LIBMAPDATA_*_PSEUDOMAPINDEX globals captured") end

      local body =
        "export const MAP_DATA = " .. serialize_ts(mapData, 0) .. "\\n\\n" ..
        "export const PSEUDO_MAP_INDICES: Record<string, number> = " .. serialize_ts(pseudo, 0) .. "\\n"
      write_file(${JSON.stringify(out)}, ${JSON.stringify(HEADER)} .. body)
      return "ok"
    `
    const result = await vm.run(script)
    if (result !== "ok") {
      throw new Error(`port-data returned ${typeof result}: ${String(result)}`)
    }
    console.log(`ported ${SOURCE} -> ${out}`)
  } finally {
    await vm.close()
  }
}
