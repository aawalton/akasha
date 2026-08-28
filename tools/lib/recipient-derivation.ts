
import { type BlockedPrincipal, decideBlockedPrincipal } from "./decide-blocked-principal.ts"
import {
  type AlertRecipient,
  type AlertRequirementRow,
  decideAlertRecipient,
} from "./decide-alert-recipient.ts"
import {
  decideDomainLead,
  type DerivedRecipient,
  type DomainLead,
  type DomainOwnerWalk,
  recipientFromLead,
} from "./decide-domain-lead.ts"
import { championOf } from "./domain.ts"
import { textField } from "../../page/frontmatter.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots"
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
  const owner = championOf(at, found.docs)
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
    // THE NAME SETTLES THE PAGE TYPE. This took every page whose `page-type-slug:` said `alert` as
    // an alert requirement, so a file of some other kind claiming `alert` was routed as one and a
    // real `.alert.md` page claiming otherwise was passed over.
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
