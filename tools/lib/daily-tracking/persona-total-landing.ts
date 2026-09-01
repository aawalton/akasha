import { patchFiles, patchPage, type Body, type Put, type Written } from "@shared/pages-query"

/**
 * A persona stands as a TypeScript file under `akasha/`, and the page store writes a path and a
 * whole body rather than the keys a page carries. So a persona's total is landed by carrying her
 * whole body back with one line changed, through the same gate the `akasha` command line lands on.
 * Every other page type this engine writes still stands as a file the store composes, and those
 * keep going through `patchPage`.
 */
export const PERSONA_PAGE_TYPE_SLUG = "persona"

/** The writer the store records against these commits: a name and an address, or it refuses. */
export const PERSONA_TOTAL_WRITER = "daily-tracking <daily-tracking@alanwalton.com>"

const CLOSING = "} as const satisfies Persona"

const TOTAL_LINE = /^ {2}totalPoints: -?\d+(?:\.\d+)?,$/m

export function personaPagePath(slug: string): string {
  return `akasha/persona-system/persona/${slug}/${slug}.persona.ts`
}

/**
 * The body a persona's file becomes carrying this total: the line restated where one stands, and
 * otherwise a line added last, where a key needs no import and no ordering to be read back.
 * Answers null where the body is not one this can change, so a caller refuses rather than guesses.
 */
export function personaBodyWithTotal(body: string, totalPoints: number): string | null {
  if (!Number.isFinite(totalPoints)) return null
  const line = `  totalPoints: ${totalPoints},`
  if (TOTAL_LINE.test(body)) {
    const next = body.replace(TOTAL_LINE, line)
    return next === body ? null : next
  }
  const at = body.lastIndexOf(CLOSING)
  if (at < 0) return null
  return `${body.slice(0, at)}${line}\n${body.slice(at)}`
}

async function landedOnPersona(slug: string, totalPoints: number): Promise<Written> {
  const path = personaPagePath(slug)
  const changing = (bodies: readonly Body[]): readonly Put[] | null => {
    const held = bodies.find((one) => one.path === path)
    if (held === undefined || held.content === null) return null
    const content = personaBodyWithTotal(held.content, totalPoints)
    return content === null ? null : [{ path, content }]
  }
  return patchFiles(
    [path],
    changing,
    PERSONA_TOTAL_WRITER,
    `${slug} carries a total of ${totalPoints} points`
  )
}

/**
 * Lands a total on the page that holds it, by whichever route that page type is written through.
 */
export async function landTotalPoints(
  pageTypeSlug: string,
  slug: string,
  totalPoints: number,
  writer: string
): Promise<Written> {
  if (pageTypeSlug === PERSONA_PAGE_TYPE_SLUG) return landedOnPersona(slug, totalPoints)
  return patchPage(pageTypeSlug, slug, { "total-points": totalPoints }, writer)
}
