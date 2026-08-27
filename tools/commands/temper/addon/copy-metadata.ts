
export const summary =
  "Copy one addon's manifest, XML, assets and sibling folders into the code repo's addon dist tree"

import { existsSync } from "node:fs"
import { copyFile, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import { addonManifestSchema } from "@temper/shared-build-deploy-addons-resolve/manifest"
import { OWNERSHIP_MARKER_FILE } from "@temper/shared-build-deploy-addons-resolve/folder-ownership"
import {
  readSiblingAddonNames,
  siblingDistDir,
  siblingSourceDir,
} from "@temper/shared-build-deploy-addons-resolve/sibling-addons"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"
import type { CommandHelp } from "../../../ops/surface.ts"
import temperAddonGenerateLoadOrder from "./generate-load-order.ts"

const ADDONS_REL_ROOT = "packages/temper/addons"

const ESO_RUNTIME_TOKEN = /\$\([^)]*\)/

export const help: CommandHelp = {
  description:
    "Write one addon's load order, then copy every non-Lua file it ships — its `<name>.xml` and `Bindings.xml`, the extra Lua files its manifest names, every directory under `metadata/`, its declared assets and bundle XML, and each sibling addon folder — into that checkout's `packages/temper/addons/dist/`.\n" +
    "\n" +
    "Everything written is build output of the code repo, untracked there, and this is the rule it is made by; it stands here, where no deploy has to carry it. The checkout is taken as an argument rather than derived from this file's own location, so the output lands in the tree it belongs to whichever checkout this runs from.\n" +
    "\n" +
    "An addon whose `<name>.xml` or `Bindings.xml` is absent gets an empty one written, because ESO reads a named file rather than an optional one. A declared sibling folder that is not there is refused rather than skipped.",
  flags: [
    {
      name: "--addon",
      argLabel: "<name>",
      valueShape: "token",
      description: "The addon to copy metadata for. Defaults to TemperCharacters.",
    },
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The code checkout read and written. The addon resolver this reads is loaded from the main checkout either way.",
    },
  ],
  examples: ["ops temper addon copy-metadata --addon TemperCharacters"],
}

const copyMetadataConfigSchema = addonManifestSchema
  .pick({ additionalLuaFiles: true, assets: true, xmlFiles: true })
  .passthrough()

export default async function temperAddonCopyMetadata(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const addonName = parsed.string("--addon") ?? "TemperCharacters"
  const codeCheckout = resolve(parsed.string("--code-root") ?? codeRoot())

  const { resolveAddon } = await addonsResolve()
  const { dir: addonDir, canonicalName } = resolveAddon(addonName, { repoRoot: codeCheckout })

  const addonsRoot = join(codeCheckout, ADDONS_REL_ROOT)
  const metadataDir = join(addonDir, "metadata")
  const distDir = join(addonsRoot, "dist", canonicalName)

  await temperAddonGenerateLoadOrder(["--addon", canonicalName, "--code-root", codeCheckout])

  try {
    const xmlContent = await readFile(join(metadataDir, `${canonicalName}.xml`), "utf-8")
    await writeFile(join(distDir, `${canonicalName}.xml`), xmlContent)
  } catch {
    await writeFile(join(distDir, `${canonicalName}.xml`), "<GuiXml></GuiXml>\n")
  }

  try {
    const bindingsContent = await readFile(join(metadataDir, "Bindings.xml"), "utf-8")
    await writeFile(join(distDir, "Bindings.xml"), bindingsContent)
  } catch {
    await writeFile(join(distDir, "Bindings.xml"), "<Bindings></Bindings>\n")
  }

  const config = copyMetadataConfigSchema.parse(
    JSON.parse(await readFile(join(addonDir, "addon.json"), "utf-8"))
  )

  for (const filename of config.additionalLuaFiles ?? []) {
    const content = await readFile(join(addonDir, filename), "utf-8")
    await writeFile(join(distDir, filename), content)
  }

  const metadataEntries = await readdir(metadataDir, { withFileTypes: true }).catch(() => [])
  for (const entry of metadataEntries) {
    if (entry.isDirectory()) {
      await cp(join(metadataDir, entry.name), join(distDir, entry.name), { recursive: true })
    }
  }

  for (const assetPath of config.assets ?? []) {
    const destPath = join(distDir, assetPath)
    await mkdir(dirname(destPath), { recursive: true })
    await copyFile(join(metadataDir, assetPath), destPath)
  }

  const bundleXml = [
    ...(config.xmlFiles?.beforeBundle ?? []),
    ...(config.xmlFiles?.afterBundle ?? []),
  ]
  for (const xmlPath of bundleXml) {
    if (ESO_RUNTIME_TOKEN.test(xmlPath)) continue
    const destPath = join(distDir, xmlPath)
    await mkdir(dirname(destPath), { recursive: true })
    await copyFile(join(metadataDir, xmlPath), destPath)
  }

  const siblingNames = readSiblingAddonNames(addonDir)
  for (const siblingName of siblingNames) {
    const sourceDir = siblingSourceDir(addonDir, siblingName)
    if (!existsSync(sourceDir)) {
      throw dataError(
        `${canonicalName}/addon.json declares sibling addon '${siblingName}' but ${sourceDir} does not exist`
      )
    }
    const siblingDist = siblingDistDir(addonsRoot, siblingName)
    await cp(sourceDir, siblingDist, { recursive: true })
    await copyFile(join(distDir, OWNERSHIP_MARKER_FILE), join(siblingDist, OWNERSHIP_MARKER_FILE))
  }

  process.stdout.write(
    `copied ${canonicalName} metadata from ${addonDir} → ${distDir}, with ${siblingNames.length} sibling addon(s)\n`
  )
}
