import {
  type AddonInfo,
  listAllAddons,
  type ResolveOpts,
  resolveAddon,
} from "@temper/shared-build-deploy-addons-resolve"

export type { AddonInfo }

export type AddonResolveOpts = ResolveOpts

type AddonGlobalOwnershipModule = typeof import("@temper/shared-build-deploy-checks/addon-global-ownership")

interface AddonsResolve {
  readonly listAllAddons: typeof listAllAddons
  readonly resolveAddon: typeof resolveAddon
}

interface AddonGlobalOwnership {
  readonly collectGlobalWritesFromSource: AddonGlobalOwnershipModule["collectGlobalWritesFromSource"]
}

export function addonsResolve(): Promise<AddonsResolve> {
  return Promise.resolve({ listAllAddons, resolveAddon })
}

// Ownership parses TypeScript with the compiler itself, and loading it costs
// every `temper addon` invocation about 110ms. Only `temper addon
// global-name-dependents` reads ownership, so the import stays dynamic.
export function addonGlobalOwnership(): Promise<AddonGlobalOwnership> {
  return import("@temper/shared-build-deploy-checks/addon-global-ownership")
}
