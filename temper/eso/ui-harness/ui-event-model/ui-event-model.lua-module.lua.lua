local _G = _G
local insert = table.insert
local ipairs = ipairs
local pairs = pairs
local pcall = pcall
local error = error

local byEvent = {}
local updates = {}
local later = {}

local EventManager = {}

function EventManager:RegisterForEvent(namespace, event, callback)
  if event == nil then return false end
  local held = byEvent[event]
  if held == nil then
    held = {}
    byEvent[event] = held
  end
  for _, one in ipairs(held) do
    if one.namespace == namespace then return false end
  end
  insert(held, { namespace = namespace, callback = callback })
  return true
end

function EventManager:UnregisterForEvent(namespace, event)
  local held = byEvent[event]
  if held == nil then return false end
  local kept = {}
  for _, one in ipairs(held) do
    if one.namespace ~= namespace then insert(kept, one) end
  end
  byEvent[event] = kept
  return true
end

function EventManager:AddFilterForEvent()
  return true
end

function EventManager:RegisterForUpdate(namespace, everyMs, callback, once)
  if once then
    insert(later, { namespace = namespace, callback = callback, ms = everyMs })
    return true
  end
  updates[namespace] = { everyMs = everyMs, callback = callback }
  return true
end

function EventManager:UnregisterForUpdate(namespace)
  updates[namespace] = nil
  local kept = {}
  for _, one in ipairs(later) do
    if one.namespace == nil or one.namespace ~= namespace then insert(kept, one) end
  end
  later = kept
  return true
end

_G.EVENT_MANAGER = EventManager

local Control = _G.__ui_control_class

function Control:RegisterForEvent(event, callback)
  return EventManager:RegisterForEvent(self, event, callback)
end

function Control:UnregisterForEvent(event)
  return EventManager:UnregisterForEvent(self, event)
end

function Control:AddFilterForEvent()
  return true
end

function _G.GetEventManager() return EventManager end

function _G.zo_callLater(callback, ms)
  insert(later, { callback = callback, ms = ms })
  return #later
end

function _G.zo_callLaterOnScene(_, callback, ms)
  return _G.zo_callLater(callback, ms)
end

function _G.__ui_raise(event, ...)
  local held = byEvent[event]
  if held == nil then return 0 end
  local ran = 0
  local failed = nil
  local waiting = {}
  for at, one in ipairs(held) do waiting[at] = one end
  for _, one in ipairs(waiting) do
    local ok, thrown = pcall(one.callback, event, ...)
    ran = ran + 1
    if not ok and failed == nil then failed = thrown end
  end
  if failed ~= nil then error(failed, 0) end
  return ran
end

local FRAME_HANDLER = "OnUpdate"

local function shownFrom(control, found)
  if control.uiHidden then return found end
  insert(found, control)
  for _, child in ipairs(control.uiChildren) do shownFrom(child, found) end
  return found
end

local function updatesOf(control)
  local keys = {}
  for key in pairs(control.uiHandlers) do
    if key == FRAME_HANDLER or string.sub(key, 1, #FRAME_HANDLER + 1) == FRAME_HANDLER .. ":" then
      insert(keys, key)
    end
  end
  table.sort(keys)
  return keys
end

local function frame()
  local now = _G.GetFrameTimeSeconds ~= nil and _G.GetFrameTimeSeconds() or 0
  local ran = 0
  for _, control in ipairs(shownFrom(_G.GuiRoot, {})) do
    for _, key in ipairs(updatesOf(control)) do
      local handler = control.uiHandlers[key]
      if handler ~= nil then
        pcall(handler, control, now)
        ran = ran + 1
      end
    end
  end
  return ran
end

local function runLater()
  local ran = 0
  local held = later
  later = {}
  for at, one in ipairs(held) do
    local ok, thrown = pcall(one.callback)
    ran = ran + 1
    if not ok then
      for rest = at + 1, #held do insert(later, held[rest]) end
      error(thrown, 0)
    end
  end
  return ran
end

function _G.__ui_settle(rounds)
  local ran = 0
  local passes = rounds or 8
  for _ = 1, passes do
    ran = ran + runLater() + frame()
    if #later == 0 then break end
  end
  return ran
end

function _G.__ui_waiting()
  return #later
end

function _G.__ui_updates()
  local names = {}
  for namespace in pairs(updates) do insert(names, namespace) end
  return names
end
