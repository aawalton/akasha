import {
  type AddonInfo,
  listAllAddons,
  type ResolveOpts,
  resolveAddon,
} from "@temper/shared-build-deploy-addons-resolve"
import { collectGlobalWritesFromSource } from "@temper/shared-build-deploy-checks/addon-global-ownership"

export type { AddonInfo }

export type AddonResolveOpts = ResolveOpts

interface AddonsResolve {
  readonly listAllAddons: typeof listAllAddons
  readonly resolveAddon: typeof resolveAddon
}

interface AddonGlobalOwnership {
  readonly collectGlobalWritesFromSource: typeof collectGlobalWritesFromSource
}

export function addonsResolve(_root?: string): Promise<AddonsResolve> {
  return Promise.resolve({ listAllAddons, resolveAddon })
}

export function addonGlobalOwnership(_root?: string): Promise<AddonGlobalOwnership> {
  return Promise.resolve({ collectGlobalWritesFromSource })
}
