local _G = _G
local setmetatable = setmetatable
local error = error
local ipairs = ipairs
local tostring = tostring
local insert = table.insert

local CONTROL_TYPES = {
  CT_CONTROL = _G.CT_CONTROL,
  CT_TOPLEVELCONTROL = _G.CT_TOPLEVELCONTROL,
}

local named = {}
local everyControl = {}
local unmodelled = {}
local virtuals = {}
local unmade = {}

local traceback = _G.debug and _G.debug.traceback

local function traced(thrown)
  if traceback == nil then return tostring(thrown) end
  return traceback(tostring(thrown), 2)
end

local Control = {}

local function passedOver(control) return control end
local function measured() return 0, 0 end
local function denied() return false end

local ASKING = { "^Is%u", "^Has%u", "^Can%u", "^Was%u", "^Should%u", "^Does%u" }

local partOf

local function unmodelledAs(key)
  if string.match(key, "^Get%u.*Control$") ~= nil then
    return function(control) return partOf(control, key) end
  end
  if string.match(key, "^Get%u") ~= nil then return measured end
  for _, shape in ipairs(ASKING) do
    if string.match(key, shape) ~= nil then return denied end
  end
  return passedOver
end

local documented = nil

function _G.__ui_control_methods(given)
  documented = {}
  for _, name in ipairs(given) do documented[name] = true end
  return #given
end

setmetatable(Control, {
  __index = function(_, key)
    if type(key) ~= "string" or string.match(key, "^%u") == nil then return nil end
    if documented ~= nil and not documented[key] then return nil end
    unmodelled[key] = (unmodelled[key] or 0) + 1
    return unmodelledAs(key)
  end,
})

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

local birth
local dress

local function declaredText(text)
  if type(text) ~= "string" or string.match(text, "^SI_[%w_]+$") == nil then return text end
  local number = rawget(_G, text)
  if type(number) ~= "number" or _G.GetString == nil then return text end
  return _G.GetString(number)
end

local function childHeld(name, parent)
  local held = named[resolved(name, parent)]
  local above = held ~= nil and held.uiParent or nil
  while above ~= nil do
    if above == parent then return held end
    above = above.uiParent
  end
  return nil
end

dress = function(control, spec)
  if spec == nil then return control end
  if spec.hidden ~= nil then control:SetHidden(spec.hidden) end
  if spec.alpha ~= nil then control:SetAlpha(spec.alpha) end
  if spec.mouseEnabled ~= nil then control:SetMouseEnabled(spec.mouseEnabled) end
  if spec.resizeToFit ~= nil then control:SetResizeToFitDescendents(spec.resizeToFit) end
  if spec.width ~= nil then control.uiWidth = spec.width end
  if spec.height ~= nil then control.uiHeight = spec.height end
  if spec.font ~= nil then control.uiFont = spec.font end
  if spec.text ~= nil then control.uiText = declaredText(spec.text) end
  if spec.alignH ~= nil then control.uiAlignH = spec.alignH end
  if spec.alignV ~= nil then control.uiAlignV = spec.alignV end
  if spec.texture ~= nil then control.uiTexture = spec.texture end
  if spec.color ~= nil then control.uiColor = spec.color end
  if spec.centerColor ~= nil then control.uiCenterColor = spec.centerColor end
  if spec.edgeColor ~= nil then control.uiEdgeColor = spec.edgeColor end
  if spec.textureCoords ~= nil then control.uiTextureCoords = spec.textureCoords end
  if spec.centerTexture ~= nil then control.uiCenterTexture = spec.centerTexture end
  if spec.edgeTexture ~= nil then control.uiEdgeTexture = spec.edgeTexture end
  if spec.edgeSize ~= nil then control.uiEdgeSize = spec.edgeSize end
  if spec.insets ~= nil then control.uiInsets = spec.insets end
  if spec.normalTexture ~= nil then control.uiNormalTexture = spec.normalTexture end
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
      local held = childHeld(child.name, control)
      dress(held or birth(child.name, control, child.controlType, nil), child)
    end
  end
  if spec.handlers ~= nil then
    for event, made in pairs(spec.handlers) do
      control.uiHandlers[event] = made
    end
    local firsts = {}
    for _, event in ipairs(spec.handlerOrder or {}) do
      if event == "OnInitialized" or string.match(event, "^OnInitialized:") ~= nil then
        insert(firsts, spec.handlers[event])
      end
    end
    for _, first in ipairs(firsts) do
      local ok, thrown = xpcall(function() return first(control) end, traced)
      if not ok then unmade[control.uiName or ""] = tostring(thrown) end
    end
  end
  return control
end

birth = function(named, parent, controlType, virtual)
  local name = resolved(named, parent)
  local fields = setmetatable({
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
  }, { __index = Control })
  local control = newproxy(true)
  local meta = getmetatable(control)
  meta.__index = fields
  meta.__newindex = fields
  control.uiName = claim(name, control)
  if parent ~= nil then insert(parent.uiChildren, control) end
  insert(everyControl, control)
  if virtual ~= nil then dress(control, virtuals[virtual]) end
  return control
end

partOf = function(control, key)
  local held = control.uiParts
  if held == nil then
    held = {}
    control.uiParts = held
  end
  local made = held[key]
  if made == nil then
    made = birth(nil, control, CONTROL_TYPES.CT_CONTROL, nil)
    held[key] = made
  end
  return made
end

function Control:GetName() return self.uiName or "" end
function Control:GetType() return self.uiType end
function Control:GetParent() return self.uiParent end
function Control:SetParent(parent)
  local was = self.uiParent
  if was == parent then return end
  if was ~= nil then
    for at, child in ipairs(was.uiChildren) do
      if child == self then
        table.remove(was.uiChildren, at)
        break
      end
    end
  end
  self.uiParent = parent
  if parent ~= nil then insert(parent.uiChildren, self) end
end
function Control:GetOwningWindow()
  local at = self
  while at.uiParent ~= nil and at.uiParent ~= _G.GuiRoot do
    at = at.uiParent
  end
  return at
end
function Control:GetNumChildren() return #self.uiChildren end
function Control:GetChild(which)
  if type(which) == "number" then return self.uiChildren[which] end
  return named[(self.uiName or "") .. tostring(which)]
end
function Control:GetNamedChild(suffix) return named[(self.uiName or "") .. tostring(suffix)] end

_G.__ui_control_class = Control

function Control:CreateControl(name, controlType)
  return birth(name, self, controlType, nil)
end

local WindowManager = {}

local function answeredNothing() return nil end

setmetatable(WindowManager, {
  __index = function(_, key)
    if type(key) ~= "string" or string.match(key, "^%u") == nil then return nil end
    unmodelled["WindowManager:" .. key] = (unmodelled["WindowManager:" .. key] or 0) + 1
    if string.match(key, "^Get%u.*Control$") ~= nil then return answeredNothing end
    return unmodelledAs(key)
  end,
})

function WindowManager:CreateTopLevelWindow(name)
  return birth(name, _G.GuiRoot, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil)
end

function WindowManager:CreateControl(name, parent, controlType)
  return birth(name, parent, controlType, nil)
end

function WindowManager:CreateControlFromVirtual(name, parent, virtual, suffix)
  local full = name
  if suffix ~= nil then full = tostring(name) .. tostring(suffix) end
  local template = virtuals[virtual]
  local kind = template ~= nil and template.controlType or CONTROL_TYPES.CT_CONTROL
  return birth(full, parent, kind, virtual)
end

function WindowManager:ApplyTemplateToControl(control, virtual)
  if control == nil then return nil end
  control.uiVirtual = control.uiVirtual or virtual
  return dress(control, virtuals[virtual])
end

function WindowManager:GetControlByName(name, prefix)
  if prefix ~= nil then return named[tostring(name) .. tostring(prefix)] end
  return named[name]
end

function WindowManager:GetMouseOverControl() return nil end
function _G.MouseIsOver() return false end
function WindowManager:SetMouseCursor() end

_G.WINDOW_MANAGER = WindowManager

function _G.GetWindowManager() return WindowManager end
_G.GuiRoot = birth("GuiRoot", nil, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil)
_G.GuiRoot.uiWidth = 1920
_G.GuiRoot.uiHeight = 1080

local GAME_CONTROLS = { "ZO_Menus" }

for _, name in ipairs(GAME_CONTROLS) do
  birth(name, _G.GuiRoot, CONTROL_TYPES.CT_TOPLEVELCONTROL, nil).uiPremade = true
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

function _G.__ui_control(name) return named[name] end

function _G.__ui_declare(given)
  local count = 0
  for _, one in ipairs(given) do
    local name, spec = one[1], one[2]
    local held = named[name]
    if held == nil or held.uiPremade then
      if held ~= nil then held.uiPremade = nil end
      local ok, thrown = xpcall(function()
        dress(held or birth(name, _G.GuiRoot, spec.controlType, nil), spec)
      end, traced)
      if ok then count = count + 1 else unmade[name] = tostring(thrown) end
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
