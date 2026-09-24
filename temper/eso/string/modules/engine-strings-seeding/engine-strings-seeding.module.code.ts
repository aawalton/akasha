import { readFileSync } from "node:fs"
import { join } from "node:path"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { luaStringLiteral } from "akasha/temper/eso/lua-runner/modules/lua-marshal/lua-marshal.module.code.ts"
import type { EngineStrings } from "akasha/temper/eso/string/modules/engine-strings-reading/engine-strings-reading.module.code.ts"
import { z } from "zod"

export const STRINGS_AT =
  "temper/eso/string/modules/engine-strings/engine-strings.data-table.data.json"

const GETTER = `
local byName = __eso_strings_held
__eso_strings_held = nil
local byNumber = {}
for name, text in pairs(byName) do
  local number = rawget(_G, name)
  if type(number) == "number" then byNumber[number] = text end
end
local function numberOf(given, context)
  if type(given) ~= "string" then return given end
  local named = given .. tostring(context)
  local env = __eso_env
  return (env ~= nil and rawget(env, named)) or rawget(_G, named)
end
function GetString(given, context)
  local number = numberOf(given, context)
  local env = __eso_env
  local added = env ~= nil and rawget(env, "EsoStrings") or nil
  local text = (added ~= nil and number ~= nil and added[number]) or byNumber[number]
  if type(text) ~= "string" then return "" end
  return text
end
`

const ENGINE_STRINGS_SCHEMA = z.object({
  apiVersion: z.number(),
  strings: z.record(z.string(), z.string()),
})

export function engineStringsTable(root: string = akashaRoot()): EngineStrings {
  return ENGINE_STRINGS_SCHEMA.parse(JSON.parse(readFileSync(join(root, STRINGS_AT), "utf8")))
}

export function stringsLua(table: EngineStrings): string {
  const held = Object.entries(table.strings).map(
    ([name, text]) => `${name}=${luaStringLiteral(text)}`
  )
  return `__eso_strings_held = {${held.join(",")}}\n${GETTER}`
}
