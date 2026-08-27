-- clean-load.lua
-- Baseline: a minimal bundle that exercises the top-level ESO-load idiom
-- and should load without error under addon-sandbox-load.

local MyAddon = {}
MyAddon.name = "MyAddon"

local function onLoaded(event, addonName)
  if addonName ~= MyAddon.name then return end
  d("MyAddon loaded")
end

EVENT_MANAGER:RegisterForEvent(MyAddon.name, EVENT_ADD_ON_LOADED, onLoaded)

SLASH_COMMANDS["/myaddon"] = function() d("hi") end

return MyAddon
