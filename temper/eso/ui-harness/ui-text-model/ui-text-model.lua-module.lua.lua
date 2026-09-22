local type = type
local tonumber = tonumber
local tostring = tostring
local gsub = string.gsub
local match = string.match

local MARK = "<<(.-)>>"

local WHICH = "(%d+)$"

function _G.zo_strformat(formatString, ...)
  return _G.LocalizeString(formatString, ...)
end

function _G.LocalizeString(formatString, ...)
  if type(formatString) ~= "string" then return "" end
  local given = { ... }
  return (gsub(formatString, MARK, function(inside)
    local which = match(inside, WHICH)
    if which == nil then return "" end
    local value = given[tonumber(which)]
    if value == nil then return "" end
    return tostring(value)
  end))
end
