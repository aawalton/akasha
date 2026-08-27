-- circular-require.lua
-- Expected to FAIL: ESO strips `require`, so this call surfaces as a
-- "attempt to call a nil value" Lua error at top-level load.

local mod = require("some.circular.module")
return mod
