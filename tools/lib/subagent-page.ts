import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs"
import { basename, join } from "node:path"
import { stemOf as slugOf } from "../../page/name/name.ts"
import {
  dirsOfPlaces,
  placeHolding,
  rootOfPlace,
  SUBAGENT_PLACES,
  SUBAGENT_WRITE,
} from "./agent-page-place.ts"
import { type Outcome, whyRefused, writerFor } from "./gated-write.ts"
import { frontmatterOf, seatPageForAgent } from "./seat-presence-read.ts"
import type { StandingSubagent } from "./subagent-guard.ts"
import { SUBAGENT_MARK, seatAbove, subagentUnder } from "./subagent.ts"

const PAGE_TYPE = "subagent"

const PAGE_SUFFIX = ".md"

const SCRATCH = "/var/tmp"

const WRITER = "subagent-page-writer"

const runTool = writerFor(WRITER)

function seatNameOf(agent: string): string | null {
  const seat = seatAbove(agent)
  if (seat === null) return null
  const page = seatPageForAgent(seat)
  return page === null ? null : slugOf(page)
}

export function subagentPageRelPath(seatName: string, own: string): string {
  return `${SUBAGENT_WRITE.dir}/${seatName}${SUBAGENT_MARK}${own}.${PAGE_TYPE}${PAGE_SUFFIX}`
}

function spellingsOf(seatName: string, own: string): readonly string[] {
  const stem = `${seatName}${SUBAGENT_MARK}${own}`
  return [`${stem}.${PAGE_TYPE}${PAGE_SUFFIX}`, `${stem}${PAGE_SUFFIX}`]
}

export function subagentPagePathFor(agent: string): string | null {
  const own = subagentUnder(agent)
  const seatName = seatNameOf(agent)
  if (own === null || seatName === null) return null
  for (const dir of dirsOfPlaces(SUBAGENT_PLACES)) {
    for (const name of spellingsOf(seatName, own)) {
      const at = `${dir}/${name}`
      if (existsSync(at)) return at
    }
  }
  const root = rootOfPlace(SUBAGENT_WRITE)
  return root === null ? null : `${root}/${subagentPageRelPath(seatName, own)}`
}

function standingId(absolute: string): string | null {
  const held = frontmatterOf(absolute)?.["id"]
  return typeof held === "string" && held !== "" ? held : null
}

export function subagentPageBody(id: string, name: string, dispatchedAs: string, own: string): string {
  return [
    "---",
    `page-type-slug: ${PAGE_TYPE}`,
    `id: ${id}`,
    `slug: ${name}`,
    `title: "${name}"`,
    `subagent-type: ${dispatchedAs}`,
    `subagent-id: ${own}`,
    "---",
    "",
  ].join("\n")
}

export function writeSubagentPage(agent: string, dispatchedAs: string): Outcome {
  const own = subagentUnder(agent)
  const seatName = seatNameOf(agent)
  if (own === null || seatName === null || dispatchedAs === "") return { kind: "unstated" }
  const relPath = subagentPageRelPath(seatName, own)
  const absolute = subagentPagePathFor(agent)
  if (absolute === null) return { kind: "unstated" }
  const standing = existsSync(absolute) ? readFileSync(absolute, "utf8") : null
  const held = standing === null ? null : standingId(absolute)
  const name = `${seatName}${SUBAGENT_MARK}${own}`
  const body = subagentPageBody(held ?? Bun.randomUUIDv7(), name, dispatchedAs, own)
  if (standing === body) return { kind: "unchanged" }
  if (standing !== null) {
    const recorded = runTool("read.ts", ["--file-path", absolute])
    if (recorded.code !== 0) {
      return {
        kind: "refused",
        detail: `reading ${relPath} was not recorded, so the write would be refused for clobbering unread work`,
      }
    }
  }
  const dir = mkdtempSync(join(SCRATCH, "subagent-page-"))
  try {
    const bodyPath = join(dir, "body.md")
    writeFileSync(bodyPath, body, "utf8")
    const wrote = runTool(
      "write.ts",
      [
        "--repo",
        (placeHolding(absolute, SUBAGENT_PLACES) ?? SUBAGENT_WRITE).repo,
        "--file-path",
        absolute,
        "--content-file",
        bodyPath,
        "--mechanical",
        "--message",
        `${name}: a subagent states the kind it was dispatched as`,
      ]
    )
    return wrote.code === 0 ? { kind: "written" } : { kind: "refused", detail: whyRefused(wrote.output) }
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

export function removeSubagentPage(agent: string): Outcome {
  const own = subagentUnder(agent)
  const seatName = seatNameOf(agent)
  if (own === null || seatName === null) return { kind: "unchanged" }
  const absolute = subagentPagePathFor(agent)
  if (absolute === null || !existsSync(absolute)) return { kind: "unchanged" }
  const taken = runTool(
    "rm.ts",
    [
      absolute,
      "--repo",
      (placeHolding(absolute, SUBAGENT_PLACES) ?? SUBAGENT_WRITE).repo,
      "--message",
      `${seatName}${SUBAGENT_MARK}${own} returned, so its page goes; what it was stands in this repo's history`,
    ]
  )
  return taken.code === 0 ? { kind: "removed" } : { kind: "refused", detail: whyRefused(taken.output) }
}

function standingPagePathsOf(seatName: string): readonly string[] {
  const mark = `${seatName}${SUBAGENT_MARK}`
  const found: string[] = []
  for (const dir of dirsOfPlaces(SUBAGENT_PLACES)) {
    if (!existsSync(dir)) continue
    for (const name of readdirSync(dir)) {
      if (name.startsWith(mark) && name.endsWith(PAGE_SUFFIX)) found.push(`${dir}/${name}`)
    }
  }
  return found
}

export function standingSubagentsOf(seat: string): readonly StandingSubagent[] {
  const page = seatPageForAgent(seat)
  if (page === null) return []
  const seatName = slugOf(page)
  return standingPagePathsOf(seatName).map((absolute) => {
    const stated = frontmatterOf(absolute)?.["subagent-type"]
    return {
      name: slugOf(absolute),
      dispatchedAs: typeof stated === "string" && stated !== "" ? stated : "unstated",
    }
  })
}

export function removeSubagentPagesOf(seat: string, why: string): Outcome {
  const page = seatPageForAgent(seat)
  if (page === null) return { kind: "unchanged" }
  const seatName = slugOf(page)
  const standing = standingPagePathsOf(seatName)
  if (standing.length === 0) return { kind: "unchanged" }
  const byRepo = new Map<string, string[]>()
  for (const one of standing) {
    const repo = (placeHolding(one, SUBAGENT_PLACES) ?? SUBAGENT_WRITE).repo
    byRepo.set(repo, [...(byRepo.get(repo) ?? []), one])
  }
  for (const [repo, paths] of byRepo) {
    const taken = runTool("rm.ts", [
      ...paths,
      "--repo",
      repo,
      "--message",
      `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) standing under it go`,
    ])
    if (taken.code !== 0) return { kind: "refused", detail: whyRefused(taken.output) }
  }
  return { kind: "removed" }
}
