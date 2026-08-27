export interface LiveResource {
  readonly kind: string
  readonly namespace: string
  readonly name: string
  readonly managedBy: string | null
}

export interface DecideOrphansOptions {
  readonly managedByValues: ReadonlySet<string>
  readonly allowlist: ReadonlySet<string>
}

export const ORPHAN_MANAGED_BY: ReadonlySet<string> = new Set(["deploy-script", "bootstrap"])

export const ORPHAN_ALLOWLIST: ReadonlySet<string> = new Set<string>()

export function resourceKey(kind: string, namespace: string, name: string): string {
  return `${kind}/${namespace}/${name}`
}

export function decideOrphans(
  sourceKeys: ReadonlySet<string>,
  live: readonly LiveResource[],
  opts: DecideOrphansOptions
): readonly LiveResource[] {
  return live.filter((one) => {
    if (one.managedBy === null || !opts.managedByValues.has(one.managedBy)) return false
    const key = resourceKey(one.kind, one.namespace, one.name)
    return !sourceKeys.has(key) && !opts.allowlist.has(key)
  })
}
