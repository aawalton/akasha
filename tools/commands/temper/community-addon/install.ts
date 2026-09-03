export const summary = "Fresh-install a new third-party ESO addon from ESOUI by name (unmanaged)"

import { listDeployables } from "@akasha/temper-addons-resolve/deployable-addons"
import { installNamedAddon } from "@akasha/temper-community-addons/install-named-addon"
import { addonsDir } from "@akasha/temper-eso-paths/eso-paths-resolve"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "name",
      required: true,
      description: "ESOUI addon name (UIName) or one of its install folder names (UIDir)",
    },
  ],
  flags: [
    {
      name: "--force",
      description: "Reinstall even when the target folder(s) are already present",
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
    { name: "--json", description: "Emit a JSON envelope instead of a TSV line" },
  ],
  exits: [
    { code: 0, meaning: "addon installed, or already present (skipped)" },
    {
      code: 1,
      meaning:
        "input error — no ESOUI catalog entry matches <name>, or the entry installs a folder the deploy pipeline owns",
    },
    { code: 3, meaning: "download/verify/extract failed, or the entry declares no install folder" },
  ],
  examples: [
    'ops temper community-addon install "Tamriel Trade Centre"',
    "ops temper community-addon install TamrielTradeCentre",
    "ops temper community-addon install AdvancedFilters --force",
  ],
}

export default async function temperCommunityAddonInstall(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")
  const force = parsed.boolean("--force")
  const addonsPath = parsed.string("--addons-dir") ?? addonsDir()
  const name = parsed.positionals[0]
  if (name === undefined) throw inputError("missing required positional argument: name")

  const repoRoot = parsed.string("--repo-root")
  const ownedNames = new Set(
    listDeployables(repoRoot === undefined ? undefined : { repoRoot }).map((d) => d.name)
  )

  const outcome = await installNamedAddon(name, {
    addonsPath,
    force,
    ownedNames,
  })

  if (json) {
    process.stdout.write(`${JSON.stringify({ name, addonsDir: addonsPath, ...outcome })}\n`)
    return
  }
  if (outcome.action === "skipped") {
    process.stdout.write(
      `${name}\tskipped\t${outcome.dirs.join(",")}\n` +
        "# already present; pass --force to reinstall\n"
    )
    return
  }
  process.stdout.write(
    `${outcome.dirs.join(",")}\tinstalled\t${outcome.version}\n` +
      `# installed ${outcome.dirs.length} folder(s) into ${addonsPath}\n`
  )
}
