import { spawnSync } from "node:child_process"
import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import { DECLARATIONS, type Declaration } from "./attributes.ts"
import { FLEET } from "./compose-seat-name.ts"
import { rootOfPlace, SEAT_PLACES } from "./agent-page-place.ts"
import type { Roots } from "../../page/page.ts"
import { initiativeStemOf } from "./seat-initiative.ts"
import { frontmatterIn } from "./seat-presence-read.ts"
import { fileStemOf, pageStemOf } from "../../page/name/name.ts"

const PAGE_SUFFIX = ".md"

const SEAT_DIRS: readonly string[] = SEAT_PLACES.map((one) => one.dir)

const SEAT_TYPE = "seat"

const IN_ITS_OWN_FIELD: readonly Declaration[] = ["initiative", "on-call"]

export interface StatedFromHistory {
  readonly commit: string
  readonly set: Partial<Record<Declaration, string>>
  readonly principal: string | null
  readonly onCall: boolean
  readonly initiative: string | null
}

const OUTPUT_CEILING = 64 * 1024 * 1024

function gitAt(root: string, args: readonly string[]): string | null {
  const proc = spawnSync("git", [...args], {
    cwd: root,
    maxBuffer: OUTPUT_CEILING,
    stdio: ["ignore", "pipe", "ignore"],
  })
  if (proc.status !== 0) return null
  return new TextDecoder().decode(proc.stdout ?? new Uint8Array())
}

function textField(frontmatter: Record<string, unknown>, key: string): string | null {
  const held = frontmatter[key]
  if (typeof held === "string" && held !== "") return held
  if (typeof held === "number") return String(held)
  return null
}

export interface PageInHistory {
  readonly commit: string
  readonly frontmatter: Record<string, unknown>
}

function spellingsIn(dir: string, seatName: string): readonly string[] {
  return [`${dir}/${seatName}${PAGE_SUFFIX}`, `${dir}/${seatName}.${SEAT_TYPE}${PAGE_SUFFIX}`]
}

function pageHeldIn(root: string, dir: string, seatName: string): PageInHistory | null {
  const found = gitAt(root, [
    "log", "-1", "--format=%H", "--diff-filter=AM", "--name-only", "--", ...spellingsIn(dir, seatName),
  ])
  const lines = (found ?? "").split("\n").map((one) => one.trim()).filter((one) => one !== "")
  const commit = lines[0] ?? ""
  const relPath =
    lines.slice(1).find((one) => one.endsWith(PAGE_SUFFIX) && fileStemOf(one) === seatName) ?? ""
  if (commit === "" || relPath === "") return null
  const body = gitAt(root, ["show", `${commit}:${relPath}`])
  if (body === null) return null
  const frontmatter = frontmatterIn(body)
  return frontmatter === null ? null : { commit, frontmatter }
}

export function seatHistoryRoot(roots: Roots): string | null {
  for (const place of SEAT_PLACES) {
    const root = rootOfPlace(place, roots)
    if (root !== null) return root
  }
  return null
}

export function pageFromHistory(seatName: string, roots: Roots): PageInHistory | null {
  for (const place of SEAT_PLACES) {
    const root = rootOfPlace(place, roots)
    if (root === null) continue
    const held = pageHeldIn(root, place.dir, seatName)
    if (held !== null) return held
  }
  return null
}

export function statedFromHistory(seatName: string, roots: Roots): StatedFromHistory | null {
  const held = pageFromHistory(seatName, roots)
  if (held === null) return null
  const { commit, frontmatter } = held
  const set: Partial<Record<Declaration, string>> = {}
  for (const key of DECLARATIONS) {
    if (IN_ITS_OWN_FIELD.includes(key)) continue
    const slug = textField(frontmatter, `${key}-slug`)
    if (slug !== null) set[key] = slug
  }
  const bare = textField(frontmatter, "initiative-slug")
  return {
    commit,
    set,
    principal: textField(frontmatter, "person-slug") ?? textField(frontmatter, "principal-seat-name"),
    onCall: frontmatter["on-call"] === true,
    initiative: bare === null ? null : (initiativeStemOf(bare, rootFor(roots, AKASHA)) ?? bare),
  }
}

const PRINCIPAL_KEY = "principal-seat-name"

export interface HeldSeatPage {
  readonly path: string
  readonly commit: string
  readonly atMs: number
  readonly commits: readonly string[]
}

function underSeats(path: string): boolean {
  return SEAT_DIRS.some((dir) => path.startsWith(`${dir}/`))
}

export function newestBodyPerPath(seatRoot: string): readonly HeldSeatPage[] {
  const log = gitAt(seatRoot, [
    "log", "--diff-filter=AM", "--format=%H%x00%ct", "--name-only", "--", ...SEAT_DIRS,
  ])
  if (log === null) return []
  const order: string[] = []
  const newest = new Map<string, { commit: string; atMs: number }>()
  const commitsPerPath = new Map<string, string[]>()
  let commit = ""
  let atMs = 0
  for (const line of log.split("\n")) {
    if (line.includes("\0")) {
      const [hash, seconds] = line.split("\0")
      commit = hash ?? ""
      atMs = Number(seconds ?? 0) * 1000
      continue
    }
    const path = line.trim()
    if (!underSeats(path) || !path.endsWith(PAGE_SUFFIX)) continue
    let held = commitsPerPath.get(path)
    if (held === undefined) {
      held = []
      commitsPerPath.set(path, held)
      newest.set(path, { commit, atMs })
      order.push(path)
    }
    held.push(commit)
  }
  return order.map((path) => {
    const top = newest.get(path)
    return {
      path,
      commit: top?.commit ?? "",
      atMs: top?.atMs ?? 0,
      commits: commitsPerPath.get(path) ?? [],
    }
  })
}

const pathByAgentInWalk = new Map<string, ReadonlyMap<string, string>>()

function walkForPathById(seatRoot: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const held of newestBodyPerPath(seatRoot)) {
    const body = gitAt(seatRoot, ["show", `${held.commit}:${held.path}`])
    if (body === null) continue
    const frontmatter = frontmatterIn(body)
    if (frontmatter === null) continue
    const id = frontmatter[ID_KEY]
    if (typeof id !== "string" || id === "" || found.has(id)) continue
    found.set(id, held.path)
  }
  return found
}

function seatPagePathById(seatRoot: string): ReadonlyMap<string, string> {
  const held = pathByAgentInWalk.get(seatRoot)
  if (held !== undefined) return held
  const found = walkForPathById(seatRoot)
  pathByAgentInWalk.set(seatRoot, found)
  return found
}

export function dropSeatPagesInHistory(): void {
  pathByAgentInWalk.clear()
}

function seatPageInHistory(agentId: string, roots: Roots): string | null {
  const root = seatHistoryRoot(roots)
  return root === null ? null : (seatPagePathById(root).get(agentId) ?? null)
}

export function nameFromHistory(agentId: string, roots: Roots): string | null {
  const relPath = seatPageInHistory(agentId, roots)
  return relPath === null ? null : pageStemOf(relPath)
}

export function frontmatterFromHistory(
  agentId: string,
  roots: Roots
): Record<string, unknown> | null {
  const root = seatHistoryRoot(roots)
  const relPath = seatPageInHistory(agentId, roots)
  if (root === null || relPath === null) return null
  const found = gitAt(root, ["log", "-1", "--diff-filter=AM", "--format=%H", "--", relPath])
  const commit = found === null ? "" : found.trim()
  if (commit === "") return null
  const body = gitAt(root, ["show", `${commit}:${relPath}`])
  return body === null ? null : frontmatterIn(body)
}

const FIELD_LOOKBACK = 50

function fieldFromHistory(agentId: string, roots: Roots, key: string): string | null {
  const root = seatHistoryRoot(roots)
  const relPath = seatPageInHistory(agentId, roots)
  if (root === null || relPath === null) return null
  const log = gitAt(root, [
    "log", `-n${FIELD_LOOKBACK}`, "--diff-filter=AM", "--format=%H", "--", relPath,
  ])
  if (log === null) return null
  for (const line of log.split("\n")) {
    const commit = line.trim()
    if (commit === "") continue
    const body = gitAt(root, ["show", `${commit}:${relPath}`])
    if (body === null) continue
    const frontmatter = frontmatterIn(body)
    if (frontmatter === null) continue
    const held = textField(frontmatter, key)
    if (held !== null) return held
  }
  return null
}

export function fieldInCommits(
  relPath: string,
  commits: readonly string[],
  roots: Roots,
  key: string
): string | null {
  const root = seatHistoryRoot(roots)
  if (root === null) return null
  for (const commit of commits.slice(0, FIELD_LOOKBACK)) {
    const body = gitAt(root, ["show", `${commit}:${relPath}`])
    if (body === null) continue
    const frontmatter = frontmatterIn(body)
    if (frontmatter === null) continue
    const held = textField(frontmatter, key)
    if (held !== null) return held
  }
  return null
}

export function parentFromHistory(agentId: string, roots: Roots): string | null {
  return fieldFromHistory(agentId, roots, PRINCIPAL_KEY)
}

const ID_KEY = "id"

const PERSON_KEY = "person-slug"

const START_MODE_KEY = "start-mode"

const REGISTRATION_KEY = "registration-account"

export interface SeatFromHistory {
  readonly commit: string
  readonly seatName: string
  readonly set: Partial<Record<Declaration, string>>
  readonly principal: string | null
  readonly parentName: string | null
  readonly onCall: boolean
  readonly initiative: string | null
  readonly account: string | null
  readonly mode: string | null
}

export function seatFromHistory(agentId: string, roots: Roots): SeatFromHistory | null {
  const seatName = nameFromHistory(agentId, roots)
  if (seatName === null) return null
  const frontmatter = frontmatterFromHistory(agentId, roots)
  if (frontmatter === null || textField(frontmatter, ID_KEY) !== agentId) return null
  const stated = statedFromHistory(seatName, roots)
  if (stated === null) return null
  const above = textField(frontmatter, PRINCIPAL_KEY)
  return {
    commit: stated.commit,
    seatName,
    set: stated.set,
    principal: textField(frontmatter, PERSON_KEY) ?? (above === null ? null : FLEET),
    parentName: above,
    onCall: stated.onCall,
    initiative: stated.initiative,
    account: textField(frontmatter, REGISTRATION_KEY),
    mode: textField(frontmatter, START_MODE_KEY),
  }
}
