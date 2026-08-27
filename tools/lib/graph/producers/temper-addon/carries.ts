import { posix } from "node:path"
import { z } from "zod"
import { readRepoFile } from "../../repos.ts"
import type { BuildContext } from "../../types.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { repoFiles } from "../lib/repo-files.ts"

const METADATA_DIR = "metadata"

const SIBLINGS_DIR = "siblings"

const MANIFEST = "addon.json"

const BINDINGS_FILE = "Bindings.xml"

const SAFE_FOLDER_NAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

const ManifestSchema = z
  .object({
    name: z.string(),
    assets: z.array(z.string()).optional(),
    additionalLuaFiles: z.array(z.string()).optional(),
    siblingAddons: z.array(z.string()).optional(),
    xmlFiles: z
      .object({
        beforeBundle: z.array(z.string()).optional(),
        afterBundle: z.array(z.string()).optional(),
      })
      .optional(),
  })
  .passthrough()

export type AddonCarryKind =
  | "metadata-directory"
  | "named-asset"
  | "additional-lua"
  | "bindings"
  | "bundle-xml"
  | "addon-xml"
  | "sibling-addon"

export type AddonCarry = {
  readonly addon: string
  readonly path: string
  readonly kind: AddonCarryKind
  readonly carrier: string
}

const filesUnder = (paths: readonly string[], dir: string): readonly string[] => {
  const under = `${dir}/`
  return paths.filter((path) => path.startsWith(under))
}

export const metadataDirectoryCarries = (
  addon: string,
  addonPath: string,
  paths: readonly string[]
): readonly AddonCarry[] => {
  const under = `${addonPath}/${METADATA_DIR}/`
  const held: AddonCarry[] = []
  for (const path of paths) {
    if (!path.startsWith(under)) continue
    const rest = path.slice(under.length).split("/")
    if (rest.length < 2) continue
    const first = rest[0]
    if (first === undefined) continue
    held.push({ addon, path, kind: "metadata-directory", carrier: `${under}${first}` })
  }
  return held
}

export const siblingAddonCarries = (
  addon: string,
  addonPath: string,
  names: readonly string[],
  paths: readonly string[]
): readonly AddonCarry[] => {
  const held: AddonCarry[] = []
  for (const name of names) {
    if (!SAFE_FOLDER_NAME.test(name) || name === "." || name === "..") continue
    const source = `${addonPath}/${SIBLINGS_DIR}/${name}`
    for (const path of filesUnder(paths, source)) {
      held.push({ addon, path, kind: "sibling-addon", carrier: source })
    }
  }
  return held
}

export const manifestCarries = (
  ctx: BuildContext,
  addon: string,
  addonPath: string,
  paths: readonly string[],
  standing: ReadonlySet<string>
): readonly AddonCarry[] => {
  const body = readRepoFile(ctx, CODE_REPO, `${addonPath}/${MANIFEST}`)
  if (body === null) return []
  const parsed = ManifestSchema.safeParse(JSON.parse(body))
  if (!parsed.success) return []
  const metadata = `${addonPath}/${METADATA_DIR}`
  const held: AddonCarry[] = []
  const take = (path: string, kind: AddonCarryKind, carrier: string): undefined => {
    if (!standing.has(path)) return undefined
    held.push({ addon, path, kind, carrier })
    return undefined
  }
  take(`${metadata}/${parsed.data.name}.xml`, "addon-xml", `${parsed.data.name}.xml`)
  take(`${metadata}/${BINDINGS_FILE}`, "bindings", BINDINGS_FILE)
  for (const asset of parsed.data.assets ?? []) {
    take(posix.normalize(`${metadata}/${asset}`), "named-asset", asset)
  }
  const bundleXml = [
    ...(parsed.data.xmlFiles?.beforeBundle ?? []),
    ...(parsed.data.xmlFiles?.afterBundle ?? []),
  ]
  for (const xml of bundleXml) {
    take(posix.normalize(`${metadata}/${xml}`), "bundle-xml", xml)
  }
  for (const lua of parsed.data.additionalLuaFiles ?? []) {
    take(posix.normalize(`${addonPath}/${lua}`), "additional-lua", lua)
  }
  for (const one of siblingAddonCarries(addon, addonPath, parsed.data.siblingAddons ?? [], paths)) {
    held.push(one)
  }
  return held
}

export const discoverAddonCarries = (
  ctx: BuildContext,
  addons: readonly { readonly name: string; readonly path: string }[]
): readonly AddonCarry[] => {
  const paths = repoFiles(ctx, CODE_REPO)
  const standing = new Set(paths)
  const held: AddonCarry[] = []
  for (const addon of addons) {
    for (const one of metadataDirectoryCarries(addon.name, addon.path, paths)) held.push(one)
    for (const one of manifestCarries(ctx, addon.name, addon.path, paths, standing)) held.push(one)
  }
  return held
}
