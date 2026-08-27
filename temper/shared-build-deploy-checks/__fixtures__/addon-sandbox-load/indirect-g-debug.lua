-- indirect-g-debug.lua
-- Expected to FAIL: reaches `debug` via `_G['debug']` indirection. The
-- static scanner (addon-sandbox-safety) misses this because its regex
-- matches `\bdebug\.` not `_G['debug']`. The runtime gate catches it
-- because `_G['debug']` resolves to nil (debug is structurally absent),
-- so the subsequent `.getinfo(1)` index raises.

local info = _G["debug"].getinfo(1).short_src
return info
