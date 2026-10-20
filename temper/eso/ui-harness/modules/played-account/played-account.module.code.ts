export const PLAYED_ACCOUNT_LUA = `
function __ui_accounts()
  local found = {}
  for _, held in pairs(_G) do
    if type(held) == "table" then
      local ok, default = pcall(rawget, held, "Default")
      if ok and type(default) == "table" then
        for key in pairs(default) do
          if type(key) == "string" and string.sub(key, 1, 1) == "@" then
            found[#found + 1] = key
          end
        end
      end
    end
  end
  table.sort(found)
  return found
end

function __ui_account_wide(saved)
  local held = saved ~= nil and saved.Default or nil
  if held == nil then return nil end
  local named = {}
  for key in pairs(held) do named[#named + 1] = key end
  table.sort(named)
  for _, key in ipairs(named) do
    local wide = held[key]["$AccountWide"]
    if wide ~= nil then return wide end
  end
  return nil
end

function __ui_play_as()
  local answered = __ui_player_answered or {}
  local found = __ui_accounts()
  local named = found[1] or "@harness"
  if not answered.GetDisplayName then GetDisplayName = function() return named end end
  if not answered.GetUnitName then GetUnitName = function() return "Harness" end end
  if not answered.GetCurrentCharacterId then GetCurrentCharacterId = function() return "0" end end
  if not answered.GetWorldName then GetWorldName = function() return "Harness" end end
  return GetDisplayName()
end
`
