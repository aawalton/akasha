local _G = _G
local insert = table.insert
local remove = table.remove

local Control = _G.__ui_control_class

local UNSTATED_FONT = "ZoFontGame"

local function linesOf(tip)
  local held = tip.uiLines
  if held == nil then
    held = { below = 0, made = {} }
    tip.uiLines = held
  end
  return held
end

local function grown(tip, space)
  local held = linesOf(tip)
  held.below = held.below + space
  local _, down = tip:GetResizeToFitPadding()
  tip.uiHeight = held.below + down
end

function Control:AddLine(text, font, r, g, b, _, _, alignment)
  local held = linesOf(self)
  local across, down = self:GetResizeToFitPadding()
  local side, top = across / 2, down / 2 + held.below
  local line = self:CreateControl(nil, _G.CT_LABEL)
  line:SetFont(type(font) == "string" and font ~= "" and font or UNSTATED_FONT)
  line:SetText(text)
  if type(r) == "number" then line:SetColor(r, g, b, 1) end
  line:SetHorizontalAlignment(alignment or _G.TEXT_ALIGN_CENTER)
  line:SetAnchor(_G.TOPLEFT, self, _G.TOPLEFT, side, top)
  line:SetAnchor(_G.TOPRIGHT, self, _G.TOPRIGHT, -side, top)
  insert(held.made, line)
  grown(self, line:GetHeight())
end

function Control:AddVerticalPadding(space)
  grown(self, type(space) == "number" and space or 0)
end

local function toldWith(tip, event, ...)
  local named = {}
  for key in pairs(tip.uiHandlers) do
    if string.sub(key, 1, #event + 1) == event .. ":" then insert(named, key) end
  end
  table.sort(named)
  local unnamed = tip.uiHandlers[event]
  if unnamed ~= nil then unnamed(tip, ...) end
  for _, key in ipairs(named) do tip.uiHandlers[key](tip, ...) end
end

function Control:SetBagItem(bagId, slotIndex)
  local icon = _G.GetItemLinkIcon(_G.GetItemLink(bagId, slotIndex))
  toldWith(self, "OnAddGameData", _G.TOOLTIP_GAME_DATA_ITEM_ICON, icon)
end

function _G.SetTooltipIconTexture(tip, texture)
  local icon = tip:GetNamedChild("Icon")
  if icon == nil then return end
  local shown = type(texture) == "string" and texture ~= ""
  icon:SetTexture(shown and texture or "")
  icon:SetHidden(not shown)
end

function Control:ClearLines()
  local held = linesOf(self)
  for _, line in ipairs(held.made) do
    for at = #self.uiChildren, 1, -1 do
      if self.uiChildren[at] == line then remove(self.uiChildren, at) end
    end
  end
  self.uiLines = nil
  self.uiHeight = 0
end
