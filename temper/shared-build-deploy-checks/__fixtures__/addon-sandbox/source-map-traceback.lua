-- synthetic fixture — project #7209
-- Hand-authored from the tail of a TSTL bundle emitted with
-- `sourceMapTraceback: true`, the emission that crashed the ESO Lua 5.1 sandbox
-- at addon-load in project #7179. Replaces the 1.0 MB captured bundle that made
-- the same claim. The offending call is this file's last line, so a scanner
-- that stops short of the end fails on it.
local ____lualib = require("lualib_bundle")
local __TS__SourceMapTraceBack = ____lualib.__TS__SourceMapTraceBack
__TS__SourceMapTraceBack(debug.getinfo(1).short_src, {["801"] = {line = 2, file = "constants.ts"}})
