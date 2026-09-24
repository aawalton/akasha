local rawget = rawget

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

local placing = {}
local place

local function fractionOf(point)
  return ANCHOR_FRACTIONS[point] or ANCHOR_FRACTIONS[TOPLEFT]
end

local function known(control)
  return type(control) == "table" and rawget(control, "uiAnchors") ~= nil
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
    width, height = control.uiWidth, control.uiHeight
  else
    local one = spotOf(control, first)
    local second = control.uiAnchors[2]
    local two = second ~= nil and spotOf(control, second) or nil
    width, height = control.uiWidth, control.uiHeight
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
