
import * as addonsResolveModule from "@temper/shared-build-deploy-addons-resolve"

export type {
  AddonInfo,
  ResolveOpts as AddonResolveOpts,
} from "@temper/shared-build-deploy-addons-resolve"

export function addonsResolve(): Promise<typeof addonsResolveModule> {
  return Promise.resolve(addonsResolveModule)
}

// Ownership parses TypeScript with the compiler itself, the heaviest thing any
// of these commands reaches for. Only `temper addon global-name-dependents`
// asks for it, so it stays behind a dynamic import rather than loading
// `typescript` on every `temper addon` invocation.
export function addonGlobalOwnership(): Promise<
  typeof import("@temper/shared-build-deploy-checks/addon-global-ownership")
> {
  return import("@temper/shared-build-deploy-checks/addon-global-ownership")
}
