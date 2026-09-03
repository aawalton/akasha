import { readdirSync } from "node:fs"
import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import {
  type AlertRecipient,
  type AlertRequirementRow,
  decideAlertRecipient,
} from "@akasha/seat-system/alert-recipient-decide"
import {
  type BlockedPrincipal,
  decideBlockedPrincipal,
} from "@akasha/seat-system/blocked-principal-decide"
import {
  type DerivedRecipient,
  type DomainLead,
  type DomainOwnerWalk,
  decideDomainLead,
  recipientFromLead,
} from "@akasha/seat-system/domain-lead-decide"
import { diskFileTree } from "../../page/file-tree.ts"
import { domainKindTest } from "../../page/page-types.ts"
import { registryOf } from "../../page/property/registry.ts"
import { championsStanding } from "./akasha-personas.ts"
import { championOf, championsAt } from "./domain.ts"
import { scan } from "./seat-resolve.ts"

export async function resolveBlockedPrincipal(agentName: string | null): Promise<BlockedPrincipal> {
  return decideBlockedPrincipal({ agentName })
}

export type DomainOwnerReader = (domain: string) => DomainOwnerWalk

export function walkDomainOwner(
  domain: string,
  root: string = rootFor(resolveRoots(), AKASHA)
): DomainOwnerWalk {
  const found = scan(root)
  const at = found.slugs.get(domain.trim())
  if (at === undefined) return { declared: false, persona: null, at: null }
  const isDomain = domainKindTest(registryOf(diskFileTree(resolveRoots())))
  const championAt = championsAt(championsStanding(root), found.frontmatter, found.slugs, isDomain)
  const owner = championOf(at, found.docs, championAt)
  if (owner === null) return { declared: true, persona: null, at: null }
  return { declared: true, persona: owner.persona, at: owner.at }
}

export async function resolveDomainLead(
  domain: string,
  walk: DomainOwnerReader = walkDomainOwner
): Promise<DomainLead> {
  try {
    return decideDomainLead(domain, walk(domain))
  } catch (err) {
    return {
      kind: "unresolved",
      reason: `reading the instructions documents to resolve the persona of '${domain}' failed: ${String(err)}`,
    }
  }
}

export type AlertRequirementReader = () =>
  | readonly AlertRequirementRow[]
  | Promise<readonly AlertRequirementRow[]>

const ALERT_PAGE_TYPE = "alert"

const ALERT_PAGE_SUFFIX = ".alert.ts"

const AKASHA_FOLDER = "akasha"

const VENDORED = "node_modules"

export function alertPagesUnder(at: string): readonly string[] {
  const found: string[] = []
  for (const one of readdirSync(at, { withFileTypes: true, recursive: true })) {
    if (!one.isFile() || !one.name.endsWith(ALERT_PAGE_SUFFIX)) continue
    if (one.parentPath.includes(`${VENDORED}/`) || one.parentPath.endsWith(VENDORED)) continue
    found.push(join(one.parentPath, one.name))
  }
  return found
}

export function alertRowOf(value: unknown): AlertRequirementRow | null {
  if (typeof value !== "object" || value === null) return null
  const page = value as Record<string, unknown>
  if (page.pageTypeSlug !== ALERT_PAGE_TYPE || typeof page.slug !== "string") return null
  return {
    slug: page.slug,
    domain: typeof page.domain === "string" ? page.domain : null,
    person: typeof page.personSlug === "string" ? page.personSlug : null,
  }
}

export async function readAlertRequirements(
  root: string = rootFor(resolveRoots(), AKASHA)
): Promise<readonly AlertRequirementRow[]> {
  const rows: AlertRequirementRow[] = []
  for (const at of alertPagesUnder(join(root, AKASHA_FOLDER))) {
    const held = (await import(at)) as Record<string, unknown>
    for (const value of Object.values(held)) {
      const row = alertRowOf(value)
      if (row !== null) rows.push(row)
    }
  }
  return rows
}

export async function resolveAlertRecipient(
  alert: string,
  read: AlertRequirementReader = readAlertRequirements
): Promise<AlertRecipient> {
  try {
    return decideAlertRecipient(alert, await read())
  } catch (err) {
    return {
      kind: "unresolved",
      reason: `reading the alert documents to resolve the recipient of ${JSON.stringify(alert)} failed: ${String(err)}`,
    }
  }
}

export async function resolveDomainLeadOrDefault(
  domain: string,
  defaultHandle: string,
  walk: DomainOwnerReader = walkDomainOwner
): Promise<DerivedRecipient> {
  return recipientFromLead(await resolveDomainLead(domain, walk), defaultHandle)
}
