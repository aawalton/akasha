
export const summary =
  "Copy one addon's manifest, XML, assets and sibling folders into this repository's addon dist tree"

import { existsSync } from "node:fs"
import { copyFile, cp, mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import {
  addonBindingsPathIn,
  BINDINGS_FILE_NAME,
  namedFilePathOrNull,
  namedFilePathsIn,
} from "@akasha/temper-addon-build/addon-metadata-files"
import { addonManifestSchema } from "@akasha/temper-addons-resolve/addon-json"
import { addonManifestPathIn } from "@akasha/temper-addons-resolve/addon-manifest-file"
import { OWNERSHIP_MARKER_FILE } from "@akasha/temper-addons-resolve/folder-ownership"
import {
  readSiblingAddonNames,
  siblingDistDir,
  siblingManifestsIn,
  siblingSourceDir,
} from "@akasha/temper-addons-resolve/sibling-addons"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"
import type { CommandHelp } from "../../../ops/surface.ts"
import temperAddonGenerateLoadOrder from "./generate-load-order.ts"

const ADDONS_REL_ROOT = "temper/addons"

const ESO_RUNTIME_TOKEN = /\$\([^)]*\)/

export const help: CommandHelp = {
  description:
    "Write one addon's load order, then copy every non-Lua file it ships — its `<name>.xml` and `Bindings.xml`, the extra Lua files its manifest names, every directory under `metadata/`, its declared assets and bundle XML, and each sibling addon folder — into that checkout's `temper/addons/dist/`.\n" +
    "\n" +
    "Everything written is build output, untracked, and this is the rule it is made by; it stands here, where no deploy has to carry it. The checkout is taken as an argument rather than derived from this file's own location, so the output lands in the tree it belongs to whichever checkout this runs from.\n" +
    "\n" +
    "An addon's `<name>.xml` is looked for the same way every other name it ships is, and only an addon nothing anywhere holds that name for gets an empty one written, because ESO reads a named file rather than an optional one. `Bindings.xml` is found where the addon's own shape holds it — beside an akasha addon's page, under a game addon's `metadata/` — and an addon page claiming keybinds with no such file refuses the call rather than writing an empty document over them. Every other name the manifest ships is looked for beside the page, then under `metadata/`, and last among the pages beside it, each of which states the name its manifest loads it by; one name meets one document or the call is refused. A declared sibling folder that is not there is refused rather than skipped.",
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
        "The checkout read and written (defaults to $CODE_ROOT, else this repository). The addon resolver this reads is loaded from the main checkout either way.",
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

  const namedXmlPath = await namedFilePathOrNull(addonDir, `${canonicalName}.xml`)
  const namedXml =
    namedXmlPath === null ? "<GuiXml></GuiXml>\n" : await readFile(namedXmlPath, "utf-8")
  await writeFile(join(distDir, `${canonicalName}.xml`), namedXml)

  const bindingsPath = await addonBindingsPathIn(addonDir)
  const bindingsXml =
    bindingsPath === null ? "<Bindings></Bindings>\n" : await readFile(bindingsPath, "utf-8")
  await writeFile(join(distDir, BINDINGS_FILE_NAME), bindingsXml)

  const manifestPath = addonManifestPathIn(addonDir)
  if (manifestPath === null) {
    throw dataError(`${addonDir} holds no addon manifest, so there is nothing to copy metadata for`)
  }
  const config = copyMetadataConfigSchema.parse(JSON.parse(await readFile(manifestPath, "utf-8")))

  const luaPaths = await namedFilePathsIn(addonDir, config.additionalLuaFiles ?? [])
  for (const [filename, sourcePath] of luaPaths) {
    await writeFile(join(distDir, filename), await readFile(sourcePath, "utf-8"))
  }

  const metadataEntries = existsSync(metadataDir)
    ? await readdir(metadataDir, { withFileTypes: true })
    : []
  for (const entry of metadataEntries) {
    if (entry.isDirectory()) {
      await cp(join(metadataDir, entry.name), join(distDir, entry.name), { recursive: true })
    }
  }

  const shipped = [
    ...(config.assets ?? []),
    ...(config.xmlFiles?.beforeBundle ?? []),
    ...(config.xmlFiles?.afterBundle ?? []),
  ].filter((one) => !ESO_RUNTIME_TOKEN.test(one))
  const shippedPaths = await namedFilePathsIn(addonDir, shipped)
  for (const [filename, sourcePath] of shippedPaths) {
    const destPath = join(distDir, filename)
    await mkdir(dirname(destPath), { recursive: true })
    await copyFile(sourcePath, destPath)
  }

  const siblingNames = readSiblingAddonNames(addonDir)
  const siblingManifests = siblingManifestsIn(addonDir)
  for (const siblingName of siblingNames) {
    const sourceDir = siblingSourceDir(addonDir, siblingName)
    const carried = siblingManifests.get(siblingName)
    const siblingDist = siblingDistDir(addonsRoot, siblingName)
    if (existsSync(sourceDir)) {
      await cp(sourceDir, siblingDist, { recursive: true })
    } else if (carried !== undefined) {
      await mkdir(siblingDist, { recursive: true })
      await writeFile(join(siblingDist, `${siblingName}.txt`), carried)
    } else {
      throw dataError(
        `${canonicalName}/addon.json declares sibling addon '${siblingName}' but no page beside it carries that manifest and ${sourceDir} does not exist`
      )
    }
    await copyFile(join(distDir, OWNERSHIP_MARKER_FILE), join(siblingDist, OWNERSHIP_MARKER_FILE))
  }

  process.stdout.write(
    `copied ${canonicalName} metadata from ${addonDir} → ${distDir}, with ${siblingNames.length} sibling addon(s)\n`
  )
}
