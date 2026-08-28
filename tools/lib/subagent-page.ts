/**
 * Landing and taking away a subagent's page.
 *
 * WHERE THE PAGES ARE AND WHICH STAND IS `subagent-page-read.ts`, and this imports it rather than
 * holding it. Every reader of a subagent's turn asks only where the page is; while that answer sat
 * here, asking it loaded `gated-write.ts` below, and with it a subprocess spawner that only runs
 * under bun. See that file for the finding.
 */

import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { dirsOfPlaces, placeHolding, SUBAGENT_PLACES, SUBAGENT_WRITE } from "./agent-page-place.ts"
import { type Outcome, whyRefused, writerFor } from "./gated-write.ts"
import { pageStemOf } from "../../page/name/name.ts"
import { frontmatterOf, seatNameForAgent } from "./seat-presence-read.ts"
import type { StandingSubagent } from "./subagent-guard.ts"
import { SUBAGENT_MARK, subagentUnder } from "./subagent.ts"
import {
  standingPagePathsOf,
  subagentPagePathFor,
  subagentPageRelPath,
  subagentSeatName,
  SUBAGENT_PAGE_SUFFIX,
  SUBAGENT_PAGE_TYPE,
} from "./subagent-page-read.ts"

const READINGS_SUFFIX = ".readings.uncommitted.attachment.json"

const SCRATCH = "/var/tmp"

const WRITER = "subagent-page-writer"

const runTool = writerFor(WRITER)

function standingId(absolute: string): string | null {
  const held = frontmatterOf(absolute)?.["id"]
  return typeof held === "string" && held !== "" ? held : null
}

export function subagentPageBody(id: string, name: string, dispatchedAs: string, own: string): string {
  return [
    "---",
    `page-type-slug: ${SUBAGENT_PAGE_TYPE}`,
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
  const seatName = subagentSeatName(agent)
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
  const seatName = subagentSeatName(agent)
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

/**
 * Readings sidecars standing under a seat with no page beside them.
 *
 * NOTHING ELSE CAN REACH THESE. `rm` takes a page's sidecars only as a consequence of taking the
 * page, and `standingPagePathsOf` collects names ending `SUBAGENT_PAGE_SUFFIX` and nothing else, so
 * a sidecar whose page has already gone is invisible to every sweep there is. No cutoff reaches one
 * either: a delegate page carries no uncommitted file, so `replacedAt` over it is always 0 and
 * `vouched` expires nothing. One such file stood in this repository with no page beside it when this
 * was written, which is what says the leak is real rather than possible.
 *
 * IT ERRS TOWARD KEEPING. A sidecar goes only where its own page is absent and only under the seat
 * being swept, and that sweep runs when a seat's process has just been replaced. The one live record
 * it could take is a page's in the seconds between its removal and its remake — and reaching that
 * needs the seat's process to have been replaced inside those seconds, by which point the delegate
 * holding it is gone with the process anyway. Widening this to take a sidecar whose page merely
 * looks idle would take live records, which is the fault this whole area is about.
 */
export function takeOrphanedReadings(
  seatName: string,
  dirs: readonly string[] = dirsOfPlaces(SUBAGENT_PLACES)
): readonly string[] {
  const mark = `${seatName}${SUBAGENT_MARK}`
  const taken: string[] = []
  for (const dir of dirs) {
    let names: readonly string[]
    try {
      names = readdirSync(dir)
    } catch {
      continue
    }
    for (const name of names) {
      if (!name.startsWith(mark) || !name.endsWith(READINGS_SUFFIX)) continue
      const at = `${dir}/${name}`
      if (existsSync(`${at.slice(0, -READINGS_SUFFIX.length)}${SUBAGENT_PAGE_SUFFIX}`)) continue
      rmSync(at, { force: true })
      taken.push(at)
    }
  }
  return taken
}

export function removeSubagentPagesOf(seat: string, why: string): Outcome {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return { kind: "unchanged" }
  takeOrphanedReadings(seatName)
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

/**
 * Which subagents stand under a seat.
 *
 * BESIDE THE WRITERS RATHER THAN BESIDE THE PATHS, because its two callers are the two acts that
 * clear these pages — a stop and a resume both ask what stands before they take anything away. A
 * turn read never asks it, which is why it is not in `subagent-page-read.ts` holding the reader
 * open to the writer this file imports.
 */
export function standingSubagentsOf(seat: string): readonly StandingSubagent[] {
  const seatName = seatNameForAgent(seat)
  if (seatName === null) return []
  return standingPagePathsOf(seatName).map((absolute) => {
    const stated = frontmatterOf(absolute)?.["subagent-type"]
    return {
      name: pageStemOf(absolute),
      dispatchedAs: typeof stated === "string" && stated !== "" ? stated : "unstated",
    }
  })
}
