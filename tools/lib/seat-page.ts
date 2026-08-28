import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { pageStemOf } from "../../page/name/name.ts"
import { placeHolding, rootOfPlace, SEAT_PLACES, SEAT_WRITE } from "./agent-page-place.ts"
import { personPrincipals } from "./compose-seat-name.ts"
import { documentsOnDemand } from "./documents-on-demand.ts"
import { addressOf, slugNamed } from "../../page/page-address.ts"
import { pageTypeOf } from "../../pages-system/page-type/page-type.ts"
import { removeUncommitted } from "../../page/uncommitted/uncommitted.ts"
import { type Roots } from "../../page/page.ts"
import { AKASHA, resolveRoots, rootFor } from "../../repo/roots/roots.ts"
import { initiativesIn } from "./seat-initiative.ts"
import { principalSeatNameOf } from "./seat-principal.ts"
import { frontmatterOf, seatPageForAgent } from "./seat-presence-read.ts"
import { clipErrand } from "./seat-errand.ts"
import type { Stated } from "./seat-stated.ts"
import { type Outcome, whyRefused, writerFor } from "./gated-write.ts"

const PAGE_TYPE = "seat"

const PAGE_SUFFIX = ".md"

const SCRATCH = "/var/tmp"

const WRITER = "seat-page-writer"

export function seatPageRelPath(seatName: string): string {
  return `${SEAT_WRITE.dir}/${seatName}.${PAGE_TYPE}${PAGE_SUFFIX}`
}

function initiativeSlugOf(stated: string, root: string): string {
  const at = initiativesIn(root).get(stated) ?? []
  const [only] = at
  if (at.length !== 1 || only === undefined) return stated
  const slug = frontmatterOf(`${root}/${only}`)?.["slug"]
  return typeof slug === "string" && slug !== "" ? slug : stated
}

function domainAddress(named: string, root: string): string {
  const at = documentsOnDemand(root).domainAt(named)
  const type = at === null ? null : pageTypeOf(at)
  return type === null ? named : addressOf(type, slugNamed(named))
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
    `domain-slug: ${domainAddress(domain, rootFor(roots, AKASHA))}`,
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
  const task = stated.task?.value ?? null
  if (task !== null) lines.push(`task-slug: ${task}`)
  if (stated.initiative !== null) {
    lines.push(`initiative-slug: ${initiativeSlugOf(stated.initiative.value, rootFor(roots, AKASHA))}`)
  }
  if (stated.errand !== null) {
    lines.push(`errand: ${JSON.stringify(clipErrand(stated.errand.value))}`)
  }
  if (stated.registration !== null) {
    lines.push(`registration-account: ${stated.registration.value}`)
  }
  if (stated.session !== null) {
    lines.push(`claude-code-session-uuid: ${stated.session.value}`)
  }
  if (stated.rotated !== null) {
    lines.push(`rotated-session-uuid: ${stated.rotated.value}`)
  }
  if (stated.transcript !== null) {
    lines.push(`transcript-path: ${stated.transcript.value}`)
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
  if (taken.code === 0) removeUncommitted(standing)
}

export function writeSeatPage(stated: Stated, seatName: string, parentName: string | null = null): Outcome {
  const roots = resolveRoots()
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
  removeUncommitted(page)
  return { kind: "removed" }
}
