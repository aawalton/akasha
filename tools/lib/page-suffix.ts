import { idOfFilePage, slugOfFilePage } from "@akasha/file-page-identity"
import { SLUG } from "@akasha/markdown-pages/page-types"
import { blockOf, stringAt } from "@akasha/markdown-pages/text-at"

export const MARKDOWN = ".md"

export const ID = "id"

export const READINGS = ".readings.uncommitted.attachment.json"

export interface Identity {
  readonly slug: string | null
  readonly id: string
}

export function identityOf(repo: string, relPath: string, body: string): Identity {
  const at = `${repo}:${relPath}`
  const { fm, why } = blockOf(body)
  if (why !== null) return { slug: null, id: idOfFilePage(null, at) }
  return { slug: slugOfFilePage(stringAt(fm, SLUG), at), id: idOfFilePage(stringAt(fm, ID), at) }
}

/**
 * Where a markdown page lands when it takes its page type into its name.
 *
 * A path naming no markdown page is REFUSED rather than answered. Taking a fixed `.md` off the end
 * sliced three characters off whatever was there and put a markdown extension back on, so
 * `day-2026-03-05.daily-tracking.ts` came back as
 * `day-2026-03-05.daily-tracking.daily-tracking.md` — a name for a file that could not exist, and
 * the answer for all 344 akasha pages the two migrating types reach today. An akasha page is
 * `<slug>.<page-type>.ts` by construction and so carries its page type from birth; this renames the
 * markdown half alone, and for the other half there is no right answer to give.
 */
export function suffixedPath(relPath: string, slug: string): string {
  if (!relPath.endsWith(MARKDOWN)) {
    throw new Error(
      `a page takes its page type into its name by being renamed, and '${relPath}' is no markdown page`
    )
  }
  const cut = relPath.lastIndexOf("/")
  const dir = relPath.slice(0, cut + 1)
  const name = relPath.slice(cut + 1)
  return `${dir}${name.slice(0, -MARKDOWN.length)}.${slug}${MARKDOWN}`
}

export function locationFreeGlob(repo: string, slug: string): string {
  return `${repo}:**/*.${slug}${MARKDOWN}`
}

export function rekeyReadings(text: string, moved: ReadonlyMap<string, string>): string | null {
  let next = text
  let changed = false
  for (const [was, now] of moved) {
    const key = `${JSON.stringify(was)}:`
    if (!next.includes(key)) continue
    next = next.split(key).join(`${JSON.stringify(now)}:`)
    changed = true
  }
  return changed ? next : null
}
