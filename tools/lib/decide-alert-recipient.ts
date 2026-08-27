
export interface AlertRequirementRow {
  readonly slug: string
  readonly domain: string | null
  readonly person: string | null
}

export const ALERT_ROLE = "operator"

export type AlertRecipient =
  | { readonly kind: "domain"; readonly domain: string; readonly role: string }
  | { readonly kind: "person"; readonly person: string }
  | { readonly kind: "unresolved"; readonly reason: string }

function trimmed(value: string | null): string | null {
  const it = (value ?? "").trim()
  return it === "" ? null : it
}

export function decideAlertRecipient(
  alert: string,
  alerts: readonly AlertRequirementRow[]
): AlertRecipient {
  const wanted = alert.trim()
  if (wanted.length === 0) {
    return { kind: "unresolved", reason: "no alert was named, so no requirement can be read." }
  }

  const matched = alerts.filter((one) => one.slug.trim() === wanted)
  const [only] = matched
  if (only === undefined) {
    return {
      kind: "unresolved",
      reason:
        `no alert document declares \`slug: ${wanted}\` (${alerts.length} read). The ` +
        "condition fires with nothing stating who answers for it, so there is no requirement to " +
        "read and no recipient to derive — a document under `domains/alerts/` is what settles it.",
    }
  }
  if (matched.length > 1) {
    return {
      kind: "unresolved",
      reason:
        `${matched.length} alert documents declare \`slug: ${wanted}\`; refusing to pick ` +
        "one silently.",
    }
  }

  const domain = trimmed(only.domain)
  const person = trimmed(only.person)
  if (domain !== null && person !== null) {
    return {
      kind: "unresolved",
      reason:
        `alert '${wanted}' states both \`domain: ${domain}\` and \`person-slug: ${person}\`, which are ` +
        "two different recipients; refusing to pick one silently.",
    }
  }
  if (domain !== null) return { kind: "domain", domain, role: ALERT_ROLE }
  if (person !== null) return { kind: "person", person }
  return {
    kind: "unresolved",
    reason:
      `alert '${wanted}' states neither \`domain:\` nor \`person-slug:\`, so its document names nobody ` +
      "to reach. The alert fires and lands nowhere until one of the two is stated on it.",
  }
}
