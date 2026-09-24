local _G = _G
local insert = table.insert
local tostring = tostring

local Control = _G.__ui_control_class
local place = _G.__ui_place

local ANCHOR_POINTS = {
  TOPLEFT = _G.TOPLEFT,
  BOTTOMRIGHT = _G.BOTTOMRIGHT,
}

local ANCHOR_CONSTRAINTS = {
  ANCHOR_CONSTRAINS_XY = _G.ANCHOR_CONSTRAINS_XY,
}

function Control:SetHidden(hidden) self.uiHidden = hidden and true or false end
function Control:IsControlHidden() return self.uiHidden end
function Control:IsHidden()
  local at = self
  while at ~= nil do
    if at.uiHidden then return true end
    at = at.uiParent
  end
  return false
end

local huge = math.huge

local function asNumber(value, fallback)
  if type(value) ~= "number" then return fallback end
  if value ~= value or value == huge or value == -huge then return fallback end
  return value
end

function Control:SetAlpha(alpha) self.uiAlpha = asNumber(alpha, 1) end
function Control:GetAlpha() return self.uiAlpha end
function Control:SetScale(scale) self.uiScale = asNumber(scale, 1) end
function Control:SetMouseEnabled(enabled) self.uiMouseEnabled = enabled and true or false end
function Control:SetResizeToFitDescendents(resize) self.uiResizeToFit = resize and true or false end
function Control:GetResizeToFitDescendents() return self.uiResizeToFit end

function Control:SetDimensions(width, height)
  self.uiWidth = asNumber(width, 0)
  self.uiHeight = asNumber(height, 0)
end
function Control:SetWidth(width) self.uiWidth = asNumber(width, 0) end
function Control:SetHeight(height) self.uiHeight = asNumber(height, 0) end
function Control:GetWidth()
  local _, _, width = place(self)
  return width
end
function Control:GetHeight()
  local _, _, _, height = place(self)
  return height
end
function Control:GetDimensions()
  local _, _, width, height = place(self)
  return width, height
end
function Control:SetDimensionConstraints(minWidth, minHeight, maxWidth, maxHeight)
  self.uiConstraints = {
    asNumber(minWidth, 0),
    asNumber(minHeight, 0),
    asNumber(maxWidth, 0),
    asNumber(maxHeight, 0),
  }
end
function Control:GetDimensionConstraints()
  local held = self.uiConstraints or { 0, 0, 0, 0 }
  return held[1], held[2], held[3], held[4]
end
function Control:GetLeft()
  local left = place(self)
  return left
end
function Control:GetTop()
  local _, top = place(self)
  return top
end
function Control:GetRight()
  local left, _, width = place(self)
  return left + width
end
function Control:GetBottom()
  local _, top, _, height = place(self)
  return top + height
end
function Control:GetCenter()
  local left, top, width, height = place(self)
  return left + width / 2, top + height / 2
end
function Control:GetScreenRect()
  return place(self)
end

function Control:SetAnchor(point, relativeTo, relativePoint, offsetX, offsetY, constrains)
  insert(self.uiAnchors, {
    point = asNumber(point, ANCHOR_POINTS.TOPLEFT),
    relativeTo = type(relativeTo) == "userdata" and relativeTo or self.uiParent,
    relativePoint = asNumber(relativePoint, asNumber(point, ANCHOR_POINTS.TOPLEFT)),
    offsetX = asNumber(offsetX, 0),
    offsetY = asNumber(offsetY, 0),
    constrains = constrains,
  })
end
function Control:ClearAnchors() self.uiAnchors = {} end
function Control:SetAnchorFill(over)
  self.uiAnchors = {}
  local to = over or self.uiParent
  self:SetAnchor(ANCHOR_POINTS.TOPLEFT, to, ANCHOR_POINTS.TOPLEFT, 0, 0)
  self:SetAnchor(ANCHOR_POINTS.BOTTOMRIGHT, to, ANCHOR_POINTS.BOTTOMRIGHT, 0, 0)
end
function Control:GetAnchor(index)
  local anchor = self.uiAnchors[(index or 0) + 1]
  if anchor == nil then return false, 0, nil, 0, 0, 0, 0 end
  return true,
    anchor.point,
    anchor.relativeTo,
    anchor.relativePoint,
    anchor.offsetX,
    anchor.offsetY,
    anchor.constrains or ANCHOR_CONSTRAINTS.ANCHOR_CONSTRAINS_XY
end

local function handlerKey(event, name)
  if name == nil or name == "" then return event end
  return tostring(event) .. ":" .. tostring(name)
end

function Control:SetHandler(event, handler, name) self.uiHandlers[handlerKey(event, name)] = handler end
function Control:GetHandler(event, name) return self.uiHandlers[handlerKey(event, name)] end

function Control:SetDrawLayer(layer) self.uiLayer = layer end
function Control:SetDrawTier(tier) self.uiTier = tier end
function Control:SetDrawLevel(level) self.uiLevel = level end
function Control:GetDrawLayer() return self.uiLayer end
function Control:GetDrawTier() return self.uiTier end
function Control:GetDrawLevel() return self.uiLevel end

function Control:SetHorizontalAlignment(alignment) self.uiAlignH = alignment end
function Control:SetVerticalAlignment(alignment) self.uiAlignV = alignment end
function Control:GetHorizontalAlignment() return self.uiAlignH end
function Control:GetVerticalAlignment() return self.uiAlignV end

local function asText(value)
  local kind = type(value)
  if kind == "string" then return value end
  if kind == "number" then return tostring(value) end
  return nil
end

function Control:SetText(text) self.uiText = asText(text) end
function Control:GetText() return self.uiText or "" end
function Control:SetFont(font) self.uiFont = asText(font) end
local function asColor(r, g, b, a)
  if type(r) ~= "number" then return nil end
  return { r, g or 0, b or 0, a or 1 }
end

function Control:SetColor(r, g, b, a) self.uiColor = asColor(r, g, b, a) end
function Control:SetTexture(texture) self.uiTexture = asText(texture) end
function Control:SetAddressMode(mode) self.uiAddressMode = mode end
function Control:SetCenterTexture(texture) self.uiCenterTexture = texture end
function Control:SetEdgeTexture(texture) self.uiEdgeTexture = asText(texture) end
function Control:SetCenterColor(r, g, b, a) self.uiCenterColor = asColor(r, g, b, a) end
function Control:SetEdgeColor(r, g, b, a) self.uiEdgeColor = asColor(r, g, b, a) end
function Control:SetInsets(left, top, right, bottom)
  self.uiInsets = { left, top, right, bottom }
end
function Control:SetEnabled(enabled) self.uiEnabled = enabled and true or false end
function Control:SetState(state) self.uiState = state end
function Control:GetState() return self.uiState end
function Control:SetMovable(movable) self.uiMovable = movable and true or false end
function Control:SetClampedToScreen(clamped) self.uiClamped = clamped and true or false end
