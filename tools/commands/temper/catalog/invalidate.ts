
export const summary = "Bump TemperCatalogConfig.lua's invalidateVersion so the addon re-collects the named domains on next /reloadui"

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import type { CommandHelp } from "../../../ops/surface.ts"
import { emitJson } from "../../../lib/format-output.ts"
import { inputError } from "../../../lib/exit.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import {
  catalogDomainKeys,
  catalogPaths,
  catalogSideFile,
} from "../../../lib/temper-catalog-code.ts"

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

  const paths = await catalogPaths()
  const sideFilePath = paths.resolveSideFilePath(parsed.string("--side-file"))

  if (all && requested.length > 0) {
    throw inputError("--all and --domain are mutually exclusive")
  }
  if (!all && requested.length === 0) {
    throw inputError(
      "Pass --all or one or more --domain <name> flags (see `--help` for the domain list)"
    )
  }
  const { CATALOG_DOMAIN_KEYS } = await catalogDomainKeys()
  const validDomains = new Set<string>(CATALOG_DOMAIN_KEYS)
  for (const name of requested) {
    if (!validDomains.has(name)) {
      throw inputError(
        `--domain: '${name}' is not a known catalog domain; run \`ops temper catalog list\` to see the valid set`
      )
    }
  }

  const sideFile = await catalogSideFile()
  const prior = existsSync(sideFilePath)
    ? sideFile.parseSideFile(readFileSync(sideFilePath, "utf-8"))
    : undefined

  const next = sideFile.computeNextSideFile(prior, all ? [] : requested)
  const serialized = sideFile.serializeSideFile(next)

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
