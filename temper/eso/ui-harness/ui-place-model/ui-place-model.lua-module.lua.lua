
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

local PLACEHOLDER = "%$%(([%w_]+)%)"

local FONT_SAID = "^([^|]*)|?([^|]*)"

local FACE_FILE = "([^/\\]+)%.%a+$"

local CHARACTER = "[%z\1-\127\192-\255][\128-\191]*"

local UNSTATED_FONT = "ZoFontGame"

local MARKUP = {
  { "|c%x%x%x%x%x%x", "" },
  { "|r", "" },
  { "|H.-|h(.-)|h", "%1" },
  { "|t.-|t", "  " },
  { "|u[^:|]*:[^:|]*:[^:|]*:([^|]*)|u", "%1" },
}

local placing = {}
local worked = nil
local rings = 0
local placed

local faces, spellings, keptAt = {}, {}, "no folder handed over"

function _G.__ui_faces(given, strings, at)
  faces, spellings, keptAt = given, strings, at
  local count = 0
  for _ in pairs(given) do count = count + 1 end
  return count
end

local function spelled(said)
  return (string.gsub(tostring(said), PLACEHOLDER, function(key) return spellings[key] end))
end

local function refused(control, why)
  error("`" .. tostring(control.uiName) .. "` " .. why .. ", so its text has no width here", 0)
end

local function faceOf(control)
  local font = control.uiFont
  if type(font) ~= "string" or font == "" then font = UNSTATED_FONT end
  local face, size
  local lookup = _G.__ui_font
  if lookup ~= nil then face, size = lookup(font) end
  if face == nil then face, size = string.match(spelled(font), FONT_SAID) end
  local key = string.match(string.lower(spelled(face)), FACE_FILE)
  local held = key ~= nil and faces[key] or nil
  if held == nil then
    refused(control, "has the font `" .. font .. "`, whose face is not kept in " .. keptAt ..
      " (staging a window keeps the game's faces there)")
  end
  local sized = tonumber(spelled(size))
  if sized == nil or sized <= 0 then refused(control, "has the font `" .. font .. "`, which says no size") end
  return held, sized
end

local function codeOf(one)
  local first = string.byte(one, 1)
  if #one == 1 then return first end
  local code = first % (2 ^ (7 - #one))
  for at = 2, #one do code = code * 64 + string.byte(one, at) % 64 end
  return code
end

local function measured(control)
  local text = control.uiText
  if type(text) ~= "string" or text == "" then return 0, 0 end
  for _, one in ipairs(MARKUP) do text = string.gsub(text, one[1], one[2]) end
  local face, size = faceOf(control)
  local advances, missing = face.advances, face.missing
  local widest, lines = 0, 0
  for line in string.gmatch(text .. "\n", "(.-)\n") do
    lines = lines + 1
    local wide = 0
    for one in string.gmatch(line, CHARACTER) do wide = wide + (advances[codeOf(one)] or missing) end
    if wide > widest then widest = wide end
  end
  local scale = size / face.perEm
  return widest * scale, lines * face.line * scale
end

local function spanned(control, width, height)
  local left, top, right, bottom
  for _, child in ipairs(control.uiChildren) do
    if not child.uiHidden then
      local l, t, w, h = placed(child)
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

local function bounded(control, width, height)
  local held = control.uiConstraints
  if held == nil then return width, height end
  local minWidth, minHeight, maxWidth, maxHeight = held[1], held[2], held[3], held[4]
  if minWidth > 0 and width < minWidth then width = minWidth end
  if maxWidth > 0 and width > maxWidth then width = maxWidth end
  if minHeight > 0 and height < minHeight then height = minHeight end
  if maxHeight > 0 and height > maxHeight then height = maxHeight end
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
    toLeft, toTop, toWidth, toHeight = placed(to)
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

placed = function(control)
  if placing[control] then
    rings = rings + 1
    return 0, 0, bounded(control, control.uiWidth, control.uiHeight)
  end
  local held = worked[control]
  if held ~= nil then return held[1], held[2], held[3], held[4] end
  local ringsBefore = rings
  placing[control] = true
  local left, top, width, height
  local first = control.uiAnchors[1]
  if first == nil then
    left, top = 0, 0
    if known(control.uiParent) then left, top = placed(control.uiParent) end
    width, height = bounded(control, stated(control))
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
    width, height = bounded(control, width, height)
    left = one.atX - one.mineX * width
    top = one.atY - one.mineY * height
  end
  local screen = _G.GuiRoot
  if control.uiClamped and control ~= screen and known(screen) then
    left = math.max(0, math.min(left, screen.uiWidth - width))
    top = math.max(0, math.min(top, screen.uiHeight - height))
  end
  placing[control] = nil
  if rings == ringsBefore then worked[control] = { left, top, width, height } end
  return left, top, width, height
end

local function place(control)
  if worked ~= nil then return placed(control) end
  worked = {}
  local ok, left, top, width, height = pcall(placed, control)
  worked = nil
  if not ok then
    placing = {}
    error(left, 0)
  end
  return left, top, width, height
end

_G.__ui_place = place
_G.__ui_text_size = measured
