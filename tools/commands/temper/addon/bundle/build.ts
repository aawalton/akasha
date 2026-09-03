export const summary =
  "Pack every distributable addon's dist folder into the temper-addons.zip archive the bundle image carries"

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, relative, resolve, sep } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { addonManifestSchema } from "@akasha/temper-addons-resolve/addon-json"
import { addonManifestPathIn } from "@akasha/temper-addons-resolve/addon-manifest-file"
import { listAllAddons } from "@akasha/temper-addons-resolve/addon-roster"
import {
  type AddonDependencies,
  resolveDistributableSet,
} from "@akasha/temper-addons-resolve/distributable-set"
import { readSiblingAddonNames, siblingDistDir } from "@akasha/temper-addons-resolve/sibling-addons"
import { type Zippable, zipSync } from "fflate"
import { dataError, inputError } from "../../../../lib/exit.ts"
import { parseArgs } from "../../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../../ops/surface.ts"

const ADDONS_REL_ROOT = "temper/addons"

const ARCHIVE_NAME = "temper-addons.zip"
const VERSION_NAME = "version.txt"

const ENTRY_MTIME = Date.UTC(2000, 0, 1)

export const help: CommandHelp = {
  description:
    "Pack what already stands in a checkout's `temper/addons/dist/` into `temper-addons.zip`, beside a `version.txt` naming the commit it was built at. Nothing is compiled here: an addon with nothing in `dist/` is refused rather than silently left out of the archive players download.\n" +
    "\n" +
    "Every addon on the roster is packed, whether or not anything depends on it, along with each sibling folder a manifest declares. A dependency naming something the roster does not hold is an addon the player installs themselves, and is reported rather than packed.\n" +
    "\n" +
    "Entry timestamps are fixed, so two runs over the same `dist/` produce the same bytes and the image built from them keeps its content hash.\n" +
    "\n" +
    "The archive is a build intermediate on this workstation. What leaves it is the image `ops temper addon bundle publish` builds from the archive, and this stands here because nothing carries the packer itself.",
  flags: [
    {
      name: "--sha",
      argLabel: "<commit-sha>",
      valueShape: "token",
      description: "Written to the version file the install surface compares against. Required.",
    },
    {
      name: "--out",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "Where the archive and version file are written. Defaults to the checkout's `temper/addons/dist-bundle`.",
    },
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout packed from (defaults to $CODE_ROOT, else this repository). The addon resolver this reads is loaded from the main checkout either way.",
    },
  ],
  examples: ["ops temper addon bundle build --sha $(git rev-parse HEAD)"],
}

const ADDON_JSON_DEPENDS_SCHEMA = addonManifestSchema
  .pick({ dependsOn: true, optionalDependsOn: true })
  .passthrough()

function listFilesRecursive(root: string): string[] {
  const out: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const full = join(root, entry.name)
    if (entry.isDirectory()) {
      out.push(...listFilesRecursive(full))
    } else if (entry.isFile()) {
      out.push(full)
    }
  }
  return out.sort()
}

function readDependencies(addonDir: string): AddonDependencies {
  const manifestPath = addonManifestPathIn(addonDir)
  if (manifestPath === null) throw dataError(`${addonDir}: holds no addon manifest`)
  const parsed = ADDON_JSON_DEPENDS_SCHEMA.safeParse(
    JSON.parse(readFileSync(manifestPath, "utf-8"))
  )
  if (!parsed.success) {
    throw dataError(
      `${manifestPath}: cannot read dependsOn/optionalDependsOn — ${parsed.error.message}`
    )
  }
  return {
    dependsOn: parsed.data.dependsOn,
    optionalDependsOn: parsed.data.optionalDependsOn,
  }
}

export default async function temperAddonBundleBuild(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const sha = parsed.string("--sha")
  if (sha === undefined) {
    throw inputError(
      "--sha <commit-sha> is required — it is written to the version file the install surface compares against"
    )
  }
  const codeCheckout = resolve(parsed.string("--code-root") ?? codeRoot())
  const addonsRoot = join(codeCheckout, ADDONS_REL_ROOT)
  const named = parsed.string("--out")
  const outDir = named === undefined ? join(addonsRoot, "dist-bundle") : resolve(named)

  const roster = listAllAddons({ repoRoot: codeCheckout })
  const metadataByName = new Map<string, AddonDependencies>(
    roster.map((addon) => [addon.canonicalName, readDependencies(addon.dir)])
  )

  const { included, external } = resolveDistributableSet(metadataByName)

  const absent = included.filter((name) => {
    const distDir = join(addonsRoot, "dist", name)
    return !existsSync(distDir) || listFilesRecursive(distDir).length === 0
  })
  if (absent.length > 0) {
    throw dataError(
      `${absent.length} of ${included.length} addon(s) have nothing in dist/ — the bundle packs what stands there and builds nothing itself. Run \`ops temper addon build --all\` first. Absent: ${absent.join(", ")}`
    )
  }

  const archive: Zippable = {}
  let memberFileCount = 0

  const packFolder = (folderName: string, distDir: string): void => {
    if (!existsSync(distDir)) {
      throw dataError(`${folderName}: ${distDir} does not exist after a successful build`)
    }
    const files = listFilesRecursive(distDir)
    if (files.length === 0) {
      throw dataError(`${folderName}: ${distDir} is empty after a successful build`)
    }
    for (const full of files) {
      const rel = relative(distDir, full).split(sep).join("/")
      archive[`${folderName}/${rel}`] = new Uint8Array(readFileSync(full))
      memberFileCount++
    }
  }

  const dirByName = new Map(roster.map((addon) => [addon.canonicalName, addon.dir]))
  for (const name of included) {
    packFolder(name, join(addonsRoot, "dist", name))
    const addonDir = dirByName.get(name)
    if (addonDir === undefined) continue
    for (const siblingName of readSiblingAddonNames(addonDir)) {
      packFolder(siblingName, siblingDistDir(addonsRoot, siblingName))
    }
  }

  const bytes = zipSync(archive, { level: 9, mtime: ENTRY_MTIME })

  mkdirSync(outDir, { recursive: true })
  const archivePath = join(outDir, ARCHIVE_NAME)
  const versionPath = join(outDir, VERSION_NAME)
  writeFileSync(archivePath, bytes)
  writeFileSync(versionPath, `${sha}\n`)

  const notPacked =
    external.length > 0
      ? `\n${external.length} addon(s) the player installs separately: ${external.join(", ")}`
      : ""
  process.stdout.write(
    `packed ${included.length} addon(s), ${memberFileCount} file(s) → ${archivePath} (${bytes.length} bytes)\n` +
      `wrote ${versionPath} (${sha})${notPacked}\n`
  )
}
