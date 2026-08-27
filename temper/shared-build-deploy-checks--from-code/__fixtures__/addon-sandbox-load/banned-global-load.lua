-- banned-global-load.lua
-- Expected to FAIL: calls `load(...)` at top level. ESO strips `load`, so
-- the global resolves to nil under our sandbox `_G` metatable (banned
-- names are forced-nil, not auto-stubbed), and the call raises
-- "attempt to call global 'load' (a nil value)".
--
-- Note: truly typo'd ESO API names are an intentional blind spot —
-- auto-vivification is what lets real addons load under the sandbox.
-- See solution brief for project #7219 — strict generated stubs are a
-- deferred follow-up.

local chunk = load("return 1")
return chunk()
