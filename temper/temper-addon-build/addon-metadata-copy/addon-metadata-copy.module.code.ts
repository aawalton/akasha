import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { addonManifestSchema } from "@akasha/temper-addons-resolve/addon-json"
import { addonManifestPathIn } from "@akasha/temper-addons-resolve/addon-manifest-file"
import { OWNERSHIP_MARKER_FILE } from "@akasha/temper-addons-resolve/folder-ownership"
import {
  readSiblingAddonNames,
  siblingDistDir,
  siblingManifestsIn,
  siblingSourceDir,
} from "@akasha/temper-addons-resolve/sibling-addons"
import {
  ADDONS_REL_ROOT,
  DIST_UNDER,
  writeLoadOrder,
} from "../addon-load-order/addon-load-order.module.code.ts"
import {
  addonBindingsPathIn,
  BINDINGS_FILE_NAME,
  GAME_METADATA_DIR,
  namedFilePathOrNull,
  namedFilePathsIn,
} from "../addon-metadata-files/addon-metadata-files.module.code.ts"

const EMPTY_MARKUP = "<GuiXml></GuiXml>\n"

const EMPTY_BINDINGS = "<Bindings></Bindings>\n"

const RUNTIME_TOKEN = /\$\([^)]*\)/

const SHIPPED_BY_MANIFEST = addonManifestSchema
  .pick({ additionalLuaFiles: true, assets: true, xmlFiles: true })
  .passthrough()

export type MetadataCopied = {
  readonly distDir: string
  readonly manifestPath: string
  readonly luaCount: number
  readonly namedFiles: number
  readonly metadataFolders: number
  readonly siblings: readonly string[]
}

export async function copyAddonMetadata(
  root: string,
  addonDir: string,
  canonicalName: string
): Promise<MetadataCopied> {
  const addonsRoot = join(root, ADDONS_REL_ROOT)
  const distDir = join(addonsRoot, DIST_UNDER, canonicalName)

  const order = await writeLoadOrder(root, addonDir, canonicalName)

  const namedMarkup = await namedFilePathOrNull(addonDir, `${canonicalName}.xml`)
  writeFileSync(
    join(distDir, `${canonicalName}.xml`),
    namedMarkup === null ? EMPTY_MARKUP : readFileSync(namedMarkup, "utf-8")
  )

  const bindings = await addonBindingsPathIn(addonDir)
  writeFileSync(
    join(distDir, BINDINGS_FILE_NAME),
    bindings === null ? EMPTY_BINDINGS : readFileSync(bindings, "utf-8")
  )

  const manifestPath = addonManifestPathIn(addonDir)
  if (manifestPath === null) {
    throw new Error(
      `copyAddonMetadata: ${addonDir} holds no addon manifest, so what the addon ships is unstated`
    )
  }
  const shipped = SHIPPED_BY_MANIFEST.parse(JSON.parse(readFileSync(manifestPath, "utf-8")))

  const luaPaths = await namedFilePathsIn(addonDir, shipped.additionalLuaFiles ?? [])
  for (const [name, from] of luaPaths) {
    writeFileSync(join(distDir, name), readFileSync(from, "utf-8"))
  }

  const metadataDir = join(addonDir, GAME_METADATA_DIR)
  const folders = existsSync(metadataDir)
    ? readdirSync(metadataDir, { withFileTypes: true }).filter((one) => one.isDirectory())
    : []
  for (const one of folders) {
    cpSync(join(metadataDir, one.name), join(distDir, one.name), { recursive: true })
  }

  const named = [
    ...(shipped.assets ?? []),
    ...(shipped.xmlFiles?.beforeBundle ?? []),
    ...(shipped.xmlFiles?.afterBundle ?? []),
  ].filter((one) => !RUNTIME_TOKEN.test(one))
  const namedPaths = await namedFilePathsIn(addonDir, named)
  for (const [name, from] of namedPaths) {
    const to = join(distDir, name)
    mkdirSync(dirname(to), { recursive: true })
    cpSync(from, to)
  }

  const siblingNames = readSiblingAddonNames(addonDir)
  const carried = siblingManifestsIn(addonDir)
  for (const name of siblingNames) {
    const from = siblingSourceDir(addonDir, name)
    const to = siblingDistDir(addonsRoot, name)
    const stated = carried.get(name)
    if (existsSync(from)) {
      cpSync(from, to, { recursive: true })
    } else if (stated !== undefined) {
      mkdirSync(to, { recursive: true })
      writeFileSync(join(to, `${name}.txt`), stated)
    } else {
      throw new Error(
        `copyAddonMetadata: ${canonicalName} declares the sibling addon "${name}", and neither ${from} nor a manifest beside the page carries it`
      )
    }
    cpSync(join(distDir, OWNERSHIP_MARKER_FILE), join(to, OWNERSHIP_MARKER_FILE))
  }

  return {
    distDir,
    manifestPath: order.manifestPath,
    luaCount: order.luaCount,
    namedFiles: luaPaths.size + namedPaths.size,
    metadataFolders: folders.length,
    siblings: siblingNames,
  }
}
