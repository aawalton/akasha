
export const summary =
  "Install one built addon from this repository's dist tree into this workstation's live ESO AddOns folder"

import { createHash } from "node:crypto"
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs"
import { readFile, readdir } from "node:fs/promises"
import { join, relative, resolve } from "node:path"
import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import {
  collectFloorsFor,
  decideFolderOwnership,
  decideInstallAction,
  foreignCopySatisfies,
  OWNERSHIP_MARKER_FILE,
} from "@akasha/temper-addons-resolve/folder-ownership"
import { addonManifestSchema } from "@akasha/temper-addons-resolve/addon-json"
import {
  readSiblingAddonNames,
  siblingDistDir,
} from "@akasha/temper-addons-resolve/sibling-addons"
import {
  logBundleMemberMigration,
  migrateBundleMemberSavedVars,
  readDeclaredSavedVars,
} from "@akasha/temper-saved-vars-migration/bundle-member-saved-vars"
import { applyConsolidationMigrations } from "@akasha/temper-saved-vars-migration/saved-vars-migration"
import { addonsDir, savedVarsDir as esoSavedVarsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { z } from "zod"
import { codeRoot } from "../../../lib/code-root.ts"
import { dataError, inputError, operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"
import { CONSOLIDATION_MIGRATIONS } from "../../../lib/temper-addon-consolidation-migrations.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

const ADDONS_REL_ROOT = "temper/addons"

export const help: CommandHelp = {
  description:
    "Replace one addon's folder — and each sibling folder its manifest declares — under this workstation's live ESO `AddOns/` directory with what stands in a checkout's `temper/addons/dist/`, then verify every installed file against its source by sha256, then run the saved-variables migrations the new build needs.\n" +
    "\n" +
    "Nothing is packed and nothing is carried off this machine: the target is the game folder on this disk, so this is workstation tooling rather than anything a deploy carries.\n" +
    "\n" +
    "A folder carrying no `build-id.lua` was installed by something other than Temper. It is left alone where it satisfies every version floor this fleet declares, and refused rather than deleted where it does not, or where its version cannot be read at all — refusing to destroy somebody else's addon on missing evidence.\n" +
    "\n" +
    "The extra Lua files a manifest names are host or runtime files the game writes, so they are carried across the replacement rather than overwritten.",
  flags: [
    {
      name: "--addon",
      argLabel: "<name>",
      valueShape: "token",
      description: "The addon to install. Required.",
    },
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout installed from (defaults to $CODE_ROOT, else this repository). The addon resolver this reads is loaded from the main checkout either way.",
    },
  ],
  examples: ["ops temper addon install --addon TemperCharacters"],
}

const ADDON_JSON_PRESERVE_SCHEMA = addonManifestSchema
  .pick({ additionalLuaFiles: true })
  .passthrough()

const ADDON_VERSION_RE = /^##\s*AddOnVersion:\s*(\d+)\s*$/im
const ADDON_VERSION_SCHEMA = z.tuple([z.string()])

const ADDON_JSON_DEPS_SCHEMA = addonManifestSchema
  .pick({ dependsOn: true, optionalDependsOn: true })
  .partial()
  .passthrough()

async function listFilesRecursive(root: string): Promise<string[]> {
  const out: string[] = []
  const entries = await readdir(root, { withFileTypes: true })
  for (const entry of entries) {
    const full = join(root, entry.name)
    if (entry.isDirectory()) {
      const sub = await listFilesRecursive(full)
      for (const s of sub) out.push(s)
    } else if (entry.isFile()) {
      out.push(full)
    }
  }
  return out
}

async function sha256File(path: string): Promise<{ hash: string; size: number }> {
  const buf = await readFile(path)
  const hash = createHash("sha256").update(buf).digest("hex")
  return { hash, size: buf.byteLength }
}

function probeOwnershipMarker(dir: string): boolean | undefined {
  try {
    readdirSync(dir)
  } catch {
    return undefined
  }
  return existsSync(join(dir, OWNERSHIP_MARKER_FILE))
}

function readInstalledAddonVersion(dir: string, name: string): number | undefined {
  for (const ext of [".txt", ".addon"]) {
    const path = join(dir, `${name}${ext}`)
    if (!existsSync(path)) continue
    try {
      const body = readFileSync(path, "utf-8")
      if (!ADDON_VERSION_RE.test(body)) continue
      const [captured] = requireMatchPositional(ADDON_VERSION_RE, ADDON_VERSION_SCHEMA, body)
      return Number.parseInt(captured, 10)
    } catch {}
  }
  return undefined
}

function describeForeignCopy(version: number | undefined, floors: readonly number[]): string {
  const found =
    version === undefined ? "its version is unreadable" : `it declares AddOnVersion ${version}`
  if (floors.length === 0) return `${found}, and this fleet declares no floor against it`
  return `${found}, and this fleet's highest declared floor is >=${Math.max(...floors)}`
}

function readAdditionalLuaFiles(addonDir: string): readonly string[] {
  const path = join(addonDir, "addon.json")
  if (!existsSync(path)) return []
  try {
    const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
    const parsed = ADDON_JSON_PRESERVE_SCHEMA.safeParse(raw)
    if (!parsed.success) return []
    return parsed.data.additionalLuaFiles ?? []
  } catch {
    return []
  }
}

interface InstallContext {
  readonly esoAddonsPath: string
  readonly fleetDependencyLists: () => readonly (readonly string[])[]
}

async function installFolder(
  context: InstallContext,
  folderName: string,
  sourceDir: string,
  preserveNames: readonly string[]
): Promise<"installed" | "skip"> {
  const targetDir = join(context.esoAddonsPath, folderName)
  const preserved = new Map<string, Buffer>()
  for (const name of preserveNames) {
    const livePath = join(targetDir, name)
    if (existsSync(livePath)) {
      preserved.set(name, readFileSync(livePath))
    }
  }

  const ownership = decideFolderOwnership({
    dirExists: existsSync(targetDir),
    markerPresent: probeOwnershipMarker(targetDir),
  })
  const foreignVersion =
    ownership === "foreign" ? readInstalledAddonVersion(targetDir, folderName) : undefined
  const declaredFloors =
    ownership === "foreign"
      ? collectFloorsFor(folderName, context.fleetDependencyLists())
      : []
  const decision = decideInstallAction(
    ownership,
    folderName,
    ownership === "foreign" ? foreignCopySatisfies(foreignVersion, declaredFloors) : undefined,
    describeForeignCopy(foreignVersion, declaredFloors)
  )
  if (decision.action === "refuse") {
    throw dataError(`${folderName}: ${decision.reason}`)
  }
  if (decision.action === "skip") {
    process.stdout.write(`${folderName}: ${decision.reason}\n`)
    return "skip"
  }

  const rm = Bun.spawnSync(["rm", "-rf", targetDir], { stdio: ["inherit", "inherit", "inherit"] })
  if ((rm.exitCode ?? 1) !== 0) {
    throw operationalError(`${folderName}: removing ${targetDir} failed (exit ${String(rm.exitCode ?? 1)})`)
  }
  const cp = Bun.spawnSync(["cp", "-r", sourceDir, targetDir], {
    stdio: ["inherit", "inherit", "inherit"],
  })
  if ((cp.exitCode ?? 1) !== 0) {
    throw operationalError(
      `${folderName}: copying ${sourceDir} to ${targetDir} failed (exit ${String(cp.exitCode ?? 1)})`
    )
  }

  for (const [name, content] of preserved) {
    writeFileSync(join(targetDir, name), content)
  }

  const distFiles = await listFilesRecursive(sourceDir)
  const preservedSet = new Set(preserved.keys())
  const mismatches: string[] = []
  for (const distFull of distFiles) {
    const rel = relative(sourceDir, distFull)
    if (preservedSet.has(rel)) continue
    const installFull = join(targetDir, rel)
    const distInfo = await sha256File(distFull)
    let installInfo: { hash: string; size: number } | null = null
    if (existsSync(installFull)) installInfo = await sha256File(installFull)
    if (installInfo == null) {
      mismatches.push(`${rel}: dist=${distInfo.hash.slice(0, 16)}:${distInfo.size} install=MISSING`)
    } else if (installInfo.hash !== distInfo.hash) {
      mismatches.push(
        `${rel}: dist=${distInfo.hash.slice(0, 16)}:${distInfo.size} install=${installInfo.hash.slice(0, 16)}:${installInfo.size}`
      )
    }
  }
  if (mismatches.length > 0) {
    throw operationalError(
      `install does not match dist for ${folderName} (${mismatches.length} of ${distFiles.length} file(s)):\n` +
        mismatches.map((m) => `  ${m}`).join("\n") +
        "\nThe compiler or the metadata copy exited 0 with stale or missing output, or the copy itself did not complete."
    )
  }
  const restored = preserved.size > 0 ? `, ${preserved.size} host file(s) carried across` : ""
  process.stdout.write(
    `installed ${folderName} to ${targetDir} — ${distFiles.length} file(s) verified by sha256${restored}\n`
  )
  return "installed"
}

export default async function temperAddonInstall(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const addonName = parsed.string("--addon")
  if (addonName === undefined) throw inputError("--addon <name> is required")
  const codeCheckout = resolve(parsed.string("--code-root") ?? codeRoot())

  const { listAllAddons, resolveAddon } = await addonsResolve()
  const { dir: addonSourceDir, canonicalName } = resolveAddon(addonName, { repoRoot: codeCheckout })

  const addonsRoot = join(codeCheckout, ADDONS_REL_ROOT)
  const distDir = join(addonsRoot, "dist", canonicalName)
  if (!existsSync(distDir)) {
    throw dataError(
      `${canonicalName}: ${distDir} does not exist — run \`ops temper addon build ${canonicalName} --build-only\` first`
    )
  }

  const readFleetDependencyLists = (): readonly (readonly string[])[] => {
    const lists: (readonly string[])[] = []
    for (const addon of listAllAddons({ repoRoot: codeCheckout })) {
      const path = join(addon.dir, "addon.json")
      if (!existsSync(path)) continue
      try {
        const raw: unknown = JSON.parse(readFileSync(path, "utf-8"))
        const parsedDeps = ADDON_JSON_DEPS_SCHEMA.safeParse(raw)
        if (!parsedDeps.success) continue
        lists.push([
          ...(parsedDeps.data.dependsOn ?? []),
          ...(parsedDeps.data.optionalDependsOn ?? []),
        ])
      } catch {}
    }
    return lists
  }

  const context: InstallContext = {
    esoAddonsPath: addonsDir(),
    fleetDependencyLists: readFleetDependencyLists,
  }

  const mainAction = await installFolder(
    context,
    canonicalName,
    distDir,
    readAdditionalLuaFiles(addonSourceDir)
  )
  if (mainAction === "skip") return

  for (const siblingName of readSiblingAddonNames(addonSourceDir)) {
    const siblingDist = siblingDistDir(addonsRoot, siblingName)
    if (!existsSync(siblingDist)) {
      throw dataError(
        `${siblingName}: ${siblingDist} does not exist — ${canonicalName}/addon.json declares it as a sibling addon, so run \`ops temper addon build ${canonicalName} --build-only\` first`
      )
    }
    await installFolder(context, siblingName, siblingDist, [])
  }

  logBundleMemberMigration(
    migrateBundleMemberSavedVars(canonicalName, readDeclaredSavedVars(addonSourceDir), {
      savedVarsDir: esoSavedVarsDir(),
      nowIso: new Date().toISOString(),
    })
  )

  applyConsolidationMigrations(canonicalName, CONSOLIDATION_MIGRATIONS, {
    savedVarsDir: esoSavedVarsDir(),
  })
}
