
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises"
import { homedir } from "node:os"
import { dirname, join } from "node:path"
import { readFilePages } from "./file-pages.ts"
import { type Values } from "./page-query.ts"
import { textOf } from "./page-query-values.ts"
import { personaCore, type WallpaperCandidate } from "./persona-core.ts"
import { toPersonaSlug } from "./persona-match.ts"

const PERSONA_PAGE_TYPE_SLUG = "persona"

const WALLPAPERS_ROOT = join(homedir(), "Pictures", "Wallpapers", "Personas")

const FOLLOW_STATE_FILE = join(homedir(), ".cache", "persona-wallpaper-follow", "last-applied")

const FOLLOW_KEYS = ["id", "title", "total-points", "green-day-points"]

const APPLY_COMMAND = "plasma-apply-wallpaperimage"

export interface PersonaWallpaperRef {
  readonly id: string
  readonly title: string
  readonly anchorSlug: string
  readonly wallpaperDir: string
  readonly netBytes: number
  readonly greenDayPoints?: number
}

function isEnoent(e: unknown): boolean {
  return typeof e === "object" && e !== null && "code" in e && e.code === "ENOENT"
}

function numberOf(values: Values, key: string): number | undefined {
  const text = textOf(values, key)
  if (text === null || text.trim() === "") return undefined
  const read = Number(text)
  return Number.isFinite(read) ? read : undefined
}

export function personaWallpaperDir(title: string): string {
  return join(WALLPAPERS_ROOT, title)
}

export function personaWallpaperRef(personaId: string): PersonaWallpaperRef | null {
  const row = readFilePages(PERSONA_PAGE_TYPE_SLUG, FOLLOW_KEYS).find(
    (one) => textOf(one.values, "id") === personaId
  )
  if (row === undefined) return null
  const title = textOf(row.values, "title")
  if (title === null || title === "") return null
  const slug = textOf(row.values, "slug")
  const greenDayPoints = numberOf(row.values, "green-day-points")
  return {
    id: personaId,
    title,
    anchorSlug: slug === null || slug === "" ? toPersonaSlug(title) : slug,
    wallpaperDir: personaWallpaperDir(title),
    netBytes: numberOf(row.values, "total-points") ?? 0,
    ...(greenDayPoints === undefined ? {} : { greenDayPoints }),
  }
}

async function wallpaperFileNames(dir: string): Promise<readonly string[]> {
  const entries = await readdir(dir, { withFileTypes: true }).catch((e: unknown) => {
    if (isEnoent(e)) return null
    throw e
  })
  if (entries === null) return []
  return entries.filter((entry) => entry.isFile()).map((entry) => entry.name)
}

export async function readLastAppliedWallpaper(): Promise<string | null> {
  const raw = await readFile(FOLLOW_STATE_FILE, "utf8").catch((e: unknown) => {
    if (isEnoent(e)) return null
    throw e
  })
  if (raw === null) return null
  const trimmed = raw.trim()
  return trimmed === "" ? null : trimmed
}

export async function recordAppliedWallpaper(path: string): Promise<void> {
  await mkdir(dirname(FOLLOW_STATE_FILE), { recursive: true })
  await writeFile(FOLLOW_STATE_FILE, `${path}\n`, "utf8")
}

function spawnApply(path: string) {
  try {
    return Bun.spawn([APPLY_COMMAND, path], { stdout: "pipe", stderr: "pipe" })
  } catch {
    throw new Error(`${APPLY_COMMAND} not found on PATH`)
  }
}

export async function applyWallpaper(path: string): Promise<void> {
  const proc = spawnApply(path)
  const stderr = await new Response(proc.stderr).text()
  await proc.exited
  if (proc.exitCode !== 0) {
    throw new Error(`${APPLY_COMMAND} failed (exit ${proc.exitCode}): ${stderr.trim()}`)
  }
}

export async function selectFollowWallpaperFor(
  ref: PersonaWallpaperRef
): Promise<WallpaperCandidate | null> {
  const core = await personaCore()
  const names = await wallpaperFileNames(ref.wallpaperDir)
  const anchor = ref.anchorSlug.toLowerCase()
  const candidates: WallpaperCandidate[] = []
  for (const name of names) {
    const parsed = core.parseImageName(name)
    if (parsed === null || parsed.slug.toLowerCase() !== anchor) continue
    candidates.push({ slug: parsed.slug, level: parsed.level, path: join(ref.wallpaperDir, name) })
  }
  const ledger = core.computeLedger({
    netBytes: ref.netBytes,
    wallpaperCount: names.length,
    ...(ref.greenDayPoints === undefined ? {} : { greenDayPoints: ref.greenDayPoints }),
  })
  return core.selectFollowWallpaper(candidates, ledger.level)
}

export async function followWallpaperByPersonaId(personaId: string): Promise<void> {
  const ref = personaWallpaperRef(personaId)
  if (ref === null) return
  const selected = await selectFollowWallpaperFor(ref)
  if (selected === null) return
  if ((await readLastAppliedWallpaper()) === selected.path) return
  await applyWallpaper(selected.path)
  await recordAppliedWallpaper(selected.path)
}
