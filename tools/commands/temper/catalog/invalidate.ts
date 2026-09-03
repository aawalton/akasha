export const summary =
  "Bump TemperCatalogConfig.lua's invalidateVersion so the addon re-collects the named domains on next /reloadui"

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"
import { resolveSideFilePath } from "@akasha/temper-catalog-side-file/catalog-file-paths"
import {
  computeNextSideFile,
  parseSideFile,
  serializeSideFile,
} from "@akasha/temper-catalog-side-file/catalog-side-file"
import { inputError } from "../../../lib/exit.ts"
import { emitJson } from "../../../lib/format-output.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--domain",
      argLabel: "<name>",
      valueShape: "token",
      description:
        "Catalog domain key to invalidate (repeatable). Validated against the addon's DOMAIN_REGISTRY.",
      repeat: true,
    },
    {
      name: "--all",
      description: "Invalidate every catalog domain (mutually exclusive with --domain)",
    },
    {
      name: "--side-file",
      argLabel: "<path>",
      valueShape: "token",
      description: "Override the path to TemperCatalogConfig.lua",
    },
    {
      name: "--json",
      description: "Emit the new SideFile JSON instead of a one-line summary",
    },
  ],
  examples: [
    "ops temper catalog invalidate --domain loreLibraryCatalog",
    "ops temper catalog invalidate --domain achievementCatalog --domain recipeCatalog",
    "ops temper catalog invalidate --all",
  ],
}

export default async function temperCatalogInvalidate(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const all = parsed.boolean("--all")
  const requested = parsed.repeated("--domain")
  const json = parsed.boolean("--json")

  const sideFilePath = resolveSideFilePath(parsed.string("--side-file"))

  if (all && requested.length > 0) {
    throw inputError("--all and --domain are mutually exclusive")
  }
  if (!all && requested.length === 0) {
    throw inputError(
      "Pass --all or one or more --domain <name> flags (see `--help` for the domain list)"
    )
  }
  const validDomains = new Set<string>(CATALOG_DOMAIN_KEYS)
  for (const name of requested) {
    if (!validDomains.has(name)) {
      throw inputError(
        `--domain: '${name}' is not a known catalog domain; run \`ops temper catalog list\` to see the valid set`
      )
    }
  }

  const prior = existsSync(sideFilePath)
    ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
    : undefined

  const next = computeNextSideFile(prior, all ? [] : requested)
  const serialized = serializeSideFile(next)

  mkdirSync(dirname(sideFilePath), { recursive: true })
  writeFileSync(sideFilePath, serialized, "utf-8")

  if (json) {
    process.stdout.write(`${emitJson(next)}\n`)
    return
  }
  const summary = next.invalidateDomains.length === 0 ? "all" : next.invalidateDomains.join(",")
  process.stdout.write(
    `OK invalidateVersion=${next.invalidateVersion} invalidateDomains=${summary}\n`
  )
}
