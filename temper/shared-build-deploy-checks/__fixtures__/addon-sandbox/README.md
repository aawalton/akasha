---
type: local-context
---

# addon-sandbox fixtures

Deterministic Lua-bundle fixtures consumed by `temper/shared-build-deploy-checks/src/addon-banned-symbols.unit.test.ts`. Background in project #7209; the incident motivating the checker is project #7179 (TSTL `sourceMapTraceback:true` emitted a `debug.getinfo(1).short_src` tail call that crashed the ESO Lua 5.1 sandbox at addon-load).

## Files

- `lualib-emission.lua` — hand-authored from the legitimate emissions of a TSTL bundle, notably the guarded `debug.traceback` block inside `getErrorStack`, which uses the only ESO-permitted `debug` member. Proves the checker's manifest-derived allow-set passes them. Must produce zero issues.
- `source-map-traceback.lua` — hand-authored from the tail of a bundle emitted with `sourceMapTraceback:true`. Carries the offending `__TS__SourceMapTraceBack(debug.getinfo(1).short_src, ...)` call as its last line. Must produce a `debug.getinfo` issue on that line.
- `banned-debug-getinfo.lua`, `banned-io.lua`, `banned-os.lua`, `banned-package.lua`, `banned-dofile.lua` — small hand-authored fixtures, one per `BannedFamily` discriminant. `banned-debug-getinfo.lua` and `banned-os.lua` exercise `namespace-member-stripped`; `banned-io.lua` and `banned-package.lua` exercise `namespace-stripped`; `banned-dofile.lua` exercises `global-stripped`. Each must produce at least one issue with the expected family.

## Regeneration

Fixtures are deterministic snapshots — regenerate only when TSTL emission changes or the checker's allowlist drifts from real output. Do not commit to a policy of auto-regenerating on every build.

### clean.lua

```bash
ops temper addon build --all
cp dist/TemperInventory/TemperInventory.lua \
   ../checks/__fixtures__/addon-sandbox/clean.lua
```

### regression-7179.lua

Temporarily flip `sourceMapTraceback: true` in `temper/game-items-addon/tsconfig.json`, rebuild, copy, then **revert the tsconfig before committing** — the flip is a capture-only diagnostic and must never land on main.

```bash
# 1. Add "sourceMapTraceback": true to the tstl block of game/items/addon/tsconfig.json
cd packages/temper/addons
ops temper addon build inventory --build-only
cp dist/TemperInventory/TemperInventory.lua \
   ../checks/__fixtures__/addon-sandbox/regression-7179.lua
# 2. REVERT the tsconfig.json change — git restore ../game/items/addon/tsconfig.json
# 3. Rebuild once more to confirm the clean state matches what ships
ops temper addon build inventory --build-only
```

### banned-*.lua

Hand-authored and checked in. Do not regenerate.
