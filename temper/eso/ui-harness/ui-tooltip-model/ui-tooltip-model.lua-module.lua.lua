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
  tip.uiHeight = held.below
end

function Control:AddLine(text, font, r, g, b, _, _, alignment)
  local held = linesOf(self)
  local line = self:CreateControl(nil, _G.CT_LABEL)
  line:SetFont(type(font) == "string" and font ~= "" and font or UNSTATED_FONT)
  line:SetText(text)
  if type(r) == "number" then line:SetColor(r, g, b, 1) end
  line:SetHorizontalAlignment(alignment or _G.TEXT_ALIGN_CENTER)
  line:SetAnchor(_G.TOPLEFT, self, _G.TOPLEFT, 0, held.below)
  line:SetAnchor(_G.TOPRIGHT, self, _G.TOPRIGHT, 0, held.below)
  insert(held.made, line)
  grown(self, line:GetHeight())
end

function Control:AddVerticalPadding(space)
  grown(self, type(space) == "number" and space or 0)
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
