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
  local held = byEvent[event]
  if held == nil then
    held = {}
    byEvent[event] = held
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

function EventManager:RegisterForUpdate(namespace, everyMs, callback)
  updates[namespace] = { everyMs = everyMs, callback = callback }
  return true
end

function EventManager:UnregisterForUpdate(namespace)
  updates[namespace] = nil
  return true
end

_G.EVENT_MANAGER = EventManager

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
  for _, one in ipairs(held) do
    local ok, thrown = pcall(one.callback, event, ...)
    ran = ran + 1
    if not ok and failed == nil then failed = thrown end
  end
  if failed ~= nil then error(failed, 0) end
  return ran
end

function _G.__ui_settle(rounds)
  local ran = 0
  local passes = rounds or 8
  for _ = 1, passes do
    if #later == 0 then break end
    local held = later
    later = {}
    for _, one in ipairs(held) do
      local ok, thrown = pcall(one.callback)
      ran = ran + 1
      if not ok then error(thrown, 0) end
    end
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
