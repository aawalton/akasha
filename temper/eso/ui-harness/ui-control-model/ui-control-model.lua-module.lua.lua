local _G = _G
local setmetatable = setmetatable
local error = error
local ipairs = ipairs
local tostring = tostring
local insert = table.insert

local ANCHOR_POINTS = {
  TOPLEFT = 1,
  TOP = 2,
  TOPRIGHT = 4,
  LEFT = 8,
  CENTER = 16,
  RIGHT = 32,
  BOTTOMLEFT = 64,
  BOTTOM = 128,
  BOTTOMRIGHT = 256,
}

local ANCHOR_CONSTRAINTS = {
  ANCHOR_CONSTRAINS_X = 1,
  ANCHOR_CONSTRAINS_Y = 2,
  ANCHOR_CONSTRAINS_XY = 3,
}

local CONTROL_TYPES = {
  CT_INVALID = 0,
  CT_CONTROL = 1,
  CT_LABEL = 2,
  CT_TEXTURE = 3,
  CT_BUTTON = 4,
  CT_TOPLEVELCONTROL = 5,
  CT_SCROLL = 6,
  CT_EDITBOX = 7,
  CT_BACKDROP = 8,
  CT_SLIDER = 9,
  CT_STATUSBAR = 10,
  CT_COOLDOWN = 11,
  CT_LINE = 12,
  CT_TEXTURECOMPOSITE = 13,
  CT_COLORSELECT = 14,
  CT_TOOLTIP = 15,
}

local named = {}
local everyControl = {}
local unmodelled = {}

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

local function resolved(name, parent)
  if type(name) ~= "string" or parent == nil then return name end
  local held = parent.uiName
  if type(held) ~= "string" then held = "" end
  return (string.gsub(name, "%$%(parent%)", held))
end

local function birth(named, parent, controlType, virtual)
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

function Control:SetAlpha(alpha) self.uiAlpha = alpha end
function Control:GetAlpha() return self.uiAlpha end
function Control:SetScale(scale) self.uiScale = scale end
function Control:SetMouseEnabled(enabled) self.uiMouseEnabled = enabled and true or false end
function Control:SetResizeToFitDescendents(resize) self.uiResizeToFit = resize and true or false end
function Control:GetResizeToFitDescendents() return self.uiResizeToFit end

function Control:SetDimensions(width, height)
  self.uiWidth = width or 0
  self.uiHeight = height or 0
end
function Control:SetWidth(width) self.uiWidth = width or 0 end
function Control:SetHeight(height) self.uiHeight = height or 0 end
function Control:GetWidth() return self.uiWidth end
function Control:GetHeight() return self.uiHeight end
function Control:GetDimensions() return self.uiWidth, self.uiHeight end

function Control:SetAnchor(point, relativeTo, relativePoint, offsetX, offsetY, constrains)
  insert(self.uiAnchors, {
    point = point,
    relativeTo = relativeTo or self.uiParent,
    relativePoint = relativePoint or point,
    offsetX = offsetX or 0,
    offsetY = offsetY or 0,
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

function Control:SetText(text) self.uiText = tostring(text) end
function Control:GetText() return self.uiText or "" end
function Control:SetFont(font) self.uiFont = font end
function Control:SetColor(r, g, b, a) self.uiColor = { r, g, b, a or 1 } end
function Control:SetTexture(texture) self.uiTexture = texture end
function Control:SetAddressMode(mode) self.uiAddressMode = mode end
function Control:SetCenterTexture(texture) self.uiCenterTexture = texture end
function Control:SetEdgeTexture(texture) self.uiEdgeTexture = texture end
function Control:SetCenterColor(r, g, b, a) self.uiCenterColor = { r, g, b, a or 1 } end
function Control:SetEdgeColor(r, g, b, a) self.uiEdgeColor = { r, g, b, a or 1 } end
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
  return birth(name, nil, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil)
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

for key, value in pairs(ANCHOR_POINTS) do _G[key] = value end
for key, value in pairs(ANCHOR_CONSTRAINTS) do _G[key] = value end
for key, value in pairs(CONTROL_TYPES) do _G[key] = value end

_G.WINDOW_MANAGER = WindowManager
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
    width = control.uiWidth,
    height = control.uiHeight,
    text = control.uiText,
    font = control.uiFont,
    texture = control.uiTexture,
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

function _G.__ui_unmodelled()
  local found = {}
  for name, count in pairs(unmodelled) do found[name] = count end
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
