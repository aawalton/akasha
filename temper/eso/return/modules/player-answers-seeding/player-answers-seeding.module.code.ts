export const PLAYER_ANSWERS_HELD = "TemperPlayerAnswers_SavedVariables"

export const PLAYER_ANSWERS_ADDON = "TemperCatalog"

const TOP_LEVEL = /^[A-Za-z_][A-Za-z0-9_]*\s*=/gm

export function playerAnswersSource(file: string): string | null {
  TOP_LEVEL.lastIndex = 0
  let from: number | null = null
  for (let found = TOP_LEVEL.exec(file); found !== null; found = TOP_LEVEL.exec(file)) {
    const named = found[0].replace(/\s*=$/, "")
    if (from !== null) return file.slice(from, found.index)
    if (named === PLAYER_ANSWERS_HELD) from = found.index
  }
  return from === null ? null : file.slice(from)
}

export const PLAYER_ANSWERS_LUA = `
local held = ${PLAYER_ANSWERS_HELD}
${PLAYER_ANSWERS_HELD} = nil
local accounts = held ~= nil and held.Default or {}
local named = {}
for key in pairs(accounts) do named[#named + 1] = key end
table.sort(named)
local answers = nil
for _, key in ipairs(named) do
  local wide = accounts[key]["$AccountWide"]
  if answers == nil and wide ~= nil then answers = wide.answers end
end
local count = 0
for name, byKey in pairs(answers or {}) do
  local was = _G[name]
  _G[name] = function(...)
    local joined, key = pcall(table.concat, { ... }, ",")
    local got = joined and byKey[key] or nil
    if got ~= nil then return unpack(got) end
    if was ~= nil then return was(...) end
  end
  count = count + 1
end
return count
`
