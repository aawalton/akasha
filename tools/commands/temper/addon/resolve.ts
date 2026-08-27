
export const summary = "Resolve an addon by canonical name, flat-dir leaf, or nested parent domain"

import type { CommandHelp } from "../../../ops/surface.ts"
import { dataError, inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { addonsResolve } from "../../../lib/temper-addon-code.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "<name>",
      required: true,
      description: "Canonical addon name, flat-layout dir leaf, or nested-addon parent domain",
    },
  ],
  flags: [
    {
      name: "--repo-root",
      argLabel: "<path>",
      valueShape: "token",
      description:
        "Override the repo-root used for discovery. Defaults to the package's installation root.",
    },
  ],
  examples: ["ops temper addon resolve TemperInventory", "ops temper addon resolve companions"],
}

export default async function temperAddonResolve(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)

  const name = parsed.positionals[0]
  if (name === undefined) {
    throw inputError("name: required positional argument")
  }
  const repoRoot = parsed.string("--repo-root")
  const opts = repoRoot === undefined ? undefined : { repoRoot }

  const addons = await addonsResolve()
  const resolved = addons.resolveAddon(name, opts)
  const all = addons.listAllAddons(opts)
  const match = all.find(
    (a) => a.dir === resolved.dir && a.canonicalName === resolved.canonicalName
  )
  if (match === undefined) {
    throw dataError(`addon not found: ${name}`)
  }

  process.stdout.write(`${JSON.stringify(match, null, 2)}\n`)
}
