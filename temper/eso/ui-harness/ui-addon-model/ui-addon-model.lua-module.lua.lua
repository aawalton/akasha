local _G = _G
local setmetatable = setmetatable
local type = type
local match = string.match

local function none() return 0 end
local function passedOver() end

local AddOnManager = setmetatable({}, {
  __index = function(_, key)
    if type(key) ~= "string" then return nil end
    if match(key, "^Get%u") ~= nil then return none end
    return passedOver
  end,
})

function AddOnManager:AreAddOnsEnabled() return true end

function _G.GetAddOnManager() return AddOnManager end
