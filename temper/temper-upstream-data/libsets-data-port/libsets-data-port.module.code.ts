import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join, resolve } from "node:path"
import { makeSandboxedLuaVm } from "@akasha/temper-lua-runner/sandboxed-lua-vm"
import { resolveVerifiedUpstream } from "../libsets-upstream-fetch/libsets-upstream-fetch.module.code.ts"
import { LIBSETS_UPSTREAM } from "../libsets-upstream-pin/libsets-upstream-pin.module.code.ts"

const OUT_DIR_FLAG = "--out-dir"

const OUT_DIR_ENV = "LIBSETS_GENERATED_DIR"

const BOOL_PAIR_SPECIFIER = "@akasha/temper-lib-sets/bool-pair"

const LIVE_API_VERSION = 101050

const ESO_SYMBOL_SENTINELS: Record<string, number> = {
  EQUIP_TYPE_HEAD: 9_000_001,
  EQUIP_TYPE_SHOULDERS: 9_000_002,
}

const UPSTREAM_UNDEFINED_GLOBALS = ["LIBSETS_DROP_MECHANIC_DAIL_QUEST_REWARD_COFFER"] as const

const SERIALIZER = `
__symbols = { [9000001] = "EQUIP_TYPE_HEAD", [9000002] = "EQUIP_TYPE_SHOULDERS" }

local function fmt_number(n)
  if n ~= n or n == math.huge or n == -math.huge then
    error("non-finite number in data: " .. tostring(n))
  end
  if n == math.floor(n) and math.abs(n) < 2^53 then
    return string.format("%d", n)
  end
  local s = string.format("%.14g", n)
  if tonumber(s) == n then return s end
  return string.format("%.17g", n)
end

local function fmt_string(s)
  local out = s:gsub("\\\\", "\\\\\\\\"):gsub('"', '\\\\"'):gsub("\\n", "\\\\n"):gsub("\\r", "\\\\r"):gsub("\\t", "\\\\t")
  return '"' .. out .. '"'
end

local function is_pure_array(t)
  local count = 0
  for k in pairs(t) do
    if type(k) ~= "number" or k ~= math.floor(k) or k < 1 then return false end
    count = count + 1
  end
  for i = 1, count do
    if t[i] == nil then return false end
  end
  return true
end

local function sorted_keys(t)
  local nums, strs = {}, {}
  for k in pairs(t) do
    if type(k) == "number" then
      nums[#nums + 1] = k
    elseif type(k) == "string" then
      strs[#strs + 1] = k
    else
      error("unsupported key type: " .. type(k))
    end
  end
  table.sort(nums)
  table.sort(strs)
  local out = {}
  for _, k in ipairs(nums) do out[#out + 1] = k end
  for _, k in ipairs(strs) do out[#out + 1] = k end
  return out
end

local TS_IDENT = "^[A-Za-z_][A-Za-z0-9_]*$"

-- Detect a purely boolean-keyed table. Upstream uses exactly {[false]=x,[true]=y}
-- for the normal/veteran dungeon id tables; any boolean key mixed with a
-- non-boolean key, or a missing half, is unexpected and must fail loudly rather
-- than be silently stringified.
local function bool_pair_kind(t)
  local hasBool, hasOther = false, false
  for k in pairs(t) do
    if type(k) == "boolean" then hasBool = true else hasOther = true end
  end
  if not hasBool then return false end
  if hasOther then error("table mixes boolean and non-boolean keys") end
  if t[false] == nil or t[true] == nil then
    error("boolean-keyed table missing [false] or [true] half")
  end
  return true
end

function serialize_ts(v, indent)
  local t = type(v)
  if t == "number" then
    local sym = __symbols[v]
    if sym ~= nil then return sym end
    return fmt_number(v)
  end
  if t == "string" then return fmt_string(v) end
  if t == "boolean" then return tostring(v) end
  if t ~= "table" then error("unsupported value type: " .. t) end
  -- Real upstream data tables carry no metatable. A metatable here means an
  -- unseeded ESO global auto-vivified to a permissive stub — fail loudly rather
  -- than silently emit an empty table.
  if getmetatable(v) ~= nil then
    error("encountered a stub/proxy table — an unseeded ESO global leaked into the data")
  end
  if bool_pair_kind(v) then
    return "boolPair(" .. serialize_ts(v[false], indent) .. ", " .. serialize_ts(v[true], indent) .. ")"
  end
  local pad = string.rep("  ", indent)
  local pad2 = string.rep("  ", indent + 1)
  if is_pure_array(v) then
    if #v == 0 then return "[]" end
    local parts = {}
    for i = 1, #v do
      parts[#parts + 1] = pad2 .. serialize_ts(v[i], indent + 1)
    end
    return "[\\n" .. table.concat(parts, ",\\n") .. ",\\n" .. pad .. "]"
  end
  local keys = sorted_keys(v)
  if #keys == 0 then return "{}" end
  local parts = {}
  for _, k in ipairs(keys) do
    local key
    if type(k) == "number" then
      local sym = __symbols[k]
      if sym ~= nil then
        key = "[" .. sym .. "]"
      else
        key = "[" .. fmt_number(k) .. "]"
      end
    elseif k:find(TS_IDENT) then
      key = k
    else
      key = fmt_string(k)
    end
    parts[#parts + 1] = pad2 .. key .. ": " .. serialize_ts(v[k], indent + 1)
  end
  return "{\\n" .. table.concat(parts, ",\\n") .. ",\\n" .. pad .. "}"
end
`

export interface PortTarget {
  readonly file: string
  readonly exportName: string
  readonly luaPath: string
  readonly tsType: string
}

export const PORT_TARGETS: readonly PortTarget[] = [
  {
    file: "set-data-preloaded.generated.ts",
    exportName: "SET_DATA_PRELOADED",
    luaPath: "LibSets.setDataPreloaded",
    tsType: "Record<string, unknown>",
  },
  {
    file: "set-info.generated.ts",
    exportName: "SET_INFO",
    luaPath: "LibSets.setInfo",
    tsType: "Record<number, Record<string, unknown>>",
  },
  {
    file: "blacklisted-set-ids.generated.ts",
    exportName: "BLACKLISTED_SET_IDS",
    luaPath: "LibSets.blacklistedSetIds",
    tsType: "Record<number, boolean>",
  },
  {
    file: "special-bonus-sets.generated.ts",
    exportName: "SPECIAL_BONUS_SETS",
    luaPath: "LibSets.specialBonusSets",
    tsType: "Record<number, unknown>",
  },
  {
    file: "sets-of-newer-api-version.generated.ts",
    exportName: "SETS_OF_NEWER_API_VERSION",
    luaPath: "LibSets.setsOfNewerAPIVersion",
    tsType: "readonly number[]",
  },
  {
    file: "no-set-id-sets.generated.ts",
    exportName: "NO_SET_ID_SETS",
    luaPath: "LibSets.noSetIdSets",
    tsType: "Record<number, unknown>",
  },
  {
    file: "zone-ids-of-newer-api-version.generated.ts",
    exportName: "ZONE_IDS_OF_NEWER_API_VERSION",
    luaPath: "LibSets.zoneIdsOfNewAPIVersionOnly",
    tsType: "readonly number[]",
  },
]

export function generatedDir(argv: readonly string[]): string {
  const at = argv.indexOf(OUT_DIR_FLAG)
  const named = at === -1 ? undefined : argv[at + 1]
  const dir = named ?? process.env[OUT_DIR_ENV]
  if (dir === undefined || dir === "") {
    throw new Error(
      `name the folder the ported set data lands in with \`${OUT_DIR_FLAG} <path>\`, ` +
        `or set ${OUT_DIR_ENV}: the LibSets library's home in akasha is being moved, ` +
        `so this porter is told where to write rather than guessing`
    )
  }
  return resolve(dir)
}

export function portedHeader(target: PortTarget, usesBoolPair: boolean): string {
  const importLine = usesBoolPair ? `import { boolPair } from "${BOOL_PAIR_SPECIFIER}"\n\n` : ""
  return (
    `// Ported from genuine upstream LibSets ${LIBSETS_UPSTREAM.version} (AddOnVersion ${LIBSETS_UPSTREAM.addOnVersion}) — do not edit by hand.\n` +
    `// Source: ${LIBSETS_UPSTREAM.repo} @ ${LIBSETS_UPSTREAM.commit}\n` +
    `// Cap-exempt: machine-generated data module (see Code File Length).\n` +
    `${importLine}export const ${target.exportName}: ${target.tsType} = `
  )
}

export async function portLibsetsData(outDir: string): Promise<readonly string[]> {
  const srcDir = await resolveVerifiedUpstream(LIBSETS_UPSTREAM)

  const sources = await Promise.all(
    LIBSETS_UPSTREAM.requiredFiles.map(async (rel) => ({
      rel,
      src: await readFile(join(srcDir, rel), "utf-8"),
    }))
  )

  const written: string[] = []
  const vm = await makeSandboxedLuaVm({ bannedGlobals: [] })
  try {
    const sentinelSeeds = Object.entries(ESO_SYMBOL_SENTINELS)
      .map(([name, value]) => `${name} = ${value}`)
      .join("\n")
    await vm.doString(
      `${SERIALIZER}\n` +
        `function GetAPIVersion() return ${LIVE_API_VERSION} end\n` +
        `function GetNumClasses() return 0 end\n` +
        `${sentinelSeeds}\n`
    )

    const forceNilEntries = UPSTREAM_UNDEFINED_GLOBALS.map(
      (name) => `[${JSON.stringify(name)}] = true`
    ).join(", ")
    await vm.doString(
      `local env = _G.__eso_env\n` +
        `local oldmeta = getmetatable(env)\n` +
        `local oldindex = oldmeta.__index\n` +
        `local force_nil = { ${forceNilEntries} }\n` +
        `setmetatable(env, {\n` +
        `  __index = function(t, k)\n` +
        `    if force_nil[k] then return nil end\n` +
        `    return oldindex(t, k)\n` +
        `  end,\n` +
        `  __newindex = oldmeta.__newindex,\n` +
        `})\n`
    )

    for (const { rel, src } of sources) {
      await vm.doString(src)
      const kind = await vm.doString(`return type(LibSets)`)
      if (kind !== "table") {
        throw new Error(`after ${rel}: LibSets is ${String(kind)}, expected table`)
      }
    }

    await mkdir(outDir, { recursive: true })
    for (const target of PORT_TARGETS) {
      const serialized = await vm.doString(
        `local v = ${target.luaPath}\n` +
          `if type(v) ~= "table" then error("${target.luaPath} is " .. type(v)) end\n` +
          `return serialize_ts(v, 0)`
      )
      if (typeof serialized !== "string") {
        throw new Error(`serializer for ${target.luaPath} returned ${typeof serialized}`)
      }
      const usesBoolPair = serialized.includes("boolPair(")
      const out = join(outDir, target.file)
      await writeFile(out, `${portedHeader(target, usesBoolPair)}${serialized}\n`)
      written.push(out)
    }
  } finally {
    await vm.close()
  }
  return written
}

if (import.meta.main) {
  const outDir = generatedDir(process.argv.slice(2))
  for (const out of await portLibsetsData(outDir)) console.log(`ported -> ${out}`)
}
