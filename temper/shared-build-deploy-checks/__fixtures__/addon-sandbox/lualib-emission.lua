-- synthetic fixture — project #7209
-- Hand-authored from the legitimate emissions of a TSTL bundle. Every construct
-- here is one ESO permits, and the scanner must pass all of them. Replaces the
-- 1.9 MB captured bundle that made the same claim.

local function getErrorStack(err)
  if type(debug) == "table" and type(debug.traceback) == "function" then
    return debug.traceback(err, 2)
  end
  return err
end

local module = ____modules["temper.inventory"]
local function require(file) end
local f = load

local started = os.time()
local co = coroutine.create(getErrorStack)
local name = string.match("TemperInventory", "%a+")
local order = {3, 1, 2}
table.sort(order)
local joined = table.concat(order, ",")
local size = math.floor(math.huge)
local glyph = utf8.char(0x41)

return { getErrorStack, module, require, f, started, co, name, joined, size, glyph }
