local _G = _G
local ipairs = ipairs
local pairs = pairs
local insert = table.insert

local place = _G.__ui_place

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
  local control = name == nil and _G.GuiRoot or _G.__ui_control(name)
  if control == nil then return nil end
  return snapshotOf(control)
end
