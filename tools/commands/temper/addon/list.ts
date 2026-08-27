
export const summary = "List every discovered Temper addon source dir (flat + nested layouts)"

import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { type AddonInfo, addonsResolve } from "../../../lib/temper-addon-code.ts"

export const help: CommandHelp = {
  positionals: [],
  flags: [
    {
      name: "--json",
      description: "Emit a JSON array of AddonInfo objects on stdout (one record per addon).",
    },
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      description:
        "Override the repo-root used for discovery. Defaults to the package's installation root.",
    },
  ],
  examples: ["ops temper addon list", "ops temper addon list --json"],
}

export default async function temperAddonList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const repoRoot = parsed.string("--repo-root")
  const json = parsed.boolean("--json")

  const resolve = await addonsResolve()

  let addons: readonly AddonInfo[]
  try {
    addons = resolve.listAllAddons(repoRoot === undefined ? undefined : { repoRoot })
  } catch (err) {
    throw inputError(`failed to list addons: ${err instanceof Error ? err.message : err}`)
  }

  if (addons.length === 0) {
    throw dataError("no addons discovered")
  }

  if (json) {
    process.stdout.write(`${JSON.stringify(addons, null, 2)}\n`)
    return
  }

  const nameWidth = Math.max(...addons.map((a) => a.canonicalName.length))
  const dirWidth = Math.max(...addons.map((a) => a.repoRelDir.length))
  for (const addon of addons) {
    process.stdout.write(
      `${addon.canonicalName.padEnd(nameWidth)}  ${addon.repoRelDir.padEnd(dirWidth)}  closure=${addon.workspaceClosure.length}\n`
    )
  }
}
