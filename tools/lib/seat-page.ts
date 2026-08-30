import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pageStemOf } from "../../page/name/name.ts"
import { placeHolding, rootOfPlace, SEAT_PLACES, SEAT_WRITE } from "./agent-page-place.ts"
import { personPrincipals } from "./compose-seat-name.ts"
import { removeBeside } from "./seat-beside.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { removeAkashaSeatPage, writeAkashaSeatPage } from "./seat-page-akasha.ts"
import { domainAddressOf, initiativeSlugOf } from "./seat-page-slugs.ts"
import { principalSeatNameOf } from "./seat-principal.ts"
import { seatPageForAgent } from "./seat-presence-read.ts"
import type { Stated } from "./seat-stated.ts"
import { type Outcome, whyRefused, writerFor } from "./gated-write.ts"

const PAGE_TYPE = "seat"

const PAGE_SUFFIX = ".md"

const SCRATCH = "/var/tmp"

const WRITER = "seat-page-writer"

export function seatPageRelPath(seatName: string): string {
  return `${SEAT_WRITE.dir}/${seatName}.${PAGE_TYPE}${PAGE_SUFFIX}`
}

export function seatPageBody(
  stated: Stated,
  seatName: string,
  roots: Roots,
  parentName: string | null = null
): string | null {
  const agent = stated.agent
  const persona = stated.attributes.persona?.slug ?? null
  const domain = stated.attributes.domain?.slug ?? null
  const role = stated.attributes.role?.slug ?? null
  const principal = stated.principal?.value ?? null
  if (domain === null || role === null || principal === null) return null
  const lines: string[] = [
    "---",
    `page-type-slug: ${PAGE_TYPE}`,
    `id: ${agent}`,
    `slug: ${seatName}`,
    `title: "${seatName}"`,
    ...(persona === null ? [] : [`persona-slug: ${persona}`]),
    `domain-slug: ${domainAddressOf(domain, rootFor(roots, AKASHA))}`,
    `role-slug: ${role}`,
  ]
  const person = personPrincipals(rootFor(roots, AKASHA)).includes(principal)
  if (person) lines.push(`person-slug: ${principal}`)
  else {
    const above = parentName ?? principalSeatNameOf(agent)
    if (above === null || above === "") return null
    lines.push(`principal-seat-name: ${above}`)
  }
  if (stated.recordedMode !== null) lines.push(`start-mode: ${stated.recordedMode.value}`)
  if (stated.onCall) lines.push("on-call: true")
  if (stated.initiative !== null) {
    lines.push(`initiative-slug: ${initiativeSlugOf(stated.initiative.value, rootFor(roots, AKASHA))}`)
  }
  if (stated.registration !== null) {
    lines.push(`registration-account: ${stated.registration.value}`)
  }
  // WHAT A SEAT IS BOUND TO IS COMMITTED, AND IT IS THE ONE OBSERVED VALUE THAT IS. The other
  // eleven come back by being observed again; this one cannot. A session is not re-derivable from
  // anything the machine still holds, so beside the page it lives exactly as long as the page
  // does, and both go together when a seat stops or is swept.
  //
  // It was taken off the page on the 29th, when resuming a seat whose page had gone was given up
  // rather than paid for. The day after, the version walk killed every supervisor, the sweep took
  // all nine pages as it is meant to, and what those seats were bound to survived in one place
  // nothing was reading. Committed, it is in the history, which is where a seat's attributes are
  // read back from after its page goes.
  if (stated.session !== null) {
    lines.push(`claude-code-session-uuid: ${stated.session.value}`)
  }
  lines.push("---", "")
  return lines.join("\n")
}

const runTool = writerFor(WRITER)

function takeAnyOtherPage(agent: string, seatName: string): void {
  const standing = seatPageForAgent(agent)
  if (standing === null || pageStemOf(standing) === seatName) return
  const was = pageStemOf(standing)
  const place = placeHolding(standing, SEAT_PLACES)
  if (place === null) return
  const taken = runTool(
    "rm.ts",
    [
      standing,
      "--repo",
      place.repo,
      "--message",
      `${was} is now ${seatName}, and a seat has one page`,
    ]
  )
  if (taken.code === 0) removeBeside(standing)
}

// The second write is the migration's, and nothing reads a seat from akasha yet. What it says is
// said where it can be seen rather than returned, so a seat whose page landed is never reported as
// one whose page did not.
function alsoInAkasha(
  stated: Stated,
  seatName: string,
  roots: Roots,
  parentName: string | null
): void {
  let said: Outcome
  try {
    said = writeAkashaSeatPage(stated, seatName, roots, parentName)
  } catch (thrown) {
    said = { kind: "refused", detail: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  if (said.kind === "refused") {
    process.stderr.write(`${seatName}'s page stands, and its page in akasha does not: ${said.detail}\n`)
  }
}

export function writeSeatPage(stated: Stated, seatName: string, parentName: string | null = null): Outcome {
  const roots = resolveRoots()
  const said = writingOld(stated, seatName, roots, parentName)
  if (said.kind !== "unstated") alsoInAkasha(stated, seatName, roots, parentName)
  return said
}

function writingOld(
  stated: Stated,
  seatName: string,
  roots: Roots,
  parentName: string | null
): Outcome {
  const body = seatPageBody(stated, seatName, roots, parentName)
  if (body === null) return { kind: "unstated" }
  takeAnyOtherPage(stated.agent, seatName)
  const relPath = seatPageRelPath(seatName)
  const root = rootOfPlace(SEAT_WRITE, roots)
  if (root === null) return { kind: "unstated" }
  const absolute = `${root}/${relPath}`
  const standing = existsSync(absolute) ? readFileSync(absolute, "utf8") : null
  if (standing === body) return { kind: "unchanged" }
  if (standing !== null) {
    const recorded = runTool("read.ts", ["--file-path", absolute])
    if (recorded.code !== 0) {
      return {
        kind: "refused",
        detail: `reading ${relPath} was not recorded, so the write would be refused for clobbering unread work: ${recorded.output.trim()}`,
      }
    }
  }
  const dir = mkdtempSync(join(SCRATCH, "seat-page-"))
  try {
    const bodyPath = join(dir, "body.md")
    writeFileSync(bodyPath, body, "utf8")
    const wrote = runTool(
      "write.ts",
      [
        "--repo",
        SEAT_WRITE.repo,
        "--file-path",
        absolute,
        "--content-file",
        bodyPath,
        "--mechanical",
        "--message",
        `${seatName}: the seat page is composed from what the seat states`,
      ]
    )
    return wrote.code === 0 ? { kind: "written" } : { kind: "refused", detail: whyRefused(wrote.output) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function removeSeatPage(agent: string, stopReason: string): Outcome {
  const page = seatPageForAgent(agent)
  if (page === null) return { kind: "unchanged" }
  const seatName = pageStemOf(page)
  const place = placeHolding(page, SEAT_PLACES)
  if (place === null) return { kind: "unchanged" }
  const taken = runTool(
    "rm.ts",
    [
      page,
      "--repo",
      place.repo,
      "--message",
      `${seatName} stopped, ${stopReason}, so its page goes; its attributes stand in this repo's history`,
    ]
  )
  if (taken.code !== 0) {
    const detail = whyRefused(taken.output)
    process.stderr.write(
      `${seatName}'s page stands, so this seat goes on reading as one an agent is present in: ${detail}\n`
    )
    return { kind: "refused", detail }
  }
  removeBeside(page)
  let gone: Outcome
  try {
    gone = removeAkashaSeatPage(seatName, resolveRoots(), stopReason)
  } catch (thrown) {
    gone = { kind: "refused", detail: thrown instanceof Error ? thrown.message : String(thrown) }
  }
  if (gone.kind === "refused") {
    process.stderr.write(
      `${seatName}'s page is gone, and its page in akasha stands: ${gone.detail}\n`
    )
  }
  return { kind: "removed" }
}
