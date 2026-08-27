-- deep-recursion.lua
-- Expected to FAIL: non-tail-recursive call that overflows Lua 5.1's call
-- stack. Lua 5.1's default maxCcalls is ~200; the trailing `+ 1` prevents
-- tail-call elimination so the stack grows each invocation. Covers the
-- "bundle executes unbounded recursion at load, bricks the VM" failure
-- mode.

local function recur(n)
  return recur(n + 1) + 1
end

recur(0)
