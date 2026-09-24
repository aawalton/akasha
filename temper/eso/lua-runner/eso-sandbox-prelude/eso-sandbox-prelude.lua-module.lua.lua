local _loadstring = loadstring
local _setfenv = setfenv
local _error = error
local _setmetatable = setmetatable
local _rawset = rawset
local _rawget = rawget
local _pairs = pairs
local _sethook = debug and debug.sethook
local _clock = os and os.clock
local _compiling = jit and jit.off

__eso_stubbed = {}

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
    __len = function(_) return 0 end,
    __lt = function(a, b) return num_operand(a) < num_operand(b) end,
    __le = function(a, b) return num_operand(a) <= num_operand(b) end,
  })
  return t
end

local string_apis = { zo_strformat = true, GetCVar = true, GetString = true }
local function str_fn() return "" end

local numeric_fn_apis = { GetNumClasses = true, GetNumEmotes = true }
local function num_fn() return 0 end

local function pair_stub_fn() return make_stub(), make_stub() end
local multi_apis = { ZO_ChatSystem_GetEventCategoryMappings = pair_stub_fn }

function internalassert(condition) return condition end

function istable(value) return type(value) == "table" end

local STEPPING = "^GetNext%w+Iter$"
local function ended_fn() return nil end

local numeric_constants = {
  ITEM_FUNCTIONAL_QUALITY_MIN_VALUE = 1,
  ITEM_FUNCTIONAL_QUALITY_MAX_VALUE = 5,
  LINK_STYLE_DEFAULT = 0,
  LINK_STYLE_BRACKETS = 1,
  GUILD_HISTORY_EVENT_CATEGORY_ITERATION_BEGIN = 1,
  GUILD_HISTORY_EVENT_CATEGORY_ITERATION_END = 7,
}

local stubs = {}

local unstubbed = {}

function __eso_leave_unstubbed(shape)
  unstubbed[#unstubbed + 1] = shape
end

local unstubbed_names = {}

function __eso_leave_names_unstubbed(given)
  for _, name in _pairs(given) do unstubbed_names[name] = true end
end

local function left_unstubbed(key)
  if type(key) ~= "string" then return false end
  if unstubbed_names[key] then return true end
  for _, shape in _pairs(unstubbed) do
    if key:match(shape) then return true end
  end
  return false
end

local function make_env()
  return _setmetatable({}, {
    __index = function(t, key)
      if banned[key] then return nil end
      if key == "_G" then return t end
      local real = _rawget(_G, key)
      if real ~= nil then return real end
      if string_apis[key] then return str_fn end
      if numeric_fn_apis[key] then return num_fn end
      if multi_apis[key] then return multi_apis[key] end
      if numeric_constants[key] ~= nil then return numeric_constants[key] end
      if type(key) == "string" and key:match(STEPPING) then return ended_fn end
      if left_unstubbed(key) then return nil end
      local held = stubs[key]
      if held ~= nil then return held end
      __eso_stubbed[key] = (__eso_stubbed[key] or 0) + 1
      local made = make_stub()
      stubs[key] = made
      return made
    end,
    __newindex = function(t, k, v) _rawset(t, k, v) end,
  })
end

__eso_env = make_env()
__eso_make_stub = make_stub

local _select = select
local _unpack = unpack

local function packed(...) return { n = _select("#", ...), ... } end

function SecurePostHook(target, name, hook)
  if type(target) == "string" then target, name, hook = __eso_env, target, name end
  local original = target[name]
  target[name] = function(...)
    local answered = packed()
    if original ~= nil then answered = packed(original(...)) end
    hook(...)
    return _unpack(answered, 1, answered.n)
  end
end

function CallSecureProtected(name, ...)
  local called = __eso_env[name]
  if type(called) ~= "function" then return false end
  return true, called(...)
end

local _next = next

function InsecureNext(tbl, lastKey)
  if tbl ~= __eso_env then return _next(tbl, lastKey) end
  if lastKey ~= nil and _rawget(__eso_env, lastKey) == nil then
    return _next(_G, lastKey)
  end
  local key, held = _next(__eso_env, lastKey)
  if key ~= nil then return key, held end
  return _next(_G, nil)
end

function __eso_seed(name, value)
  _rawset(__eso_env, name, value)
end

function __eso_constants(given)
  local count = 0
  for name, value in _pairs(given) do
    if not banned[name] then
      _rawset(_G, name, value)
      count = count + 1
    end
  end
  return count
end

function __eso_defaults(given)
  local count = 0
  for name, made in _pairs(given) do
    if not banned[name] and _rawget(_G, name) == nil then
      _rawset(_G, name, made)
      count = count + 1
    end
  end
  return count
end

__eso_seconds = 20

function __eso_deadline(seconds)
  local was = __eso_seconds
  __eso_seconds = seconds
  return was
end

local function finished(...)
  _sethook()
  return ...
end

local function stopAfter(seconds)
  if _compiling ~= nil then _compiling() end
  local deadline = _clock() + seconds
  _sethook(function()
    if _clock() > deadline then
      _sethook()
      _error("this ran " .. seconds .. " seconds without finishing, so it was stopped", 0)
    end
  end, "", 200000)
end

function __eso_run(src, name)
  local chunk, err = _loadstring(src, name)
  if not chunk then _error(err, 0) end
  _setfenv(chunk, __eso_env)
  if _sethook == nil or _clock == nil then return chunk() end
  stopAfter(__eso_seconds)
  return finished(chunk())
end
