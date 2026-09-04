export const SERIALIZE_TS_LUA = `
local function fmt_number(n)
  if n ~= n or n == math.huge or n == -math.huge then
    error("non-finite number in data: " .. tostring(n))
  end
  if n == math.floor(n) and math.abs(n) < 2^53 then
    return string.format("%d", n)
  end
  local s = string.format("%.14g", n)
  if tonumber(s) == n then return s end
  return string.format("%.17g", n)
end

local function fmt_string(s)
  local out = s:gsub("\\\\", "\\\\\\\\"):gsub('"', '\\\\"'):gsub("\\n", "\\\\n"):gsub("\\r", "\\\\r"):gsub("\\t", "\\\\t")
  return '"' .. out .. '"'
end

local function sorted_keys(t)
  local nums, strs = {}, {}
  for k in pairs(t) do
    if type(k) == "number" then
      nums[#nums + 1] = k
    elseif type(k) == "string" then
      strs[#strs + 1] = k
    else
      error("unsupported key type: " .. type(k))
    end
  end
  table.sort(nums)
  table.sort(strs)
  local out = {}
  for _, k in ipairs(nums) do out[#out + 1] = k end
  for _, k in ipairs(strs) do out[#out + 1] = k end
  return out
end

local TS_IDENT = "^[A-Za-z_][A-Za-z0-9_]*$"

function serialize_ts(v, indent)
  local t = type(v)
  if t == "number" then return fmt_number(v) end
  if t == "string" then return fmt_string(v) end
  if t == "boolean" then return tostring(v) end
  if t ~= "table" then error("unsupported value type: " .. t) end
  local pad = string.rep("  ", indent)
  local pad2 = string.rep("  ", indent + 1)
  local keys = sorted_keys(v)
  if #keys == 0 then return "{}" end
  local parts = {}
  for _, k in ipairs(keys) do
    local key
    if type(k) == "number" then
      key = "[" .. fmt_number(k) .. "]"
    elseif k:find(TS_IDENT) then
      key = k
    else
      key = fmt_string(k)
    end
    parts[#parts + 1] = pad2 .. key .. ": " .. serialize_ts(v[k], indent + 1)
  end
  return "{\\n" .. table.concat(parts, ",\\n") .. ",\\n" .. pad .. "}"
end

function write_file(path, content)
  local f, err = io.open(path, "w")
  if f == nil then error("cannot open " .. path .. ": " .. tostring(err)) end
  f:write(content)
  f:close()
end
`
