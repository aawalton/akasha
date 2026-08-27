---
type: local-context
---

# addon-sandbox-load fixtures

Fixtures for `check-addon-sandbox-load` (project #7219). Each fixture is
a Lua bundle exercised via `--file`. `clean-load.lua` must load cleanly;
every other fixture must fail with a distinct error mode.

| Fixture | Expected exit | What it exercises |
| --- | --- | --- |
| `clean-load.lua` | `0` | Top-level `EVENT_MANAGER:RegisterForEvent(... EVENT_ADD_ON_LOADED ...)` and `SLASH_COMMANDS["/..."] = fn` idioms — baseline that the sandbox seed covers real addon-load code. |
| `banned-global-load.lua` | `1` | Calls `load(...)` — a banned global forced to nil by our `_G` metatable. Exercises the banned-global nil-dereference path. (Typo'd ESO API names are an **intentional blind spot** — they auto-vivify as stubs so real addons load cleanly. Strict generated stubs for typo detection are a deferred follow-up.) |
| `circular-require.lua` | `1` | Calls `require(...)` at top level. ESO strips `require`; this crashes on "attempt to call a nil value". |
| `indirect-g-debug.lua` | `1` | `_G['debug'].getinfo(...)` — the runtime-only blind spot the static scanner misses. `debug` is structurally absent from the sandbox `_G`, so the `_G['debug']` lookup resolves to nil and the subsequent index raises. |
| `deep-recursion.lua` | `1` | Unbounded top-level recursion that overflows the Lua call stack. |
| `regression-7179.lua` | `1` | Mirrors the TSTL `sourceMapTraceback` tail that shipped broken in project #7179. Uses `debug.getinfo(...)` exactly as TSTL emitted it. |

Running a single fixture locally:

```bash
bun temper/shared-build-deploy-checks/src/check-addon-sandbox-load.ts --file \
  temper/shared-build-deploy-checks/__fixtures__/addon-sandbox-load/indirect-g-debug.lua
```

Expected output: failure line naming the bundle plus the Lua error text,
followed by a `see project #7219` hint, and exit code `1`.
