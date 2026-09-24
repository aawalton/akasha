local _G = _G
local setmetatable = setmetatable
local pairs = pairs

local Font = {}
Font.__index = Font

function Font:GetFontInfo() return self.uiFace, self.uiSize, self.uiEffect end
function Font:SetFont(said) self.uiSaid = said end
function Font:GetName() return self.uiName end

function _G.__ui_fonts(given)
  local count = 0
  for name, one in pairs(given) do
    if _G[name] == nil then
      _G[name] = setmetatable({
        uiName = name,
        uiFace = one.face,
        uiSize = one.size,
        uiEffect = one.effect,
      }, Font)
      count = count + 1
    end
  end
  return count
end

function _G.__ui_font(name)
  local held = _G[name]
  if type(held) ~= "table" or getmetatable(held) ~= Font then return nil end
  return held.uiFace, held.uiSize, held.uiEffect
end
