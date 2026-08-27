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

Every fixture here is hand-authored and checked in. None is a captured build artifact, and none is regenerated.

Two of them stood as captured `TemperInventory` bundles, 1.9 MB and 1.0 MB, until they were replaced by `lualib-emission.lua` and `source-map-traceback.lua`, which make the same two claims in under a kilobyte. What a capture proved and these do not is that real TSTL output still emits what the allow-set expects: if TSTL changes its emission, nothing here notices.
