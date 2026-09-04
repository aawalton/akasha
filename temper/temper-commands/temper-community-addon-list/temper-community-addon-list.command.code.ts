import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { listDeployables } from "@akasha/temper-addons-resolve/deployable-addons"
import { type PlannedAddon, planUpdates } from "@akasha/temper-community-addons/addon-update-plan"
import { fetchCatalog } from "@akasha/temper-community-addons/esoui-catalog"
import { readInstalledAddons } from "@akasha/temper-community-addons/installed-addons"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"

const FAILED = 3

const OUTDATED_FLAG = "--outdated"

const ADDONS_DIR_FLAG = "--addons-dir"

const REPO_ROOT_FLAG = "--repo-root"

const JSON_FLAG = "--json"

const SPACES = 2

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

function ownedIn(repoRoot: string | undefined): ReadonlySet<string> {
  return new Set(
    listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((one) => one.name)
  )
}

function countsOf(all: readonly PlannedAddon[]): Record<PlannedAddon["status"], number> {
  const counts = { outdated: 0, "up-to-date": 0, unmatched: 0, "deploy-owned": 0 }
  for (const one of all) counts[one.status] += 1
  return counts
}

function countLine(counts: Record<PlannedAddon["status"], number>): string {
  return (
    `${String(counts.outdated)} outdated, ${String(counts["up-to-date"])} up-to-date, ` +
    `${String(counts.unmatched)} unmatched, ${String(counts["deploy-owned"])} deploy-owned`
  )
}

export async function temperCommunityAddonList(argv: readonly string[] = []): Promise<Answer> {
  const addonsPath = valuesOf(argv, ADDONS_DIR_FLAG)[0] ?? addonsDir()
  const repoRoot = valuesOf(argv, REPO_ROOT_FLAG)[0]

  let plan: ReturnType<typeof planUpdates>
  try {
    const owned = ownedIn(repoRoot)
    const [catalog, installed] = await Promise.all([
      fetchCatalog(),
      readInstalledAddons(addonsPath),
    ])
    plan = planUpdates(installed, catalog, owned)
  } catch (thrown) {
    return refused(
      `the community catalog was not reached, so no addon here could be weighed against it: ${messageOf(thrown)}`,
      FAILED
    )
  }

  const shown = argv.includes(OUTDATED_FLAG)
    ? plan.addons.filter((one) => one.status === "outdated")
    : plan.addons
  const counts = countsOf(plan.addons)

  if (argv.includes(JSON_FLAG)) {
    return {
      report: JSON.stringify({ addonsDir: addonsPath, counts, addons: shown }, null, SPACES).split(
        "\n"
      ),
      refusals: [],
      code: 0,
    }
  }

  return {
    report: [
      ...shown.map(
        (one) =>
          `${one.dir}\t${one.status}\t${one.installedVersion ?? "-"}\t${one.latestVersion ?? "-"}`
      ),
      countLine(counts),
    ],
    refusals: [],
    code: 0,
  }
}
