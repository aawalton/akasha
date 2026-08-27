---
type: local-context
---

# addon-sandbox fixtures

Deterministic Lua-bundle fixtures consumed by `temper/shared-build-deploy-checks/src/addon-banned-symbols.unit.test.ts`. Background in project #7209; the incident motivating the checker is project #7179 (TSTL `sourceMapTraceback:true` emitted a `debug.getinfo(1).short_src` tail call that crashed the ESO Lua 5.1 sandbox at addon-load).

## Files

- `clean.lua` — real TSTL-emitted `TemperInventory` bundle in the post-#7179 hotfix state (`sourceMapTraceback` disabled). ~13k lines. Proves the checker's manifest-derived allow-set passes legitimate lualib emissions (notably the guarded `debug.traceback` block inside `getErrorStack`, which uses the only ESO-permitted `debug` member). Must produce zero issues.
- `regression-7179.lua` — real TSTL-emitted `TemperInventory` bundle captured with `sourceMapTraceback:true` re-enabled. Contains the offending `__TS__SourceMapTraceBack(debug.getinfo(1).short_src, ...)` tail call near EOF. Must produce at least one `debug.getinfo` issue past line ~13000.
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
