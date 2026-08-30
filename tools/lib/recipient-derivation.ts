import { diskFileTree } from "../../page/file-tree.ts"
import { textField } from "../../page/frontmatter.ts"
import { domainKindTest } from "../../page/page-types.ts"
import { registryOf } from "../../page/property/registry.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { championsStanding } from "./akasha-personas.ts"
import {
  type AlertRecipient,
  type AlertRequirementRow,
  decideAlertRecipient,
} from "./decide-alert-recipient.ts"
import { type BlockedPrincipal, decideBlockedPrincipal } from "./decide-blocked-principal.ts"
import {
  type DerivedRecipient,
  type DomainLead,
  type DomainOwnerWalk,
  decideDomainLead,
  recipientFromLead,
} from "./decide-domain-lead.ts"
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

export type AlertRequirementReader = () => readonly AlertRequirementRow[]

const ALERT_PAGE_TYPE = "alert"

export function readAlertRequirements(
  root: string = rootFor(resolveRoots(), AKASHA)
): readonly AlertRequirementRow[] {
  const found = scan(root)
  const rows: AlertRequirementRow[] = []
  for (const [slug, at] of found.slugs) {
    const fm = found.docs.frontmatterOf(at)
    if (fm === null || pageTypeOf(at) !== ALERT_PAGE_TYPE) continue
    rows.push({ slug, domain: textField(fm, "domain"), person: textField(fm, "person-slug") })
  }
  return rows
}

export async function resolveAlertRecipient(
  alert: string,
  read: AlertRequirementReader = readAlertRequirements
): Promise<AlertRecipient> {
  try {
    return decideAlertRecipient(alert, read())
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
