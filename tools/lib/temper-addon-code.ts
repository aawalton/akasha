
import { codeModule } from "./code-import.ts"

const ADDONS_RESOLVE = "temper/shared-build-deploy-addons-resolve--from-instructions/src/index.ts"

const ADDON_GLOBAL_OWNERSHIP =
  "packages/temper/shared/build-deploy/checks/src/addon-global-ownership.ts"

export interface AddonResolveOpts {
  readonly repoRoot: string
}

export interface AddonInfo {
  readonly dir: string
  readonly canonicalName: string
  readonly repoRelDir: string
  readonly workspaceClosure: readonly string[]
}

interface AddonsResolve {
  readonly listAllAddons: (opts?: AddonResolveOpts) => readonly AddonInfo[]
  readonly resolveAddon: (
    name: string,
    opts?: AddonResolveOpts
  ) => { readonly dir: string; readonly canonicalName: string }
}

interface AddonGlobalOwnership {
  readonly collectGlobalWritesFromSource: (
    source: string,
    filePath: string
  ) => readonly string[]
}

export function addonsResolve(root?: string): Promise<AddonsResolve> {
  return codeModule<AddonsResolve>(ADDONS_RESOLVE, root)
}

export function addonGlobalOwnership(root?: string): Promise<AddonGlobalOwnership> {
  return codeModule<AddonGlobalOwnership>(ADDON_GLOBAL_OWNERSHIP, root)
}
