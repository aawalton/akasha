export {
  canonicalize,
  isInside,
  normalizeAbsolute,
  outOfBounds,
} from "../../repo/path/path.ts"
export type { Repo as Addressable } from "../../page/document/types.ts"
export type { Roots } from "../../page/page.ts"
export {
  AKASHA as SIBLING,
  ADDRESSABLE_NAMED,
  isAddressable,
  isDirty,
  isVendored,
  locate,
  ownRepoRoot,
  QUARANTINE_ROOT,
  repoPagePath,
  REPOS,
  REPOS as ADDRESSABLE,
  resolveRoots,
  rootEnvName,
  targetRepo,
  targetRoot,
  type Touched,
  VENDOR_ROOT,
} from "../../repo/roots/roots.ts"
