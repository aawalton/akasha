import { luaNumberString } from "@akasha/temper-lua-runner/lua-number-string"

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function dumpJsWalk(v: unknown, path: string, out: string[]): undefined {
  if (isRecord(v)) {
    const entries = Object.keys(v)
    const nums = entries.filter((k) => /^-?\d+(\.\d+)?$/.test(k)).map(Number)
    const strs = entries.filter((k) => !/^-?\d+(\.\d+)?$/.test(k))
    nums.sort((a, b) => a - b)
    strs.sort()
    for (const k of nums) dumpJsWalk(v[String(k)], `${path}/${luaNumberString(k)}`, out)
    for (const k of strs) dumpJsWalk(v[k], `${path}/${k}`, out)
    return
  }
  if (typeof v === "number") {
    out.push(`${path}\tnumber\t${luaNumberString(v)}`)
    return
  }
  if (typeof v === "string") {
    const escaped = v
      .replaceAll("\\", "\\\\")
      .replaceAll("\n", "\\n")
      .replaceAll("\r", "\\r")
      .replaceAll("\t", "\\t")
    out.push(`${path}\tstring\t${escaped}`)
    return
  }
  if (typeof v === "boolean") {
    out.push(`${path}\tboolean\t${String(v)}`)
    return
  }
  throw new Error(`unsupported leaf type at ${path}: ${typeof v}`)
}

export const LUA_DUMP = `
function fmt_leaf_number(n)
  if n == math.floor(n) and math.abs(n) < 2^53 then return string.format("%d", n) end
  local s = string.format("%.14g", n)
  if tonumber(s) == n then return s end
  return string.format("%.17g", n)
end

function dump_walk(v, path, out)
  local t = type(v)
  if t == "table" then
    local nums, strs = {}, {}
    for k in pairs(v) do
      if type(k) == "number" then nums[#nums + 1] = k else strs[#strs + 1] = k end
    end
    table.sort(nums)
    table.sort(strs)
    for _, k in ipairs(nums) do dump_walk(v[k], path .. "/" .. fmt_leaf_number(k), out) end
    for _, k in ipairs(strs) do dump_walk(v[k], path .. "/" .. k, out) end
  elseif t == "number" then
    out[#out + 1] = path .. "\\tnumber\\t" .. fmt_leaf_number(v)
  elseif t == "string" then
    out[#out + 1] = path .. "\\tstring\\t" .. v:gsub("\\\\", "\\\\\\\\"):gsub("\\n", "\\\\n"):gsub("\\r", "\\\\r"):gsub("\\t", "\\\\t")
  elseif t == "boolean" then
    out[#out + 1] = path .. "\\tboolean\\t" .. tostring(v)
  else
    error("unsupported leaf type at " .. path .. ": " .. t)
  end
end
`

export function diff(label: string, luaDump: string, jsDump: string): boolean {
  if (luaDump === jsDump) {
    console.log(`OK   ${label} (${luaDump.split("\n").length} leaves)`)
    return true
  }
  const luaLines = luaDump.split("\n")
  const jsLines = jsDump.split("\n")
  console.error(`FAIL ${label}: lua=${luaLines.length} js=${jsLines.length} leaves`)
  const luaSet = new Set(luaLines)
  const jsSet = new Set(jsLines)
  for (const l of luaLines.filter((x) => !jsSet.has(x)).slice(0, 8))
    console.error(`  lua only: ${l}`)
  for (const l of jsLines.filter((x) => !luaSet.has(x)).slice(0, 8))
    console.error(`  js only:  ${l}`)
  return false
}
