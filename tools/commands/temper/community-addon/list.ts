export const summary =
  "List installed third-party ESO addons with installed vs latest ESOUI version"

import { listDeployables } from "@akasha/temper-addons-resolve/deployable-addons"
import { type PlannedAddon, planUpdates } from "@akasha/temper-community-addons/addon-update-plan"
import { fetchCatalog } from "@akasha/temper-community-addons/esoui-catalog"
import { readInstalledAddons } from "@akasha/temper-community-addons/installed-addons"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--outdated",
      description: "Only show addons with an available update",
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
    { code: 0, meaning: "listing produced" },
    { code: 3, meaning: "network error fetching the ESOUI catalog" },
  ],
  examples: [
    "ops temper community-addon list",
    "ops temper community-addon list --outdated",
    "ops temper community-addon list --json",
  ],
}

function countByStatus(addons: readonly PlannedAddon[]): Record<PlannedAddon["status"], number> {
  const counts = { outdated: 0, "up-to-date": 0, unmatched: 0, "deploy-owned": 0 }
  for (const a of addons) counts[a.status] += 1
  return counts
}

export default async function temperCommunityAddonList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const onlyOutdated = parsed.boolean("--outdated")
  const addonsPath = parsed.string("--addons-dir") ?? addonsDir()
  const repoRoot = parsed.string("--repo-root")

  const ownedNames = new Set(
    listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((d) => d.name)
  )

  const [catalog, installed] = await Promise.all([fetchCatalog(), readInstalledAddons(addonsPath)])
  const plan = planUpdates(installed, catalog, ownedNames)
  const rows = onlyOutdated ? plan.addons.filter((a) => a.status === "outdated") : plan.addons

  if (json) {
    const counts = countByStatus(plan.addons)
    process.stdout.write(`${JSON.stringify({ addonsDir: addonsPath, counts, addons: rows })}\n`)
    return
  }

  for (const a of rows) {
    process.stdout.write(
      `${a.dir}\t${a.status}\t${a.installedVersion ?? "-"}\t${a.latestVersion ?? "-"}\n`
    )
  }
  const counts = countByStatus(plan.addons)
  process.stdout.write(
    `# ${counts.outdated} outdated, ${counts["up-to-date"]} up-to-date, ` +
      `${counts.unmatched} unmatched, ${counts["deploy-owned"]} deploy-owned\n`
  )
}
