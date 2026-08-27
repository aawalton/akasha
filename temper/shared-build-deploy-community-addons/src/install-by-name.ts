import { mkdir } from "node:fs/promises"
import { InputError, OperationalError } from "@shared/errors-core/exit"
import { fetchCatalog, fetchFileDetails } from "./catalog"
import { downloadAndInstall } from "./install"
import { readInstalledAddons } from "./installed"
import { findCatalogEntryByName } from "./plan"

export interface InstallByNameOpts {
  readonly addonsPath: string
  readonly force: boolean
  readonly ownedNames: ReadonlySet<string>
}

export type InstallByNameOutcome =
  | { readonly action: "installed"; readonly dirs: readonly string[]; readonly version: string }
  | { readonly action: "skipped"; readonly dirs: readonly string[] }

async function presentDirs(addonsPath: string): Promise<ReadonlySet<string>> {
  try {
    const installed = await readInstalledAddons(addonsPath)
    return new Set(installed.map((a) => a.dir))
  } catch {
    return new Set()
  }
}

export async function installNamedAddon(
  name: string,
  opts: InstallByNameOpts
): Promise<InstallByNameOutcome> {
  const catalog = await fetchCatalog()
  const entry = findCatalogEntryByName(catalog, name)
  if (entry === undefined) {
    throw new InputError(
      `no ESOUI catalog entry matches ${JSON.stringify(name)} (match on UIName or install folder)`
    )
  }
  if (entry.dirs.length === 0) {
    throw new OperationalError(
      `ESOUI entry ${JSON.stringify(entry.name)} declares no install folder (UIDir); cannot install`
    )
  }

  const collisions = entry.dirs.filter((dir) => opts.ownedNames.has(dir))
  if (collisions.length > 0) {
    throw new InputError(
      `ESOUI entry ${JSON.stringify(entry.name)} installs ${collisions.join(", ")}, which the deploy pipeline owns. ` +
        "Installing it would replace Temper's own port with an upstream copy, and the next deploy would replace it back. " +
        "Refusing. To install it anyway, take the folder out of the deploy pipeline's ownership first; --force is consent to reinstall a third-party addon, never to drop an upstream archive over a folder the pipeline owns."
    )
  }

  if (!opts.force) {
    const present = await presentDirs(opts.addonsPath)
    if (entry.dirs.every((dir) => present.has(dir))) {
      return { action: "skipped", dirs: entry.dirs }
    }
  }

  await mkdir(opts.addonsPath, { recursive: true })
  const details = await fetchFileDetails(entry.uid)
  const result = await downloadAndInstall(details, entry.dirs, opts.addonsPath)
  if (result.installedDirs.length === 0) {
    throw new OperationalError(
      `downloaded ESOUI file ${entry.uid} contained none of the expected folder(s): ${entry.dirs.join(", ")}`
    )
  }
  return { action: "installed", dirs: result.installedDirs, version: result.version }
}
