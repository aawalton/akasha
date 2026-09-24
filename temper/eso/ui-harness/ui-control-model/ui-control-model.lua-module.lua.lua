local _G = _G
local setmetatable = setmetatable
local error = error
local ipairs = ipairs
local tostring = tostring
local insert = table.insert

local ANCHOR_POINTS = {
  TOPLEFT = _G.TOPLEFT,
  BOTTOMRIGHT = _G.BOTTOMRIGHT,
}

local ANCHOR_CONSTRAINTS = {
  ANCHOR_CONSTRAINS_XY = _G.ANCHOR_CONSTRAINS_XY,
}

local CONTROL_TYPES = {
  CT_CONTROL = _G.CT_CONTROL,
  CT_TOPLEVELCONTROL = _G.CT_TOPLEVELCONTROL,
}

local named = {}
local everyControl = {}
local unmodelled = {}
local virtuals = {}
local unmade = {}

local Control = {}

Control.__index = function(self, key)
  local found = rawget(Control, key)
  if found ~= nil then return found end
  if type(key) ~= "string" or string.match(key, "^%u") == nil then return nil end
  unmodelled[key] = (unmodelled[key] or 0) + 1
  return function() return self end
end

local function claim(name, control)
  if name == nil or name == "" then return nil end
  if named[name] ~= nil then
    error("a control is named " .. tostring(name) .. " already", 0)
  end
  named[name] = control
  _G[name] = control
  return name
end

local function nameOf(control)
  local held = control ~= nil and control.uiName or nil
  if type(held) ~= "string" then return "" end
  return held
end

local function resolved(name, parent)
  if type(name) ~= "string" or parent == nil then return name end
  local said = string.gsub(name, "%$%(grandparent%)", nameOf(parent.uiParent))
  return (string.gsub(said, "%$%(parent%)", nameOf(parent)))
end

local place = _G.__ui_place

local birth
local dress

dress = function(control, spec)
  if spec == nil then return control end
  if spec.hidden ~= nil then control:SetHidden(spec.hidden) end
  if spec.alpha ~= nil then control:SetAlpha(spec.alpha) end
  if spec.mouseEnabled ~= nil then control:SetMouseEnabled(spec.mouseEnabled) end
  if spec.width ~= nil then control.uiWidth = spec.width end
  if spec.height ~= nil then control.uiHeight = spec.height end
  if spec.font ~= nil then control.uiFont = spec.font end
  if spec.text ~= nil then control.uiText = spec.text end
  if spec.alignH ~= nil then control.uiAlignH = spec.alignH end
  if spec.alignV ~= nil then control.uiAlignV = spec.alignV end
  if spec.texture ~= nil then control.uiTexture = spec.texture end
  if spec.color ~= nil then control.uiColor = spec.color end
  if spec.centerColor ~= nil then control.uiCenterColor = spec.centerColor end
  if spec.edgeColor ~= nil then control.uiEdgeColor = spec.edgeColor end
  if spec.anchorFill then control:SetAnchorFill() end
  if spec.anchors ~= nil then
    for _, anchor in ipairs(spec.anchors) do
      local to = control.uiParent
      if anchor.relativeTo ~= nil then
        to = named[resolved(anchor.relativeTo, control.uiParent)] or to
      end
      control:SetAnchor(anchor.point, to, anchor.relativePoint, anchor.offsetX, anchor.offsetY)
    end
  end
  if spec.children ~= nil then
    for _, child in ipairs(spec.children) do
      dress(birth(child.name, control, child.controlType, nil), child)
    end
  end
  if spec.handlers ~= nil then
    for event, made in pairs(spec.handlers) do
      control.uiHandlers[event] = made
    end
    local first = spec.handlers.OnInitialized
    if first ~= nil then
      local ok, thrown = pcall(first, control)
      if not ok then unmade[control.uiName or ""] = tostring(thrown) end
    end
  end
  return control
end

birth = function(named, parent, controlType, virtual)
  local name = resolved(named, parent)
  local control = setmetatable({
    uiName = nil,
    uiType = controlType or CONTROL_TYPES.CT_CONTROL,
    uiVirtual = virtual,
    uiParent = parent,
    uiChildren = {},
    uiAnchors = {},
    uiHandlers = {},
    uiHidden = false,
    uiAlpha = 1,
    uiWidth = 0,
    uiHeight = 0,
    uiScale = 1,
    uiMouseEnabled = false,
    uiResizeToFit = false,
    uiLayer = 0,
    uiTier = 0,
    uiLevel = 0,
  }, Control)
  control.uiName = claim(name, control)
  if parent ~= nil then insert(parent.uiChildren, control) end
  insert(everyControl, control)
  if virtual ~= nil then dress(control, virtuals[virtual]) end
  return control
end

function Control:GetName() return self.uiName or "" end
function Control:GetType() return self.uiType end
function Control:GetParent() return self.uiParent end
function Control:SetParent(parent)
  self.uiParent = parent
  if parent ~= nil then insert(parent.uiChildren, self) end
end
function Control:GetNumChildren() return #self.uiChildren end
function Control:GetChild(which)
  if type(which) == "number" then return self.uiChildren[which] end
  return named[(self.uiName or "") .. tostring(which)]
end
function Control:GetNamedChild(suffix) return named[(self.uiName or "") .. tostring(suffix)] end

function Control:SetHidden(hidden) self.uiHidden = hidden and true or false end
function Control:IsHidden() return self.uiHidden end
function Control:IsControlHidden()
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
    relativeTo = relativeTo or self.uiParent,
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

function Control:SetHandler(event, handler) self.uiHandlers[event] = handler end
function Control:GetHandler(event) return self.uiHandlers[event] end

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

function Control:CreateControl(name, controlType)
  return birth(name, self, controlType, nil)
end

local WindowManager = {}

function WindowManager:CreateTopLevelWindow(name)
  return birth(name, _G.GuiRoot, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil)
end

function WindowManager:CreateControl(name, parent, controlType)
  return birth(name, parent, controlType, nil)
end

function WindowManager:CreateControlFromVirtual(name, parent, virtual, suffix)
  local full = name
  if suffix ~= nil then full = tostring(name) .. tostring(suffix) end
  return birth(full, parent, CONTROL_TYPES.CT_CONTROL, virtual)
end

function WindowManager:GetControlByName(name, prefix)
  if prefix ~= nil then return named[tostring(name) .. tostring(prefix)] end
  return named[name]
end

function WindowManager:GetMouseOverControl() return nil end
function WindowManager:SetMouseCursor() end

_G.WINDOW_MANAGER = WindowManager

function _G.GetWindowManager() return WindowManager end
_G.GuiRoot = birth("GuiRoot", nil, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil)
_G.GuiRoot:SetDimensions(1920, 1080)

local GAME_CONTROLS = { "ZO_Menus" }

for _, name in ipairs(GAME_CONTROLS) do
  birth(name, _G.GuiRoot, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil)
end

function _G.GetControl(first, second)
  if second == nil then
    if type(first) == "string" then return named[first] end
    return first
  end
  local base = first
  if type(base) ~= "string" then base = base:GetName() end
  return named[base .. tostring(second)]
end

function _G.CreateControl(name, parent, controlType)
  return WindowManager:CreateControl(name, parent, controlType)
end

function _G.CreateControlFromVirtual(name, parent, virtual, suffix)
  return WindowManager:CreateControlFromVirtual(name, parent, virtual, suffix)
end

local function snapshotOf(control)
  local left, top, width, height = place(control)
  local children = {}
  for _, child in ipairs(control.uiChildren) do
    insert(children, snapshotOf(child))
  end
  local anchors = {}
  for _, anchor in ipairs(control.uiAnchors) do
    insert(anchors, {
      point = anchor.point,
      relativeTo = anchor.relativeTo ~= nil and anchor.relativeTo:GetName() or nil,
      relativePoint = anchor.relativePoint,
      offsetX = anchor.offsetX,
      offsetY = anchor.offsetY,
    })
  end
  local handlers = {}
  for event in pairs(control.uiHandlers) do insert(handlers, event) end
  return {
    name = control.uiName,
    controlType = control.uiType,
    virtual = control.uiVirtual,
    hidden = control.uiHidden,
    left = left,
    top = top,
    width = width,
    height = height,
    alpha = control.uiAlpha,
    text = control.uiText,
    font = control.uiFont,
    alignH = control.uiAlignH,
    alignV = control.uiAlignV,
    texture = control.uiTexture,
    color = control.uiColor,
    centerColor = control.uiCenterColor,
    edgeColor = control.uiEdgeColor,
    edgeTexture = control.uiEdgeTexture,
    insets = control.uiInsets,
    anchors = anchors,
    handlers = handlers,
    children = children,
  }
end

function _G.__ui_snapshot(name)
  local control = name == nil and _G.GuiRoot or named[name]
  if control == nil then return nil end
  return snapshotOf(control)
end

function _G.__ui_declare(given)
  local count = 0
  for name, spec in pairs(given) do
    if named[name] == nil then
      dress(birth(name, _G.GuiRoot, spec.controlType, nil), spec)
      count = count + 1
    end
  end
  return count
end

function _G.__ui_show(name)
  local control = named[name]
  if control == nil then return false end
  control:SetHidden(false)
  return true
end

function _G.__ui_virtuals(given)
  local count = 0
  for name, spec in pairs(given) do
    virtuals[name] = spec
    count = count + 1
  end
  return count
end

function _G.__ui_unmodelled()
  local found = {}
  for name, count in pairs(unmodelled) do found[name] = count end
  return found
end

function _G.__ui_unmade()
  local found = {}
  for name, thrown in pairs(unmade) do found[name] = thrown end
  return found
end

function _G.__ui_names()
  local names = {}
  for _, control in ipairs(everyControl) do
    if control.uiName ~= nil then insert(names, control.uiName) end
  end
  return names
end

function _G.__ui_fire(name, event, ...)
  local control = named[name]
  if control == nil then error("no control is named " .. tostring(name), 0) end
  local handler = control.uiHandlers[event]
  if handler == nil then return false end
  handler(control, ...)
  return true
end
