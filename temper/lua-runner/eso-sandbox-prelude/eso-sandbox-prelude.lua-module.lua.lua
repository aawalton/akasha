local _loadstring = loadstring
local _setfenv = setfenv
local _error = error
local _setmetatable = setmetatable
local _rawset = rawset
local _rawget = rawget
local _pairs = pairs

local banned = {}
if __eso_banned ~= nil then
  for _, name in _pairs(__eso_banned) do
    _G[name] = nil
    banned[name] = true
  end
end

local function concat_operand(v)
  local tv = type(v)
  if tv == "string" or tv == "number" then return v end
  return ""
end

local function num_operand(v)
  if type(v) == "number" then return v end
  return 0
end

local function make_stub()
  local t
  t = _setmetatable({}, {
    __index = function(_, _) return make_stub() end,
    __newindex = function(_, _, _) end,
    __call = function(_, ...) return make_stub() end,
    __tostring = function(_) return "" end,
    __concat = function(a, b) return concat_operand(a) .. concat_operand(b) end,
    __add = function(a, b) return num_operand(a) + num_operand(b) end,
    __sub = function(a, b) return num_operand(a) - num_operand(b) end,
    __mul = function(a, b) return num_operand(a) * num_operand(b) end,
    __div = function(a, b) return num_operand(a) / num_operand(b) end,
    __mod = function(a, b) return num_operand(a) % num_operand(b) end,
    __pow = function(a, b) return num_operand(a) ^ num_operand(b) end,
    __unm = function(_) return 0 end,
  })
  return t
end

local string_apis = { zo_strformat = true, GetCVar = true, GetString = true }
local function str_fn() return "" end

local numeric_fn_apis = { GetNumClasses = true, GetNumEmotes = true }
local function num_fn() return 0 end

local function pair_stub_fn() return make_stub(), make_stub() end
local multi_apis = { ZO_ChatSystem_GetEventCategoryMappings = pair_stub_fn }

local numeric_constants = {
  ITEM_FUNCTIONAL_QUALITY_MIN_VALUE = 1,
  ITEM_FUNCTIONAL_QUALITY_MAX_VALUE = 5,
  LINK_STYLE_DEFAULT = 0,
  LINK_STYLE_BRACKETS = 1,
  GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN = 1,
  GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END = 7,
}

local function make_env()
  return _setmetatable({}, {
    __index = function(_, key)
      if banned[key] then return nil end
      if string_apis[key] then return str_fn end
      if numeric_fn_apis[key] then return num_fn end
      if multi_apis[key] then return multi_apis[key] end
      if numeric_constants[key] ~= nil then return numeric_constants[key] end
      if key == "_G" then return _G end
      local real = _rawget(_G, key)
      if real ~= nil then return real end
      return make_stub()
    end,
    __newindex = function(t, k, v) _rawset(t, k, v) end,
  })
end

__eso_env = make_env()
__eso_make_stub = make_stub

function __eso_seed(name, value)
  _rawset(__eso_env, name, value)
end

function __eso_run(src, name)
  local chunk, err = _loadstring(src, name)
  if not chunk then _error(err, 0) end
  _setfenv(chunk, __eso_env)
  return chunk()
end
