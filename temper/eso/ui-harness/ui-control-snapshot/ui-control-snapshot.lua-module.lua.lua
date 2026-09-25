local _G = _G
local ipairs = ipairs
local pairs = pairs
local insert = table.insert

local place = _G.__ui_place

local function fontText(said)
  local named = _G.__ui_font
  if type(said) ~= "string" or named == nil then return said end
  local face, size, effect = named(said)
  if face == nil then return said end
  if effect == nil or effect == "" then return face .. "|" .. tostring(size) end
  return face .. "|" .. tostring(size) .. "|" .. effect
end

local function drawnBefore(first, second)
  if first.control.uiTier ~= second.control.uiTier then
    return first.control.uiTier < second.control.uiTier
  end
  if first.control.uiLayer ~= second.control.uiLayer then
    return first.control.uiLayer < second.control.uiLayer
  end
  if first.control.uiLevel ~= second.control.uiLevel then
    return first.control.uiLevel < second.control.uiLevel
  end
  return first.at < second.at
end

local function inDrawOrder(control)
  local held = {}
  for at, child in ipairs(control.uiChildren) do insert(held, { control = child, at = at }) end
  if control ~= _G.GuiRoot then table.sort(held, drawnBefore) end
  return held
end

local function snapshotOf(control)
  local left, top, width, height = place(control)
  local children = {}
  for _, one in ipairs(inDrawOrder(control)) do
    insert(children, snapshotOf(one.control))
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
    text = control.uiType == _G.CT_LABEL and _G.__ui_text_shown(control) or control.uiText,
    font = fontText(control.uiFont),
    alignH = control.uiAlignH,
    alignV = control.uiAlignV,
    texture = control.uiTexture,
    color = control.uiColor,
    centerColor = control.uiCenterColor,
    edgeColor = control.uiEdgeColor,
    edgeTexture = control.uiEdgeTexture,
    edgeSize = control.uiEdgeSize,
    centerTexture = control.uiCenterTexture,
    textureCoords = control.uiTextureCoords,
    normalTexture = control.uiNormalTexture,
    insets = control.uiInsets,
    anchors = anchors,
    handlers = handlers,
    children = children,
  }
end

function _G.__ui_snapshot(name)
  local control = name == nil and _G.GuiRoot or _G.__ui_control(name)
  if control == nil then return nil end
  return snapshotOf(control)
end
