local rawget = rawget

local ANCHOR_FRACTIONS = {
  [1] = { 0, 0 },
  [2] = { 0.5, 0 },
  [4] = { 1, 0 },
  [8] = { 0, 0.5 },
  [16] = { 0.5, 0.5 },
  [32] = { 1, 0.5 },
  [64] = { 0, 1 },
  [128] = { 0.5, 1 },
  [256] = { 1, 1 },
}

local placing = {}
local place

local function fractionOf(point)
  return ANCHOR_FRACTIONS[point] or ANCHOR_FRACTIONS[1]
end

local function known(control)
  return control ~= nil and rawget(control, "uiAnchors") ~= nil
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
