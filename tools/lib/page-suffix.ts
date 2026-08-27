import { SLUG } from "../../page/page-types.ts"
import { blockOf, stringAt } from "../../page/text/text.ts"
import { idOfFilePage, slugOfFilePage } from "../../page/name/naming/naming"

const MARKDOWN = ".md"

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

export function suffixedPath(relPath: string, slug: string): string {
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
