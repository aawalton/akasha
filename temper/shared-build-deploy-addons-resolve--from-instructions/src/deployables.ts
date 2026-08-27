import { type AddonInfo, listAllAddons, type ResolveOpts } from "./index"

function isRoster(x: readonly AddonInfo[] | ResolveOpts | undefined): x is readonly AddonInfo[] {
  return Array.isArray(x)
}

export interface DeployableInfo {
  readonly name: string
  readonly workspaceClosure: readonly string[]
}

export function listDeployables(
  rosterOrOpts?: readonly AddonInfo[] | ResolveOpts
): readonly DeployableInfo[] {
  const roster = isRoster(rosterOrOpts) ? rosterOrOpts : listAllAddons(rosterOrOpts)
  return roster
    .map((a) => ({ name: a.canonicalName, workspaceClosure: a.workspaceClosure }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
