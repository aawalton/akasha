local type = type
local tonumber = tonumber
local tostring = tostring
local gsub = string.gsub
local match = string.match
local upper = string.upper
local lower = string.lower
local find = string.find
local gmatch = string.gmatch
local unpack = unpack

local CLASS_SIGNS = "[%]%^%-%%]"

local MARK = "<<(.-)>>"

local WHICH = "(%d+)$"

function _G.LocaleAwareToUpper(text)
  if type(text) ~= "string" then return "" end
  return upper(text)
end

function _G.LocaleAwareToLower(text)
  if type(text) ~= "string" then return "" end
  return lower(text)
end

function _G.PlainStringFind(text, searchFor)
  if type(text) ~= "string" or type(searchFor) ~= "string" then return false end
  local first, last = find(text, searchFor, 1, true)
  if first == nil then return false end
  return true, first, last
end

function _G.SplitString(delims, text)
  if type(text) ~= "string" or type(delims) ~= "string" or delims == "" then return text end
  local found = {}
  for piece in gmatch(text, "[^" .. gsub(delims, CLASS_SIGNS, "%%%0") .. "]+") do
    found[#found + 1] = piece
  end
  return unpack(found)
end

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
