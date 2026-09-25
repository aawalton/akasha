
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

local CONSTRAINS_X = _G.ANCHOR_CONSTRAINS_X

local CONSTRAINS_Y = _G.ANCHOR_CONSTRAINS_Y

local CT_LABEL = _G.CT_LABEL

local PLACEHOLDER = "%$%(([%w_]+)%)"

local FONT_SAID = "^([^|]*)|?([^|]*)"

local FACE_FILE = "([^/\\]+)%.%a+$"

local CHARACTER = "[%z\1-\127\192-\255][\128-\191]*"

local UNSTATED_FONT = "ZoFontGame"

local SPACE = 32

local LEEWAY = 1e-6

local ELLIPSIS = "..."

local ELLIPSIS_MODE = _G.TEXT_WRAP_MODE_ELLIPSIS

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

local function kerned(kerning, before, code)
  if before == nil then return 0 end
  local row = kerning.pairs[kerning.firsts[before]]
  if row == nil then return 0 end
  return row[kerning.seconds[code]] or 0
end

local function stepOf(face, before, code)
  return (face.advances[code] or face.missing) + kerned(face.kerning, before, code)
end

local function codesOf(line)
  local codes = {}
  for one in string.gmatch(line, CHARACTER) do codes[#codes + 1] = codeOf(one) end
  return codes
end

local function widthOf(face, codes, from, to)
  local wide, before = 0, nil
  for at = from, to do
    wide = wide + stepOf(face, before, codes[at])
    before = codes[at]
  end
  return wide
end

local function laid(face, codes, limit, rows)
  local from = 1
  repeat
    local wide, before, space, to = 0, nil, nil, #codes
    for at = from, #codes do
      local code = codes[at]
      local step = stepOf(face, before, code)
      if limit ~= nil and code ~= SPACE and at > from and wide + step > limit + LEEWAY then
        to = (space ~= nil and space > from) and space - 1 or at - 1
        break
      end
      if code == SPACE then space = at end
      wide, before = wide + step, code
    end
    rows[#rows + 1] = { codes = codes, from = from, to = to }
    from = to + 1
    while to < #codes and codes[from] == SPACE do from = from + 1 end
  until from > #codes
end

local function ellipsed(face, row, limit)
  local dots = codesOf(ELLIPSIS)
  local tail = widthOf(face, dots, 1, #dots)
  local to = row.to
  local function shown()
    if to < row.from then return tail end
    return widthOf(face, row.codes, row.from, to) + kerned(face.kerning, row.codes[to], dots[1]) + tail
  end
  while limit ~= nil and to >= row.from and shown() > limit + LEEWAY do to = to - 1 end
  return shown()
end

local function measured(control, within)
  local text = control.uiText
  if type(text) ~= "string" or text == "" then return 0, 0 end
  for _, one in ipairs(MARKUP) do text = string.gsub(text, one[1], one[2]) end
  local face, size = faceOf(control)
  local scale = size / face.perEm
  local limit = (within ~= nil and within > 0) and within / scale or nil
  local rows = {}
  for line in string.gmatch(text .. "\n", "(.-)\n") do laid(face, codesOf(line), limit, rows) end
  local kept, most = #rows, control.uiMaxLines
  if most ~= nil and most > 0 and kept > most then kept = most end
  local widest = 0
  for at = 1, kept do
    local row = rows[at]
    local wide = widthOf(face, row.codes, row.from, row.to)
    if at < #rows and at == kept and control.uiWrapMode == ELLIPSIS_MODE then
      wide = ellipsed(face, row, limit)
    end
    if wide > widest then widest = wide end
  end
  return widest * scale, kept * face.line * scale
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

local function fitted(tip)
  local widest = 0
  for _, line in ipairs(tip.uiLines.made) do widest = math.max(widest, (measured(line))) end
  local across = tip:GetResizeToFitPadding()
  return widest + across
end

local function stated(control)
  local width, height = control.uiWidth, control.uiHeight
  if control.uiType == CT_LABEL and width == 0 then width = measured(control) end
  if control.uiLines ~= nil and width == 0 then width = fitted(control) end
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

local function grown(control, width, height)
  if control.uiType ~= CT_LABEL or control.uiHeight ~= 0 then return width, height end
  local _, tall = measured(control, width)
  return bounded(control, width, math.max(height, tall))
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

local function bindsX(anchor)
  return anchor.constrains == nil or anchor.constrains ~= CONSTRAINS_Y
end

local function bindsY(anchor)
  return anchor.constrains == nil or anchor.constrains ~= CONSTRAINS_X
end

local function spotsOf(control)
  local across, down = {}, {}
  for at = 1, 2 do
    local anchor = control.uiAnchors[at]
    if anchor ~= nil then
      local spot = spotOf(control, anchor)
      if bindsX(anchor) then across[#across + 1] = spot end
      if bindsY(anchor) then down[#down + 1] = spot end
    end
  end
  return across, down
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
    width, height = grown(control, bounded(control, stated(control)))
  else
    local across, down = spotsOf(control)
    local oneX, twoX, oneY, twoY = across[1], across[2], down[1], down[2]
    width, height = stated(control)
    if twoX ~= nil and twoX.mineX ~= oneX.mineX then
      width = math.max(0, (twoX.atX - oneX.atX) / (twoX.mineX - oneX.mineX))
    end
    local anchoredTall = twoY ~= nil and twoY.mineY ~= oneY.mineY
    if anchoredTall then
      height = math.max(0, (twoY.atY - oneY.atY) / (twoY.mineY - oneY.mineY))
    end
    width, height = bounded(control, width, height)
    if not anchoredTall then width, height = grown(control, width, height) end
    local baseLeft, baseTop = 0, 0
    if (oneX == nil or oneY == nil) and known(control.uiParent) then
      baseLeft, baseTop = placed(control.uiParent)
    end
    left = oneX ~= nil and oneX.atX - oneX.mineX * width or baseLeft
    top = oneY ~= nil and oneY.atY - oneY.mineY * height or baseTop
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

local function charactersOf(line)
  local found = {}
  for one in string.gmatch(line, CHARACTER) do found[#found + 1] = one end
  return found
end

local function broken(control)
  local text = control.uiText
  if type(text) ~= "string" or text == "" or string.find(text, "|", 1, true) then return text end
  local _, _, width = place(control)
  if width == nil or width <= 0 then return text end
  local face, size = faceOf(control)
  local limit = width / (size / face.perEm)
  local shown = {}
  for line in string.gmatch(text .. "\n", "(.-)\n") do
    local characters = charactersOf(line)
    local rows = {}
    laid(face, codesOf(line), limit, rows)
    for _, row in ipairs(rows) do
      shown[#shown + 1] = table.concat(characters, "", row.from, math.min(row.to, #characters))
    end
  end
  local most = control.uiMaxLines
  if most ~= nil and most > 0 and #shown > most then
    for at = #shown, most + 1, -1 do shown[at] = nil end
  end
  return table.concat(shown, "\n")
end

_G.__ui_text_shown = function(control)
  local ok, text = pcall(broken, control)
  if ok then return text end
  return control.uiText
end
_G.__ui_text_size = function(control)
  local _, _, width = place(control)
  return measured(control, width)
end
