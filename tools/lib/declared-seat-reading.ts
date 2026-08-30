
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { ATTRIBUTES, type Attributes, type Claimant, type Mode } from "./attributes.ts"
import { FLEET } from "./compose-seat-name.ts"
import { type Documents, declaredPathReading, requiredReadingClosure } from "./domain.ts"
import type { Roots } from "../../page/page"
import type { SeatDocument } from "./seat-attribute.ts"
import { initiativePlaceOf } from "./seat-initiative.ts"
import { documentFor } from "./seat-resolve.ts"

export interface Warranted {
  readonly claimant: Claimant
  readonly slug: string
  readonly documents: readonly SeatDocument[] | null
}

function withAncestry(relPath: string, root: string, docs: Documents): readonly SeatDocument[] {
  return declaredPathReading(relPath, docs).map((at) => ({ root, relPath: at }))
}

function namedPageWarrant(
  slot: "persona" | "role",
  slug: string,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  const at = documentFor(slot, slug, root)
  return at === null ? null : withAncestry(at, root, docs)
}

export function personaWarrant(slug: string, root: string, docs: Documents): readonly SeatDocument[] | null {
  return namedPageWarrant("persona", slug, root, docs)
}

export function domainWarrant(slug: string, root: string, docs: Documents): readonly SeatDocument[] | null {
  const at = docs.domainAt(slug)
  return at === null ? null : withAncestry(at, root, docs)
}

export function roleWarrant(slug: string, root: string, docs: Documents): readonly SeatDocument[] | null {
  return namedPageWarrant("role", slug, root, docs)
}

export function initiativeWarrant(
  slug: string,
  roots: Roots,
  docs: Documents
): readonly SeatDocument[] | null {
  const root = rootFor(roots, AKASHA)
  const place = initiativePlaceOf(slug, root)
  if (place === null) return null
  const held: SeatDocument[] = [{ root, relPath: place.relPath }]
  const type = docs.domainAt(place.pageTypeSlug)
  if (type === null) return held
  return [...held, ...withAncestry(type, root, docs)]
}

export function onCallWarrant(root: string, docs: Documents): readonly SeatDocument[] | null {
  const at = docs.domainAt("seat-assignment-on-call")
  return at === null ? null : withAncestry(at, root, docs)
}

export function principalWarrant(
  principal: string,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  if (principal === FLEET) return []
  const at = docs.domainAt(principal)
  return at === null ? null : withAncestry(at, root, docs)
}

export function modeWarrant(mode: Mode, root: string, docs: Documents): readonly SeatDocument[] | null {
  const at = docs.domainAt(`seat-mode-${mode}`)
  return at === null ? null : withAncestry(at, root, docs)
}

export function withRequired(
  documents: readonly SeatDocument[] | null,
  root: string,
  docs: Documents
): readonly SeatDocument[] | null {
  if (documents === null) return null
  const here = documents.filter((one) => one.root === root).map((one) => one.relPath)
  const whole = new Map<string, SeatDocument>()
  for (const one of documents) whole.set(`${one.root}/${one.relPath}`, one)
  for (const relPath of requiredReadingClosure(here, docs)) whole.set(`${root}/${relPath}`, { root, relPath })
  return [...whole.values()]
}

export interface SeatStated {
  readonly attributes: Attributes
  readonly initiative: string | null
  readonly mode: Mode | null
  readonly onCall: boolean
  readonly principal: string | null
}

export function declaredSeatReading(
  stated: SeatStated,
  roots: Roots,
  docs: Documents
): readonly Warranted[] {
  const root = rootFor(roots, AKASHA)
  const out: Warranted[] = []
  for (const slot of ATTRIBUTES) {
    const one = stated.attributes[slot]
    if (one === undefined) continue
    const found =
      slot === "persona"
        ? personaWarrant(one.slug, root, docs)
        : slot === "domain"
          ? domainWarrant(one.slug, root, docs)
          : roleWarrant(one.slug, root, docs)
    out.push({ claimant: slot, slug: one.slug, documents: withRequired(found, root, docs) })
  }
  if (stated.initiative !== null) {
    const found = initiativeWarrant(stated.initiative, roots, docs)
    out.push({ claimant: "initiative", slug: stated.initiative, documents: withRequired(found, root, docs) })
  }
  if (stated.onCall) {
    const found = onCallWarrant(root, docs)
    out.push({ claimant: "on-call", slug: "on-call", documents: withRequired(found, root, docs) })
  }
  if (stated.principal !== null) {
    const found = principalWarrant(stated.principal, root, docs)
    out.push({ claimant: "principal", slug: stated.principal, documents: withRequired(found, root, docs) })
  }
  if (stated.mode !== null) {
    const found = modeWarrant(stated.mode, root, docs)
    out.push({ claimant: "mode", slug: stated.mode, documents: withRequired(found, root, docs) })
  }
  return out
}
