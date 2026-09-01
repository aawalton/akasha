import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { listedAt } from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../akasha/pages-system/page/page-export-name/page-export-name.module.code.ts"
import { kindsUnder } from "../../akasha/pages-system/page-type/page-type-descent/page-type-descent.module.code.ts"
import type { Roots } from "../../page/page.ts"
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { landInAkasha } from "./akasha-landing.ts"
import { personPrincipals } from "./compose-seat-name.ts"
import { type Outcome } from "./gated-write.ts"
import { domainAddressOf } from "./seat-page-slugs.ts"
import { principalSeatNameOf } from "./seat-principal.ts"
import type { Stated } from "./seat-stated.ts"

const DIR = "akasha/seat-system/seat/seats"

const SUFFIX = ".seat.ts"

const SCRATCH = "/var/tmp"

const WRITER = "seat-page-writer"

// A person and a persona each extend a domain, and an initiative is work toward one, so an
// assignment is addressed by whichever of these the slug names. The page type is not carried in
// from the old state, which knows only domains, so it is recovered here from what stands.
//
// These four state the order a slug standing under more than one is read in. What may hold an
// assignment is every type descending from a domain, which grows as types are added — a system
// stated as a workspace package rather than a domain is one — so coverage is asked of the page
// types rather than listed here. A list frozen here answers a bare slug for a page it cannot
// find, and a bare slug resolves under `domain` alone, so a seat silently warrants nothing.
const PREFERRED = ["domain", "person", "persona", "initiative"] as const

function assignedKinds(root: string): readonly string[] {
  const rest = [...kindsUnder(root, PREFERRED[0])].sort()
  return [
    ...PREFERRED,
    ...rest.filter((one) => !PREFERRED.includes(one as (typeof PREFERRED)[number])),
  ]
}

export function akashaSeatRelPath(seatName: string): string {
  return `${DIR}/${seatName}${SUFFIX}`
}

// Where every seat page stands, for a caller watching the store rather than addressing one seat in
// it. The directory is spelled here with the paths that reach into it rather than a second time at
// whoever watches.
export function akashaSeatsDirIn(root: string): string {
  return `${root}/${DIR}`
}

// Where a slug stands in akasha, it is addressed from there. The old lookup reads the tree the
// person pages have already left, and answers a bare name for a slug it no longer finds, so it
// stands behind rather than in front: three of the domains the seats name have yet to move, and
// their address is still only knowable there.
function assignmentAddressOf(named: string, root: string): string {
  for (const pageType of assignedKinds(root)) {
    if (listedAt(root, pageType, named).length > 0) return `${pageType}/${named}`
  }
  return domainAddressOf(named, root)
}

function said(value: string): string {
  return JSON.stringify(value)
}

export function akashaSeatBody(
  stated: Stated,
  seatName: string,
  roots: Roots,
  parentName: string | null = null
): string | null {
  const root = rootFor(roots, AKASHA)
  const persona = stated.attributes.persona?.slug ?? null
  const domain = stated.attributes.domain?.slug ?? null
  const role = stated.attributes.role?.slug ?? null
  const principal = stated.principal?.value ?? null
  const mode = stated.recordedMode?.value ?? null
  const registration = stated.registration?.value ?? null
  // A seat page in akasha states all of these or is not a seat page. The old system lets a seat
  // stand without a persona, a start mode or a registration, so a seat short of one composes
  // nothing here and the caller is told it went unstated.
  if (persona === null || domain === null || role === null || principal === null) return null
  if (mode === null || registration === null) return null
  const person = personPrincipals(root).includes(principal)
  const above = person ? null : (parentName ?? principalSeatNameOf(stated.agent))
  if (!person && (above === null || above === "")) return null
  const lines: string[] = [
    'import type { Seat } from "../seat.page-type.ts"',
    "",
    `export const ${exportedAs(seatName)} = {`,
    `  id: ${said(stated.agent)},`,
    '  pageTypeSlug: "seat",',
    `  slug: ${said(seatName)},`,
    `  personaSlug: ${said(persona)},`,
    `  assignmentSlug: ${said(assignmentAddressOf(domain, root))},`,
    `  roleSlug: ${said(role)},`,
    person ? `  personSlug: ${said(principal)},` : `  principalSeatName: ${said(above as string)},`,
    `  startMode: ${said(mode)},`,
    `  onCall: ${stated.onCall ? "true" : "false"},`,
    `  registrationAccount: ${said(registration)},`,
    // The one value observed of a seat that the page carries. It cannot be observed again, so it
    // outlives the page rather than standing beside it.
    ...(stated.session === null ? [] : [`  claudeCodeSessionUuid: ${said(stated.session.value)},`]),
    "} as const satisfies Seat",
    "",
  ]
  return lines.join("\n")
}

function landing(root: string, args: readonly string[]): Outcome {
  return landInAkasha(WRITER, root, args)
}

export function writeAkashaSeatPage(
  stated: Stated,
  seatName: string,
  roots: Roots,
  parentName: string | null = null
): Outcome {
  const root = rootFor(roots, AKASHA)
  const body = akashaSeatBody(stated, seatName, roots, parentName)
  if (body === null) return { kind: "unstated" }
  const absolute = `${root}/${akashaSeatRelPath(seatName)}`
  if (existsSync(absolute) && readFileSync(absolute, "utf8") === body) {
    return { kind: "unchanged" }
  }
  const dir = mkdtempSync(join(SCRATCH, "akasha-seat-body-"))
  try {
    const bodyPath = join(dir, "body.ts")
    writeFileSync(bodyPath, body, "utf8")
    return landing(root, [
      "write",
      "--file-path",
      absolute,
      "--content-file",
      bodyPath,
      "--message",
      `${seatName}: the seat stands in akasha as what it states`,
    ])
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function removeAkashaSeatPage(seatName: string, roots: Roots, stopReason: string): Outcome {
  const root = rootFor(roots, AKASHA)
  const absolute = `${root}/${akashaSeatRelPath(seatName)}`
  if (!existsSync(absolute)) return { kind: "unchanged" }
  const taken = landing(root, [
    "write",
    "--remove",
    absolute,
    "--message",
    `${seatName} stopped, ${stopReason}, so its page goes`,
  ])
  return taken.kind === "written" ? { kind: "removed" } : taken
}
