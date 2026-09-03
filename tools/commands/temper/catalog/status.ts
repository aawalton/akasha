export const summary =
  "Show per-domain collected / pending-invalidation state by reading TemperCatalog.lua + TemperCatalogConfig.lua"

import { existsSync, readFileSync } from "node:fs"
import { CATALOG_DOMAIN_KEYS } from "@akasha/temper-catalog-core/domain-keys"
import {
  type AccountSummary,
  readAccountSummaries,
} from "@akasha/temper-catalog-host/saved-variables-reader"
import {
  resolveSavedVariablesPath,
  resolveSideFilePath,
} from "@akasha/temper-catalog-side-file/catalog-file-paths"
import { parseSideFile, type SideFile } from "@akasha/temper-catalog-side-file/catalog-side-file"
import { emitJson, emitTsv } from "../../../lib/format-output.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import type { CommandHelp } from "../../../ops/surface.ts"

export const help: CommandHelp = {
  flags: [
    {
      name: "--saved-variables-file",
      argLabel: "<path>",
      valueShape: "token",
      description:
        "Override the path to TemperCatalog.lua (defaults to the workstation ESO live install)",
    },
    {
      name: "--side-file",
      argLabel: "<path>",
      valueShape: "token",
      description: "Override the path to TemperCatalogConfig.lua",
    },
    {
      name: "--json",
      description: "Emit structured JSON instead of TSV + summary",
    },
  ],
  examples: [
    "ops temper catalog status",
    "ops temper catalog status --json",
    "ops temper catalog status --saved-variables-file /tmp/test-catalog.lua",
  ],
}

interface DomainState {
  readonly account: string
  readonly domain: string
  readonly collected: boolean
  readonly pendingInvalidation: boolean
  readonly skipReason: string | undefined
}

function computeDomainStates(
  summaries: readonly AccountSummary[],
  sideFile: SideFile | undefined,
  domainKeys: readonly string[]
): readonly DomainState[] {
  return summaries.flatMap((summary) => {
    const present = new Set(summary.presentDomainKeys)
    const pendingSet = computePendingDomainSet(summary, sideFile, domainKeys)
    return domainKeys.map<DomainState>((domain) => {
      const collected = present.has(domain)
      return {
        account: summary.account,
        domain,
        collected,
        pendingInvalidation: pendingSet.has(domain),
        skipReason: resolveSkipReason(summary, domain, collected),
      }
    })
  })
}

function computePendingDomainSet(
  summary: AccountSummary,
  sideFile: SideFile | undefined,
  domainKeys: readonly string[]
): ReadonlySet<string> {
  if (sideFile === undefined) return new Set()
  if (sideFile.invalidateVersion <= summary.lastSeenInvalidateVersion) return new Set()
  if (sideFile.invalidateDomains.length === 0) return new Set(domainKeys)
  return new Set(sideFile.invalidateDomains)
}

function resolveSkipReason(
  summary: AccountSummary,
  domain: string,
  collected: boolean
): string | undefined {
  return collected ? undefined : summary.collectionSkips[domain]
}

export default async function temperCatalogStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const savedVariablesPath = resolveSavedVariablesPath(parsed.string("--saved-variables-file"))
  const sideFilePath = resolveSideFilePath(parsed.string("--side-file"))

  const summaries = existsSync(savedVariablesPath)
    ? readAccountSummaries(readFileSync(savedVariablesPath, "utf-8"))
    : []
  const sideFile = existsSync(sideFilePath)
    ? parseSideFile(readFileSync(sideFilePath, "utf-8"))
    : undefined

  if (json) {
    process.stdout.write(
      `${emitJson({
        accounts: summaries.map((summary) => ({
          account: summary.account,
          completed: summary.completed,
          apiVersion: summary.apiVersion,
          manifestApiVersion: summary.manifestApiVersion,
          lastSeenInvalidateVersion: summary.lastSeenInvalidateVersion,
          domains: CATALOG_DOMAIN_KEYS.map((domain) => {
            const collected = summary.presentDomainKeys.includes(domain)
            return {
              domain,
              collected,
              pendingInvalidation: computePendingDomainSet(
                summary,
                sideFile,
                CATALOG_DOMAIN_KEYS
              ).has(domain),
              skipReason: resolveSkipReason(summary, domain, collected) ?? null,
            }
          }),
        })),
        sideFile: sideFile ?? null,
      })}\n`
    )
    return
  }

  const states = computeDomainStates(summaries, sideFile, CATALOG_DOMAIN_KEYS)
  const rows = states.map((s) => ({
    account: s.account,
    domain: s.domain,
    collected: s.collected ? "yes" : "no",
    pendingInvalidation: s.pendingInvalidation ? "yes" : "no",
    skipReason: s.skipReason ?? "",
  }))
  const tsv = emitTsv(rows, ["account", "domain", "collected", "pendingInvalidation", "skipReason"])

  const summaryLines = [""]
  if (summaries.length === 0) {
    summaryLines.push("# No accounts found in SavedVariables")
  } else {
    for (const summary of summaries) {
      summaryLines.push(
        `# ${summary.account}: completed=${summary.completed}, apiVersion=${summary.apiVersion ?? "<unset>"}, lastSeenInvalidateVersion=${summary.lastSeenInvalidateVersion}`
      )
    }
  }
  if (sideFile === undefined) {
    summaryLines.push("# Side-file: <absent or placeholder>")
  } else {
    summaryLines.push(
      `# Side-file: version=${sideFile.version}, invalidateVersion=${sideFile.invalidateVersion}, invalidateDomains=${JSON.stringify(sideFile.invalidateDomains)}`
    )
  }

  process.stdout.write(`${tsv}\n${summaryLines.join("\n")}\n`)
}
