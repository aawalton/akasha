export const summary = "Download and install updates for outdated third-party ESO addons from ESOUI"

import { listDeployables } from "@akasha/temper-addons-resolve/deployable-addons"
import { downloadAndInstall } from "@akasha/temper-community-addons/addon-download"
import {
  distinctUids,
  type PlannedAddon,
  planUpdates,
  selectTargets,
  unknownOnlyDirs,
} from "@akasha/temper-community-addons/addon-update-plan"
import { fetchCatalog, fetchFileDetails } from "@akasha/temper-community-addons/esoui-catalog"
import { readInstalledAddons } from "@akasha/temper-community-addons/installed-addons"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { inputError, operationalError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    { name: "--dry-run", description: "Show what would be updated without downloading anything" },
    {
      name: "--only",
      argLabel: "<dir>",
      valueShape: "token",
      repeat: true,
      description: "Restrict to specific addon folder(s); repeatable",
    },
    {
      name: "--force",
      description: "Re-download and reinstall every matched addon, not just outdated ones",
    },
    {
      name: "--addons-dir",
      argLabel: "<path>",
      valueShape: "token",
      description: "Override the AddOns directory (defaults to the platform ESO live/AddOns path)",
    },
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      description:
        "Override the repo-root the deploy-owned roster is read from. Defaults to the " +
        "package's installation root.",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "all selected addons installed (or dry-run completed)" },
    { code: 1, meaning: "input error — an --only folder is not an installable addon" },
    { code: 3, meaning: "one or more addons failed to download/verify/install" },
  ],
  examples: [
    "ops temper community-addon update --dry-run",
    "ops temper community-addon update",
    "ops temper community-addon update --only AdvancedFilters --only pChat",
    "ops temper community-addon update --force",
  ],
}

interface UpdateOutcome {
  readonly dir: string
  readonly action: "would-update" | "updated" | "failed"
  readonly from: string | undefined
  readonly to: string | undefined
  readonly error?: string
}

function emit(json: boolean, lines: readonly string[]): undefined {
  if (json) return
  for (const line of lines) process.stdout.write(`${line}\n`)
}

function groupDirsByUid(selected: readonly PlannedAddon[]): Map<string, string[]> {
  const map = new Map<string, string[]>()
  for (const a of selected) {
    if (a.uid === undefined) continue
    const list = map.get(a.uid) ?? []
    list.push(a.dir)
    map.set(a.uid, list)
  }
  return map
}

function installedVersionOf(group: readonly PlannedAddon[], dir: string): string | undefined {
  return group.find((a) => a.dir === dir)?.installedVersion
}

export default async function temperCommunityAddonUpdate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const dryRun = parsed.boolean("--dry-run")
  const force = parsed.boolean("--force")
  const only = parsed.repeated("--only")
  const addonsPath = parsed.string("--addons-dir") ?? addonsDir()
  const repoRoot = parsed.string("--repo-root")

  const ownedNames = new Set(
    listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((d) => d.name)
  )

  const [catalog, installed] = await Promise.all([fetchCatalog(), readInstalledAddons(addonsPath)])
  const plan = planUpdates(installed, catalog, ownedNames)

  const unknown = unknownOnlyDirs(plan, only)
  if (unknown.length > 0) {
    throw inputError(`--only names no installable addon: ${unknown.join(", ")}`)
  }

  const selected = selectTargets(plan, { force, only })
  const uids = distinctUids(selected)
  const dirsByUid = groupDirsByUid(selected)

  const outcomes: UpdateOutcome[] = []
  for (const uid of uids) {
    const group = selected.filter((a) => a.uid === uid)
    const latest = group[0]?.latestVersion
    if (dryRun) {
      for (const a of group) {
        outcomes.push({ dir: a.dir, action: "would-update", from: a.installedVersion, to: latest })
      }
      emit(
        json,
        group.map((a) => `${a.dir}\twould-update\t${a.installedVersion ?? "-"}\t${latest ?? "-"}`)
      )
      continue
    }
    try {
      const details = await fetchFileDetails(uid)
      const result = await downloadAndInstall(details, dirsByUid.get(uid) ?? [], addonsPath)
      for (const dir of result.installedDirs) {
        outcomes.push({
          dir,
          action: "updated",
          from: installedVersionOf(group, dir),
          to: result.version,
        })
      }
      emit(
        json,
        result.installedDirs.map(
          (dir) => `${dir}\tupdated\t${installedVersionOf(group, dir) ?? "-"}\t${result.version}`
        )
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      for (const a of group) {
        outcomes.push({
          dir: a.dir,
          action: "failed",
          from: a.installedVersion,
          to: latest,
          error: message,
        })
      }
      emit(
        json,
        group.map((a) => `${a.dir}\tfailed\t${a.installedVersion ?? "-"}\t${message}`)
      )
    }
  }

  const updated = outcomes.filter((o) => o.action === "updated").length
  const failed = outcomes.filter((o) => o.action === "failed")
  if (json) {
    process.stdout.write(`${JSON.stringify({ dryRun, addonsDir: addonsPath, outcomes })}\n`)
  } else {
    const verb = dryRun ? "would update" : "updated"
    process.stdout.write(
      `# ${dryRun ? outcomes.length : updated} ${verb}, ${failed.length} failed\n`
    )
  }

  if (failed.length > 0) {
    throw operationalError(
      `${failed.length} addon(s) failed: ${failed.map((f) => f.dir).join(", ")}`
    )
  }
}
