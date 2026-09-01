import { readFiles, writeFiles, type Written } from "@shared/pages-query"

/**
 * A persona stands as a TypeScript file under `akasha/`, and the page store writes a path and a
 * whole body rather than the keys a page carries. So a persona's total is landed by carrying her
 * whole body back with one line changed, through the same gate the `akasha` command line lands on.
 *
 * That is now the only road in. A keyed write refuses: nothing in akasha renders a page's body out
 * of the keys it carries, so `patchPage` and its kin cannot become a file. Any page type whose
 * total is not landed this way is refused here rather than sent down a road that answers a refusal
 * the caller would read as a total already standing.
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

/** How many points the body already states, or null where it states none. */
export function totalIn(body: string): number | null {
  const found = body.match(/^ {2}totalPoints: (-?\d+(?:\.\d+)?),$/m)
  return found?.[1] === undefined ? null : Number(found[1])
}

const ATTEMPTS = 4

const PAUSE_MS = 1_500

const sleep = (ms: number): Promise<undefined> =>
  new Promise((done) => {
    setTimeout(() => {
      done(undefined)
    }, ms)
  })

/**
 * A write of a persona's page runs the whole gate and can outlast the store client's ceiling, and
 * the client tries again on hearing nothing. The first try may have landed by then, so the second
 * is refused for reading a body that has since moved — the run's own change, read as a stranger's.
 * So each try reads afresh, and a body already stating this total counts as landed rather than as
 * a refusal: what is asserted is the figure standing on the page, not who put it there.
 */
async function landedOnPersona(slug: string, totalPoints: number): Promise<Written> {
  const path = personaPagePath(slug)
  let why = `no attempt to land ${path} was made`
  for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
    if (attempt > 1) await sleep(PAUSE_MS)
    const found = await readFiles([path])
    if (!found.ok) {
      why = found.why
      continue
    }
    const held = found.bodies.find((one) => one.path === path)
    if (held === undefined || held.content === null) {
      return { ok: false, why: `no body stands at ${path}, so no total can be set in one` }
    }
    if (totalIn(held.content) === totalPoints) return { ok: true, at: found.at }
    const content = personaBodyWithTotal(held.content, totalPoints)
    if (content === null) {
      return { ok: false, why: `${path} is not a body this can set a total in` }
    }
    const landed = await writeFiles(
      [{ path, content }],
      PERSONA_TOTAL_WRITER,
      `${slug} carries a total of ${totalPoints} points`,
      undefined,
      undefined,
      found.at
    )
    if (landed.ok) return landed
    why = landed.why
  }
  return { ok: false, why: `${why} — ${ATTEMPTS} attempts were spent` }
}

/**
 * Lands a total on the page that holds it, by whichever route that page type is written through.
 * A persona is written as a whole body. Nothing else has a route, so nothing else is attempted.
 */
export async function landTotalPoints(
  pageTypeSlug: string,
  slug: string,
  totalPoints: number,
  _writer: string
): Promise<Written> {
  if (pageTypeSlug === PERSONA_PAGE_TYPE_SLUG) return landedOnPersona(slug, totalPoints)
  return {
    ok: false,
    why:
      `a total of ${totalPoints} for \`${pageTypeSlug}/${slug}\` went unwritten: a total is landed ` +
      `by carrying a page's whole body back, and only \`${PERSONA_PAGE_TYPE_SLUG}\` has a body this ` +
      "knows how to set a total in",
  }
}
