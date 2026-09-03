export const summary =
  "List the 20 TemperCatalog domain keys (matches DOMAIN_REGISTRY in the addon)"

import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"
import { emitJson, emitTsv } from "../../../lib/format-output.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--json",
      description: "Emit `{ domains: [...] }` JSON instead of TSV",
    },
  ],
  examples: ["ops temper catalog list", "ops temper catalog list --json"],
}

export default async function temperCatalogList(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  if (json) {
    process.stdout.write(`${emitJson({ domains: [...CATALOG_DOMAIN_KEYS] })}\n`)
    return
  }

  const rows = CATALOG_DOMAIN_KEYS.map((key) => ({ key }))
  process.stdout.write(`${emitTsv(rows, ["key"])}\n`)
}
