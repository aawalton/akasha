
export const summary = "Generate one Temper completion catalog data file from a captured TemperCatalog.lua or TemperDataMining.lua"

import { realpathSync } from "node:fs"
import { codeRoot } from "../../../lib/code-root.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { suggestClosest } from "../../../lib/suggest-closest.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  positionals: [
    {
      name: "tier",
      description: "Which catalog tier to generate. The tiers are listed below.",
    },
  ],
  flags: [
    {
      name: "--code-root",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The checkout to write the generated file into. Defaults to $CODE_ROOT, else this repository.",
    },
    {
      name: "--file",
      argLabel: "<path>",
      valueShape: "token",
      path: true,
      description:
        "The SavedVariables file to read. Defaults to the tier's file in the workstation's live ESO install.",
    },
  ],
  envVars: [{ name: "CODE_ROOT", description: "The checkout to work in, when --code-root is absent." }],
  exits: [
    { code: 2, meaning: "the tier's catalog is not in the capture, or the capture has no apiVersion" },
  ],
  examples: [
    "ops temper catalog generate collectibles --code-root ~/repos/akasha",
    "ops temper catalog generate quest --file /var/tmp/TemperDataMining.lua",
  ],
  epilog: async (): Promise<string> => {
    const { TIERS } = await import("../../../lib/temper-catalog-generate/tiers.ts")
    const width = Math.max(...TIERS.map((tier) => tier.slug.length))
    return ["tiers:", ...TIERS.map((t) => `  ${t.slug.padEnd(width)}  ${t.summary}`)].join("\n")
  },
}

export default async function temperCatalogGenerate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const named = parsed.string("--code-root")
  const root = realpathSync(named ?? codeRoot())

  const { runTier } = await import("../../../lib/temper-catalog-generate/harness.ts")
  const { TIER_SLUGS, tierBySlug } = await import("../../../lib/temper-catalog-generate/tiers.ts")

  const slug = parsed.positionals[0] ?? ""
  const tier = tierBySlug(slug)
  if (tier === undefined) {
    const suggestion = suggestClosest(slug, TIER_SLUGS, 2)
    throw inputError(
      suggestion !== undefined
        ? `unknown tier: ${slug} (did you mean ${suggestion}?)`
        : `unknown tier: ${slug} (the tiers are: ${TIER_SLUGS.join(", ")})`
    )
  }

  await runTier(tier, root, parsed.string("--file"))
}
