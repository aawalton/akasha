// The body lives in akasha now, as `@akasha/pages-system/code-root`.
//
// This file remains only because files under `infra/cluster-checks/` reach it by relative
// path, and that folder was out of bounds for the move that landed the module. Repoint
// those and this file goes.
export { codeRoot } from "@akasha/pages-system/code-root"
