
local TOPLEFT = _G.TOPLEFT

local ANCHOR_FRACTIONS = {
  [TOPLEFT] = { 0, 0 },
  [_G.TOP] = { 0.5, 0 },
  [_G.TOPRIGHT] = { 1, 0 },
  [_G.LEFT] = { 0, 0.5 },
  [_G.CENTER] = { 0.5, 0.5 },
  [_G.RIGHT] = { 1, 0.5 },
  [_G.BOTTOMLEFT] = { 0, 1 },
  [_G.BOTTOM] = { 0.5, 1 },
  [_G.BOTTOMRIGHT] = { 1, 1 },
}

local CT_LABEL = _G.CT_LABEL

local ADVANCE = 0.5

local LINE = 1.25

local UNSAID_SIZE = 18

local SIZE_SAID = "^[^|]*|(%d+)"

local MARKUP = {
  { "|c%x%x%x%x%x%x", "" },
  { "|r", "" },
  { "|H.-|h(.-)|h", "%1" },
  { "|t.-|t", "  " },
  { "|u[^:|]*:[^:|]*:[^:|]*:([^|]*)|u", "%1" },
}

local placing = {}
local place

local function fontSize(font)
  if type(font) ~= "string" then return UNSAID_SIZE end
  local lookup = _G.__ui_font
  if lookup ~= nil then
    local _, size = lookup(font)
    if type(size) == "number" and size > 0 then return size end
  end
  return tonumber(string.match(font, SIZE_SAID)) or UNSAID_SIZE
end

local function measured(control)
  local text = control.uiText
  if type(text) ~= "string" or text == "" then return 0, 0 end
  for _, one in ipairs(MARKUP) do text = string.gsub(text, one[1], one[2]) end
  local size = fontSize(control.uiFont)
  local longest, lines = 0, 0
  for line in string.gmatch(text .. "\n", "(.-)\n") do
    lines = lines + 1
    if #line > longest then longest = #line end
  end
  return longest * size * ADVANCE, lines * size * LINE
end

local function spanned(control, width, height)
  local left, top, right, bottom
  for _, child in ipairs(control.uiChildren) do
    if not child.uiHidden then
      local l, t, w, h = place(child)
      left = left == nil and l or math.min(left, l)
      top = top == nil and t or math.min(top, t)
      right = right == nil and l + w or math.max(right, l + w)
      bottom = bottom == nil and t + h or math.max(bottom, t + h)
    end
  end
  if left == nil then return width, height end
  return math.max(width, right - left), math.max(height, bottom - top)
end

local function stated(control)
  local width, height = control.uiWidth, control.uiHeight
  if control.uiType == CT_LABEL and (width == 0 or height == 0) then
    local wide, tall = measured(control)
    if width == 0 then width = wide end
    if height == 0 then height = tall end
  end
  if control.uiResizeToFit then width, height = spanned(control, width, height) end
  return width, height
end

local function fractionOf(point)
  return ANCHOR_FRACTIONS[point] or ANCHOR_FRACTIONS[TOPLEFT]
end

local function known(control)
  return type(control) == "userdata" and control.uiAnchors ~= nil
end

local function spotOf(control, anchor)
  local to = anchor.relativeTo or control.uiParent
  local toLeft, toTop, toWidth, toHeight = 0, 0, 0, 0
  if to ~= control and known(to) then
    toLeft, toTop, toWidth, toHeight = place(to)
  end
  local towards = fractionOf(anchor.relativePoint)
  local mine = fractionOf(anchor.point)
  return {
    mineX = mine[1],
    mineY = mine[2],
    atX = toLeft + towards[1] * toWidth + anchor.offsetX,
    atY = toTop + towards[2] * toHeight + anchor.offsetY,
  }
end

place = function(control)
  if placing[control] then return 0, 0, control.uiWidth, control.uiHeight end
  placing[control] = true
  local left, top, width, height
  local first = control.uiAnchors[1]
  if first == nil then
    left, top = 0, 0
    if known(control.uiParent) then left, top = place(control.uiParent) end
    width, height = stated(control)
  else
    local one = spotOf(control, first)
    local second = control.uiAnchors[2]
    local two = second ~= nil and spotOf(control, second) or nil
    width, height = stated(control)
    if two ~= nil and two.mineX ~= one.mineX then
      width = (two.atX - one.atX) / (two.mineX - one.mineX)
    end
    if two ~= nil and two.mineY ~= one.mineY then
      height = (two.atY - one.atY) / (two.mineY - one.mineY)
    end
    left = one.atX - one.mineX * width
    top = one.atY - one.mineY * height
  end
  placing[control] = nil
  return left, top, width, height
end

_G.__ui_place = place
