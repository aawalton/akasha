-- regression-7179.lua
-- Expected to FAIL: mirrors the TSTL sourceMapTraceback tail that shipped
-- in project #7179. The bundle tail calls __TS__SourceMapTraceBack which
-- internally indexes `debug.getinfo(1).short_src`. ESO strips `debug`, so
-- the call crashes at addon-load. We reproduce the same pattern here.

local function __TS__SourceMapTraceBack(fileName, sourceMap)
  -- This is where the #7179 incident crashed: debug is nil in ESO.
  local info = debug.getinfo(1, "S")
  return info.short_src .. "::" .. fileName
end

__TS__SourceMapTraceBack("MyAddon.lua", { [1] = 1 })
