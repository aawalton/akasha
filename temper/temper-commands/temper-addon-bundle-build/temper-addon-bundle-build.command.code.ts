import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, relative, resolve, sep } from "node:path"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
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

const SAID_WRONG = 1

const DATA = 2

const SHA_FLAG = "--sha"

const OUT_FLAG = "--out"

const CODE_ROOT_FLAG = "--code-root"

const ADDONS_UNDER = "temper/addons"

const DIST_UNDER = "dist"

const BUNDLE_UNDER = "dist-bundle"

const ARCHIVE_NAME = "temper-addons.zip"

const VERSION_NAME = "version.txt"

const ENTRY_MTIME = Date.UTC(2000, 0, 1)

const LEVEL = 9

const BUILT_BY = "temper-addon-build --all --build-only"

const DEPENDS_SCHEMA = addonManifestSchema
  .pick({ dependsOn: true, optionalDependsOn: true })
  .passthrough()

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

function filesUnder(root: string): readonly string[] {
  const found: string[] = []
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const path = join(root, entry.name)
    if (entry.isDirectory()) found.push(...filesUnder(path))
    else if (entry.isFile()) found.push(path)
  }
  return [...found].sort()
}

function dependenciesOf(addonDir: string): AddonDependencies {
  const manifestPath = addonManifestPathIn(addonDir)
  if (manifestPath === null) throw new Error(`${addonDir} holds no addon manifest`)
  const parsed = DEPENDS_SCHEMA.safeParse(JSON.parse(readFileSync(manifestPath, "utf-8")))
  if (!parsed.success) {
    throw new Error(`${manifestPath} states no dependencies this reads — ${parsed.error.message}`)
  }
  return { dependsOn: parsed.data.dependsOn, optionalDependsOn: parsed.data.optionalDependsOn }
}

function packedInto(archive: Zippable, folderName: string, distDir: string): number {
  if (!existsSync(distDir)) throw new Error(`${folderName} has no build output at ${distDir}`)
  const files = filesUnder(distDir)
  if (files.length === 0) throw new Error(`${folderName} left ${distDir} empty`)
  for (const path of files) {
    const rel = relative(distDir, path).split(sep).join("/")
    archive[`${folderName}/${rel}`] = new Uint8Array(readFileSync(path))
  }
  return files.length
}

export function temperAddonBundleBuild(argv: readonly string[] = []): Answer {
  const sha = valuesOf(argv, SHA_FLAG)[0]
  if (sha === undefined) {
    return refused(
      `${SHA_FLAG} names the commit written into the version file the installer compares against, and nothing named it`,
      SAID_WRONG
    )
  }

  const root = resolve(valuesOf(argv, CODE_ROOT_FLAG)[0] ?? codeRoot())
  const addonsRoot = join(root, ADDONS_UNDER)
  const named = valuesOf(argv, OUT_FLAG)[0]
  const outDir = named === undefined ? join(addonsRoot, BUNDLE_UNDER) : resolve(named)

  const roster = listAllAddons({ repoRoot: root })
  if (roster.length === 0) {
    return refused(
      `${root} holds no addon carrying a manifest, so a clean run here would pack an empty archive`,
      DATA
    )
  }

  let included: readonly string[]
  let external: readonly string[]
  try {
    const byName = new Map<string, AddonDependencies>(
      roster.map((one) => [one.canonicalName, dependenciesOf(one.dir)])
    )
    const set = resolveDistributableSet(byName)
    included = set.included
    external = set.external
  } catch (thrown) {
    return refused(`the roster states no dependencies this reads: ${messageOf(thrown)}`, DATA)
  }

  const absent = included.filter((name) => {
    const distDir = join(addonsRoot, DIST_UNDER, name)
    return !existsSync(distDir) || filesUnder(distDir).length === 0
  })
  if (absent.length > 0) {
    return refused(
      `${String(absent.length)} of ${String(included.length)} addon(s) have no build output, and nothing here compiles one — run \`${BUILT_BY}\` first. Absent: ${absent.join(", ")}`,
      DATA
    )
  }

  const archive: Zippable = {}
  let packed = 0
  const dirByName = new Map(roster.map((one) => [one.canonicalName, one.dir]))
  try {
    for (const name of included) {
      packed += packedInto(archive, name, join(addonsRoot, DIST_UNDER, name))
      const addonDir = dirByName.get(name)
      if (addonDir === undefined) continue
      for (const sibling of readSiblingAddonNames(addonDir)) {
        packed += packedInto(archive, sibling, siblingDistDir(addonsRoot, sibling))
      }
    }
  } catch (thrown) {
    return refused(`the archive was not packed whole: ${messageOf(thrown)}`, DATA)
  }

  const bytes = zipSync(archive, { level: LEVEL, mtime: ENTRY_MTIME })
  const archivePath = join(outDir, ARCHIVE_NAME)
  const versionPath = join(outDir, VERSION_NAME)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(archivePath, bytes)
  writeFileSync(versionPath, `${sha}\n`)

  const notPacked =
    external.length === 0
      ? []
      : [
          `${String(external.length)} addon(s) the player installs themselves, packed by nothing here: ${external.join(", ")}`,
        ]

  return {
    report: [
      `packed ${String(included.length)} addon(s), ${String(packed)} file(s) into ${archivePath} (${String(bytes.length)} bytes)`,
      `wrote ${versionPath} naming ${sha}`,
      ...notPacked,
    ],
    refusals: [],
    code: 0,
  }
}
