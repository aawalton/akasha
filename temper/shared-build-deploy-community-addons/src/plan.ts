export interface InstalledAddon {
  readonly dir: string
  readonly version: string | undefined
}

export interface CatalogEntry {
  readonly uid: string
  readonly name: string
  readonly version: string
  readonly dirs: readonly string[]
}

export type AddonStatus = "outdated" | "up-to-date" | "deploy-owned" | "unmatched"

export interface PlannedAddon {
  readonly dir: string
  readonly status: AddonStatus
  readonly installedVersion: string | undefined
  readonly latestVersion: string | undefined
  readonly uid: string | undefined
}

export interface UpdatePlan {
  readonly addons: readonly PlannedAddon[]
}

function normalizeVersion(v: string): string {
  return v.trim().replace(/\s+/g, " ")
}

export function versionsMatch(installed: string | undefined, latest: string): boolean {
  if (installed === undefined) return false
  return normalizeVersion(installed) === normalizeVersion(latest)
}

export function buildDirIndex(catalog: readonly CatalogEntry[]): Map<string, CatalogEntry> {
  const index = new Map<string, CatalogEntry>()
  for (const entry of catalog) {
    for (const dir of entry.dirs) {
      if (!index.has(dir)) index.set(dir, entry)
    }
  }
  return index
}

export function findCatalogEntryByName(
  catalog: readonly CatalogEntry[],
  name: string
): CatalogEntry | undefined {
  return catalog.find((entry) => entry.name === name || entry.dirs.includes(name))
}

export function planUpdates(
  installed: readonly InstalledAddon[],
  catalog: readonly CatalogEntry[],
  ownedNames: ReadonlySet<string>
): UpdatePlan {
  const index = buildDirIndex(catalog)
  const addons = installed.map((a): PlannedAddon => {
    if (ownedNames.has(a.dir)) {
      return {
        dir: a.dir,
        status: "deploy-owned",
        installedVersion: a.version,
        latestVersion: undefined,
        uid: undefined,
      }
    }
    const entry = index.get(a.dir)
    if (entry === undefined) {
      return {
        dir: a.dir,
        status: "unmatched",
        installedVersion: a.version,
        latestVersion: undefined,
        uid: undefined,
      }
    }
    return {
      dir: a.dir,
      status: versionsMatch(a.version, entry.version) ? "up-to-date" : "outdated",
      installedVersion: a.version,
      latestVersion: entry.version,
      uid: entry.uid,
    }
  })
  return { addons }
}

export interface SelectOpts {
  readonly force: boolean
  readonly only: readonly string[]
}

export function selectTargets(plan: UpdatePlan, opts: SelectOpts): readonly PlannedAddon[] {
  const onlySet = new Set(opts.only)
  return plan.addons.filter((a) => {
    if (a.uid === undefined) return false
    if (onlySet.size > 0 && !onlySet.has(a.dir)) return false
    if (opts.force) return true
    return a.status === "outdated"
  })
}

export function unknownOnlyDirs(plan: UpdatePlan, only: readonly string[]): readonly string[] {
  const installable = new Set(plan.addons.filter((a) => a.uid !== undefined).map((a) => a.dir))
  return only.filter((d) => !installable.has(d))
}

export function distinctUids(selected: readonly PlannedAddon[]): readonly string[] {
  const seen = new Set<string>()
  const uids: string[] = []
  for (const a of selected) {
    if (a.uid !== undefined && !seen.has(a.uid)) {
      seen.add(a.uid)
      uids.push(a.uid)
    }
  }
  return uids
}
