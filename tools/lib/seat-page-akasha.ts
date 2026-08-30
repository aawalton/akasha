import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { standingAt } from "../../akasha/pages-system/indexes/index-reading/index-reading.module.code.ts"
import { exportedAs } from "../../akasha/pages-system/page/page-export-name/page-export-name.module.code.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { personPrincipals } from "./compose-seat-name.ts"
import { type Outcome, type Run, whyRefused } from "./gated-write.ts"
import { domainAddressOf, initiativeSlugOf } from "./seat-page-slugs.ts"
import { principalSeatNameOf } from "./seat-principal.ts"
import type { Stated } from "./seat-stated.ts"

const DIR = "akasha/seat-system/seat/seats"

const SUFFIX = ".seat.ts"

const CLI = "akasha/command-system/cli/cli.module.code.ts"

const SCRATCH = "/var/tmp"

const WRITER = "seat-page-writer"

// The gate asks for a record of every page a body answers to, and names each one it wants read.
// The set is the seat's type and everything that type extends, which changes as the type does, so
// it is taken from what the refusal names rather than listed here.
const WANTED = /--file-path\s+(\S+)/g

const ROUNDS = 4

// A person and a persona each extend a domain, so an assignment is addressed by whichever of these
// the slug names.
const ASSIGNED = ["domain", "person", "persona"] as const

export function akashaSeatRelPath(seatName: string): string {
  return `${DIR}/${seatName}${SUFFIX}`
}

// Where a slug stands in akasha, it is addressed from there. The old lookup reads the tree the
// person pages have already left, and answers a bare name for a slug it no longer finds, so it
// stands behind rather than in front: three of the domains the seats name have yet to move, and
// their address is still only knowable there.
function assignmentAddressOf(named: string, root: string): string {
  for (const pageType of ASSIGNED) {
    if (standingAt(root, pageType, named).length > 0) return `${pageType}/${named}`
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
  const initiative =
    stated.initiative === null ? null : initiativeSlugOf(stated.initiative.value, root)
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
    person
      ? `  personSlug: ${said(principal)},`
      : `  principalSeatName: ${said(above as string)},`,
    `  startMode: ${said(mode)},`,
    `  onCall: ${stated.onCall ? "true" : "false"},`,
    `  registrationAccount: ${said(registration)},`,
    ...(initiative === null ? [] : [`  initiativeSlug: ${said(initiative)},`]),
    // The one value observed of a seat that the page carries. It cannot be observed again, so it
    // outlives the page rather than standing beside it.
    ...(stated.session === null ? [] : [`  claudeCodeSessionUuid: ${said(stated.session.value)},`]),
    "} as const satisfies Seat",
    "",
  ]
  return lines.join("\n")
}

function run(root: string, args: readonly string[]): Run {
  const dir = mkdtempSync(join(SCRATCH, "akasha-seat-"))
  const outPath = join(dir, "out.txt")
  try {
    const sink = Bun.file(outPath)
    const proc = Bun.spawnSync([process.execPath, `${root}/${CLI}`, ...args], {
      stdout: sink,
      stderr: sink,
      env: { ...process.env, AGENT_ID: WRITER, ACTING_AGENT_ID: "" },
    })
    let output = ""
    try {
      output = readFileSync(outPath, "utf8")
    } catch {
      output = ""
    }
    return { code: proc.exitCode ?? 1, output }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

// A read whose output reaches nobody records nothing, and the door refuses one that is piped. The
// output here lands in a file the writer reads back, which the door takes, so the record stands.
function reading(root: string, paths: readonly string[]): string | null {
  for (const path of paths) {
    const read = run(root, ["read", "--file-path", path])
    if (read.code !== 0) return whyRefused(read.output)
  }
  return null
}

function wantedIn(output: string): readonly string[] {
  const found = new Set<string>()
  for (const [, path] of output.matchAll(WANTED)) if (path !== undefined) found.add(path)
  return [...found]
}

function landing(root: string, args: readonly string[]): Outcome {
  let asked = run(root, args)
  for (let round = 0; round < ROUNDS && asked.code !== 0; round += 1) {
    const wanted = wantedIn(asked.output)
    if (wanted.length === 0) break
    const refused = reading(root, wanted)
    if (refused !== null) return { kind: "refused", detail: refused }
    asked = run(root, args)
  }
  if (asked.code !== 0) return { kind: "refused", detail: whyRefused(asked.output) }
  return { kind: "written" }
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
